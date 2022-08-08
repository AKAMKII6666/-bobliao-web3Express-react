import { ReactElement } from 'react';
/**
 * useReso 钩子返回的东西
 */
export default interface Ireso {
  /**
   * 数据
   */
  data: {
    /**
     * 用于服务器端渲染时,进行分辨率预计算的写入元素
     */
    helTags: ReactElement;
  };
  /**
   * 返回初始化好的mobileAdp对象
   */
  funcs: any;
}

/**
 * 设置分辨率适配器的工作模式
 */
export enum EresoMode {
  /**
   * auto:自动选择高度还是宽度来调整
   */
  AUTO = 'auto',
  /**
   * width:只通过宽度调整
   */
  WIDTH = 'width',
  /**
   * height:只通过高度调整
   */
  HEIGHT = 'height',
}

/**
 * 用于分辨率适配器的参数
 */
export interface Iconfig {
  /**
   * 页面字体基准
   */
  fontSize: number;
  /**
   * 设计稿的宽度
   */
  designWidth: number;
  /**
   * 设计稿的高度
   */
  designHeight: number;
  /**
   * 缩放限制参数
   * 用于限制页面的缩放大小
   */
  scaleLimit?: {
    /**
     * 是否打开缩放限制
     */
    enable: boolean;
    /**
     * 最大的宽度限制
     */
    maxWidth?: number;
    /**
     * 最小的宽度限制
     */
    minWidth?: number;
    /**
     * 最大的高度
     */
    maxHeight?: number;
    /**
     * 最小的高度
     */
    minHeight?: number;
  };
  /**
   * 横屏回调函数
   */
  hCallBack?: Function;
  /**
   * 竖屏回调函数
   */
  vCallBack?: Function;
  /**
   * 调整模式
   */
  mode?: EresoMode;
}

/**
 * 用于分辨率适配器的参数
 * 多参数适配
 */
export interface IconfigMutiple {
  /**
   * 查询条件
   */
  queryList: Array<Imq>;
}

export interface Imq {
  /**
   * 查询当前窗体的宽度例如
   * '(min-width: 1824px)'
   * '(max-width: 1224px)'
   * 符合条件的就使用config来进行适配
   */
  mediaQuery: {
    /**
     * 查询条件
     */
    screenState: EscreenState;
    /**
     * 范围控制
     */
    scope?: queryItem;
    /**
     * 适配参数
     */
    config: Iconfig;
  };
}

/**
 * 屏幕状态
 */
export enum EscreenState {
  /**
   * 横向屏幕
   */
  HORIZONTAL = 'h',
  /**
   * 竖屏显示
   */
  VERTICAL = 'v',
}

/**
 * 屏幕比例适配
 */
export interface queryItem {
  /**
   * 开始宽度
   */
  startWidth: number;
  /**
   * 结束宽度
   * -1表示无限大
   */
  endWidth: number;
  /**
   * 开始高度
   */
  startHeight: number;
  /**
   * 结束高度
   * -1表示无限大
   */
  endHeight: number;
}
