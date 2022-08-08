/**
 * 本文件为钱包的链接组件
 * 此组件提供安装钱包,账号托管的功能(全局可用)
 * 包含context hook 和公用函数
 * 廖力编写 2022/03/24
 */
import { createContext, useState, useContext, useEffect } from 'react';
// 翻译组件
import { IwalletHelperContext, InetWork, EwalletMode } from './interfaces/iWalletHelper';
import { isRunningInServer } from '@bobliao/use-jquery-hook';
import MetaMaskOnboarding from '@metamask/onboarding';
import { IstateResult, ResultStateus } from './interfaces/iComon';
//远程钱包链接钩子
import useWalletConnect from './walletConnect';

/**
 * 创建一个需要全局使用的钱包context
 **/
const walletContext = createContext<IwalletHelperContext>({
    walletData: {},
    walletFuncs: {},
});

/**
 * 钱包的公用钩子
 */
const useWallet = function (isConnectByInit: boolean = false, RUNNING_ENV: string): IwalletHelperContext {
    const walletConnect = useWalletConnect(RUNNING_ENV);
    
    console.log(useEffect);
    console.log(useState);
    

    /**
     * ============================state===========================
     */
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<string>('');
    const [currentDisplayAccount, setCurrentDisplayAccount] = useState<string>('');
    const [currentNetwork, setCurrentNetwork] = useState<string>('');
    const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false);
    const [isConnectedWallet, setIsConnectedWallet] = useState<boolean>(false);
    const [isTrustWallet, setIsTrustWallet] = useState<boolean>(false);
    const [isWalletUnInitlized, setIsWalletUnInitlized] = useState<boolean>(false);
    const [ethereum, setEthereum] = useState<object | void>(null);
    /**
     * 这个非常有用,当网络或者账号被变更的时候,这个就会变,这个用来检测是否变更了网络或者账号
     */
    const [changeStemp, setChangeStemp] = useState<number>(+new Date());
    const [changeTimes, setChangeTimes] = useState<number>(0);
    /**
     * 工作方式
     */
    const [workingMode, setWorkingMode] = useState<EwalletMode>(EwalletMode.ETHEREUM);

    /**
     * ==========================函数==============================
     */

    /**
     * 添加网络
     */
    let addNetWork = async function (_netWork: InetWork): Promise<IstateResult> {
        var result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };
        return new Promise<IstateResult>((resolve) => {
            /**
             * 如果用远程链接,就不要切换网络
             */
            if (workingMode === EwalletMode.WALLETCONNECT) {
                return result;
            }

            if (isRunningInServer) {
                result.status = ResultStateus.SERVERSIDE;
                resolve(result);
                return;
            }
            if (ethereum === null) {
                resolve(result);
                return;
            }
            var chainid = '0x' + Number(_netWork.depChainId).toString(16).toUpperCase();
            return ethereum['request']({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: chainid,
                        rpcUrls: [_netWork.provider],
                        chainName: _netWork.depChainName,
                        nativeCurrency: {
                            name: _netWork.depChainName,
                            symbol: _netWork.symbol,
                            decimals: _netWork.decimals,
                        },
                        blockExplorerUrls: [_netWork.visitUrl],
                    },
                ],
            })
                .then(
                    function (_data) {
                        result.status = ResultStateus.SUCCESSED;
                        resolve(result);
                    },
                    function (_data) {
                        result.status = ResultStateus.USEREXIT;
                        result.data = _data;
                        resolve(result);
                    }
                )
                .catch(function (_e) {
                    result.data = _e;
                    resolve(result);
                });
        });
    };

    /**
     * 切换网络
     */
    let switchNetWork = function (_netWork: InetWork): Promise<IstateResult> {
        var result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };

        return new Promise<IstateResult>((resolve) => {
            /**
             * 如果用远程链接,就不要切换网络
             */
            if (workingMode === EwalletMode.WALLETCONNECT) {
                return result;
            }

            if (isRunningInServer) {
                result.status = ResultStateus.SERVERSIDE;
                resolve(result);
                return;
            }
            if (ethereum === null) {
                resolve(result);
                return;
            }
            if (ethereum['isTrust']) {
                setIsTrustWallet(true);
                setChangeStemp(+new Date());
                resolve(result);
            }
            if (currentNetwork !== _netWork.depChainId.toString()) {
                /**
                 * 如果是imToken isTrust 直接跳过切换网络,直接添加网络
                 */
                if (ethereum['isImToken']) {
                    (async function () {
                        resolve(await addNetWork(_netWork));
                    })();
                    return;
                }

                return ethereum['request']({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId: '0x' + Number(_netWork.depChainId).toString(16).toUpperCase(),
                        },
                    ], // chainId must be in hexadecimal numbers
                })
                    .then(
                        function (_data) {
                            setChangeStemp(+new Date());
                            result.status = ResultStateus.SUCCESSED;
                            resolve(result);
                        },
                        async function (_data) {
                            result.status = ResultStateus.USEREXIT;
                            resolve(await addNetWork(_netWork));
                        }
                    )
                    .catch(async function (_e) {
                        resolve(await addNetWork(_netWork));
                    });
            }
        });
    };

    /**
     * 当监听到账号变更的时候
     */
    let whenChangeAccount = function (_accounts: Array<string>) {
        if (_accounts.length === 0) {
            setCurrentAccount('');

            setChangeStemp(+new Date());
            return;
        }
        setCurrentAccount(_accounts[0].toLowerCase());
        setChangeStemp(+new Date());
    };
    let whenChangeNetwork = function (_chainId: any) {
        setCurrentNetwork(Number(_chainId).toString().toLowerCase());
        setChangeStemp(+new Date());
    };

    //触发链接钱包
    let triggerConnect = async function (_isForce: boolean = true): Promise<void> {
        if (isRunningInServer) {
            return;
        }
        let _currentAccount: string = currentAccount;
        let _currentNetWork: string = currentNetwork;
        var _ethereum: object | void = ethereum;
        if (_ethereum === null) {
            _ethereum = detactWallet(_isForce);
        }

        if (_ethereum !== null) {
            //如果已经链接了账号,就不需要进行这些操作了
            if (_currentAccount !== '') {
                return;
            }
            let result: Array<string> = [''];
            let chainId: any = '';
            if (
                typeof _ethereum['selectedAddress'] === 'undefined' ||
                _ethereum['selectedAddress'] === null ||
                _ethereum['selectedAddress'] === ''
            ) {
                if (_isForce) {
                    try {
                        result = await _ethereum['request']({
                            method: 'eth_requestAccounts',
                        });
                        chainId = await _ethereum['request']({ method: 'eth_chainId' });
                    } catch (_e) {
                        setChangeStemp(+new Date());
                        return;
                    }
                }
            } else {
                result = [_ethereum['selectedAddress']];
            }

            if (chainId === '') {
                if (_ethereum['chainId'] !== null) {
                    chainId = _ethereum['chainId'];
                } else {
                    await new Promise<void>(async function (_res, _rej): Promise<void> {
                        try {
                            var timeout = setTimeout(function () {
                                _res();
                            }, 1000);
                            chainId = await _ethereum['request']({ method: 'eth_chainId' });
                            clearTimeout(timeout);
                            _res();
                        } catch (_e) {
                            _res();
                        }
                    });
                }
            }
            //chainId只会在刚装完钱包后出现为空
            //所以为空就不往下走了,而是刷新一下让用户主动去激活它
            if (chainId === '') {
                setChangeStemp(+new Date());
                setIsWalletUnInitlized(true);

                return;
            }
            if (typeof result[0] === 'undefined') {
                _currentAccount = '';
            } else {
                _currentAccount = result[0];
            }
            setWorkingMode(EwalletMode.ETHEREUM);
            _currentNetWork = Number(chainId).toString();
            setCurrentAccount(_currentAccount.toLowerCase());
            setCurrentNetwork(_currentNetWork.toLowerCase());

            //这里为true说明此钱包组件已经初始化过,就不要重复初始化了
            if (isConnectedWallet === true) {
                return;
            }
            setChangeStemp(+new Date());

            //注册账号变更事件
            _ethereum['on']('accountsChanged', whenChangeAccount);
            //注册网络变更事件
            _ethereum['on']('chainChanged', whenChangeNetwork);
            setIsConnectedWallet(true);
            return;
        } else {
            var reconnect = function (): void {
                triggerConnect();
            };
            /**
             * 如果没有检查到钱包安装,就等待钱包安装好再triggerConnect
             */
            //这里移除一下,避免多次调用
            window.removeEventListener('ethereum#initialized', reconnect);
            //然后再注册
            window.addEventListener('ethereum#initialized', reconnect, {
                once: true,
            });
            setChangeStemp(+new Date());
            return;
        }
    };

    /**
     * 触发walletConnect远程钱包链接
     */
    let trigger_WalletConnect_connect = async function () {
        var result: IstateResult = await walletConnect.funcs.triggerConnect();
        if (result.status === ResultStateus.SUCCESSED) {
            setWorkingMode(EwalletMode.WALLETCONNECT);
        }
    };

    /**
     * 同步walletConnect的数据
     */
    let syncWalletData = function () {
        /**
         * 如果断开了walletConnect的链接
         */
        if (walletConnect.data.currentAccount === '' && currentAccount !== '') {
            disConnectSelf();
        }

        if (workingMode === EwalletMode.WALLETCONNECT) {
            setCurrentAccount(walletConnect.data.currentAccount);
            setCurrentNetwork(walletConnect.data.currentNetWork);
            setIsWalletInstalled(true);
            setIsConnectedWallet(true);
            setIsTrustWallet(false);
            setIsWalletUnInitlized(false);
            setChangeStemp(+new Date());
            setChangeTimes(changeTimes + 1);
            setEthereum(walletConnect.data.provider);
        }
    };

    /**
     * 检查是否链接了钱包
     */
    let detactConnect = function () {
        if (isRunningInServer) {
            return {};
        }
        return {
            isConnectedWallet: isConnectedWallet,
            currentAccount: currentAccount,
        };
    };

    /**
     * 检查钱包是否存在
     * @returns null或者ethereum对象
     */
    let detactWallet = function (_isForce: boolean = true): object | void {
        if (isRunningInServer) {
            return null;
        }
        var _ethereum: object | void = null;
        if (isWalletInstalled === false) {
            if (window.hasOwnProperty('ethereum')) {
                _ethereum = window['ethereum'];
                setIsWalletInstalled(true);
                setEthereum(_ethereum);
            } else {
                setIsWalletInstalled(false);
                if (_isForce) {
                    var onboarding: MetaMaskOnboarding = new MetaMaskOnboarding();
                    onboarding.startOnboarding();
                }
            }
        }
        return _ethereum;
    };

    /**
     * 断开钱包链接
     */
    let disConnect = function (): void {
        /**
         * 如果钱包链上了,而且是用的本地ethereum模式,就断开本本操作器的链接就好了
         */
        if (workingMode === EwalletMode.ETHEREUM && currentAccount !== '') {
            disConnectSelf();

            /**
             * 如果链接的是远程钱包,就断开远程钱包的链接
             * 远程钱包断开链接以后会触发本操作器的链接状态清除
             *  */
        } else if (workingMode === EwalletMode.WALLETCONNECT && currentAccount !== '') {
            disconnectWalletConnect();
        }
    };

    /**
     *断开walletConnect的链接
     */
    let disconnectWalletConnect = function (): void {
        walletConnect.funcs.unbindAllEvents();
    };

    /**
     * 钱包操作器自身断开钱包链接
     */
    let disConnectSelf = function (): void {
        if (ethereum !== null) {
            ethereum['removeAllListeners']();
        }
        setCurrentAccount('');
        setCurrentNetwork('');
        setCurrentDisplayAccount('');
        setIsWalletInstalled(false);
        setIsConnectedWallet(false);
        setIsTrustWallet(false);
        setIsWalletUnInitlized(false);
        setEthereum(null);
        setWorkingMode(EwalletMode.ETHEREUM);
        setChangeStemp(+new Date());
        setChangeTimes(changeTimes + 1);
    };

    /**
     * ==================================Effects===============================
     */
    useEffect(function (): ReturnType<React.EffectCallback> {
        if (isMounted === false) {
            setIsMounted(true);
        }
        return function (): void {
            setIsMounted(false);
        };
    }, []);

    /**
     * 第一时间载入的时候
     */
    useEffect(
        function (): void {
            if (isMounted === true) {
                triggerConnect(isConnectByInit);
            }
        },
        [isMounted]
    );

    /**
     * 变更timeStemp的时候变更加载次数
     */
    useEffect(
        function (): void {
            if (isMounted === true) {
                setChangeTimes(changeTimes + 1);
            }
        },
        [changeStemp]
    );

    /**
     * 当账号变更的时候
     */
    useEffect(
        function (): void {
            if (currentAccount !== '') {
                setCurrentDisplayAccount(currentAccount.substring(0, 5) + '...' + currentAccount.substring(38, 42));
            }
        },
        [currentAccount]
    );

    /**
     * 如果使用的是远程钱包链接的,就透传远程钱包链接的数据和函数
     */
    useEffect(
        function () {
            syncWalletData();
        },
        [workingMode, walletConnect.data.changeTimes]
    );

    return {
        walletData: {
            //当前链接的账号
            currentAccount: currentAccount,
            //当前使用的是哪个网络
            currentNetwork: currentNetwork,
            //当前是否已经安装了钱包
            isWalletInstalled: isWalletInstalled,
            //当前是否链接了钱包
            isConnectedWallet: isConnectedWallet,
            //钱包对象
            ethereum: ethereum,
            //状态更改指示
            //一旦钱包登陆用户更改,或者网络更改
            //都会触发这个状态的更改
            changeStemp: changeStemp,
            isTrustWallet: isTrustWallet,
            //钱包状态更改次数
            changeTimes: changeTimes,
            /**
             * 刚安装完钱包,如果不刷新页面钱包可能会未初始化
             */
            isWalletUnInitlized: isWalletUnInitlized,
            /**
             * 用于显示的账号信息
             */
            currentDisplayAccount: currentDisplayAccount,
            /**
             * 工作模式
             */
            workingMode: workingMode,
        },
        walletFuncs: {
            /**
             * 立刻链接登陆钱包
             */
            triggerConnect: triggerConnect,
            /**
             * 检测是否有链接钱包
             */
            detactConnect: detactConnect,
            /**
             * 前侧是否有安装钱包
             */
            detactWallet: detactWallet,
            /**
             * 添加网络
             */
            addNetWork: addNetWork,
            /**
             * 切换网络
             */
            switchNetWork: switchNetWork,
            /**
             * 触发远程钱包链接
             */
            trigger_WalletConnect_connect: trigger_WalletConnect_connect,
            /**
             * 断开链接
             */
            disConnect: disConnect,
        },
    };
};

export interface IuseWalletContext {
    (): IwalletHelperContext;
}

let useWalletContext: IuseWalletContext = function (): IwalletHelperContext {
    var r: IwalletHelperContext = useContext(walletContext);
    return r;
};

export {
    //钱包操作器context
    walletContext as default,
    //创建钱包操作器的函数
    useWallet,
    //在子组件中,获取钱包操作器的钩子函数
    useWalletContext,
};
