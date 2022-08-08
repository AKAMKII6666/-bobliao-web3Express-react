import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';
/**
 * =============css=============
 */
import './index.scss';

/**
 * 按钮大小选择
 */
export enum Ebsize {
    /**
     * 最大的
     */
    LARGE = 'rrtb-size-large',
    /**
     * 中等的
     */
    MID = 'rrtb-size-mid',
    /**
     * 小的
     */
    SMALL = 'rrtb-size-small',
}

/**
 * 按钮颜色选择
 */
export enum Ebcolor {
    /**
     * 白色
     */
    WHITE = 'rrtb-color-white',
    /**
     * 橘黄色
     */
    ORANGE = 'rrtb-size-orange',
    /**
     * 灰色
     */
    GRAY = 'rrtb-size-gray',
}

/**
 * 按钮状态
 */
export enum Ebstate {
    /**
     * 激活状态
     */
    ENABLED = 'rrtb-state-enabled',
    /**
     * 不能点击
     */
    DISABLED = 'rrtb-state-disabled',
}

/**
 * 参数接口
 */
export interface Iprops {
    /**大小 */
    size?: Ebsize;
    /**颜色 */
    color?: Ebcolor;
    /**
     * 点击事件
     */
    onClick?: Function;
    /**
     * 要放入的内容
     */
    children?: ReactElement | string;
    /**
     * 按钮状态
     */
    state?: Ebstate;
    /**
     * disabled消息
     */
    disabledMessage?: ReactElement | string;
    /**
     * 是否往按钮上绑定样式
     */
    addClass?: string;
}

const button: FC<Iprops> = (
    {
        /**大小 */
        size = Ebsize.LARGE,
        /**颜色 */
        color = Ebcolor.GRAY,
        /**
         * 点击事件
         */
        onClick = function () {},
        /**
         * 要放入的内容
         */
        children = null,
        /**
         * 按钮的状态
         */
        state = Ebstate.ENABLED,
        /**
         * disabled消息
         */
        disabledMessage = '',
        /**
         * 是否往按钮上绑定样式
         */
        addClass = '',
    },
    _ref
): ReactElement => {
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
                onClick={function (_e) {
                    if (state === Ebstate.DISABLED) {
                        if (disabledMessage !== '') {
                        }
                    } else {
                        onClick(_e);
                    }
                }}
                className={'rrt_button ' + size + ' ' + color + ' ' + state + ' ' + addClass}
            >
                {children}
            </div>
        </>
    );
};

export default button;
