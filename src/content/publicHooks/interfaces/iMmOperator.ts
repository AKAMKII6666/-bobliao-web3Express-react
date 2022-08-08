import { EWorkingMode } from '../blockChanOperator/mmOperatorHook';
import { InetWork } from './iWalletHelper';

/**
 * 区块链操作器钩子返回的对象
 */
export default interface ImmOperator {
  /**
   * 返回的数据
   */
  data: any;
  /**
   * 返回的函数
   */
  funcs: any;
}

/**
 * 合约的配置体
 */
export interface IcontractConfig {
  dev: IconfigBlock;
  pro: IconfigBlock;
}

/**
 * 合约的单项配置体
 */
export interface IconfigBlock {
  /**
   * 合约的环境配置
   */
  info: InetWork;
  (...args: I_contractBlock[]);
}

/**
 * 每项合约的配置
 */
export interface I_contractBlock {
  /**
   * 合约id
   */
  id: string;
  /**
   * abi本地文件位置
   */
  abiFileName: string;
  /**
   * 在线的abi文件地址,可以通过这个地址直接拿取线上的abi文件
   */
  abiOnline: string;
  /**
   * web3链接节点的地址
   */
  provider: string;
  /**
   * 异步获得本地版本的abi文件
   */
  getAbiAsync: Function;
  /**
   * 依赖哪个网络
   */
  depNetWork: string;
}

/**
 * 签名函数返回的值
 */
export interface IuserSignResult {
  /**
   * web3-eth-personal Token
   */
  token: string;
  /**
   * 签名的消息
   */
  message: string;
  /**
   * web3-token
   */
  runningToken: string;
}

/**
 * 返回的对象结构
 */
export interface Irobj {
  data: {
    /**
     * 是否已经挂载
     */
    isMounted: boolean;
    /**
     * 当前合约操作器的工作模式
     */
    workingMode: EWorkingMode;
    /**
     * 当前载入的合约对象
     */
    contracts: any;
    /**
     * 是否已经载入完成
     */
    isLoaded: boolean;
    /**
     * 操作器加载合约次数
     */
    changeTimes: number;
    /**
     * 是否为错误的网络
     */
    isWrongNetWork: boolean;
    /**
     * 当前使用的合约配置
     */
    currentConfig: IconfigBlock;
  };
  funcs: {
    /**
     * 获得当前能拿到的provider
     */
    getProvider: Function;
    /**
     * 获得操作器
     */
    makeOperator: Function;
    /**
     * 初始化合约
     */
    initContract: Function;
    /**
     * 获得用户钱包余额
     */
    getUserBalance: Function;
    /**
     * 批量操作合约
     */
    mutilRequest: Function;
    /**
     * 获得正确的网络
     */
    switchCurrentNetWork: Function;
    /**
     * 签名
     */
    getSignForLogin: Function;
    /**
     * 发送交易
     */
    send: Function;
  };
}
