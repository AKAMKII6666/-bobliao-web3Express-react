![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/1.png)

---

# English

# Web3 express react - Reference API

## Introduction：

> 1.Make you create React + web3js projects fastly & simply。</br>
> 2.Systematically helps you manage contracts or networks under developement or production environment of your project。</br>
> 3.With a configing tool (Contract-config-setter) ,contracts and configurations in your project can be automatically and quickly replaced,it will make more easer and faster of maintaining your projects. </br>
> 4.GUI-Built in，could use the GUI of this package built in,fast and easely make friendly web3 experience。</br>

## Package features：

> 1.Out-of-the-box,can simply make wallet connect or install thow just a Function().</br>
> 2.Can directly obtain whether the current wallet is logged in and whether the network link is wrong through the exported status from this package.。</br>
> 3.Intelligent network management. When Web3 express is running in the state of unlinked but wallet installed, Web3 express will work under the mode of HTTP-Node. When it's running in the working state of wallet linked, it will interact with the blockchain through the wallet. All these are automatic, without manual judgment and switching.。</br>
> 4.walletConnect package built in</br>

# Install package

`npm install @bobliao/web3-express-react`

`yarn add @bobliao/web3-express-react`

`pnpm install @bobliao/web3-express-react`

# Global Configuration In Your Project

> Once the `@bobliao/web3-express-react` has been installed in your project,first thing is to set up the common parts of `@bobliao/web3-express-react` in your project of top component javascript file.

> for excample `app.js`:

```javascript
import Web3Express from "@bobliao/web3-express-react";

//Take out the hooks,and global contexts
const { useCommon, useWallet, commonContext, walletContext } = Web3Express;

//Use 'useCommon' hook to get common object
const commonObject = useCommon("development");
//Use `useWallet` hook to get walletHalper object
const walletHalper = useWallet(false, "development");

//Put `commonObject`,`walletHalper` inside `commonContext`,`walletContext` top of all your usiness code
return (
	<commonContext.Provider value={commonObject}>
		<walletContext.Provider value={walletHalper}>
			<ExcOne></ExcOne>
		</walletContext.Provider>
	</commonContext.Provider>
);
```

Fully excample:

```javascript
import "./App.css";
import ExcOne from "./views/excamples/excOne";
import Web3Express from "@bobliao/web3-express-react";

function App() {
	//Take out the hooks,and global contexts
	const { useCommon, useWallet, commonContext, walletContext } = Web3Express;

	//Use 'useCommon' hook to get common object
	const commonObject = useCommon("development");
	//Use `useWallet` hook to get walletHalper object
	const walletHalper = useWallet(false, "development");

	return (
		<commonContext.Provider value={commonObject}>
			<walletContext.Provider value={walletHalper}>
				{/*
						Need to put all of those two contexts upon top all of your code,then your code can be use the @bobliao/web3-express-react.
					*/}
				<ExcOne></ExcOne>
			</walletContext.Provider>
		</commonContext.Provider>
	);
}

export default App;
```

> **_Attention！_**

```javascript
const commonObject = useCommon("development");
const walletHalper = useWallet(false, "development");
```

> **_This part need to set with an environment variable_**，When using`useCommon("development");`and` useWallet(false, "development")`, the ` "development"`parameter need to replace with a environment variable of your project ，like `NODE_ENV`,you need to set like this in actual use:

```javascript
const commonObject = useCommon(NODE_ENV);
const walletHalper = useWallet(false, NODE_ENV);
```

> May need to set `webpack.DefinePlugin` in webpack to import the webpack environment variable in your project running code:

```javascript
new webpack.DefinePlugin({
	NODE_ENV: JSON.stringify(process.env.NODE_ENV),
});
```

Reference:
`https://stackoverflow.com/questions/41705888/passing-the-node-env-value-using-webpack-via-defineplugin`

---

# 中文 - Chinese

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/1.png)

# Web3 express react - Reference API 参考文档

## 组件亮点：

> 1.通过简单地安装以及引用就可以快速配置一个 React + web3js 项目，从而避免在一开始配置环境时消耗大量的时间。</br> 2.可根据不同的运行环境（developement/production）配置不同的网络依赖，以及不同的合约。</br> 3.搭配专属工具可自动化快速更换项目中的合约以及配置，方便项目的开发和维护。</br> 4.自带 Gui,可根据需要直接使用本组件的 Gui 快速完成 web3 交互。</br> 5.支持 SSR，不需要担心 Razzle 和 Nuxt 的兼容性问题。</br>

## 功能特性：

> 1.开箱即用，只需一个函数即可完成钱包的安装和链接</br> 2.钱包状态管理功能齐全，可以通过导出的状态直接获得当前钱包是否登录，网络链接是否错误等。</br> 3.智能地网络管理，当 Web3 express 运行在未链接/安装钱包的的状态下时，Web3 express 将会直接使用 http 节点的方式工作，当运行在有钱包链接的工作状态下时，会通过钱包对区块链进行交互，所有这一切都是自动的，无需手动判断和切换。</br> 4.支持 walletConnect Deeplink</br> 5.多种简化封装方便您快速上手工作，并可避免人为失误。</br>

