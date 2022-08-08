/*** examples/src/app.js ***/
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Web3ReactExpress from "../../lib/index"; // 引入组件
import ExcOne from "./excOne";

const App = () => {
	const {
		walletHelperHook,
		warnBlockChainHook,
		signInHook,
		commonHook,
		mmOperatorHook,
		ajaxHook,
		ConnectSelect,
		WalletStatusDebugPanel,
		Warn,
		Button,
		Iajax,
		Icomon,
		ImmOperator,
		IsignIn,
		IwalletHelper,
	} = Web3ReactExpress;

	const commonContext = commonHook.default;
	const walletContext = walletHelperHook.default;

	//初始化commonHook
	const commonObject = commonHook.useCommon("development");
	//初始化钱包操作器
	const walletHalper = walletHelperHook.useWallet(false, "development");

	return (
		<>
			<div>
				<commonContext.Provider value={commonObject}>
					<walletContext.Provider value={walletHalper}>
						<ExcOne></ExcOne>
					</walletContext.Provider>
				</commonContext.Provider>
				<Button>asdasdsad</Button>
			</div>
		</>
	);
};
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
