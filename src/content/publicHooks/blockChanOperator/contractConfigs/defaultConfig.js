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
			provider: "https://polygon-rpc.com/",
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
			provider: "https://polygon-rpc.com/",
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
			provider: "https://polygon-rpc.com/",
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
