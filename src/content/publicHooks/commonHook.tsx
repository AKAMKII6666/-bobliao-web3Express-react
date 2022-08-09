/**
 * 本文件为此项目公用函数模块
 * 包含context hook 和公用函数
 * 廖力编写 2022/03/24
 */
import { createContext, useState, useContext, useEffect, ReactElement } from "react";

import IcommonContext, {
	pointCoord,
	IstateResult,
	ResultStateus,
	IpClass,
	warnReturn,
	ImakeWarn,
	warnContentsItem,
	EwarnMtype,
	tPrint,
} from "./interfaces/iComon";
import React from "react";
import useJquery, { jQueryObject, isRunningInServer } from "@bobliao/use-jquery-hook";
import WindowLay from "@bobliao/window-lay-react";
import { useableFuncs } from "@bobliao/window-lay-react/src/iWindow";
import consoleLay from "@bobliao/consolelay";
import ReactDOM from "react-dom";
import Button, { Ebsize, Ebcolor } from "../components/button";
import { EWarnIcons, EwarnTypes } from "../components/warn/index";
import Warn from "../components/warn";
const _bigNumber = require("bignumber.js");

/**
 * 创建一个需要全局使用的context
 **/
const commonContext = createContext<IcommonContext>({
	/**
	 * 导出的数据
	 */
	data: {},
	/**
	 * 导出的函数
	 */
	commonFuncs: {},
	/**
	 * 弹出警告框
	 */
	alt: Function,
	/**
	 * 弹出询问框
	 */
	ask: Function,
	/**
	 * 打印
	 */
	print: Function,
	/**
	 * 弹出自定义打印框
	 */
	popUp: Function,
	/**
	 * 打印警告
	 */
	printAlt: Function,
	/**
	 * 打印询问
	 */
	printAsk: Function,
	/**
	 * 弹出各类警告
	 * 例如没安装钱包等
	 */
	warn: Function,
	/**
	 * 打印警告小气泡
	 */
	printWarn: Function,
});

/**
 * 项目整体的公共类
 */