# 安装组件

`npm install @bobliao/web3-express-react`

`yarn add @bobliao/web3-express-react`

`pnpm install @bobliao/web3-express-react`

# ======= 进行全局配置 =======

> 进行全局配置将有效地使您的业务代码访问到 Web3 express</br>
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

> **_这里千万要注意_**

```javascript
//初始化commonHook
const commonObject = useCommon("development");
//初始化钱包操作器
const walletHalper = useWallet(false, "development");
```

> **_这个地方一定不能写死_**，在`useCommon("development");`和` useWallet(false, "development")`的时候 ` "development"`这个位置应该作为您项目的环境变量传入，例如 `NODE_ENV`,在实际使用 的时候，应该写成这样:

```javascript
//初始化commonHook
const commonObject = useCommon(NODE_ENV);
//初始化钱包操作器
const walletHalper = useWallet(false, NODE_ENV);
```

> 可能需要使用 Webpack 的`webpack.DefinePlugin`功能将您 Webpack 的环境变量导入到您的项目代码的运行环境里去:

```javascript
new webpack.DefinePlugin({
	/**
	 * 这里定义的环境变量可以直接在业务代码里拿到，
	 * 属于是webpack直接打印上去的，
	 * 并不是写在业务代码逻辑里的。
	 */
	NODE_ENV: JSON.stringify(process.env.NODE_ENV),
});
```

参考资料:
`https://stackoverflow.com/questions/41705888/passing-the-node-env-value-using-webpack-via-defineplugin`

# =======安装钱包，链接钱包，及钱包状态的管理=======

> 钱包的状态管理主要使用 WalletHelper 对象</br>
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

### walletFuncs.disConnect()

```javascript
<button
	onClick={function () {
		walletFuncs.disConnect();
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
					walletFuncs.disConnect();
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

# =======配置智能合约到您的项目里去=======

> **请严格按照本文推荐的文件名创建文件夹否则之后在使用专用工具管理您的配置的时候会出现问题**

> 请在您的 src 目录下任意位置建立这样的文件夹结构：

```javascript
	━ blockChanOperator
		┣ contractConfigs
		┗ abis
```

> 在`contractConfigs`目录下创建一个您的合约配置，如果您没想好给它取什么名字，那就叫`default.config.js`吧

```javascript
	━ blockChanOperator
		┣ contractConfigs
		┃	┗ default.config.js
		┗ abis
```

> 并在`default.config.js`中放入以下内容:

```javascript
/**
 * 合约配置文件替换器自动生成
 * 用于使web3Operator/metaMaskOperator载入的合约配置文件
 */
