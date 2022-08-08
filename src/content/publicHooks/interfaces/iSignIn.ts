/**
 * 用户的登陆信息
 */
export default interface IuserSateInfo {
  /**
   * 用户的账号
   */
  publicAddress: string;
  /**
   * 签名信息
   */
  signature: string;
  /**
   * 签名消息
   */
  message: string;
  /**
   * 签名信息
   */
  token: string;
  /**
   * 后端验证过之后的签名
   */
  backEndToken: string;
  /**
   * 签名到期时间
   */
  expires_in: string;
  /**
   * 签名时间
   */
  loginDate: string;
}
