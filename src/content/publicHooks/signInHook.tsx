/**
 * 廖力编写 2022/03/29
 * 签名验证模块
 */
import React, { useEffect, useRef } from 'react';
import useLocalStorage from 'react-localstorage-hook';
import { useCommonContext } from './commonHook';
import useMmOperator from './blockChanOperator/mmOperatorHook';
import { IcontractConfig } from './interfaces/iMmOperator';
import { IstateResult, ResultStateus } from './interfaces/iComon';
import { useWalletContext } from './walletHelperHook';
import useAjax from './ajaxHook';
import IajaxConfig from './interfaces/iAjax';
import IuserSateInfo from './interfaces/iSignIn';

const useSign = function (
    /**
     * 是否强制在每次钱包张台更改的时候,触发签名
     */
    _forceSign: boolean = false,
    /**
     * 使用哪个合约做基准合约
     */
    _contractConfig: IcontractConfig = null,
    /**
     * 使用哪个ajax配置作为登陆时用的接口
     */
    _ajaxConfig: IajaxConfig = null
) {
    /**
     * =========================useHooks========================
     */
    const operator = useMmOperator(_contractConfig);
    const { walletData } = useWalletContext();
    const { fetch } = useAjax(_ajaxConfig);
    const common = useCommonContext();

    /**
     * =========================state===========================
     */

    //如果在服务器端运行就避免运行下去
    //因为“useLocalStorage”中有一些服务器端不兼容的东西
    if (common.data.isRunningInServer) {
        return {
            data: {
                isMounted: false,
                userSignInfo: {
                    publicAddress: '',
                    signature: '',
                    message: '',
                    token: '',
                    backEndToken: '',
                    expires_in: '',
                    loginDate: '',
                },
                loadTimes: 0,
                loadStemp: 0,
                isSigned: false,
            },
            funcs: {
                getSignInfo: function () {},
                checkUserLogin: function () {},
                login: function () {},
            },
        };
    }

    window['__Dk285_signPadding_'] = false;

    const [isMounted, setIsMounted] = useLocalStorage('isMounted', false);
    const [userSignInfo, setUserSignInfo] = useLocalStorage('userSignInfo', {
        publicAddress: '',
        signature: '',
        message: '',
        token: '',
        backEndToken: '',
        expires_in: '',
        loginDate: '',
    });
    const [loadTimes, setLoadTimes] = useLocalStorage('loadTimes', 0);
    const [loadStemp, setLoadStemp] = useLocalStorage('loadStemp', +new Date());
    const [isSigned, setIsSigned] = useLocalStorage('isSigned', false);

    /**
     * 为了避免闭包里面拿不到数据,就使用了这个
     */
    const userSignInfoRef = useRef<IuserSateInfo>(userSignInfo);
    userSignInfoRef.current = userSignInfo;
    /**
     * 是否签名过的这个状态也需要ref化,因为在用户拒绝某次签名后,
     * 如果又签名登陆了,拒绝的那次签名也要被触发
     */
    const isSignedRef = useRef<IuserSateInfo>(isSigned);
    isSignedRef.current = isSigned;

    /**
     * 获得登陆信息
     * 不会自动调用起登陆
     */
    const getSignInfo = function (): IstateResult {
        var result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };
        if (userSignInfo.publicAddress === '' || userSignInfo.publicAddress !== walletData.currentAccount) {
            result.status = ResultStateus.USERUNSIGNED;
            return result;
        }

        //检查用户登陆是否过期
        if (Number(userSignInfo.expires_in) + Number(userSignInfo.loginDate) > +new Date()) {
            result.status = ResultStateus.USERSIGNED;
            result.data = userSignInfo;
            return result;
        } else {
            setIsSigned(false);
            result.status = ResultStateus.USERUNSIGNED;
            return result;
        }
    };

    /**
     * 获得登陆信息
     * 不会自动调用起登陆
     */
    const checkUserLogin = async function (): Promise<IstateResult> {
        var result: IstateResult = {
            status: ResultStateus.ERROR,
            data: {},
        };
        if (
            userSignInfoRef['current'].publicAddress === '' ||
            userSignInfoRef['current'].publicAddress !== walletData.currentAccount
        ) {
            return await login();
        }
        //检查用户登陆是否过期
        if (
            Number(userSignInfoRef['current'].expires_in) + Number(userSignInfoRef['current'].loginDate) >
            +new Date()
        ) {
            result.status = ResultStateus.USERSIGNED;
            result.data = userSignInfoRef['current'];
            return result;
        } else {
            return await login();
        }
    };

    /**
     * 登陆动作
     */
    const login = async function (): Promise<IstateResult> {
        if (typeof window['__Dk285_signPadding_'] === 'undefined') {
            window['__Dk285_signPadding_'] = false;
        }
        //如果有另一个程序在调用签名登陆
        if (window['__Dk285_signPadding_'] === false) {
            window['__Dk285_signPadding_'] = true;
            /**
             * 1.先去区块链上签名
             */
            var result: IstateResult = await operator.funcs.getSignForLogin();

            /**
             * 如果用户拒绝登陆
             */
            if (result.status !== ResultStateus.SUCCESSED) {
                return await new Promise(function (_res, _rej) {
                    setIsSigned(false);
                    window['__Dk285_signPadding_'] = false;
                    /**
                     * 如果因为各种原因导致没有登陆
                     * 一旦检测到登陆,就再次回调
                     */
                    var chkIslogin = function () {
                        if (isSignedRef['current']) {
                            result.status = ResultStateus.SUCCESSED;
                            result.data = userSignInfoRef['current'];
                            _res(result);
                        } else {
                            setTimeout(chkIslogin, 1000);
                        }
                    };
                    chkIslogin();
                    _res(result);
                });
            }

            /**
             * 2.然后去服务器上认证
             */
            var ajaxRes = await fetch({
                name: 'signin',
                urlPar: {
                    publicAddress: walletData.currentAccount,
                    signature: result.data.runningToken,
                    message: encodeURIComponent(result.data.message),
                },
            });

            var userSateInfo: IuserSateInfo = {
                publicAddress: walletData.currentAccount,
                signature: result.data.token,
                message: result.data.message,
                token: result.data.token,
                backEndToken: ajaxRes.tokenResult.access_token,
                expires_in: ajaxRes.tokenResult.expires_in,
                loginDate: (+new Date()).toString(),
            };

            result.status = ResultStateus.SUCCESSED;
            result.data = userSateInfo;

            setUserSignInfo(userSateInfo);
            setLoadTimes(loadTimes + 1);
            setLoadStemp(+new Date());
            setIsSigned(true);
            setTimeout(function () {
                window['__Dk285_signPadding_'] = false;
            }, 2000);
            return result;
        } else {
            /**
             * 如果有其它程序在签名登陆
             * 那当前程序就先等等,等占用
             * 签名登陆的那个程序完成后再进行操作
             */
            return await new Promise(function (_res, _rej) {
                setTimeout(async function () {
                    _res(await checkUserLogin());
                }, 500);
            });
        }
    };

    /**
     * 当钱包状态更改的时候,
     * 当发现当前本模块的登陆账号不为空
     * 但是和钱包模块的账号对不上,就签名
     * 当前如果没有签过任何名,就不强制签名
     */
    const checkDiffAccount = async function (): Promise<void> {
        /**
         * 如果账号被更改为空了,就自动退出登陆
         */
        if (walletData.currentAccount === '') {
            setUserSignInfo({
                publicAddress: '',
                signature: '',
                message: '',
                token: '',
                backEndToken: '',
                expires_in: '',
                loginDate: '',
            });
            setLoadTimes(loadTimes + 1);
            setLoadStemp(+new Date());
            setIsSigned(false);
            return;
        }

        /**
         * 如果检测到账号变更
         * 并且设置了强行签名
         * 并且检测到当前模块没有进行签名验证
         * 就去登陆
         */
        if (_forceSign && userSignInfo.publicAddress === '') {
            await checkUserLogin();
            return;
        }

        if (
            walletData.currentAccount !== '' &&
            userSignInfo.publicAddress !== '' &&
            walletData.currentAccount !== userSignInfo.publicAddress
        ) {
            await checkUserLogin();
        }
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

    useEffect(
        function (): void {
            if (isMounted === true && walletData.changeTimes !== 0) {
                checkDiffAccount();
            }
        },
        [isMounted, walletData.changeTimes]
    );

    return {
        data: {
            isMounted,
            userSignInfo,
            loadTimes,
            loadStemp,
            isSigned,
        },
        funcs: {
            getSignInfo,
            checkUserLogin,
            login,
        },
    };
};

export { useSign as default };
