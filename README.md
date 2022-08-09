![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/1.png)

# Web3 express react - Reference API 参考文档

## 组件亮点：

> 1.通过简单地安装以及引用就可以快速配置一个 React + web3js 项目，从而避免在一开始配置环境时消耗大量的时间。 2.可根据不同的运行环境（developement/production）配置不同的网络依赖，以及不同的合约。 3.搭配专属工具可自动化快速更换项目中的合约以及配置，方便项目的开发和维护。 4.自带 Gui,可根据需要直接使用本组件的 Gui 快速完成 web3 交互。 5.支持 SSR，不需要担心 Razzle 和 Nuxt 的兼容性问题。

## 功能特性：

> 1.开箱即用，只需一个函数即可完成钱包的安装和链接 2.钱包状态管理功能齐全，可以通过导出的状态直接获得当前钱包是否登录，网络链接是否错误等。 3.智能地网络管理，当 Web3 express 运行在未链接/安装钱包的的状态下时，Web3 express 将会直接使用 http 节点的方式工作，当运行在有钱包链接的工作状态下时，会通过钱包对区块链进行交互，所有这一切都是自动的，无需手动判断和切换。 4.支持 walletConnect Deeplink 5.多种简化封装方便您快速上手工作，并可避免人为失误。

# 安装组件

`npm install @bobliao/web3-express-react`

`yarn add @bobliao/web3-express-react`

`pnpm install @bobliao/web3-express-react`

# 进行全局配置

> 进行全局配置将有效地使您的业务代码访问到 Web3 express
> 以下配置请配置到您项目中的顶级模块中去，例如`App.js`

```javascript
import Web3Express from "@bobliao/web3-express-react";

//拿出钩子函数，以及需要全局使用的Context
const { useCommon, useWallet, commonContext, walletContext } = Web3Express;

//初始化commonHook
const commonObject = useCommon("development");
//初始化钱包操作器
const walletHalper = useWallet(false, "development");

//将Context置于项目最顶端，放入初始化好的commonObject（公共函数类）以及walletHalper(钱包操作器)
return (
	<commonContext.Provider value={commonObject}>
		<walletContext.Provider value={walletHalper}>
			<ExcOne></ExcOne>
		</walletContext.Provider>
	</commonContext.Provider>
);
```

完整示例:

```javascript
import "./App.css";
import ExcOne from "./views/excamples/excOne";
import Web3Express from "@bobliao/web3-express-react";

function App() {
	const { useCommon, useWallet, commonContext, walletContext } = Web3Express;

	//初始化commonHook
	const commonObject = useCommon("development");
	//初始化钱包操作器
	const walletHalper = useWallet(false, "development");

	return (
		<commonContext.Provider value={commonObject}>
			<walletContext.Provider value={walletHalper}>
				{/*
						请一定要将以上两个对象置于您的业务逻辑代码的范围之上
						这样您在业务逻辑代码内就可以使用他们。
					*/}
				<ExcOne></ExcOne>
			</walletContext.Provider>
		</commonContext.Provider>
	);
}

export default App;
```

# 安装钱包，链接钱包，及钱包状态的管理

> 钱包的状态管理主要使用 WalletHelper 对象
> 使用 Web3Expres 导出`useWalletContext`钩子，并使用`useWalletContext`钩子导出 `walletHelper` 对象

#### 示例：

