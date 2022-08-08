/**
 * 钱包操作器的工作状态
 */
export enum EwalletMode {
  ETHEREUM = 'ethereum',
  WALLETCONNECT = 'walletConnect',
}

/**
 *钱包导出的数据
 */
export default interface IwalletData {
  /**
   * 当前链接的账号
   */
  currentAccount?: string;
  /**
   * 当前使用的是哪个网络
   */
  currentNetwork?: string;
  /**
   * 当前是否已经安装了钱包
   */
  isWalletInstalled?: boolean;
  /**
   * 当前是否链接了钱包
   */
  isConnectedWallet?: boolean;
  /**
   * 钱包对象
   */
  ethereum?: any;
  /**
   * 状态更改指示
   * 一旦钱包登陆用户更改,或者网络更改
   * 都会触发这个状态的更改
   */
  changeStemp?: number;
  /**
   * 是否为trustWallet
   * trustWallet不支持切换网络,需要提示用户手动切换
   * 这里为true就提示用户手动切换
   */
  isTrustWallet?: boolean;
  /**
   * 钱包状态更改次数
   */
  changeTimes?: number;
  /**
   * 刚安装完钱包,如果不刷新页面钱包可能会未初始化
   */
  isWalletUnInitlized?: boolean;
  /**
   * 用于显示的账号信息
   */
  currentDisplayAccount?: string;
  /**
   * 工作模式
   */
  workingMode?: EwalletMode;
}

/**
 * 钱包操作器导出的函数
 */
export interface IwalletFuncs {
  /**
   * 检测钱包是否存在
   * 返回boolean
   */
  detactWallet?: Function;
  /**
   * 检测用户是否链接钱包
   * 返回boolean
   */
  detactConnect?: Function;
  /**
   * 触发链接钱包
   */
  triggerConnect?: Function;
  /**
   * 添加网络
   */
  addNetWork?: Function;
  /**
   * 切换网络
   */
  switchNetWork?: Function;
  /**
   * 触发钱包远程链接
   */
  trigger_WalletConnect_connect?: Function;
  /**
   * 断开链接
   */
  disConnect?: Function;
}

/**
 * 钱包操作器的Context接口
 */
export interface IwalletHelperContext {
  /**
   * 钱包导出的数据
   */
  walletData: IwalletData;
  /**
   * 钱包导出的函数
   */
  walletFuncs: IwalletFuncs;
}

/**
 * 表示网络的接口
 */
export interface InetWork {
  /**
   * 依赖的网络id
   */
  depChainId: number;
  /**
   * 依赖的网络名称
   */
  depChainName: string;
  /**
   * web3链接节点的地址
   */
  provider: string;
  /**
   * web3链接节点的符号
   */
  symbol: string;
  /**
   * 查询浏览器的访问地址
   */
  visitUrl: string;
  /**
   * 小数位数
   */
  decimals: number;
}
