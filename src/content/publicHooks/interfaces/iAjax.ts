/**
 * ajax接口配置文件
 */
export default interface IajaxConfig {
  /**
   * 接口名称
   */
  cgiName: string;
  /**
   * 开发环境访问链接
   */
  devPort: string;
  /**
   * 灰度环境访问链接
   */
  grayPort: string;
  /**
   * 发布环境访问链接
   */
  proPort: string;
  /**
   * 接口配置块
   */
  (...args: IajaxBlock[]);
}

/**
 * 接口配置块
 */
export interface IajaxBlock {
  /**
   * 接口访问路径
   */
  url: string;
  /**
   * 接口使用的请求方式
   */
  method: string;
  /**
   * url参数还是json参数
   */
  paramsType?: string;
  /**
   * 默认参数
   */
  defaultPatams?: string;
  /**
   * 接口说明
   */
  desc: string;
}

/**
 * 发送 ajax请求时使用的发送参数类型
 */
export enum ErequestSendType {
  /**
   * 表单参数的形式
   */
  FORM = 'form',
  /**
   * json对象的形式
   */
  JSON = 'json',
}

/**
 * fetch用的参数合集
 */
export interface IfetchCondition {
  /**
   * 接口名称(对应当前载入的接口配置文件中的接口)
   */
  name: string;
  /**
   * 发送的数据,json格式(可选)
   * (requestSendType为form的情况下,直接填写json数据)
   * (requestSendType为json的情况下,需要将您的json数据JSON.stringify()之后再填写进来)
   */
  params?: Iparams | string;
  /**
   * URL参数(可选)
   * 示例:
   * {
   *      key:value
   *      (...)
   * }
   */
  urlPar?: Iparams;
  /**
   * 数据类型(可选)
   */
  dataType?: string;
  /**
   * 请求头参数(可选)
   * 示例:
   * {
   *      key:value
   *      (...)
   * }
   */
  headersPar?: Iparams;
  /**
   * 发送数据时使用说明方式发送 关联 ErequestSendType
   */
  requestSendType?: ErequestSendType;
}

/**
 * 请求用的参数
 */
export interface Iparams {
  [propName: string]: any;
}
