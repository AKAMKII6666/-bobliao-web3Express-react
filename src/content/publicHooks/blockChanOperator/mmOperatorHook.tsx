/**
 * 廖力编写 2022年03月26号
 * metaMask智能合约操作器
 * 用于使用window.ethereum来操作智能合约的模块
 */
import { useState, useEffect } from 'react';
import { useWalletContext } from '../walletHelperHook';
import { IcontractConfig, I_contractBlock, IconfigBlock, IuserSignResult, Irobj } from '../interfaces/iMmOperator';
import { useCommonContext } from '../../publicHooks/commonHook';
import { IstateResult, ResultStateus } from '../interfaces/iComon';
const _ethers = require('ethers');
const _web3Contract = require('web3-eth-contract');

//操作器的工作模式
export enum EWorkingMode {
    ETHEREUM = 'ETHEREUM',
    NODE = 'NODE',
}

/**
 * 合约操作器的公用钩子
 */
const useMmOperator = function (
    contractConfig: IcontractConfig,
    config: any = {
        //是否在发现网络为非本合约需求的网络时,强行调起网络切换
        isForceSwitchNetWork: false,
        //在网络不正确的情况下,是否继续载入合约
        isForceLoadWhenRongNetWork: true,
        //是否在钱包未安装/未登陆的情况下,继续初始化并载入合约
        isLoadWhenWalletNotConnected: true,
    }
): Irobj {
    /**
     * ========================使用钩子=======================
     */
    const { walletData, walletFuncs } = useWalletContext();
    const { data } = useCommonContext();

    /**
     * =========================静态变量======================
     */
    let projEvn = '';
    if (data.envTag === 'development' || data.envTag === 'gray') {
        //简写环境变量
        projEvn = 'dev';
    } else {
        //简写环境变量
        projEvn = 'pro';
    }

    //符合当前环境的配置文件
    const currentConfig: IconfigBlock = contractConfig[projEvn];

    /**
     * =========================状态=======================
     */
    //是否已挂载
    const [isMounted, setIsMounted] = useState<boolean>(false);
    //当前操作器的工作状态
    const [workingMode, setWorkingMode] = useState<EWorkingMode>(EWorkingMode.NODE);
    //当前操作器载入的合约
    const [contracts, setContracts] = useState<object>({});
    //是否完成了合约载入
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    //载入合约的次数
    const [changeTimes, setChangeTimes] = useState<number>(0);
    //是否为错误的网络
    const [isWrongNetWork, setIsWrongNetWork] = useState<boolean>(false);

    /**
     * =========================函数==========================
     */

    /**
     * 将网络设置成当前合约需求的网络
     */
    var switchCurrentNetWork = function (): Promise<any> {
        return walletFuncs.switchNetWork(currentConfig.info);
    };

    /**
     * 获得提Provider
     * ethereum | httpProvider
     */
    var getProvider = async function (): Promise<any> {
        //当检测到有ethereum注入
        //当前账号不为空
        //当前网络id与当前合约载入的所需求的网络id一致,就使用“ethereum”也就是钱包模式进行区块链访问和操作
        if (
            walletData.ethereum !== null &&
            walletData.currentAccount !== '' &&
            walletData.currentNetwork === contractConfig[projEvn].info.depChainId.toString()
        ) {
            //将工作模式设置为ethereum
            setWorkingMode(EWorkingMode.ETHEREUM);
            return walletData.ethereum;
        } else {
            //如果以上条件有一个不支持,就使用节点模式,直接访问节点进行区块链查询
            setWorkingMode(EWorkingMode.NODE);
            return contractConfig[projEvn].info.provider;
        }
    };

    /**
     * 获取签名器和节点提供器
     * @param {Function} _callBack 取得操作器的回调函数
     * @returns {undefined}
     */
    const makeOperator = async function (_callBack: Function): Promise<any> {
        //如果钱包未安装未链接也可以初始化,只是初始化为node模式,无法写入只能查询
        //载入的provider就不是节点了,是metaMesk
        _web3Contract.setProvider(await getProvider());
        //通过MetaMask获得provider
        var provider = new _ethers.providers.Web3Provider(_web3Contract.currentProvider);
        //获得签名器
        var signer = provider.getSigner();
        let operator = {
            signer: signer,
            provider: provider,
            web3Contract: _web3Contract,
        };
        _callBack(operator);
    };

    /**
     * 解析合约
     * 将合约从合约配置文件中取出来,
     * 并将abi文件读取出来然后,
     * 将合约中的操作方法注入到本操作器中
     * @param {Object} _contractConfig 智能合约对象
     * @param {Function} _callback 解析完成后的回调函数
     * @returns {Promise}   reslove(_web3Operator)
     */
    const initContract = function (_callback: Function = function () {}): Promise<number> {
        //如果钱包未安装未链接也可以初始化,只是初始化为node模式,无法写入只能查询

        return new Promise<number>(async function (_reslove: Function, _rejected: Function): Promise<any> {
            await new Promise<any>(async function (_res: Function, _rej: Function) {
                /**
                 * 在钱包安装了的情况下才自动切换钱包
                 */
                if (
                    config.isForceSwitchNetWork &&
                    walletData.ethereum !== null &&
                    walletData.currentNetwork !== contractConfig[projEvn].info.depChainId.toString()
                ) {
                    setIsWrongNetWork(true);
                    try {
                        await walletFuncs.switchNetWork(contractConfig[projEvn].info);
                        _res();
                    } catch (_e) {
                        _res();
                    }
                }
                _res();
            });

            //走到这个位置有两种可能性
            //1.walletData.ethereum 等于null,那么就是说,即使钱包没有安装也能走到这里,因为接下来,如果检测到未安装钱包也会将合约操作器设置为node工作状态
            //2.walletData.ethereum 不等于null,并且网络配置正确
            //3.检测到网络不正确但是配置了isForceSwitchNetWork为false

            /**
             * 如果配置了在网络不正确的情况下不继续载入,就直接不载入了
             */
            if (
                !config.isForceLoadWhenRongNetWork &&
                walletData.ethereum !== null &&
                walletData.currentNetwork !== contractConfig[projEvn].info.depChainId.toString()
            ) {
                return;
            }

            /**
             * 如果配置了在钱包未安装/未登陆的情况下,不继续初始化并载入合约
             * 就直接不载入了
             */
            if (!config.isLoadWhenWalletNotConnected && walletData.currentAccount === '') {
                return;
            }

            var totalCount: number = 0;
            var cCount: number = 0;
            var contracts: object = {};
            var completed = function (_contractObj: any, _item: I_contractBlock, _i: string): void {
                cCount++;
                contracts[_i] = _contractObj;
                if (cCount === totalCount && typeof _callback !== 'undefined') {
                    _callback(contracts);
                }
                if (cCount === totalCount) {
                    //是否为非合约需求的网络
                    if (walletData.currentNetwork !== contractConfig[projEvn].info.depChainId.toString()) {
                        setIsWrongNetWork(true);
                    } else {
                        setIsWrongNetWork(false);
                    }

                    setContracts(contracts);
                    setIsLoaded(true);
                    setChangeTimes(changeTimes + 1);
                    _reslove(contracts);
                }
            };
            for (var i in currentConfig) {
                if (i !== 'info') {
                    (function (_item: I_contractBlock, _i: string) {
                        let item = _item;
                        //这里异步加载abi文件
                        item.getAbiAsync(function (_abi: any): void {
                            //异步加载智能合约模块
                            //不用担心循环里重复require多次,webpack会缓存第一次require的结果,之后就都是从本地缓存里拿.
                            makeOperator(function (_operator) {
                                //拉取到合约abi文件后,初始化合约
                                let _contractObj: any = new _operator.web3Contract(_abi, item.id);
                                //每完成一个合约的初始化,就在这里计数
                                completed(_contractObj, item, _i);
                            });
                        });
                    })(currentConfig[i], i);
                    totalCount++;
                }
            }
        });
    };

    /**
     * 批量调起合约
     * @param {Array} _arr 调用函数集
     * @param {Function} _callback 完成的回调函数
     */
    const mutilRequest = function (
        _arr: Array<Function>,
        _callback: Function = function () {}
    ): Promise<Array<IstateResult>> {
        var p = new Promise<Array<IstateResult>>(async function (_reslove) {
            //完成函数
            var count = _arr.length;
            var resultObj: object = {};
            var complete = function (_result: Function, _type: ResultStateus, _index: number) {
                count--;
                resultObj[_index] = {
                    result: {
                        status: _type,
                        data: _result,
                    },
                };
                if (count === 0) {
                    var resArr: Array<IstateResult> = [];
                    for (var i = 0; i < _arr.length; i++) {
                        resArr.push(resultObj[i].result as IstateResult);
                    }
                    if (typeof _callback !== 'undefined') {
                        _callback.apply(this, resArr);
                    }
                    _reslove(resArr);
                }
            };

            //调起智能合约
            var makeRequest = async function (_func: Function, _index: number) {
                try {
                    var _res: any = await _func();
                    complete(_res, ResultStateus.SUCCESSED, _index);
                } catch (_e) {
                    complete(_e, ResultStateus.ERROR, _index);
                }
            };

            for (var i = 0; i < _arr.length; i++) {
                await makeRequest(_arr[i], i);
            }
        });

        return p;
    };

    /**
     *处理发起交易
     * @param _contract 传入合约名称
     * @param _method	传入方法名称
     * @param _sendConditions 传入方法的参数
     * @param _sendConditions	传发送的参数
     * @returns 返回promise<IstateResult>
     */
    const send = function (
        _contract: string,
        _method: string,
        _condition: Array<any> = [],
        _sendConditions: any
    ): Promise<IstateResult> {
        var result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };
        var p = new Promise<IstateResult>(function (_reslove) {
            contracts[_contract].methods[_method]
                .apply(contracts[_contract], _condition)
                .send(_sendConditions)
                .then(
                    function (_r: any) {
                        result.status = ResultStateus.SUCCESSED;
                        result.data = _r;
                        _reslove(result);
                    },
                    function (_r: any) {
                        result.status = ResultStateus.USEREXIT;
                        result.data = _r;
                        _reslove(result);
                    }
                )
                .catch(function (_e) {
                    result.status = ResultStateus.ERROR;
                    result.data = _e;
                    _reslove(result);
                });
        });
        return p;
    };

    /**
     * 获得用户余额
     * @param {回调函数(用户余额)} _callBack
     * @returns {number} Promis.reslove( 用户余额 )
     */
    const getUserBalance = function (_callBack: Function): Promise<IstateResult> {
        //如果没有登陆钱包,或者钱包未安装就不要继续操作
        if (
            walletData.isWalletInstalled === false ||
            walletData.currentAccount === '' ||
            walletData.currentNetwork === '' ||
            walletData.isConnectedWallet === false
        ) {
            return null;
        }
        let _result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };
        var p = new Promise<IstateResult>(function (_reslove) {
            //获取签名器
            makeOperator(function (_operator) {
                //直接使用签名器获得用户的余额
                _operator.signer
                    .getBalance()
                    .then(function (_res) {
                        return _res;
                    })
                    .then(function (_res) {
                        //获得余额以后返回
                        var result = Number(window['_ethers'].utils.formatEther(_res._hex));
                        _result.status = ResultStateus.SUCCESSED;
                        _result.data = result;
                        if (typeof _callBack !== 'undefined') {
                            _callBack(_result);
                        }
                        _reslove(_result);
                    });
            });
        });
        return p;
    };

    /**
     * 用于发起对网站的登陆的钱包鉴权
     * @returns {Promise} token (string)
     */
    const getSignForLogin = function (): Promise<IstateResult> {
        let result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };

        return new Promise<IstateResult>(function (_res: Function, _rej: Function): void {
            if (walletData.isWalletInstalled === false) {
                result.status = ResultStateus.NOWALLET;
                result.data = 'no Wallet';
                _res(result);
                return;
            }
            if (walletData.currentAccount === '') {
                result.status = ResultStateus.WALLETNOTCONNECTED;
                result.data = 'no Connected';
                _res(result);
                return;
            }

            if (Number(walletData.currentNetwork) !== Number(currentConfig.info.depChainId)) {
                result.status = ResultStateus.WRONGNETWORK;
                result.data = 'wrong network';
                _res(result);
                return;
            }
            /**签名用的web3模块 */
            require(['web3-eth-personal', 'web3-token'], async function (_wep, _web3Token) {
                var personal = new _wep(walletData.ethereum);
                var message = '';
                var runningToken = '';
                var p = _web3Token.sign(function (msg: string): Promise<string> {
                    message = msg;
                    return personal.sign(msg, walletData.currentAccount).then(function (_res) {
                        runningToken = _res;
                        return _res;
                    });
                }, '1d');
                p.then(
                    function (_token: string): void {
                        result.status = ResultStateus.SUCCESSED;
                        let res: IuserSignResult = {
                            token: _token,
                            message: message,
                            runningToken: runningToken,
                        };
                        result.data = res;
                        _res(result);
                    },
                    function (): void {
                        result.status = ResultStateus.USEREXIT;
                        _res(result);
                    }
                ).catch(function (_e: Error): void {
                    result.status = ResultStateus.ERROR;
                    result.data = _e;
                    _res(result);
                });
            });
        });
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

    //监听钱包登陆信息的变化,不管怎么变化都重新载入一次合约
    useEffect(
        function (): void {
            if (isMounted === true && walletData.changeTimes !== 0) {
                initContract();
            }
        },
        [isMounted, walletData.changeTimes]
    );

    let returnObject: Irobj = {
        data: {
            //是否已经挂载
            isMounted,
            //当前合约操作器的工作模式
            workingMode,
            //当前载入的合约对象
            contracts,
            //是否已经载入完成
            isLoaded,
            //操作器加载合约次数
            changeTimes,
            //是否为错误的网络
            isWrongNetWork,
            //当前使用的合约配置
            currentConfig,
        },
        funcs: {
            //获得当前能拿到的provider
            getProvider,
            //获得操作器
            makeOperator,
            //初始化合约
            initContract,
            //获得用户钱包余额
            getUserBalance,
            //批量操作合约
            mutilRequest,
            //获得正确的网络
            switchCurrentNetWork,
            //签名
            getSignForLogin,
            //发送交易
            send,
        },
    };

    return returnObject;
};

export default useMmOperator;