const contractConfig = {
	//测试环境
	dev: {
		//环境信息
		info: {
			//依赖的网络id
			depChainId: 80001,
			//依赖的网络名称
			depChainName: "Polygon Testnet",
			//web3链接节点的地址
			provider: "https://matic-mumbai.chainstacklabs.com/",
			//web3链接节点的符号
			symbol: "MATIC",
			//查询浏览器的访问地址
			visitUrl: "https://mumbai.polygonscan.com/",
			//小数位数
			decimals: 18,
		},
		BuyStockNFT: {
			//合约id
			id: "0x9C84144c7035B77Ee4c5004844592747Ca97c3BD",
			//abi本地文件位置
			abiFileName: "../abis/buystocknft_abi_dev.json",
			//在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
			abiOnline: "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x9C84144c7035B77Ee4c5004844592747Ca97c3BD&format=raw",
			//web3链接节点的地址
			provider: "https://matic-mumbai.chainstacklabs.com/",
			//异步获得本地版本的abi文件
			getAbiAsync: function (_callback) {
				require(["../abis/buystocknft_abi_dev.json"], function (_abi) {
					_callback(_abi);
				});
			},
			//依赖哪个网络
			depNetWork: "Polygon Testnet",
		},
		GodMusicStock: {
			//合约id
			id: "0xe3e8E26b801F4Fa19741b9562FB43aA75e6AA589",
			//abi本地文件位置
			abiFileName: "../abis/godmusicstock_abi_dev.json",
			//在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
			abiOnline: "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0xe3e8E26b801F4Fa19741b9562FB43aA75e6AA589&format=raw",
			//web3链接节点的地址
			provider: "https://matic-mumbai.chainstacklabs.com/",
			//异步获得本地版本的abi文件
			getAbiAsync: function (_callback) {
				require(["../abis/godmusicstock_abi_dev.json"], function (_abi) {
					_callback(_abi);
				});
			},
			//依赖哪个网络
			depNetWork: "Polygon Testnet",
		},
	},
	//正式环境
	pro: {
		//环境信息
		info: {
			//依赖的网络id
			depChainId: 137,
			//依赖的网络名称
			depChainName: "Polygon Mainnet",
			//web3链接节点的地址
			provider: "https://rpc-mainnet.matic.network",
			//web3链接节点的符号
			symbol: "MATIC",
			//查询浏览器的访问地址
			visitUrl: "https://polygonscan.com/",
			//小数位数
			decimals: 18,
		},
		BuyStockNFT: {
			//合约id
			id: "0x976FDba11c0B79eF9e31242a9Aad48A6680Bc6f9",
			//abi本地文件位置
			abiFileName: "../abis/buystocknft_abi_pro.json",
			//在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
			abiOnline: "https://api.polygonscan.com/api?module=contract&action=getabi&address=0x976FDba11c0B79eF9e31242a9Aad48A6680Bc6f9&format=raw",
			//web3链接节点的地址
			provider: "https://rpc-mainnet.matic.network",
			//异步获得本地版本的abi文件
			getAbiAsync: function (_callback) {
				require(["../abis/buystocknft_abi_pro.json"], function (_abi) {
					_callback(_abi);
				});
			},
			//依赖哪个网络
			depNetWork: "Polygon Mainnet",
		},
		GodMusicStock: {
			//合约id
			id: "0x6E1B735cd88E16F68a27b02ab32335e173A3C3dB",
			//abi本地文件位置
			abiFileName: "../abis/godmusicstock_abi_pro.json",
			//在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
			abiOnline: "https://api.polygonscan.com/api?module=contract&action=getabi&address=0x6E1B735cd88E16F68a27b02ab32335e173A3C3dB&format=raw",
			//web3链接节点的地址
			provider: "https://rpc-mainnet.matic.network",
			//异步获得本地版本的abi文件
			getAbiAsync: function (_callback) {
				require(["../abis/godmusicstock_abi_pro.json"], function (_abi) {
					_callback(_abi);
				});
			},
			//依赖哪个网络
			depNetWork: "Polygon Mainnet",
		},
	},
};
export { contractConfig };
```

> 我们可以看到，在配置中 ，有两个块，分别是 dev 和 pro 它们分别代表当前运行环境为`development`时和`production`时所使用的合约 与区块链的信息:

```javascript
/**
 * 合约配置文件替换器自动生成
 * 用于使web3Operator/metaMaskOperator载入的合约配置文件
 */
const contractConfig = {
	//测试环境
	dev: {
		(...)
	},

	//正式环境
	pro: {
		(...)
	},
};
export { contractConfig };
```

> 正常情况下，这两个块中的 info 信息和配置的合约信息可能不一致，但是字段数量和合约数量 以及合约名称应该保持一致，否则可能在开发时没有问题，但是在发布以后出现合约读取不到等麻烦。
> 例如只在 dev 中配置了"BuyStockNFT"合约，但是在 pro 中"BuyStockNFT"并不存在，那就会出现问题。总之合约的地址，以及 abi 可能不一样，但是在 dev 中配置了的合约，一定要出现在 pro 里。

### dev/pro -> info

> 您会注意到，在 dev 或 pro 中都会出现 info 这个配置块，这个配置块中配置的就是链的信息，您需要根据您的需求配置您在 pro/dev 下依赖的链，例如这个示例中，dev 依赖于 Polygon Testnet,那么在这里就要将 Polygon Testnet 的 id,链的名称，https 节点等都配置上去，这样的话就可以在之后的工作中，通过这套组件简单快捷地引导用户添加相应的网络，或切换到相应的网络。

```javascript
	info: {
		//依赖的网络id
		depChainId: 80001,
		//依赖的网络名称
		depChainName: "Polygon Testnet",
		//web3链接节点的地址
		provider: "https://matic-mumbai.chainstacklabs.com/",
		//web3链接节点的符号
		symbol: "MATIC",
		//查询浏览器的访问地址
		visitUrl: "https://mumbai.polygonscan.com/",
		//小数位数
		decimals: 18,
	},
```

> 在这个示例中 dev 配置的是`Polygon Testnet`(测试链)那么相应的 pro 的配置是`Polygon Mainnet`（主链）

### 配置您的合约

> 在下面的内容中，就可以开始配置具体的合约：

```javascript
		BuyStockNFT: {
            //合约id
            id: "0x9C84144c7035B77Ee4c5004844592747Ca97c3BD",
            //abi本地文件位置
            abiFileName: "../abis/buystocknft_abi_dev.json",
            //在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
            abiOnline: "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x9C84144c7035B77Ee4c5004844592747Ca97c3BD&format=raw",
            //web3链接节点的地址
            provider: "https://matic-mumbai.chainstacklabs.com/",
            //异步获得本地版本的abi文件
            getAbiAsync: function (_callback) {
                require(["../abis/buystocknft_abi_dev.json"], function (_abi) {
                    _callback(_abi);
                });
            },
            //依赖哪个网络
            depNetWork: "Polygon Testnet",
        },