```javascript
import Web3Express from "@bobliao/web3-express-react";

//使用Web3Express导出useWalletContext
const { useWalletContext } = Web3Express;
//使用useWalletContext导出walletHelper
const walletHelper = useWalletContext();
//walletHelper包含两个对象
//一个是walletData 另一个是walletFuncs
const { walletData, walletFuncs } = walletHelper;
/**
 * 	walletData中的内容
 * 	当前链接的账号
 *	walletData.currentAccount
 *	当前使用的是哪个网络
 *	walletData.currentNetwork
 *	当前是否已经安装了钱包
 *	walletData.isWalletInstalled
 *	当前是否链接了钱包
 *	walletData.isConnectedWallet
 *	钱包对象
 *	walletData.ethereum
 *	状态更改指示
 *	一旦钱包登陆用户更改,或者网络更改
 *	都会触发这个状态的更改
 *	walletData.changeStemp
 *	是否为isTrustWallet
 *	walletData.isTrustWallet
 *	钱包状态更改次数
 *	walletData.changeTimes
 *	刚安装完钱包,如果不刷新页面钱包可能会未初始化
 *	walletData.isWalletUnInitlized
 *	用于显示的账号信息
 *	walletData.currentDisplayAccount
 *	工作模式  ethereum / walletConnect
 *  指示当前的钱包正使用什么模式工作
 *	walletData.workingMode
 */

/**
	 * walletFuncs中的内容
	 *
	 *	立刻链接登陆钱包（Metamask/本地钱包）
	 *	await walletFuncs.triggerConnect() => Promise<IstateResult>;
	 *	检测是否有链接钱包
	 *	walletFuncs.detactConnect() => {
			是否链接了钱包 true/false
			isConnectedWallet,
			当前链接到钱包的账号
			currentAccount,
		};
	 *	是否有安装钱包
	 *	walletFuncs.detactWallet() => null | ethereum
	 *	添加网络
	 *	await walletFuncs.addNetWork(InetWork) => Promise<IstateResult>,
	 *	切换网络
	 *	walletFuncs.switchNetWork(InetWork) => Promise<IstateResult>,
	 *	触发远程钱包链接
	 *	await walletFuncs.trigger_WalletConnect_connect() => Promise<void>,
	 *	断开链接
	 *	walletFuncs.disConnect() => void,
	 */
```

> `walletData` 中的所有内容都可以被 useEffect 监听，例如：

```javascript
useEffect(
	function () {
		console.log("钱包状态发生了更改，可能是 登录了/退出登录了/切换了网络状态");
		if (walletData.currentAccount === "") {
			console.log("钱包未登录");
		}

		if (walletData.currentAccount !== "") {
			console.log("钱包登录了，登录的钱包地址为:" + walletData.currentAccount);
		}
	},
	[walletData.changeStemp]
);

useEffect(
	function () {
		console.log("您的钱包地址为:" + walletData.currentAccount);
	},
	[walletData.currentAccount]
);
```

### 如果您希望触发本地钱包(Metamask)的登录、安装:

### walletFuncs.triggerConnect()

```javascript
<button
	onClick={function () {
		walletFuncs.triggerConnect();
	}}
>
	激活钱包
</button>
```

> 使用`walletFuncs.triggerConnect()`时，如果用户没有安装钱包，将会自动引导用户安装钱包

### 如果您希望使用 DeepLink 钱包:

### walletFuncs.trigger_WalletConnect_connect()

```javascript
<button
	onClick={function () {
		walletFuncs.trigger_WalletConnect_connect();
	}}
>
	激活Walletconnect
</button>
```

### 如果您希望断开钱包链接:

### walletFuncs.detactConnect()

```javascript
<button
	onClick={function () {
		walletFuncs.detactConnect();
	}}
>
	断开链接
</button>
```

### 使用 web3 express 内置的 GUI 完成钱包的链接交互

> 使用内置的 gui 将自动创建一个友好的下拉菜单，或者弹出窗口，友好地引导用户链接钱包

```javascript
	import Web3Express from "@bobliao/web3-express-react";

	//导出ConnectSelect组件
	const { ConnectSelect } = Web3Express;


	<ConnectSelect mode="dropdown">
		<button>使用下拉菜单弹出链接选择菜单</button>
	</ConnectSelect>

	<ConnectSelect mode="window">
		<button>使用窗口弹出链接选择菜单</button>
	</ConnectSelect>
```

> 完整示例代码:

