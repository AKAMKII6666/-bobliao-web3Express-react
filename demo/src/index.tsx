/*** examples/src/app.js ***/
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Web3ReactExpress from "../../lib/index"; // 引入组件

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

	return (
		<>
			<div>
				<Button>asdasdsad</Button>
			</div>
		</>
	);
};
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
