/**
 * 警告组件
 * 廖力编写
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC } from 'react';
import { ReactElement } from 'react';
import { useCommonContext } from '../../publicHooks/commonHook';
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';
/**
 * =====================================css============================================
 */
import './index.scss';

/**
 * 图标枚举
 */
export enum EWarnIcons {
    /**
     * 钱包图标
     */
    WALLET = 'icon-wallet',
    /**
     * 链接图标
     */
    LINK = 'icon-link',
    /**
     * 地球图标
     */
    GLOBAL = 'icon-global',
    /**
     * 小人图标
     */
    PERSION = 'icon-person',
    /**
     * 没有图标
     */
    NONE = 'icon-none',
    /**
     * 操作完成
     */
    SUCCESSED = 'icon-successed',
    /**
     * 错误
     */
    ERROR = 'icon-error',
    /**
     * 警告
     */
    WARN = 'icon-warn',
}

/**
 * 类型枚举
 */
export enum EwarnTypes {
    /**
     * 大的警告
     */
    LARGE = 'type-large',
    /**
     * 小的警告
     */
    SMALL = 'type-small',
}

/**
 * 参数的接口
 */
export interface Iprops {
    /**
     * 警告的标题
     */
    title?: string | ReactElement | Array<ReactElement>;
    /**
     * 警告的内容
     */
    content?: string | ReactElement | Array<ReactElement>;
    /**
     * 警告显示的图标
     */
    icon?: EWarnIcons;
    /**
     * 放按钮的位置
     */
    children?: any;
    /**
     * 警告的大小
     */
    type?: EwarnTypes;
}

const Warn: FC<Iprops> = ({
    /**
     * 警告的标题
     */
    title = '-',
    /**
     * 警告的内容
     */
    content = '-',
    /**
     * 警告显示的图标
     */
    icon = EWarnIcons.GLOBAL,
    /**
     * 放按钮的位置
     */
    children = null,
    /**
     * 警告的大小
     */
    type = EwarnTypes.LARGE,
}): ReactElement => {
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
            <div className={'rrt-warn ' + type}>
                <div className="rrt-warnTitle">
                    <span className={icon}></span>
                    <label>{title}</label>
                </div>
                <div className="rrt-warnContainer">{content}</div>
                {(function () {
                    if (children !== null) {
                        return <div className="rrt-warnBtnContainer">{children}</div>;
                    }
                })()}
            </div>
        </>
    );
};

export default Warn;