```

> 合约配置的编写格式如上所示，块名称就是合约名称：

```javascript
		BuyStockNFT: {
         (...)
        },
```

> 如果您的合约叫 ILoveBlockChain,那就是这样的：

```javascript
		ILoveBlockChain: {
         (...)
        },
```

> 这里的合约名称是您自己起的，与合约查询网络中的合约名称没有关系，但是还是建议您将此合约名称与查询网络中的合约名称保持一致：

`https://mumbai.polygonscan.com/address/0x9C84144c7035B77Ee4c5004844592747Ca97c3BD#code`

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_e960a5a9e81d686c4979cde74aa1d394_r.png)

> 例如在这个示例中，有 BuyStockNFT，GodMusicStock，这两个合约

> 那么就可以在测试环境配置测试的合约，正式环境配置正式的合约

### 手动配置合约的 abi 文件到本地

> 您也许注意到了合约配置块中，存在这样的配置字段:

```javascript
			//abi本地文件位置
            abiFileName: "../abis/buystocknft_abi_dev.json",
            //在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
            abiOnline: "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x9C84144c7035B77Ee4c5004844592747Ca97c3BD&format=raw",
			//异步获得本地版本的abi文件
            getAbiAsync: function (_callback) {
                require(["../abis/buystocknft_abi_dev.json"], function (_abi) {
                    _callback(_abi);
                });
            },
```

> 您需要先去合约查询网上，通过合约的 id 先找到它:

> 例如这里我们用的是`Polygon Testnet`,那么合约查询网址为`https://mumbai.polygonscan.com/`

> 打开它，然后在查询框里输入合约 id 例如`0x9C84144c7035B77Ee4c5004844592747Ca97c3BD`

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_5aa648d5f86bfbb4cf91ecdbcb233117_r.png)

> 点击查询按钮，找到合约，然后找到页面上的`Contract`Tab,切换过去，就可以看到`Contract ABI`栏目:

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_3e0165081cc13ba5e8d0f53797255cca_r.png)

> 点击`RAW/Text Format`按钮，得到 abi 文件内容和请求连接

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_678c27796f089526d0babbf8260118c5_r.png)

> 将请求连接复制到`abiOnline`配置字段上去

> 将内容复制下来，在以下目录创建一个 abi 文件`buystocknft_abi_dev.json`:

```javascript
	━ blockChanOperator
		┣ contractConfigs
		┃	┗ default.config.js
		┗ abis
			┗ buystocknft_abi_dev.json
```

> 然后将您拷贝的内容放进去，并检查和保证`getAbiAsync`中的路径和`abiFileName`中的路径能访问到刚才保存的 abi 文件:`buystocknft_abi_dev.json`.

> 依次配置所有的测试、正式的合约的 abi 到 abis 目录中去.

> 手动配置完成!

### 通过“合约设置器”自动更新 abi 文件

> **_您至少在`contractConfigs`目录中配置了一份合约配置文件_**

> 请前往以下地址获得合约设置器

`https://github.com/AKAMKII6666/-bobliao-ContractConfigSetter`

> 将代码克隆至本地，然后`npm install`或者`pnpm install`或者`yarn`安装依赖

> 完成依赖安装之后，使用`npm start`或者`pnpm start`或者`yarn start`运行“合约设置器”

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_dfb253cb498d5eb5d284ed707b833135_r.png)

> 点击 `选择文件`按钮，定位到您在您项目里如上文指示的`blockChanOperator`目录.

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_2adb48d53b069dd56368692b3ed400fa_r.png)

> 确认后，点击查找配置文件，将会找到您刚刚配置的`default.config.js`配置文件，您将会在下面的界面中看到您配置文件的所有图形化的选项:

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_656aed5fb0abf44cbe8a2229bae36572_r.png)

> 如果您配置的合约地址和 abi 源文件访问地址都准确，可以直接点击`更改并保存配置`按钮，“合约设置器”将自动去合约查询网站上拉取相应的 abi 并保存。

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_7a01faf69da95d3eb09d6693be8d7780_r.png)

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_94aa50c720fbf3110d7cf2ceabb6234e_r.png)

> 合约在您项目中的自动配置便已经完成!

# =========调用智能合约============

> 使用 web3Express 中导出的`useMmOperator`钩子，并使用这个钩子载入我们配置好的`default.config.js`合约配置文件，然后导出`contractOperator`对象，用于操作合约：

```javascript
import Web3Express from "@bobliao/web3-express-react";
//载入上文示例中配置好的合约配置文件
const defaultConfig = require("../../../blockChanOperator/contractConfigs/default.config").contractConfig;

const { useMmOperator } = Web3Express;
//创建合约操作器
const contractOperator = useMmOperator(defaultConfig);

useEffect(
	function () {
		if (contractOperator.data.isLoaded) {
			console.log("合约都已经载入完成，可以开始合约操作！");
		}
	},
	[contractOperator.data.changeTimes]
);

//用来监听合约的变化
contractOperator.data.changeTimes;

//配置中的合约载入完成后，此状态为true,否则为false
contractOperator.data.isLoaded;
```