const useCommon = function (RUNNING_ENV: string): IcommonContext {
	/**
	 * =================================钩子================================
	 */

	/**
	 * ==================================状态===============================
	 */
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [screenState, setScreenState] = useState<string>("h");

	/**
	 * ==================================静态变量===============================
	 */
	const $ = useJquery();

	/**
	 * 环境判断以及环境变量
	 */
	const envTag: string = RUNNING_ENV;

	/**
	 * =================================要导出的数据============================
	 */

	const data = {
		//是否已经挂载
		isMounted: isMounted,
		//当前运行环境
		envTag: envTag,
		//是否在服务端上运行
		isRunningInServer: isRunningInServer,
		//屏幕狀態
		screenState: screenState,
	};

	const setDataFuncs = {
		isMounted: setIsMounted,
	};

	/**
	 * ==================================函数==================================
	 */

	/**
	 * 弹出各类警告小气泡
	 */
	const printWarn: ImakeWarn = function ({
		/**
		 * 标题
		 */
		title = "",
		/**
		 * 内容
		 */
		content = "",
		/**
		 * 按钮内容
		 */
		buttonText = "",
		/**
		 * 显示图标
		 */
		icon = EWarnIcons.GLOBAL,
		/**
		 * 弹出消息类型
		 */
		contentType = EwarnMtype.NOWALLET,
		/**
		 * 持续时间
		 */
		time = "inf",
	}): warnReturn {
		/**
		 * 警告内容
		 */
		let warnContents: Array<warnContentsItem> = [
			{
				title: "Wallet installation not detected!",
				content: "Could make transactions once wallet has been installed.",
				icon: EWarnIcons.WALLET,
				buttonText: "Install wallet",
			},
			{
				title: "You have installed the blockchain wallet, but the wallet has not been initialized!",
				content: "You have completed the wallet installation, but the wallet may not be initialized for the current application. Please click the refresh button to try to initialize the wallet!",
				icon: EWarnIcons.WALLET,
				buttonText: "Refresh",
			},
			{
				title: "Wallet not connected!",
				content: "Could make transactions once wallet has been connected.",
				icon: EWarnIcons.LINK,
				buttonText: "Connect wallet",
			},
			{
				title: "Wrong network!",
				content: "The current network doesn't match the current APP need,please click 'Switch' button switch to the correct network.",
				icon: EWarnIcons.GLOBAL,
				buttonText: "Switch",
			},
			{
				title: "Need to be signed!",
				content: "Sign in to unlock more features.",
				icon: EWarnIcons.PERSION,
				buttonText: "Sign",
			},
		];

		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		let message: warnContentsItem = {
			title: title,
			content: content,
			buttonText: buttonText,
			icon: icon,
		};
		if (contentType !== EwarnMtype.DIY) {
			message = warnContents[contentType];
		}

		var container = $("<div></div>");
		var closeCall = function () {};
		var closePop = consoleLay.write({
			m: container,
			time: time,
			classAdd: IpClass.WHITE,
			closeCall: function () {
				closeCall();
			},
		});

		var promise = new Promise<IstateResult>(async function (_res, _rej) {
			var warnContent = (
				<>
					<Warn
						title={message.title}
						content={message.content}
						icon={message.icon}
						type={EwarnTypes.SMALL}
					>
						{(function () {
							if (message.buttonText !== "") {
								return (
									<Button
										color={Ebcolor.ORANGE}
										size={Ebsize.SMALL}
										onClick={function () {
											closePop();
											result.status =
												ResultStateus.YES;
											_res(result);
										}}
									>
										{message.buttonText}
									</Button>
								);
							} else {
								return null;
							}
						})()}
					</Warn>
				</>
			);
			await new Promise<number>(function (_res: Function, _rej: Function) {
				ReactDOM.render(warnContent, container[0], function () {
					_res();
				});
			});
			consoleLay.position();
			closeCall = function () {
				result.status = ResultStateus.NO;
				_res(result);
			};
		});
		return {
			promise: promise,
			windowLay: closePop,
		};
	};

	/**
	 * 弹出各类警告
	 */
	const warn: ImakeWarn = function ({
		/**
		 * 标题
		 */
		title = "",
		/**
		 * 内容
		 */
		content = "",
		/**
		 * 按钮内容
		 */
		buttonText = "",
		/**
		 * 显示图标
		 */
		icon = EWarnIcons.GLOBAL,
		/**
		 * 弹出消息类型
		 */
		contentType = EwarnMtype.NOWALLET,
	}): warnReturn {
		/**
		 * 警告内容
		 */
		let warnContents: Array<warnContentsItem> = [
			{
				title: "Wallet installation not detected!",
				content: "Could make transactions once wallet has been installed.",
				icon: EWarnIcons.WALLET,
				buttonText: "Install wallet",
			},
			{
				title: "You have installed the blockchain wallet, but the wallet has not been initialized!",
				content: "You have completed the wallet installation, but the wallet may not be initialized for the current application. Please click the refresh button to try to initialize the wallet!",
				icon: EWarnIcons.WALLET,
				buttonText: "Refresh",
			},
			{
				title: "Wallet not connected!",
				content: "Could make transactions once wallet has been connected.",
				icon: EWarnIcons.LINK,
				buttonText: "Connect wallet",
			},
			{
				title: "Wrong network!",
				content: "The current network doesn't match the current APP need,please click 'Switch' button switch to the correct network.",
				icon: EWarnIcons.GLOBAL,
				buttonText: "Switch",
			},
			{
				title: "Need to be signed!",
				content: "Sign in to unlock more features.",
				icon: EWarnIcons.PERSION,
				buttonText: "Sign",
			},
		];

		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		var altRef;
		let message: warnContentsItem = {
			title: title,
			content: content,
			buttonText: buttonText,
			icon: icon,
		};
		if (contentType !== EwarnMtype.DIY) {
			message = warnContents[contentType];
		}

		var promise: Promise<IstateResult> = new Promise<IstateResult>(async function (
			_res: Function,
			_rej: Function
		): Promise<void> {
			var _container = $("<div></div>");
			altRef = React.createRef<useableFuncs>();
			var _rEl = (
				<WindowLay
					title={title}
					ref={altRef}
					closeCall={function () {
						result.status = ResultStateus.NO;
						_res(result);
					}}
				>
					<>
						<Warn
							title={message.title}
							content={message.content}
							icon={message.icon}
							type={EwarnTypes.LARGE}
						>
							<Button
								color={Ebcolor.ORANGE}
								size={Ebsize.MID}
								onClick={function () {
									altRef.current.hide();
									result.status = ResultStateus.YES;
									_res(result);
								}}
							>
								{(function () {
									if (message.buttonText !== "") {
										return message.buttonText;
									}
									return null;
								})()}
							</Button>
						</Warn>
					</>
				</WindowLay>
			);

			await new Promise<number>(function (_res: Function, _rej: Function) {
				ReactDOM.render(_rEl, _container[0], function () {
					_res();
				});
			});

			altRef.current.show(function (): void {});
		});

		var r: warnReturn = {
			promise: promise,
			windowLay: altRef,
		};

		return r;
	};

	/**
	 * 獲得當前屏幕的狀態
	 */
	const getScreenState = function (): string {
		if (!isRunningInServer) {
			var isMobile: boolean;
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			) {
				isMobile = true;
			}
			var _screenState: string = "h";
			if (isMobile) {
				if (window.orientation === 180 || window.orientation === 0) {
					//竖屏
					_screenState = "v";
				}
				//横屏
				if (window.orientation === 90 || window.orientation === -90) {
					_screenState = "h";
				}
			}
			return _screenState;
		} else {
			return "h";
		}
	};

	//弹出小提示
	//返回关闭函数
	const print = function (message: string | tPrint): Function {
		//返回关闭函数
		return consoleLay.write(message);
	};

	//弹出React控件小提示
	//返回关闭函数
	const popUp = async function (
		elements: ReactElement,
		time: number | string = "inf",
		classAdd: IpClass = IpClass.WHITE,
		closeCall: Function = function () {}
	): Promise<Function> {
		var container = $("<div></div>");
		await new Promise<number>(function (_res: Function, _rej: Function) {
			ReactDOM.render(elements, container[0], function () {
				_res();
			});
		});
		return consoleLay.write({
			m: container,
			time: time,
			classAdd: classAdd,
			closeCall: closeCall,
		});
	};

	/**
	 * 弹出气泡警告
	 */
	const printAlt = function (
		message: ReactElement | string,
		title: ReactElement | string = "",
		time: number | string = "inf",
		callBack = function (): void {}
	): any {
		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		var closePop: Function = function () {};
		var promise = new Promise<IstateResult>(async function (_res, _rej) {
			closePop = await popUp(
				<>
					<div className="rrt-printAlt">
						{(function () {
							if (title !== "") {
								return <div className="title">{title}</div>;
							}
							return null;
						})()}
						<div className="content">{message}</div>
						<div className="buttonContainer">
							<Button
								size={Ebsize.MID}
								color={Ebcolor.ORANGE}
								onClick={function () {
									result.status = ResultStateus.YES;
									_res(result);
									callBack();
									closePop();
								}}
							>
								{"確認"}
							</Button>
						</div>
					</div>
				</>,
				time,
				IpClass.WHITE,
				function () {
					result.status = ResultStateus.NO;
					_res(result);
				}
			);
		});

		return {
			promise: promise,
			close: closePop,
		};
	};

	/**
	 * 弹出气泡询问
	 */
	const printAsk = function (
		/**
		 * 消息
		 */
		message: ReactElement | string,
		/**
		 * 标题
		 */
		title: ReactElement | string = "",
		/**
		 * 持续时间
		 */
		time: number | string = "inf",
		/**
		 * 点击确定的回调函数
		 */
		yesCall = function (): void {},
		/**
		 * 点击取消的回调函数
		 */
		noCall = function (): void {}
	): any {
		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		var closePop: Function = function () {};
		var promise = new Promise<IstateResult>(async function (_res, _rej) {
			closePop = await popUp(
				<>
					<div className="rrt-printAlt">
						{(function () {
							if (title !== "") {
								return <div className="title">{title}</div>;
							}
							return null;
						})()}
						<div className="content">{message}</div>
						<div className="buttonContainer">
							<Button
								size={Ebsize.MID}
								color={Ebcolor.ORANGE}
								onClick={function () {
									result.status = ResultStateus.YES;
									_res(result);
									yesCall();
									closePop();
								}}
							>
								{"確認"}
							</Button>
							<Button
								size={Ebsize.MID}
								color={Ebcolor.WHITE}
								onClick={function () {
									result.status = ResultStateus.NO;
									_res(result);
									noCall();
									closePop();
								}}
							>
								{"取消"}
							</Button>
						</div>
					</div>
				</>,
				time,
				IpClass.WHITE,
				function () {
					result.status = ResultStateus.NO;
					_res(result);
				}
			);
		});

		return {
			promise: promise,
			close: closePop,
		};
	};

	//弹出框函数
	const alt = function ({ title = "", message = "", callBack = function (): void {} }): any {
		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		var altRef;
		var promise = new Promise<number>(async function (_res: Function, _rej: Function): Promise<void> {
			var _container = $("<div></div>");
			altRef = React.createRef<useableFuncs>();
			var _rEl = (
				<WindowLay
					title={title}
					ref={altRef}
					buttons={{
						mode: "yes",
						yesCall: function (): void {
							result.status = ResultStateus.YES;
							_res(result);
							callBack();
						},
					}}
					closeCall={function () {
						result.status = ResultStateus.NO;
						_res(result);
						callBack();
					}}
				>
					<>
						<div>{message}</div>
					</>
				</WindowLay>
			);

			await new Promise<number>(function (_res: Function, _rej: Function) {
				ReactDOM.render(_rEl, _container[0], function () {
					_res();
				});
			});

			altRef.current.show(function (): void {});
		});

		return {
			promise: promise,
			window: altRef,
		};
	};

	//询问窗口
	const ask = function ({
		title = "",
		message = "",
		yesCall = function (): void {},
		noCall = function (): void {},
	}): any {
		let result: IstateResult = {
			status: ResultStateus.ERROR,
			data: {},
		};
		var askRef;
		var promise = new Promise<number>(async function (_res: Function, _rej: Function): Promise<void> {
			var _container = $("<div></div>");
			askRef = React.createRef<useableFuncs>();
			var _rEl = (
				<WindowLay
					title={title}
					ref={askRef}
					buttons={{
						mode: "yesno",
						yesCall: function (): void {
							result.status = ResultStateus.YES;
							_res(result);
							yesCall();
						},
						noCall: function (): void {
							result.status = ResultStateus.NO;
							_res(result);
							noCall();
						},
					}}
					closeCall={function (): void {
						result.status = ResultStateus.NO;
						_res(result);
						noCall();
					}}
				>
					<>
						<div>{message}</div>
					</>
				</WindowLay>
			);

			await new Promise<number>(function (_res: Function, _rej: Function) {
				ReactDOM.render(_rEl, _container[0], function () {
					_res();
				});
			});

			askRef.current.show(function (): void {});
		});
		return {
			promise: promise,
			window: askRef,
		};
	};

	//设置数据
	const setData = function (_data: object): void {
		for (var i in _data) {
			setDataFuncs[i](_data[i]);
		}
	};

	//找到最近的scrollTop不为0的节点
	const findScrollNode = function (_parent: any) {
		_parent = $(_parent);
		if (_parent.css("overflow-y") === "auto") {
			return _parent;
		} else {
			if (_parent[0].tagName === "BODY") {
				return _parent;
			}
			return findScrollNode(_parent.parent());
		}
	};

	//设置cookie
	const setCookie = function (name: string, value: string, time: string | number): void {
		var Days = 365;
		var exp = new Date();
		if (typeof time === "undefined") {
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		} else {
			exp.setTime(exp.getTime() + Number(time));
		}
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
	};

	/**
	 * 删除cookie
	 */
	const delCookie = function (name: string): void {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
	};

	//获取cookie
	const getCookie = function (name: string): void | string {
		var arr: Array<string>,
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
	};

	/**根据两个坐标点 获取角度*/
	const getAngle = function (pt1: pointCoord, pt2: pointCoord): number {
		var radian = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x); // 返回来的是弧度
		var angle = (180 / Math.PI) * radian; // 根据弧度计算角度
		return angle;
	};

	/**
	 * 獲得進程動畫的百分比
	 */
	const getAniPrecent = function (_startTop: number, _endTop: number, _elementTop: number): number {
		if (_startTop < _elementTop) {
			return 0;
		}

		if (_endTop > _elementTop) {
			return 100;
		}

		var totalProgress = _startTop - _endTop;
		var currentProgress = _elementTop - _endTop;
		return 100 - (currentProgress / totalProgress) * 100;
	};

	/**
	 * 通過百分比和初始值和最終值，獲得動畫的當前進程
	 */
	const computAniProgress = function (_startValue: number, _endValue: number, _currentPrecent: number): number {
		if (_currentPrecent <= 0) {
			return _startValue;
		}

		if (_currentPrecent >= 100) {
			return _endValue;
		}
		var totalProgress = _endValue - _startValue;
		var currentValue = _startValue + (totalProgress / 100) * _currentPrecent;
		return currentValue;
	};

	/**
	 * 当textArea更改的时候改变高度[react]
	 */
	const changeTextArea = function (_e: any): void {
		var _this = $(_e.currentTarget);
		if (_this.val() === "") {
			_this.css("height", "");
			$(_e.currentTarget).removeClass("whenFocus");
			return;
		}
		_this.css("transition", "unset");
		_this.css("height", "");

		if (_this[0].scrollHeight > _this.outerHeight()) {
			var sc = _this[0].scrollHeight;
			if (_this[0].scrollHeight > 380) {
				sc = 380;
			}
			_this.height(sc);
		} else {
			_this.css("height", "");
		}

		setTimeout(function () {
			_this.css("transition", "");
		}, 500);
	};

	//获得两点之间的距离
	const getLength = function (p1: pointCoord, p2: pointCoord): number {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	};
	//获得一个随机数
	const getRand = function (Max: number, Min: number): number {
		var Range = Max - Min;
		var Rand = Math.random();
		if (Math.round(Rand * Range) == 0) {
			return Min + 1;
		}
		var num = Min + Math.round(Rand * Range);
		return num;
	};
	//千分位分割
	const thousandsSplit = function (num: number): string {
		if (isRunningInServer) {
			return num.toString();
		}
		var numStr = $.trim(num.toString()).split(".")[0].split("");
		var output = "";

		var j = 0;
		for (var i = numStr.length - 1; i > -1; i--) {
			if (j % 3 == 0 && j != 0) {
				output = numStr[i] + "," + output;
			} else {
				output = numStr[i] + output;
			}
			j++;
		}
		if (num.toString().split(".")[1]) {
			output += "." + num.toString().split(".")[1];
		}
		return output;
	};

	//通过语言信息获得单位换算
	const getUnitNumber = function (_num: number, _lan: string, _fix: number): string {
		if (typeof _lan === "undefined") {
			_lan = "en";
		}

		if (typeof _fix === "undefined") {
			_fix = 0;
		}

		var result: string = _num.toString();

		switch (_lan) {
			case "en":
				result = translateNumberT(_num, _fix);
				break;
			case "ja":
				result = translateNumberF(_num, _fix);
				break;
			case "ko":
				result = translateNumberK(_num, _fix);
				break;
			case "zh":
				result = translateNumberF(_num, _fix);
				break;
			case "ru":
				result = translateNumberT(_num, _fix);
				break;
		}

		return result;
	};

	//韩文
	const translateNumberK = function (_num: number, _fix: number): string {
		if (typeof _fix === "undefined") {
			_fix = 0;
		}
		var num = new _bigNumber(_num).toFixed().split(".");
		var nIARR = num[0].split("");
		var nFARR = [];
		if (typeof num[1] !== "undefined") {
			nFARR = num[1].split("");
		}

		/**
		 * 万 = 10000
		 * 亿 = 100000000
		 * 兆 = 1000000000000
		 */

		//兆 = 1000000000000
		if (nIARR.length >= 13) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(12).toFixed())
				.toFixed(_fix, 1);
			return num + "조";
		}

		//亿 = 100000000
		if (nIARR.length >= 9) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(8).toFixed())
				.toFixed(_fix, 1);
			return num + "억";
		}

		//万 = 10000
		if (nIARR.length >= 5) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(4).toFixed())
				.toFixed(_fix, 1);
			return num + "만";
		}

		return new _bigNumber(_num).toFixed(_fix);
	};

	//中文
	const translateNumberF = function (_num: number, _fix: number): string {
		if (typeof _fix === "undefined") {
			_fix = 0;
		}
		var num = new _bigNumber(_num).toFixed().split(".");
		var nIARR = num[0].split("");
		var nFARR = [];
		if (typeof num[1] !== "undefined") {
			nFARR = num[1].split("");
		}

		/**
		 * 百 = 100
		 * 千 = 1000
		 * 万 = 10000
		 * 百万 = 1000000
		 * 千万 = 10000000
		 * 亿 = 100000000
		 * 兆 = 1000000000000
		 */

		//兆 = 1000000000000
		if (nIARR.length >= 13) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(12).toFixed())
				.toFixed(_fix, 1);
			return num + "兆";
		}

		//亿 = 100000000
		if (nIARR.length >= 9) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(8).toFixed())
				.toFixed(_fix, 1);
			return num + "亿";
		}

		//千万 = 10000000
		if (nIARR.length >= 8) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(7).toFixed())
				.toFixed(_fix, 1);
			return num + "千萬";
		}

		//百万 = 1000000
		if (nIARR.length >= 7) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(6).toFixed())
				.toFixed(_fix, 1);
			return num + "百萬";
		}

		//万 = 10000
		if (nIARR.length >= 5) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(4).toFixed())
				.toFixed(_fix, 1);
			return num + "萬";
		}

		return new _bigNumber(_num).toFixed(_fix);
	};

	//换算单位英文
	const translateNumberT = function (_num: number, _fix: number): string {
		if (typeof _fix === "undefined") {
			_fix = 0;
		}
		var num = new _bigNumber(_num).toFixed().split(".");
		var nIARR = num[0].split("");
		var nFARR = [];
		if (typeof num[1] !== "undefined") {
			nFARR = num[1].split("");
		}

		/**
		 * k = 1000
		 * m = 10000000
		 * b = 1000000000
		 * t = 10000000000
		 */

		//t = 10000000000
		if (nIARR.length >= 11) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(10).toFixed())
				.toFixed(_fix, 1);
			return num + "T";
		}

		//b = 1000000000
		if (nIARR.length >= 10) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(9).toFixed())
				.toFixed(_fix, 1);
			return num + "B";
		}

		//m = 1000000
		if (nIARR.length >= 7) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(6).toFixed())
				.toFixed(_fix, 1);
			return num + "M";
		}

		//k = 1000
		if (nIARR.length >= 4) {
			var num = new _bigNumber(_num)
				.dividedBy(new _bigNumber(10).exponentiatedBy(3).toFixed())
				.toFixed(_fix, 1);
			return num + "K";
		}
		return new _bigNumber(_num).toFixed(_fix);
	};

	/**
	 * 提取url参数
	 */
	const getUrlParams = function (): object {
		var url = location.href;
		var pstart = url.indexOf("?");
		var params: object = {};
		if (pstart > -1) {
			url = url.substring(pstart + 1);
			pstart = url.indexOf("#");
			if (pstart > -1) {
				url = url.substring(0, pstart);
			}
			var ps = url.split("&");
			if (ps.length > 0) {
				for (var i = 0; i < ps.length; i++) {
					var p = ps[i];
					var kv = p.split("=");
					if (kv.length == 2) {
						params[kv[0]] = kv[1];
					}
					if (kv.length == 3) {
						var kkk = kv[1].split("?");
						if (kkk.length == 2) {
							params[kv[0]] = kkk[0];
							params[kkk[1]] = kv[2];
						}
					}
				}
			}
		}
		return params;
	};

	/**判断是否为数字 */
	const isNumber = function (_str: string | number): boolean {
		if (isNaN(Number(_str))) {
			if (_str !== "." && _str !== "Backspace") {
				return false;
			}
		}
		return true;
	};

	/**
	 *设置url参数
	 */
	const setUrlParam = function (_key: string, _val: string): void {
		//先获取所有的参数
		var params = getUrlParams();
		//再写入要写入的参数
		params[_key] = _val;
		//注入到当前url中
		var path = window.location.pathname;
		var paramsStr = "?";
		var k = 0;
		for (var i in params) {
			if (i === "_") {
				continue;
			}
			if (k != 0) {
				paramsStr += "&";
			}
			paramsStr += i + "=" + params[i];
			k++;
		}
		window.location.href = path + "#/" + paramsStr;
	};

	//去重算法
	const removeDuplicate = function (array: Array<any>, callBack: Function): Array<any> {
		if (typeof callBack === "undefined") {
			callBack = function (a, b) {
				return JSON.stringify(a) !== JSON.stringify(b);
			};
		}
		var array = array;
		//再去重
		var j = 0;
		for (var k = 0; k < 99999999; k++) {
			var tempArr: Array<any> = [];
			for (var i = 0; i < array.length; i++) {
				if (i === j) {
					tempArr.push(array[j]);
					continue;
				}
				if (callBack(array[i], array[j])) {
					tempArr.push(array[i]);
				}
			}
			array = tempArr;
			if (!array[j + 1]) {
				break;
			}
			j++;
		}
		return array;
	};
	//获得一个gui ID
	const newGuid = function (): string {
		var guid: string = "";
		for (var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 32.0).toString(32);
			guid += n;
		}
		return guid;
	};

	/**
	 * 格式化时间
	 */
	const formatDate = function (date: Date, format: string): string {
		date = date || new Date();
		format = format || "yyyy-MM-dd HH:mm:ss";
		var result = format
			.replace("yyyy", date.getFullYear().toString())
			.replace("yy", date.getFullYear().toString().substring(2, 4))
			.replace("MM", (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1).toString())
			.replace("dd", (date.getDate() < 10 ? "0" : "") + date.getDate().toString())
			.replace("HH", (date.getHours() < 10 ? "0" : "") + date.getHours().toString())
			.replace("mm", (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString())
			.replace("ss", (date.getSeconds() < 10 ? "0" : "") + date.getSeconds().toString());

		return result;
	};

	//获得当前是周几
	const getDayOfWeek = function (_date: Date | string): string {
		var weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
		var myDate = new Date(_date);
		return weekDay[myDate.getDay()];
	};

	//获得一天每个时间段的文字描述
	const getTimeOfDay = function (_date: Date): string {
		var hour = formatDate(_date, "HH");
		if (
			hour === "00" ||
			hour === "01" ||
			hour === "02" ||
			hour === "03" ||
			hour === "04" ||
			hour === "05"
		) {
			return "凌晨";
		}
		if (hour === "06" || hour === "07" || hour === "08") {
			return "早上";
		}
		if (hour === "09" || hour === "10" || hour === "11") {
			return "上午";
		}
		if (hour === "11" || hour === "12" || hour === "13") {
			return "中午";
		}
		if (hour === "14" || hour === "15" || hour === "16" || hour === "17" || hour === "18") {
			return "下午";
		}
		if (hour === "19" || hour === "20" || hour === "21" || hour === "22" || hour === "23") {
			return "晚上";
		}
		return "";
	};

	//获得一天中时间的的色彩
	const getColorOfDay = function (_value: string): string {
		var color = "";
		if (_value === "凌晨") {
			color = "#2b1d83";
		}
		if (_value === "早上") {
			color = "#1d7c83";
		}
		if (_value === "上午") {
			color = "#1a9426";
		}
		if (_value === "中午") {
			color = "#bec513";
		}
		if (_value === "下午") {
			color = "#9e791a";
		}
		if (_value === "晚上") {
			color = "#6b1717";
		}
		return color;
	};

	//增加天数
	const dateAddDays = function (dateStr: string, dayCount: number): Date {
		var tempDate = +new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
		var resultDate = new Date((tempDate / 1000 + 86400 * dayCount) * 1000); //增加n天后的日期
		return resultDate;
	};

	//减去天数
	const dateMDays = function (dateStr: string, dayCount: number): Date {
		var tempDate = +new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
		var resultDate = new Date((tempDate / 1000 - 86400 * dayCount) * 1000); //减去n天后的日期
		return resultDate;
	};

	//增加小时
	const dateAddHours = function (dateStr: string, HCount: number): Date {
		var tempDate = +new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
		var resultDate = new Date(tempDate + 1000 * 60 * 60 * HCount); //增加n小时的日期
		return resultDate;
	};

	//减去小时
	const dateMHours = function (dateStr: string, HCount: number): Date {
		var tempDate = +new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
		var resultDate = new Date(tempDate - 1000 * 60 * 60 * HCount); //减去n小时的日期
		return resultDate;
	};

	//判断是否为json对象
	const isJsonObject = function (_data: any): boolean {
		if (
			typeof _data == "object" &&
			Object.prototype.toString.call(_data).toLowerCase() == "[object object]" &&
			!_data.length
		) {
			return true;
		}
		return false;
	};

	//换算区块链的数字单位
	const shiftNumber = function (_number: string | number, _shiftLength: number): string {
		return new _bigNumber(_number)
			.dividedBy(new _bigNumber(10).exponentiatedBy(_shiftLength).toFixed())
			.toFixed();
	};

	/**
	 * ==================================要导出的函数============================
	 */
	const commonFuncs = {
		//设置数据
		setData: setData,
		//找到最近的scrollTop不为0的节点
		findScrollNode: findScrollNode,
		//设置cookie
		setCookie: setCookie,
		//删除cookie
		delCookie: delCookie,
		//获取cookie
		getCookie: getCookie,
		//根据两个坐标点 获取角度
		getAngle: getAngle,
		//当textArea更改的时候改变高度[react]
		changeTextArea: changeTextArea,
		//获得两点之间的距离
		getLength: getLength,
		//获得一个随机数
		getRand: getRand,
		//千分位分割
		thousandsSplit: thousandsSplit,
		//通过语言信息获得单位换算
		getUnitNumber: getUnitNumber,
		//提取url参数
		getUrlParams: getUrlParams,
		//判断是否为数字
		isNumber: isNumber,
		//设置url参数
		setUrlParam: setUrlParam,
		//去重算法
		removeDuplicate: removeDuplicate,
		//获得一个gui ID
		newGuid: newGuid,
		//格式化时间
		formatDate: formatDate,
		//获得当前是周几
		getDayOfWeek: getDayOfWeek,
		//获得一天每个时间段的文字描述
		getTimeOfDay: getTimeOfDay,
		//获得一天中时间的的色彩
		getColorOfDay: getColorOfDay,
		//增加天数
		dateAddDays: dateAddDays,
		//减去天数
		dateMDays: dateMDays,
		//增加小时
		dateAddHours: dateAddHours,
		//减去小时
		dateMHours: dateMHours,
		//判断是否为json对象
		isJsonObject: isJsonObject,
		//换算区块链的数字单位
		shiftNumber: shiftNumber,
		/**
		 * 獲得進程動畫的百分比
		 */
		getAniPrecent: getAniPrecent,
		/**
		 * 通過百分比和初始值和最終值，獲得動畫的當前進程
		 */
		computAniProgress: computAniProgress,
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

	useEffect(function (): ReturnType<React.EffectCallback> {
		setScreenState(getScreenState());
	});

	return {
		/**
		 * 导出的数据
		 */
		data: data,
		/**
		 * 导出的函数
		 */
		commonFuncs: { ...commonFuncs },
		/**
		 * 弹出警告框
		 */
		alt,
		/**
		 * 弹出询问框
		 */
		ask,
		/**
		 * 打印
		 */
		print,
		/**
		 * 弹出自定义打印框
		 */
		popUp,
		/**
		 * 打印警告
		 */
		printAlt,
		/**
		 * 打印询问
		 */
		printAsk,
		/**
		 * 弹出警告窗口
		 */
		warn,
		/***
		 * 弹出警告小气泡
		 */
		printWarn,
	};
};

export interface IuseCommonContext {
	(): IcommonContext;
}

let useCommonContext: IuseCommonContext = function (): IcommonContext {
	var r: IcommonContext = useContext(commonContext);
	return r;
};

export {
	//common本体
	commonContext as default,
	commonContext,
	//创建context的函数
	useCommon,
	//在子组件中,获取context的钩子函数
	useCommonContext,
};