```javascript
import React, { useEffect } from "react";
import { useState } from "react";
import Web3Express from "@bobliao/web3-express-react";

import "./index.css";

const ExcOne = () => {
	const [isMounted, setIsmounted] = useState(false);

	//使用Web3Express导出useWalletContext
	const { useWalletContext, ConnectSelect } = Web3Express;
	//使用useWalletContext导出walletHelper
	const walletHelper = useWalletContext();
	//walletHelper包含两个对象
	//一个是walletData 另一个是walletFuncs
	const { walletData, walletFuncs } = walletHelper;
	/**
	 * 	walletData中的内容
	 * 	当前链接的账号
	 *	walletData.currentAccount
	 *	当前使用的是哪个网络
	 *	walletData.currentNetwork
	 *	当前是否已经安装了钱包
	 *	walletData.isWalletInstalled
	 *	当前是否链接了钱包
	 *	walletData.isConnectedWallet
	 *	钱包对象
	 *	walletData.ethereum
	 *	状态更改指示
	 *	一旦钱包登陆用户更改,或者网络更改
	 *	都会触发这个状态的更改
	 *	walletData.changeStemp
	 *	是否为isTrustWallet
	 *	walletData.isTrustWallet
	 *	钱包状态更改次数
	 *	walletData.changeTimes
	 *	刚安装完钱包,如果不刷新页面钱包可能会未初始化
	 *	walletData.isWalletUnInitlized
	 *	用于显示的账号信息
	 *	walletData.currentDisplayAccount
	 *	工作模式  ethereum / walletConnect
	 *  指示当前的钱包正使用什么模式工作
	 *	walletData.workingMode
	 */

	/**
	 * walletFuncs中的内容
	 *
	 *	立刻链接登陆钱包（Metamask/本地钱包）
	 *	await walletFuncs.triggerConnect() => Promise<IstateResult>;
	 *	检测是否有链接钱包
	 *	walletFuncs.detactConnect() => {
			是否链接了钱包 true/false
			isConnectedWallet,
			当前链接到钱包的账号
			currentAccount,
		};
	 *	是否有安装钱包
	 *	walletFuncs.detactWallet() => null | ethereum
	 *	添加网络
	 *	await walletFuncs.addNetWork(InetWork) => Promise<IstateResult>,
	 *	切换网络
	 *	walletFuncs.switchNetWork(InetWork) => Promise<IstateResult>,
	 *	触发远程钱包链接
	 *	await walletFuncs.trigger_WalletConnect_connect() => Promise<void>,
	 *	断开链接
	 *	walletFuncs.disConnect() => void,
	 */

	useEffect(
		function () {
			console.log("钱包状态发生了更改，可能是 登录了/退出登录了/切换了网络状态");
			if (walletData.currentAccount === "") {
				console.log("钱包未登录");
			}

			if (walletData.currentAccount !== "") {
				console.log("钱包登录了，登录的钱包地址为:" + walletData.currentAccount);
			}
		},
		[walletData.changeStemp]
	);

	useEffect(
		function () {
			console.log("您的钱包地址为:" + walletData.currentAccount);
		},
		[walletData.currentAccount]
	);

	useEffect(
		function () {
			if (!isMounted) {
				setIsmounted(true);
			}

			return function () {
				if (isMounted) {
					setIsmounted(false);
				}
			};
		},
		[isMounted]
	);

	return (
		<div>
			<div>
				当前登陆的钱包账号:
				{walletData.currentAccount}
			</div>
			<div className="rrb-split">
				当前使用的网络:
				{walletData.currentNetwork}
			</div>
			<div className="rrb-split">
				当前是否已经安装了钱包:
				{walletData.isWalletInstalled.toString()}
			</div>
			<div className="rrb-split">
				当前是否链接了钱包:
				{walletData.isConnectedWallet.toString()}
			</div>
			<div className="rrb-split">
				钱包状态更改指示:
				{walletData.changeStemp}
			</div>
			<div className="rrb-split">
				钱包状态更改次数:
				{walletData.changeTimes}
			</div>
			<button
				onClick={function () {
					walletFuncs.triggerConnect();
				}}
			>
				激活钱包
			</button>
			<button
				onClick={function () {
					walletFuncs.trigger_WalletConnect_connect();
				}}
			>
				激活Walletconnect
			</button>
			<button
				onClick={function () {
					walletFuncs.detactConnect();
				}}
			>
				断开链接
			</button>

			<ConnectSelect mode="dropdown">
				<button>使用下拉菜单弹出链接选择菜单</button>
			</ConnectSelect>

			<ConnectSelect mode="window">
				<button>使用窗口弹出链接选择菜单</button>
			</ConnectSelect>
		</div>
	);
};
export default ExcOne;
```

# 未完待续
