/*** examples/src/app.js ***/
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import web3express from "../../lib/index"; // 引入组件
const { walletContext, useWallet, commonContext, useCommon, Button } = web3express;
import ExcOne from "./excOne";

const App = () => {
	//初始化commonHook
	const commonObject = useCommon("development");
	//初始化钱包操作器
	const walletHalper = useWallet(false, "development");

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
