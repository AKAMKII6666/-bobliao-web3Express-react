import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    FC,
    JSXElementConstructor,
    CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { useCommonContext } from '../../publicHooks/commonHook';
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';
/**
 * =============css=============
 */
import './index.scss';

/**
 * 面板样式列表
 */
export enum EpanelStypeTypes {
    /**
     * 空
     */
    EMPTY = 'rrt-p-empty',

    /**
     * 页面全局底板
     */
    PAGE = 'rrt-p-page',
    /**
     * 左边主菜单样式
     */
    LEFTMENU = 'rrt-p-leftMenu',
    /**
     * 第一层底板样式
     */
    _1LEVEL = 'rrt-p-1Level',
    /**
     * 第二层底板样式
     */
    _2LEVEL = 'rrt-p-2Level',
    /**
     * 第三层底板样式
     */
    _3LEVEL = 'rrt-p-3Level',
    /**
     * 给窗口准备的面板样式
     */
    WINDOWLAY = 'rrt-p-windowLay',
    /**
     * 没有样式
     */
    NONE = '',
}

/**
 * 边距类型
 */
export enum EpanelPaddingTypes {
    /**
     * 最外面的大菜单
     */
    LEFTMENU = 'rrt-p-paddingtype-leftMenu',
    /**
     * 表示margin 0 padding 0
     */
    _0_0 = 'rrt-p-paddingtype-0-0',
    /**
     * 表示margin 30 padding 30
     */
    _30_30 = 'rrt-p-paddingtype-30-30',
    /**
     * 表示margin 20 padding 20
     */
    _20_20 = 'rrt-p-paddingtype-20-20',
    /**
     * 表示margin 0 padding 30
     */
    _0_30 = 'rrt-p-paddingtype-0-30',
    /**
     * 表示margin 0 padding 20
     */
    _0_20 = 'rrt-p-paddingtype-0-20',
    /**
     * 页面主体右边的结构
     */
    RIGHTCONTAINER = 'rrt-p-paddingtype-rightContainer',
    /**
     * 没有边距
     */
    NONE = '',
}

/**
 * 浮动设置
 */
export enum EpanelFloat {
    LEFT = 'rrt-p-floatLeft',
    RIGHT = 'rrt-p-floatRight',
    NONE = '',
}

/**
 *参数
 */
export interface Iprops {
    /**
     * 子元素
     */
    children?: ReactElement | any;
    /**
     * 样式类型
     */
    styleType?: EpanelStypeTypes;
    /**
     * 边距类型
     */
    paddingTypes?: EpanelPaddingTypes;
    /**
     * 附加样式
     */
    className?: string;
    /**
     * 附加样式
     */
    style?: any;
    /**
     * 浮动设置
     */
    float?: EpanelFloat;
}

const panel: FC<Iprops> = (
    {
        children = null,
        styleType = EpanelStypeTypes.NONE,
        paddingTypes = EpanelPaddingTypes.NONE,
        className = '',
        style = {},
        float = EpanelFloat.NONE,
    },
    _ref
): ReactElement => {
    const { data, commonFuncs, alt, ask, print, popUp } = useCommonContext();
    const $ = useJquery();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(function (): ReturnType<React.EffectCallback> {
        if (isMounted === false) {
            setIsMounted(true);
        }
        return function (): void {
            setIsMounted(false);
        };
    }, []);

    return (
        <>
            <div
                className={'rrtb-panel ' + styleType + ' ' + paddingTypes + ' ' + className + ' ' + float}
                style={style}
            >
                {children}
            </div>
        </>
    );
};

export default panel;