> `contractOperator`对象的内容:

```javascript
		data: {
			//是否已经挂载
			isMounted,
			//当前合约操作器的工作模式
			//链接了钱包、网络选择准确 ："ETHEREUM"
			//没有链接钱包，网络链接不正确: "NODE"
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
```

### 向合约提供的函数查询数据：

> 查询合约内容，例如查询`BuyStockNFT` 的`buyCount` 接口,核心代码：

```javascript
let amount = await contractOperator.data.contracts.BuyStockNFT.methods.buyCount().call();
console.log(amount);
```

> 需要注意的是`contractOperator.data.contracts.合约名称`下面的所有的合约，就是您在`default.config.js`中配置好的

> `contractOperator.data.contracts.BuyStockNFT` 这里您拿到的合约对象，实际上就是 web3js 的`contract`对象，参考文档:`https://web3js.readthedocs.io/en/v1.7.5/web3-eth-contract.html#eth-contract`

> 无论您要通过合约做何种操作，都需要等待合约载入完成:

```javascript
useEffect(
	function () {
		if (contractOperator.data.isLoaded) {
			console.log("合约都已经载入完成，可以开始合约操作！");

			(async function () {
				let amount = await contractOperator.data.contracts.BuyStockNFT.methods
					.buyCount()
					.call();
				console.log(amount);
			})();
		}
	},
	[contractOperator.data.changeTimes]
);
```

完整代码:

```javascript
import React, { useEffect } from "react";
import { useState } from "react";
import Web3Express from "@bobliao/web3-express-react";
import "./index.css";
const defaultConfig = require("../../../blockChanOperator/contractConfigs/default.config").contractConfig;

const ExcTwo = () => {
	const [isMounted, setIsmounted] = useState(false);

	//使用Web3Express导出useWalletContext
	const { useWalletContext, ConnectSelect, useMmOperator } = Web3Express;
	//使用useWalletContext导出walletHelper
	const walletHelper = useWalletContext();
	//walletHelper包含两个对象
	//一个是walletData 另一个是walletFuncs
	const { walletData } = walletHelper;

	//创建合约操作器
	const contractOperator = useMmOperator(defaultConfig);

	useEffect(
		function () {
			if (contractOperator.data.isLoaded) {
				console.log("合约都已经载入完成，可以开始合约操作！");

				(async function () {
					let amount = await contractOperator.data.contracts.BuyStockNFT.methods
						.buyCount()
						.call();
					console.log(amount);
				})();
			}
		},
		[contractOperator.data.changeTimes]
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
			<ConnectSelect mode="window">
				<button>使用窗口弹出链接选择菜单</button>
			</ConnectSelect>

			<div>
				当前登陆的钱包账号:
				{walletData.currentAccount}
			</div>
		</div>
	);
};
export default ExcTwo;
```

### 批量查询

```javascript
//批量查询
var loadArray = [
	/**
	 * 查询当前售出多少
	 */
	contractOperator.data.contracts.BuyStockNFT.methods.salesVolume().call,
	/**
	 * 查询当前总共多少
	 */
	contractOperator.data.contracts.BuyStockNFT.methods.purchaseLimit().call,
	/**
	 * 查询一份多少钱
	 */
	contractOperator.data.contracts.BuyStockNFT.methods.buyCount().call,
];

//使用mutilRequest批量查询
var result = await contractOperator.funcs.mutilRequest(loadArray);
```

### 对合约提供的函数操作写入

> 可以使用 contractOperator.funcs.send 函数发起操作：

```javascript
/**
 * 确保合约都载入完成
 */
if (contractOperator.data.isLoaded) {
	/**
	 * contractOperator.funcs.send函数，参数释意：
	 * 第一个参数为合约名称
	 * 第二个参数为方法名称
	 * 第三个参数为提供给方法的参数，没有就填写空数组
	 * 第四个参数为提交时必须要填写的参数集
	 */
	var result = await contractOperator.funcs.send("BuyStockNFT", "buyMidNFT", [], {
		//使用钱包的账号，如果未链接钱包即walletData.currentAccount = "",应该给出提示
		from: walletData.currentAccount,
		//这里是向这个“buyMidNFT”发起一个数额为0.001Matic的交易，由于Matic的缩进为18位，需要使用commonObj.shiftNumber来对数字进行缩进
		//直接向这里发起交易时输入浮点数将报错。
		value: commonObj.commonFuncs.shiftNumber(0.001, -18),
	});

	console.log(result);
}
```

> 或者使用更传统的方式:

```javascript
/**
 * 确保合约都载入完成
 */
if (contractOperator.data.isLoaded) {
	let result = await contractOperator.data.contracts.BuyStockNFT.methods.buyMidNFT().send({
		//使用钱包的账号，如果未链接钱包即walletData.currentAccount = "",应该给出提示
		from: walletData.currentAccount,
		//这里是向这个“buyMidNFT”发起一个数额为0.001Matic的交易，由于Matic的缩进为18位，需要使用commonObj.shiftNumber来对数字进行缩进
		//直接向这里发起交易时输入浮点数将报错。
		value: commonObj.commonFuncs.shiftNumber(0.001, -18),
	});
	console.log(result);
}
```

### 完整示例

```javascript
import React, { useEffect } from "react";
import { useState } from "react";
import Web3Express from "@bobliao/web3-express-react";
import "./index.css";
const defaultConfig = require("../../../blockChanOperator/contractConfigs/default.config").contractConfig;

const ExcTwo = () => {
	const [isMounted, setIsmounted] = useState(false);

	//使用Web3Express导出useWalletContext
	const { useWalletContext, ConnectSelect, useMmOperator, useCommon } = Web3Express;
	//使用useWalletContext导出walletHelper
	const walletHelper = useWalletContext();
	//walletHelper包含两个对象
	//一个是walletData 另一个是walletFuncs
	const { walletData } = walletHelper;

	//创建合约操作器
	const contractOperator = useMmOperator(defaultConfig);

	//导出公用函数集
	const commonObj = useCommon();

	useEffect(
		function () {
			if (contractOperator.data.isLoaded) {
				console.log("合约都已经载入完成，可以开始合约操作！");

				(async function () {
					let amount = await contractOperator.data.contracts.BuyStockNFT.methods
						.buyCount()
						.call();
					console.log(amount);
				})();
			}
		},
		[contractOperator.data.changeTimes]
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
			<ConnectSelect mode="window">
				<button>使用窗口弹出链接选择菜单</button>
			</ConnectSelect>

			<button
				onClick={function () {
					(async function () {
						/**
						 * 确保合约都载入完成
						 */
						if (contractOperator.data.isLoaded) {
							/**
							 * contractOperator.funcs.send函数，参数释意：
							 * 第一个参数为合约名称
							 * 第二个参数为方法名称
							 * 第三个参数为提供给方法的参数，没有就填写空数组
							 * 第四个参数为提交时必须要填写的参数集
							 */
							let result = await contractOperator.funcs.send(
								"BuyStockNFT",
								"buyMidNFT",
								[],
								{
									//使用钱包的账号，如果未链接钱包即walletData.currentAccount = "",应该给出提示
									from: walletData.currentAccount,
									//这里是向这个“buyMidNFT”发起一个数额为0.001Matic的交易，由于Matic的缩进为18位，需要使用commonObj.shiftNumber来对数字进行缩进
									//直接向这里发起交易时输入浮点数将报错。
									value: commonObj.commonFuncs.shiftNumber(
										0.001,
										-18
									),
								}
							);

							console.log(result);
						}
					})();
				}}
			>
				发起交易
			</button>

			<button
				onClick={function () {
					(async function () {
						/**
						 * 确保合约都载入完成
						 */
						if (contractOperator.data.isLoaded) {
							let result =
								await contractOperator.data.contracts.BuyStockNFT.methods
									.buyMidNFT()
									.send({
										//使用钱包的账号，如果未链接钱包即walletData.currentAccount = "",应该给出提示
										from: walletData.currentAccount,
										//这里是向这个“buyMidNFT”发起一个数额为0.001Matic的交易，由于Matic的缩进为18位，需要使用commonObj.shiftNumber来对数字进行缩进
										//直接向这里发起交易时输入浮点数将报错。
										value: commonObj.commonFuncs.shiftNumber(
											0.001,
											-18
										),
									});
							console.log(result);
						}
					})();
				}}
			>
				发起交易传统方式
			</button>

			<div>
				当前登陆的钱包账号:
				{walletData.currentAccount}
			</div>
		</div>
	);
};
export default ExcTwo;
```

# 使用 web3Express 内置的 GUI 完善您的应用体验

### 使用 web3Express.commonHook 中内置的 alt 函数和 ask 函数:

> 您可以使用 commonHook 中提供的一些便捷的函数制作完成类似 alert()或者 window.confirm 的体验，您的编码体验将会增强，用户的交互体验也会得到增强:

### alt():弹出警告

```javascript
	import Web3Express from "@bobliao/web3-express-react";

	//使用Web3Express导出useCommon,useWalletContext
	const { useCommon , useWalletContext} = Web3Express;

	//使用useWalletContext导出walletHelper
	const walletHelper = useWalletContext();

	//walletHelper包含两个对象
	//一个是walletData 另一个是walletFuncs
	const { walletData } = walletHelper;

	//导出公用函数集
	const { commonFuncs, alt, ask } = useCommon();

			<button
				onClick={function () {
					(async function () {
						/**
						 *检测用户钱包是否登录，未登录就警告用户登录
						 */
						if (walletData.currentAccount === "") {
							alt({
								message: "您没有登录钱包，请登录钱包再继续！",
							});

							return;
						}

						(...)

					})();
				}}
			>
				发起交易
			</button>

```

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_36620ba09146ccb713a07aa7e4b298a6_r.png)

