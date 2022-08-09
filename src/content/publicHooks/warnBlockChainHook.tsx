/**
 * 页面区块链状态自动检测提示钩子
 * 廖力编写 2022/04/09
 */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import commonContext, { useCommonContext } from "./commonHook";
import useJquery, { jQueryObject } from "@bobliao/use-jquery-hook";
import useMmOperator from "./blockChanOperator/mmOperatorHook";
import { EwarnMtype, IstateResult, ResultStateus, warnReturn } from "./interfaces/iComon";
import { IcontractConfig } from "./interfaces/iMmOperator";
import walletContext, { useWalletContext } from "./walletHelperHook";
import useSign from "./signInHook";
import { EWarnIcons } from "../components/warn/index";
import ConnectSelect, { EccShowMode, TccFuncs } from "../components/connectSelect/index";

const useWarnBlockChain = function (
	/**
	 * 合约配置文件
	 */
	contractConfig: IcontractConfig,
	/**
	 * 配置
	 */
	config: any = {
		/**
		 * 检测钱包安装
		 */
		detactWalletInstall: true,
		/**
		 * 检测钱包初始化
		 */
		detactWalletInitlized: true,
		/**
		 * 检测钱包登陆
		 */
		detactWalletConnect: true,
		/**
		 * 检测网络异常
		 */
		detacWrongNetWork: true,
		/**
		 * 检测签名登陆
		 */
		detacSignLogin: false,
		/**
		 * 是否打開靜默提醒
		 */
		isSilentAlert: false,
	}
): void {
	const { walletData, walletFuncs } = useWalletContext();
	const operator = useMmOperator(contractConfig);
	const commonObj = useCommonContext();
	const { printWarn } = useCommonContext();
	const signTool = useSign();
	const $ = useJquery();

	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [wlData, setWlData] = useState<warnReturn>(null);
	const [wiData, setWiData] = useState<warnReturn>(null);
	const [wcData, setWcData] = useState<warnReturn>(null);
	const [wnData, setWnData] = useState<warnReturn>(null);
	const [slData, setSlData] = useState<warnReturn>(null);
	const [isShow, setIsShow] = useState<boolean>(true);
	const [isShowSilentButton, setIsShowSilentButton] = useState<boolean>(false);

	const silentButton = useRef<HTMLDivElement>(null);

	/**
	 * 显示钱包链接层
	 */
	const showWalletConnectLayer = async function (): Promise<void> {
		var _container = $("<div></div>").appendTo("body");
		var _ref = React.createRef<TccFuncs>();
		var _rEl = (
			<>
				{/**
				 * 将当前全局作用域下放
				 */}
				<commonContext.Provider value={commonObj}>
					<walletContext.Provider value={{ walletData, walletFuncs }}>
						<ConnectSelect mode={EccShowMode.WINDOW} ref={_ref} />
					</walletContext.Provider>
				</commonContext.Provider>
			</>
		);
		await new Promise<number>(function (_res: Function, _rej: Function) {
			ReactDOM.render(_rEl, _container[0], function () {
				_res();
			});
		});
		_ref.current.show(function (): void {});
	};

	/**
	 * 检测钱包是否安装
	 */
	const dWalletInstalled = function (): void {
		if (config.detactWalletInstall) {
			//如果钱包未安装
			if (walletData.isWalletInstalled === false) {
				if (isShow) {
					setIsShowSilentButton(false);
					(async function () {
						if (wlData !== null) {
							wlData.windowLay();
						}

						var res: warnReturn = printWarn({
							contentType: EwarnMtype.NOWALLET,
						});
						setWlData(res);
						var result: IstateResult = await res.promise;
						if (result.status === ResultStateus.YES) {
							showWalletConnectLayer();
						}
						if (result.status === ResultStateus.NO) {
							checkClose();
						}
					})();
				} else {
					setIsShowSilentButton(true);
				}
			} else {
				if (wlData !== null) {
					wlData.windowLay();
					setIsShowSilentButton(false);
				}
			}
		}
	};

	const dWalletUnInitlized = function (): void {
		if (config.detactWalletInitlized) {
			//如果钱包未安装
			if (walletData.isWalletUnInitlized === true) {
				if (isShow) {
					setIsShowSilentButton(false);
					(async function () {
						if (wiData !== null) {
							wiData.windowLay();
						}

						var res: warnReturn = printWarn({
							contentType: EwarnMtype.WALLETINITLIZE,
						});
						setWiData(res);
						var result: IstateResult = await res.promise;
						if (result.status === ResultStateus.YES) {
							window.location.reload();
						}
						if (result.status === ResultStateus.NO) {
							checkClose();
						}
					})();
				} else {
					setIsShowSilentButton(true);
				}
			} else {
				if (wiData !== null) {
					wiData.windowLay();
					setIsShowSilentButton(false);
				}
			}
		}
	};

	/**
	 * 检测是否链接了钱包
	 */
	const dWalletConnected = function (): void {
		if (config.detactWalletConnect) {
			//如果钱包未链接
			if (
				walletData.currentAccount === "" &&
				walletData.isWalletInstalled &&
				!walletData.isWalletUnInitlized
			) {
				if (isShow) {
					setIsShowSilentButton(false);
					(async function () {
						if (wcData !== null) {
							wcData.windowLay();
						}
						var res: warnReturn = printWarn({
							contentType: EwarnMtype.NOTCONNECTED,
						});
						setWcData(res);
						var result: IstateResult = await res.promise;
						if (result.status === ResultStateus.YES) {
							showWalletConnectLayer();
						}
						if (result.status === ResultStateus.NO) {
							checkClose();
						}
					})();
				} else {
					setIsShowSilentButton(true);
				}
			} else {
				if (wcData !== null) {
					wcData.windowLay();
					setIsShowSilentButton(false);
				}
			}
		}
	};

	/**
	 * 检测是否非法网络
	 */
	const dWrongNetWork = function (): void {
		if (config.detacWrongNetWork) {
			//如果钱包网络错误
			if (
				operator.data.isWrongNetWork &&
				walletData.isWalletInstalled &&
				!walletData.isWalletUnInitlized
			) {
				if (isShow) {
					setIsShowSilentButton(false);
					(async function () {
						if (wnData !== null) {
							wnData.windowLay();
						}
						var res: warnReturn = null;
						if (walletData.isTrustWallet) {
							res = printWarn({
								title: "您正在使用TrustWallet",
								content:
									"请前往您的TrustWallet添加网络:" +
									operator.data.currentConfig.info.depChainName +
									"(" +
									operator.data.currentConfig.info.depChainId +
									")",
								icon: EWarnIcons.ERROR,
								contentType: EwarnMtype.DIY,
							});
						} else {
							res = printWarn({
								contentType: EwarnMtype.WRONGNETWORK,
							});
						}

						setWnData(res);
						var result: IstateResult = await res.promise;
						if (result.status === ResultStateus.YES) {
							operator.funcs.switchCurrentNetWork();
						}
						if (result.status === ResultStateus.NO) {
							checkClose();
						}
					})();
				} else {
					setIsShowSilentButton(true);
				}
			} else {
				if (wnData !== null) {
					wnData.windowLay();
					setIsShowSilentButton(false);
				}
			}
		}
	};

	/**
	 * 检测是否签名登陆
	 */
	const dSignLogin = function (): void {
		if (config.detacSignLogin) {
			//如果没有登陆
			if (
				signTool.data.isSigned &&
				walletData.currentAccount !== "" &&
				walletData.isWalletInstalled &&
				!walletData.isWalletUnInitlized
			) {
				if (isShow) {
					setIsShowSilentButton(false);
					(async function () {
						if (slData !== null) {
							slData.windowLay();
						}
						var res: warnReturn = printWarn({
							contentType: EwarnMtype.NOTSIGND,
						});
						setSlData(res);
						var result: IstateResult = await res.promise;
						if (result.status === ResultStateus.YES) {
							signTool.funcs.checkUserLogin();
						}
						if (result.status === ResultStateus.NO) {
							checkClose();
						}
					})();
				} else {
					setIsShowSilentButton(true);
				}
			} else {
				if (slData !== null) {
					slData.windowLay();
					setIsShowSilentButton(false);
				}
			}
		}
	};

	/**
	 * 關閉時檢查是否開啟靜默提醒
	 */
	const checkClose = function () {
		if (isShowSilentButton && config.isSilentAlert) {
			setIsShow(false);
		}
	};

	/**
	 * 創造靜默提示圖標
	 */
	const chackSilentButton = async function (): Promise<void> {
		var createButton = async function (): Promise<void> {
			var _container = $("<div></div>").appendTo("body");
			var _rEl = (
				<>
					<div
						className="wallet-warn-silentButton wwsb-open-ani"
						ref={silentButton}
						onClick={function () {
							setIsShow(true);
						}}
					>
						i
					</div>
				</>
			);
			await new Promise<number>(function (_res: Function, _rej: Function) {
				ReactDOM.render(_rEl, _container[0], function () {
					_res();
				});
			});
			setTimeout(function () {
				$(silentButton.current).removeClass("wwsb-open-ani");
				$(silentButton.current).addClass("wwsb-side-ani");
			}, 2200);
		};

		if (isShowSilentButton && config.isSilentAlert) {
			if (silentButton.current !== null && $(silentButton.current).css("display") === "none") {
				$(silentButton.current).show();
			} else if (silentButton.current === null) {
				createButton();
			}
		} else {
			if (silentButton.current !== null && $(silentButton.current).css("display") !== "none") {
				$(silentButton.current).hide();
			}
		}
	};

	/**
	 * 如果没有登陆
	 */
	useEffect(
		function () {
			if (isMounted === true && operator.data.changeTimes !== 0) {
				dSignLogin();
			}
		},
		[operator.data.changeTimes, signTool.data.isSigned, isMounted]
	);

	/**
	 * 如果没有初始化
	 */
	useEffect(
		function () {
			if (isMounted === true && operator.data.changeTimes !== 0) {
				dWalletUnInitlized();
			}
		},
		[operator.data.changeTimes, walletData.isWalletUnInitlized, isMounted]
	);

	/**
	 * 如果钱包网络错误
	 */
	useEffect(
		function () {
			if (isMounted === true && operator.data.changeTimes !== 0) {
				dWrongNetWork();
			}
		},
		[operator.data.changeTimes, operator.data.isWrongNetWork, isMounted]
	);

	/**
	 * 如果钱包未链接
	 */
	useEffect(
		function () {
			if (isMounted === true && operator.data.changeTimes !== 0) {
				dWalletConnected();
			}
		},
		[operator.data.changeTimes, walletData.currentAccount, isMounted]
	);

	/**
	 * 如果钱包未安装
	 */
	useEffect(
		function () {
			if (isMounted === true && operator.data.changeTimes !== 0) {
				dWalletInstalled();
			}
		},
		[operator.data.changeTimes, walletData.isWalletInstalled, isMounted]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			chackSilentButton();
		},
		[isShowSilentButton]
	);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (config.isSilentAlert === true) {
				setIsShow(false);
			} else {
				setIsShow(true);
			}
		},
		[config.isSilentAlert]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		if (isMounted === false) {
			setIsMounted(true);
		}
		return function (): void {
			setIsMounted(false);
		};
	}, []);
};

export { useWarnBlockChain as default, useWarnBlockChain };
