import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { ReactElement } from "react";
import { useCommonContext } from "../../publicHooks/commonHook";
import useJquery, { jQueryObject } from "@bobliao/use-jquery-hook";
import { useWalletContext } from "../../publicHooks/walletHelperHook";
import SmartLay from "../smartLay";
/**
 * =============css=============
 */
import "./index.scss";
import { Popover } from "@mui/material";
import { useableFuncs } from "@bobliao/window-lay-react/src/iWindow";

/**
 * 如何展示链接选项
 */
export enum EccShowMode {
	/**
	 * 以窗口形式展示链接选项
	 */
	WINDOW = "window",
	/**
	 * 以下拉框的形式展示链接选项
	 */
	DROPDOWN = "dropdown",
}

/**
 * 参数
 */
export interface Iprops {
	/**
	 * 如何展示链接选项
	 */
	mode?: EccShowMode;
	/*
	 * 传入的子对象
	 */
	children?: any;
}

/**
 * 导出ref的接口
 */
export type TccFuncs = {
	/**
	 * 显示钱包链接层
	 */
	show: (_callback: Function) => void;
	/**
	 * 关闭钱包链接层
	 */
	hide: (_callback: Function) => void;
};

const ConnectSelect = forwardRef<TccFuncs, Iprops>(
	(
		{
			/**
			 * 显示窗口模式还是下拉框模式
			 */
			mode = EccShowMode.WINDOW,
			/**
			 * 传入的子对象
			 */
			children = null,
		},
		_ref
	): ReactElement => {
		const { walletData, walletFuncs } = useWalletContext();
		const { data, commonFuncs, alt, ask, print, popUp } = useCommonContext();
		const $ = useJquery();

		const [isMounted, setIsMounted] = useState<boolean>(false);
		const [menuAnchor, setMenuAnchor] = React.useState(null);

		const selectWindow = useRef<useableFuncs>(null);

		/**
		 * 断开链接
		 */
		const disconnect = function (): void {
			walletFuncs.disConnect();
		};

		/**
		 * 链接本地钱包
		 */
		const connectLocalWallet = function () {
			walletFuncs.triggerConnect();
		};

		/**
		 * 链接ConnectWallet
		 */
		const connectAsyncWallet = function () {
			walletFuncs.trigger_WalletConnect_connect();
		};

		//暴露方法给上级
		useImperativeHandle(_ref, () => ({
			hide(_callback = function () {}) {
				selectWindow.current.hide(_callback);
			},
			show(_callback = function () {}) {
				selectWindow.current.show(_callback);
			},
		}));

		useEffect(function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
			}
			return function (): void {
				setIsMounted(false);
			};
		}, []);

		return (
			<>
				<div
					onClick={function ({ currentTarget }) {
						if (mode === EccShowMode.WINDOW) {
							selectWindow.current.show(function () {});
						} else {
							setMenuAnchor($(currentTarget).children()[0]);
						}
					}}
				>
					{children}
				</div>
				{(function () {
					if (mode === EccShowMode.WINDOW) {
						return (
							<SmartLay title={"Connect to wallet"} ref={selectWindow}>
								<div
									className="rrt_connectSelect_window"
									onClick={function () {
										selectWindow.current.hide(
											function () {}
										);
									}}
								>
									{(function () {
										if (walletData.currentAccount === "") {
											return (
												<>
													<span
														onClick={
															connectLocalWallet
														}
													>
														{" "}
														{
															"Metamask / Current wallet"
														}{" "}
													</span>
													<label
														onClick={
															connectAsyncWallet
														}
													>
														{" "}
														{
															"WalletConnect"
														}{" "}
													</label>
												</>
											);
										} else {
											return (
												<>
													<span
														className="disConnect"
														onClick={
															disconnect
														}
													>
														{" "}
														{
															"Disconnect"
														}{" "}
													</span>
												</>
											);
										}
									})()}
								</div>
							</SmartLay>
						);
					} else {
						return (
							<Popover
								open={!!menuAnchor}
								anchorEl={menuAnchor}
								onClose={() => setMenuAnchor(null)}
								onClick={function () {
									setMenuAnchor(null);
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								className="kPopup_connSelect"
							>
								<div className="rrt_connectSelect">
									{(function () {
										if (walletData.currentAccount === "") {
											return (
												<>
													<div
														className="rrt_connectSelect_item localWallet"
														onClick={
															connectLocalWallet
														}
													>
														{
															"Metamask / Current wallet"
														}
													</div>
													<div
														className="rrt_connectSelect_item connectWallet"
														onClick={
															connectAsyncWallet
														}
													>
														{
															"WalletConnect"
														}
													</div>
												</>
											);
										} else {
											return (
												<>
													<div
														className="rrt_connectSelect_item disConnect"
														onClick={
															disconnect
														}
													>
														{
															"Disconnect"
														}
													</div>
												</>
											);
										}
									})()}
								</div>
							</Popover>
						);
					}
				})()}
			</>
		);
	}
);

export default ConnectSelect;