#### alt():判断用户点击了确认键还是关闭了窗口

```javascript
/**
 *检测用户钱包是否登录，未登录就警告用户登录
 */
if (walletData.currentAccount === "") {
	/**
	 * 打开窗口时接收一个返回的result对象
	 * resultObj 包含两个东西
	 * 一个是 promise 也就是处理窗口按钮点击返回的Promise
	 * 一个是 window 就是窗口的控制对象
	 */
	let resultObj = alt({
		message: "您没有登录钱包，请登录钱包再继续！",
	});
	/**
	 * 通过 await resultObj.promise 来得到窗口按钮点击的返回值
	 */
	var buttonResult = await resultObj.promise;
	/**
	 * 将返回一个对象:
	 *
		{
			"status":"NO/YES",
			"data":{}
		}
		*/
	if (buttonResult.status === "YES") {
		console.log("点击了确认键");
	}
	if (buttonResult.status === "NO") {
		console.log("点击了关闭");
	}
	debugger;
	return;
}
```

### ask():弹出询问：

> 和 alt()的使用方法类似:

```javascript
/**
 *检测用户钱包是否登录，未登录就警告用户登录
 */
if (walletData.currentAccount === "") {
	/**
	 * 打开窗口时接收一个返回的result对象
	 * resultObj 包含两个东西
	 * 一个是 promise 也就是处理窗口按钮点击返回的Promise
	 * 一个是 window 就是窗口的控制对象
	 */
	let resultObj = ask({
		message: "您没有登录钱包，您需要登录钱包吗？",
	});
	/**
	 * 通过 await resultObj.promise 来得到窗口按钮点击的返回值
	 */
	var buttonResult = await resultObj.promise;
	/**
	 * 将返回一个对象:
	 *
	{
		"status":"NO/YES",
		"data":{}
	}
	*/
	if (buttonResult.status === "YES") {
		walletFuncs.triggerConnect();
	}
	if (buttonResult.status === "NO") {
		console.log("点击了取消键");
	}
	debugger;
	return;
}
```

