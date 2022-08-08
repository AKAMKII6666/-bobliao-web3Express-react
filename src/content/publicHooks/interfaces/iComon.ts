import { EwarnTypes, EWarnIcons } from '../../components/warn/index';
import { jQueryObject } from '@bobliao/use-jquery-hook';
/**
 * commonContext接口声明
 */
export default interface IcommonContext {
    /**
     * 导出的数据
     */
    data: IcommonData;
    /**
     * 导出的函数
     */
    commonFuncs: IcommonFuncs;
    /**
     * 弹出警告框
     */
    alt: Function;
    /**
     * 弹出询问框
     */
    ask: Function;
    /**
     * 打印
     */
    print: Function;
    /**
     * 弹出自定义打印框
     */
    popUp: Function;
    /**
     * 打印警告
     */
    printAlt: Function;
    /**
     * 打印询问
     */
    printAsk: Function;
    /**
     * 弹出各类警告
     * 例如没安装钱包等
     */
    warn: ImakeWarn | Function;
    /**
     * 弹出警告小气泡
     */
    printWarn: ImakeWarn | Function;
}

/**
 * 打印控件的参数集
 */
export type tPrint = {
    /**
     * 指示在哪个元素上打印
     */
    e?: any | string;
    /**
     * 顶部空间
     */
    topMove?: number;
    /**
     * 消息文本
     */
    m: any | string;
    /**
     * 消失时间
     */
    time?: number | string;
    /**
     * 附加行样式
     */
    style?: string;
    /**
     * 颜色
     */
    borderColor?: string;
    /**
     * 是否需要关闭按钮
     */
    closeBtn?: boolean;
    /**
     * 附加样式
     */
    classAdd?: IpClass;
};

/**
 * 弹出warn的类型
 */
export enum EwarnMtype {
    /**
     * 需要安装钱包
     */
    NOWALLET,
    /**
     * 钱包没有初始化
     */
    WALLETINITLIZE,
    /**
     * 没有链接钱包账号
     */
    NOTCONNECTED,
    /**
     * 没有切换到正确的网络
     */
    WRONGNETWORK,
    /**
     * 没有签名登陆不能操作
     */
    NOTSIGND,
    /**
     * 自定义内容
     */
    DIY,
}

/**
 * 返回的warn
 */
export interface warnReturn {
    /**
     * 返回用户操作的结果
     */
    promise: Promise<IstateResult>;
    /**
     * 返回窗口对象
     */
    windowLay: any;
}

/**
 * warnProps 参数
 */
export interface warnProps {
    /**
     * 标题
     */
    title?: string;
    /**
     * 内容
     */
    content?: string;
    /**
     * 按钮内容
     */
    buttonText?: string;
    /**
     * 图标
     */
    icon?: EWarnIcons;
    /**
     * 弹出内容类型
     */
    contentType?: EwarnMtype;
    /**
     * 持续时间
     */
    time?: string | number;
}

/**
 * warn的接口
 */
export interface ImakeWarn {
    (config: warnProps): warnReturn;
}

/**
 * 警告消息元素
 */
export interface warnContentsItem {
    /**
     * 标题
     */
    title: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 按钮内容
     */
    buttonText: string;
    /**
     * 图标
     */
    icon?: EWarnIcons;
}

/**
 * 导出的函数
 */
export interface IcommonFuncs {
    /**
     * 设置数据
     */
    setData?: Function;
    /**
     * 找到最近的scrollTop不为0的节点
     */
    findScrollNode?: Function;
    /**
     * 设置cookie
     */
    setCookie?: Function;
    /**
     * 删除cookie
     */
    delCookie?: Function;
    /**
     * 获取cookie
     */
    getCookie?: Function;
    /**
     * 根据两个坐标点 获取角度
     */
    getAngle?: Function;
    /**
     * 当textArea更改的时候改变高度[react]
     */
    changeTextArea?: Function;
    /**
     * 获得两点之间的距离
     */
    getLength?: Function;
    /**
     * 获得一个随机数
     */
    getRand?: Function;
    /**
     * 千分位分割
     */
    thousandsSplit?: Function;
    /**
     * 通过语言信息获得单位换算
     */
    getUnitNumber?: Function;
    /**
     * 提取url参数
     */
    getUrlParams?: Function;
    /**
     * 判断是否为数字
     */
    isNumber?: Function;
    /**
     * 设置url参数
     */
    setUrlParam?: Function;
    /**
     * 去重算法
     */
    removeDuplicate?: Function;
    /**
     * 获得一个gui ID
     */
    newGuid?: Function;
    /**
     * 格式化时间
     */
    formatDate?: Function;
    /**
     * 获得当前是周几
     */
    getDayOfWeek?: Function;
    /**
     * 获得一天每个时间段的文字描述
     */
    getTimeOfDay?: Function;
    /**
     * 获得一天中时间的的色彩
     */
    getColorOfDay?: Function;
    /**
     * 增加天数
     */
    dateAddDays?: Function;
    /**
     * 减去天数
     */
    dateMDays?: Function;
    /**
     * 增加小时
     */
    dateAddHours?: Function;
    /**
     * 减去小时
     */
    dateMHours?: Function;
    /**
     * 判断是否为json对象
     */
    isJsonObject?: Function;
    /**
     * 换算区块链的数字单位
     */
    shiftNumber?: Function;
    /**
     * 獲得進程動畫的百分比
     */
    getAniPrecent?: Function;
    /**
     * 通過百分比和初始值和最終值，獲得動畫的當前進程
     */
    computAniProgress?: Function;
}

