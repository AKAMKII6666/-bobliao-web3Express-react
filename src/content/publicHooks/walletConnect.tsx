/**
 * 廖力编写
 * 2022/04/29
 * 远程钱包链接钩子
 * WalletConnectHook
 */
import { useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";
import { IstateResult, ResultStateus } from "./interfaces/iComon";
const _web3Contract = require("web3-eth-contract");
const _web3 = require("web3");
import _wcConfig1 from "./walletConnect.config.json";
var _wcConfig = _wcConfig1;

import fs from "fs";
try {
	const _wcConfig2 = fs.readFileSync("../../../walletConnect.config.json", "utf8");

	if (_wcConfig2 !== "undefined") {
		_wcConfig = _wcConfig2;
	}
} catch (_e) {}
try {
	const _wcConfig3 = fs.readFileSync("../../../src/walletConnect.config.json", "utf8");
	if (_wcConfig3 !== "undefined") {
		_wcConfig = _wcConfig3;
	}
} catch (_e) {}

/**
 * 远程钱包链接的导出内容
 */
export interface IuseWalletConnect {
	/**
	 * 导出的函数
	 */
	funcs: IuseWalletConnectFuncs;
	/**
	 * 导出的数据
	 */
	data: {
		isMounted: boolean;
		/**
		 * 链接的账号
		 */
		currentAccount: string;
		/**
		 * 展示用的钱包地址
		 */
		currentDisplayAccount: string;
		/**
		 * 是否为错误的链
		 */
		isWrongNetWork: boolean;
		/**
		 * 当前链接的网络
		 */
		currentNetWork: string;
		/**
		 * 钱包更改时间戳
		 */
		changeStemp: number;
		/**
		 * 钱包更改次数
		 */
		changeTimes: number;
		/**
		 * provider
		 */
		provider: any;
		/**
		 * web3
		 */
		web3Operator: any;
		/**
		 * 当前walletConnect使用的配置
		 */
		currentConfig: any;
	};
}

/**
 * 导出的方法
 */
export interface IuseWalletConnectFuncs {
	/**
	 * 触发远程钱包链接
	 */
	triggerConnect: () => Promise<IstateResult>;
	/**
	 * 断开远程钱包链接
	 */
	unbindAllEvents: () => void;
}

const useWalletConnect = function (RUNNING_ENV: string): IuseWalletConnect {
	const $ = useJquery();

	const [isMounted, setIsMounted] = useState<boolean>(false);
	//链接的账号
	const [currentAccount, setCurrentAccount] = useState<string>("");
	//展示用的钱包地址
	const [currentDisplayAccount, setCurrentDisplayAccount] = useState<string>("");
	//是否为错误的链
	const [isWrongNetWork, setIsWrongNetWork] = useState<boolean>(false);
	//当前链接的网络
	const [currentNetWork, setCurrentNetWork] = useState<string>("");
	//钱包更改时间戳
	const [changeStemp, setChangeStemp] = useState<number>(+new Date());
	//钱包更改次数
	const [changeTimes, setChangeTimes] = useState<number>(0);
	//provider
	const [provider, setProvider] = useState<any>(null);
	//web3
	const [web3Operator, setWeb3Operator] = useState<any>(null);
	//目标配置
	const currentConfig = _wcConfig[RUNNING_ENV];

	//退出登陆的信号
	const [dissconnectSignal, setDissconnectSignal] = useState<number>();

	/**
	 * 触发远程钱包链接
	 */
	const triggerConnect = async function (): Promise<IstateResult> {
		//  载入相应的provider
		const _provider = new WalletConnectProvider(currentConfig);
		if (!isRunningInServer) {
			window["_wc_eth_prvider"] = _provider;
			window["_wc_web3Contract"] = _web3Contract;
			window["_wc_web3"] = new _web3(_provider);
		}
		try {
			//  Enable session (triggers QR Code modal)
			var res: any = await _provider.enable();
		} catch (_e) {
			return {
				status: ResultStateus.ERROR,
				data: {},
			};
		}
		if (!isRunningInServer) {
			_web3Contract.setProvider(_provider);

			//获取账号
			var accounts: Array<string> = await window["_wc_web3"].eth.getAccounts();
			//获取当前的chainId
			var chainId: string | number = await window["_wc_web3"].eth.getChainId();

			//绑定事件
			// 当账号更改的时候
			_provider.on("accountsChanged", (accounts: string[]) => {
				setCurrentAccount(accounts[0]);
				//变更状态
				setChangeStemp(+new Date());
				//变更次数
				setChangeTimes(changeTimes + 1);
			});

			//链更改的时候
			_provider.on("chainChanged", (chainId: number) => {
				//测试是否为错误的网络
				testNetWork(Number(chainId).toString(), currentConfig.chainId.toString());
				setCurrentNetWork(Number(chainId).toString());
				//变更状态
				setChangeStemp(+new Date());
				//变更次数
				setChangeTimes(changeTimes + 1);
			});

			// 断开链接的时候
			_provider.on("disconnect", (code: number, reason: string) => {
				setDissconnectSignal(+new Date());
			});

			//保存provider
			setProvider(_provider);
			//保存web3
			setWeb3Operator(window["_wc_web3"]);
			//设置当前的账号信息
			setCurrentAccount(accounts[0]);
			testNetWork(Number(chainId).toString(), currentConfig.chainId.toString());
			//设置当前的网络信息
			setCurrentNetWork(Number(chainId).toString());
			//变更状态
			setChangeStemp(+new Date());
			//变更次数
			setChangeTimes(changeTimes + 1);

			return {
				status: ResultStateus.SUCCESSED,
				data: {},
			};
		}
	};

	//是否为错误的链
	const testNetWork = function (_currentNetWork: string, _targetNetWork: string) {
		if (_currentNetWork === _targetNetWork) {
			setIsWrongNetWork(false);
		} else {
			setIsWrongNetWork(true);
		}
	};

	//注销远程钱包链接
	const unbindAllEvents = async function (isFromDisCon: boolean = false): Promise<void> {
		if (provider !== null) {
			provider.removeAllListeners();
			if (!isFromDisCon) {
				await provider.disconnect();
			}
			//清空provider
			setProvider(null);
			//清空web3
			setWeb3Operator(null);
			//清空账号信息
			setCurrentAccount("");
			//清空网络信息
			setCurrentNetWork("");
			//变更状态
			setChangeStemp(+new Date());
			//变更次数
			setChangeTimes(changeTimes + 1);
		}
	};

	useEffect(function () {
		if (isMounted === false) {
			setIsMounted(true);
		}
		return function () {
			setIsMounted(false);
			unbindAllEvents();
		};
	}, []);

	/**
	 * 当账号变更的时候
	 */
	useEffect(
		function (): void {
			if (currentAccount !== "") {
				setCurrentDisplayAccount(
					currentAccount.substring(0, 5) + "..." + currentAccount.substring(38, 42)
				);
			}
		},
		[currentAccount]
	);

	/**
	 * 退出登陆
	 */
	useEffect(
		function () {
			if (currentAccount !== "") {
				unbindAllEvents(true);
			}
		},
		[dissconnectSignal]
	);

	/**
	 * 要导出的内容
	 */
	const exportContents: IuseWalletConnect = {
		funcs: {
			triggerConnect: triggerConnect,
			unbindAllEvents: unbindAllEvents,
		},
		data: {
			isMounted: isMounted,
			/**
			 * 链接的账号
			 */
			currentAccount: currentAccount,
			/**
			 * 展示用的钱包地址
			 */
			currentDisplayAccount: currentDisplayAccount,
			/**
			 * 是否为错误的链
			 */
			isWrongNetWork: isWrongNetWork,
			/**
			 * 当前链接的网络
			 */
			currentNetWork: currentNetWork,
			/**
			 * 钱包更改时间戳
			 */
			changeStemp: changeStemp,
			/**
			 * 钱包更改次数
			 */
			changeTimes: changeTimes,
			/**
			 * provider
			 */
			provider: provider,
			/**
			 * web3
			 */
			web3Operator: web3Operator,
			/**
			 * 当前walletConnect使用的配置
			 */
			currentConfig: currentConfig,
		},
	};

	return exportContents;
};

export default useWalletConnect;