![](https://raw.githubusercontent.com/AKAMKII6666/-bobliao-web3Express-react/main/excmpleImages/m_17991184128bf4aa68d5f2b9458a72da_r.png)

### 利用 contractOperator.funcs.send 的返回值对交易状态进行处理:

```javascript
let resultPromise = contractOperator.funcs.send("BuyStockNFT", "buyMidNFT", [], {
	//使用钱包的账号，如果未链接钱包即walletData.currentAccount = "",应该给出提示
	from: walletData.currentAccount,
	//这里是向这个“buyMidNFT”发起一个数额为0.001Matic的交易，由于Matic的缩进为18位，需要使用commonObj.shiftNumber来对数字进行缩进
	//直接向这里发起交易时输入浮点数将报错。
	value: commonFuncs.shiftNumber(0.001, -18),
});

/*
 *等待返回结果
 */
let result = await resultPromise;

/**
 * 交易成功
 */
if (result.status === "SUCCESSED") {
	alt({
		title: "交易訊息",
		message: "您已完成了交易",
	});
}

/**
 * 用户在metamask上点击了退出或者交易超时
 */
if (result.status === "USEREXIT") {
	alt({
		title: "交易訊息",
		message: "您已取消了交易",
	});
}

/**
 * 因为网络原因引起的交易错误
 */
if (result.status === "ERROR") {
	alt({
		title: "交易訊息",
		message: "交易失敗!請檢查您的網絡!",
	});
}
```

### 利用 switchCurrentNetWork 将用户选错的网络切换到准确的网络

> 通过 `switchCurrentNetWork`可以将错误的网络切换到往前运行环境下我们在合约配置里配置好的网络

```javascript
//使用这个判断是否为正确的网络（可使用effect监听）
contractOperator.data.isWrongNetWork; //ture:错误的网络  ,false:网络正常

//使用这个唤出钱包自带的切换网络的界面，切换到项目需求的网络
contractOperator.funcs.switchCurrentNetWork();

//使用案例
if (contractOperator.data.isWrongNetWork) {
	contractOperator.funcs.switchCurrentNetWork();
}
```

# commonHook 导出内容一览:

| 对象名称    | 子对象             | 参数                                                  | 返回                         | 说明                                                                                             |
| ----------- | ------------------ | ----------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| data        | .isMounted         | -                                                     | boolean                      | common 对象是否已经挂载                                                                          |
| data        | .envTag            | -                                                     | string                       | 当前运行环境的字符 来自 RUNNING_ENV 自定义环境变量,内容有 "production","gray","devlopment"       |
| data        | .isRunningInServer | -                                                     | boolean                      | true 表示当前代码在服务器上渲染中,false 表示当前代码在客户机上运行                               |
| commonFuncs | .setData           | data = `{key:value}`                                  | void                         | 设置 data 里的内容                                                                               |
| commonFuncs | .findScrollNode    | \_parent = `jqueryObject`                             | `jqueryObject`               | 输入一个 jquery 对象,从这个对象开始往上查找第一个遇到的带有`scroll:auto`属性的节点并返回这个节点 |
| commonFuncs | .setCookie         | `name: string, value: string, time: string or number` | void                         | 设置 cookie                                                                                      |
| commonFuncs | .delCookie         | `name: string`                                        | void                         | 删除 cookie                                                                                      |
| commonFuncs | .getCookie         | `name: string`                                        | ` void or string`            | 获得 cookie                                                                                      |
| commonFuncs | .getAngle          | `pt1: pointCoord, pt2: pointCoord`                    | number                       | 根据两个坐标点 获取角度                                                                          |
| commonFuncs | .changeTextArea    | `_e: jQueryObject`                                    | void                         | 当 textArea 更改的时候改变高度[react]                                                            |
| commonFuncs | .getLength         | `p1: pointCoord, p2: pointCoord`                      | number                       | 获得两点之间的距离                                                                               |
| commonFuncs | .getRand           | `Max: number, Min: number`                            | number                       | 获得一个随机数                                                                                   |
| commonFuncs | .thousandsSplit    | `num: number`                                         | string                       | 千分位分割                                                                                       |
| commonFuncs | .getUnitNumber     | `_num: number, _lan: string, _fix: number`            | string                       | 通过语言信息获得单位换算                                                                         |
| commonFuncs | .getUrlParams      | void                                                  | object                       | 提取 url 参数                                                                                    |
| commonFuncs | .isNumber          | `\_str: string                                        | number`                      | boolean                                                                                          | 判断是否为数字 |
| commonFuncs | .setUrlParam       | `_key: string, _val: string`                          | void                         | 设置 url 参数                                                                                    |
| commonFuncs | .removeDuplicate   | `array: Array<any>, callBack: Function`               | `Array<any>`                 | 去重算法                                                                                         |
| commonFuncs | .newGuid           | void                                                  | string                       | 获得一个 gui ID                                                                                  |
| commonFuncs | .formatDate        | `date: Date, format: string`                          | string                       | 格式化时间                                                                                       |
| commonFuncs | .getDayOfWeek      | `_date: Date or string`                               | string                       | 获得当前是周几                                                                                   |
| commonFuncs | .getTimeOfDay      | `_date: Date`or string                                | 获得一天每个时间段的文字描述 |
| commonFuncs | .getColorOfDay     | `_value: string`                                      | string                       | 获得一天中时间的的色彩                                                                           |
| commonFuncs | .dateAddDays       | `dateStr: string, dayCount: number`                   | Date                         | 增加天数                                                                                         |
| commonFuncs | .dateMDays         | `dateStr: string, dayCount: number`                   | Date                         | 减去天数                                                                                         |
| commonFuncs | .dateAddHours      | `dateStr: string, HCount: number`                     | Date                         | 增加小时                                                                                         |
| commonFuncs | .dateMHours        | `dateStr: string, HCount: number`                     | Date                         | 减去小时                                                                                         |
| commonFuncs | .isJsonObject      | `_data: any`                                          | boolean                      | 判断是否为 json 对象                                                                             |
| commonFuncs | .shiftNumber       | `_number: string or number, _shiftLength: number`     | string                       | 换算区块链的数字单位                                                                             |
| alt         | -                  | `{title:string,message:string}`                       | any                          | 弹出警告窗口                                                                                     |
| ask         | -                  | `{title:string,message:string}`                       | any                          | 弹出询问窗口                                                                                     |
| print       | -                  | `message:string`                                      | Function                     | 用小气泡打印一行字                                                                               |
| popUp       | -                  | `elements: ReactElement,time: number`                 | Promise                      | 用小气泡打印 react 组件                                                                          |
| printAlt    | -                  | `参考代码`                                            | any                          | 用小气泡打印待确定按钮的警告窗口                                                                 |
| printAsk    | -                  | `参考代码`                                            | any                          | 用小气泡打印待确定/取消的询问窗口                                                                |
| printWarn   | -                  | `warnProps`                                           | warnReturn                   | 打印各类带图标的警告气泡                                                                         |
| warn        | -                  | `warnProps`                                           | warnReturn                   | 弹出各类带图标的警告弹窗                                                                         |

---

感谢您的阅读</br>
Thank you to check this out</br>
英文文档和视频解说正在筹划中，敬请期待。</br>
English version and viedo explanation is comming soon.</br>
任何问题或交流请联系：</br>
Contact:</br>
liaoli66@gmail.com</br>
Telegram group:</br>
https://t.me/+h1HY2q-G5ApmYjU1
