/**
 * 图标组件
 * 廖力编写
 * 2022/04/11
 */
import React, { useState, useEffect, Fragment, useRef, ReactElement, FC, CSSProperties } from 'react';
import useJquery, { jQueryObject, isRunningInServer } from '@bobliao/use-jquery-hook';
import { useCommonContext } from '../../publicHooks/commonHook';
import './index.scss';

/**
 * icon枚举
 */
export enum EBasicIcons {
    /**
     * 光碟图标
     */
    DISK = 'icon-disk',
    /**
     * 头像图标
     */
    AVATOR = 'icon-avator',
    /**
     * 日历图标
     */
    CALENDAR = 'icon-calendar',
    /**
     * 数量图标
     */
    COUNT = 'icon-count',
    /**
     * 货币图标
     */
    COINS = 'icon-coins',
    /**
     * emai图标
     */
    EMAIL = 'icon-email',
    /**
     * 搜索图标
     */
    SEARCH = 'icon-search',
    /**
     * 地球圖標
     */
    GLOBAL = 'icon-global',
    /**
     * 菜单 - 主页图标
     */
    MENU_HOME = 'icon-menu-home',
    /**
     * 菜单 - 主页图标 - 灰色
     */
    MENU_HOME_GRAY = 'icon-menu-home-gray',
    /**
     * 菜单 - 排行榜图标
     */
    MENU_RANKING = 'icon-menu-ranking',
    /**
     * 菜单 - 排行榜图标 - 灰色
     */
    MENU_RANKING_GRAY = 'icon-menu-ranking-gray',
    /**
     * 菜单 - 音乐人页面图标
     */
    MENU_ARTIST = 'icon-menu-artist',
    /**
     * 菜单 - 音乐人页面图标 - 灰色
     */
    MENU_ARTIST_GRAY = 'icon-menu-artist-gray',
    /**
     * 菜单 - 帖子页面图标
     */
    MENU_POST = 'icon-menu-post',
    /**
     * 菜单 - 帖子页面图标 - 灰色
     */
    MENU_POST_GRAY = 'icon-menu-post-gray',
    /**
     * 菜单 - 我的资产页面图标
     */
    MENU_MINE = 'icon-menu-mine',
    /**
     * 菜单 - 我的资产页面图标 - 灰色
     */
    MENU_MINE_GRAY = 'icon-menu-mine-gray',
    /**
     * 菜单 - 问答页面图标
     */
    MENU_QAA = 'icon-menu-qaa',
    /**
     * 菜单 - 问答页面图标 - 灰色
     */
    MENU_QAA_GRAY = 'icon-menu-qaa-gray',
    /**
     * 喜欢（心形）图标 - 亮起
     */
    MENU_LIKE = 'icon-menu-like',
    /**
     * 喜欢（心形） - 灰色
     */
    MENU_LIKE_GRAY = 'icon-menu-like-gray',
    /**
     * 谈话图标 - 亮起
     */
    MENU_TALK = 'icon-menu-talk',
    /**
     * 谈话图标 - 灰色
     */
    MENU_TALK_GRAY = 'icon-menu-talk-gray',

    /**
     * 鐘圖標
     */
    BELL = 'icon-bell',
    /**
     * 錢包
     */
    WALLET = 'icon-wallet',
}

/**
 * size枚举
 */
export enum EBasicIconsSize {
    SMALL = 'icon-small',
    MID = 'icon-mid',
    LARGE = 'icon-large',
}

/**
 * 对齐枚举
 */
export enum EBasicIconsFloat {
    LEFT = 'floatLeft',
    RIGHT = 'floatRight',
    NONE = '',
}

/**
 * 参数
 */
export interface Iprops {
    /**
     * 显示什么图标
     */
    icon: EBasicIcons;
    /**
     * 显示大小
     */
    size?: EBasicIconsSize;
    /**
     * 对齐方式
     */
    float?: EBasicIconsFloat;
    /**
     * 附加样式
     */
    style?: CSSProperties;
    /**
     * 附加样式表
     */
    classAdd?: string;
}

const Icon: FC<Iprops> = ({
    /**
     * 显示什么图标
     */
    icon = EBasicIcons.COUNT,
    /**
     * 显示大小
     */
    size = EBasicIconsSize.SMALL,
    /**
     * 对齐方式
     */
    float = EBasicIconsFloat.NONE,
    /**
     * 附加样式
     */
    style = {},
    /**
     * 附加样式表
     */
    classAdd = '',
}): ReactElement => {
    const $ = useJquery();
    const { commonFuncs } = useCommonContext();
    /**
     * 是否已加载界面
     */
    let [isMonted, setIsmonted] = useState<boolean>(false);

    useEffect(function () {
        if (isMonted === false) {
            setIsmonted(true);
        }

        return function () {
            setIsmonted(false);
        };
    }, []);

    return (
        <>
            <span className={'rrt-icon ' + icon + ' ' + size + ' ' + float + ' ' + classAdd} style={style}></span>
        </>
    );
};
export default Icon;