/**
 * 导出的数据
 */
export interface IcommonData {
    /**
     * 是否已经挂载
     */
    isMounted?: boolean;
    /**
     * 当前运行环境
     */
    envTag?: string;
    /**
     * 是否在服务端上运行
     */
    isRunningInServer?: boolean;
    /**
     * 屏幕狀態
     */
    screenState?: string;
}

/**
 * 坐标点的接口
 */
export interface pointCoord {
    /**
     * x坐标
     */
    x: number;
    /**
     * y坐标
     */
    y: number;
}

/**
 * 需要给common传的参数
 */
export interface IuseCommonProp {
    RUNNING_ENV: string;
}

/**
 * alt使用的接口
 */
export interface Ialt {
    /**
     * 窗口的标题
     */
    title?: string;
    /**
     * 窗口显示的消息
     */
    message?: string;
    /**
     * 点击“确定”按钮后的回调函数
     */
    callBack?: Function;
}

/**
 * ask使用的接口
 */
export interface Iask {
    /**
     * 窗口的标题
     */
    title?: string;
    /**
     * 窗口显示的消息
     */
    message?: string;
    /**
     * 点击“确定”按钮后的回调函数
     */
    yesCall?: Function;
    /**
     * 点击“取消”按钮后的回调函数
     */
    noCall?: Function;
}

/**
 * 状态返回枚举
 */
export enum ResultStateus {
    /**
     * 成功
     */
    SUCCESSED = 'SUCCESSED',
    /**
     * 用户自己点击退出
     */
    USEREXIT = 'USEREXIT',
    /**
     * 登陆错误
     */
    LOGINERROR = 'LOGINERROR',
    /**
     * 错误,未知错误
     */
    ERROR = 'ERROR',
    /**
     * 正在进行,未结束
     */
    PADDING = 'PADDING',
    /**
     * 确定
     */
    YES = 'YES',
    /**
     * 取消
     */
    NO = 'NO',
    /**
     * 当前在服务器端运行的状态
     */
    SERVERSIDE = 'SERVERSIDE',
    /**
     * 没有安装钱包
     */
    NOWALLET = 'NOWALLET',
    /**
     * 网络不对
     */
    WRONGNETWORK = 'WRONGNETWORK',
    /**
     * 没有登陆钱包
     */
    WALLETNOTCONNECTED = 'WALLETNOTCONNECTED',
    /**
     * 用户未签名登陆
     */
    USERUNSIGNED = 'USERUNSIGNED',
    /**
     * 用户已签名登陆
     */
    USERSIGNED = 'USERSIGNED',
}

/**
 * 打印的样式枚举
 */
export enum IpClass {
    /**
     * 红色,一般用于警告
     */
    RED = 'arrow-consoleLay-red',
    /**
     * 蓝色,一般用于信息提示
     */
    BLUE = 'arrow-consoleLay-blue',
    /**
     * 白色,一般用于信息提示
     */
    WHITE = 'arrow-consoleLay-white',
    /**
     * 黑色,一般用于信息提示
     */
    BLACK = 'arrow-consoleLay-black',
    /**
     * 绿色,一般用于操作成功
     */
    GREEN = 'arrow-consoleLay-green',
    /**
     * 橙黄色,一般用于警告
     */
    ORANGE = 'arrow-consoleLay-orange',
}

/**
 * 状态返回接口
 */
export interface IstateResult {
    /**
     * 指示请求的状态
     */
    status: ResultStateus;
    /**
     * 指示请求返回的数据
     */
    data: any;
}
