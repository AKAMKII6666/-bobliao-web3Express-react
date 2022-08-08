//react主组件
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactDOM from 'react-dom';
//分辨率适配组件
import MediaQuery from 'react-responsive';
//弹出框组件
import WindowLay from '@bobliao/window-lay-react';
import { IwlProp, useableFuncs } from '@bobliao/window-lay-react/src/iWindow';
//移动端弹框组件
import MobileLay from '../mobileLay/index';

//=========样式=========
import './index.scss';

/**
 * 廖力编写 2022/04/06
 * 根据当前是pc端还是移动端自动选择弹出框的样式
 */
const SmartLay = forwardRef<useableFuncs, IwlProp>(
    (
        {
            /**
             * 默认参数集合
             */
            children = null,
            //标题
            title = '',
            //位置
            position = {
                x: 'center',
                y: 'center',
            },
            //大小
            size = {
                width: 'auto',
                height: 'auto',
            },
            //按钮设置
            buttons = {
                //none为没有按钮
                //yes为只有确认键
                //yesno为确定和取消
                //free为自定义
                mode: 'none',
                yesCall: function () {},
                noCall: function () {},
                arr: [],
            },
            //是否加入背景
            background = {
                enabled: true,
                //是否点击空白处关闭
                bgClose: false,
            },
            //附加杭样式
            style = {},
            //附加样式表
            classAdd = 'smartLay',
            //关闭回调
            closeCall = function () {},
            //是否不显示关闭按钮
            isNoCloseBtn = false,
            //是否不显示标题
            isNoTitle = false,
        },
        _ref
    ): React.ReactElement => {
        /**
         * ==================================状态===============================
         */
        const [isMounted, setIsMounted] = useState<boolean>(false);
        var windowLayRef = useRef(null);

        //隐藏
        let hide = function (_callback: Function = function () {}) {
            windowLayRef.current.hide(_callback);
        };

        //显示
        let show = function (_callback: Function = function () {}) {
            windowLayRef.current.show(_callback);
        };

        //暴露方法给上级
        useImperativeHandle(_ref, () => ({
            hide(_callback) {
                hide(_callback);
            },
            show(_callback) {
                show(_callback);
            },
        }));

        /**
         * ==================================Effects===============================
         */
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
                <MediaQuery maxWidth={900}>
                    <MobileLay
                        //标题
                        title={title}
                        //位置
                        position={position}
                        size={size}
                        buttons={buttons}
                        background={background}
                        style={style}
                        classAdd={classAdd}
                        closeCall={closeCall}
                        isNoCloseBtn={isNoCloseBtn}
                        isNoTitle={isNoTitle}
                        ref={windowLayRef}
                    >
                        {children}
                    </MobileLay>
                </MediaQuery>
                <MediaQuery minWidth={901}>
                    <WindowLay
                        //标题
                        title={title}
                        //位置
                        position={position}
                        size={size}
                        buttons={buttons}
                        background={background}
                        style={style}
                        classAdd={classAdd}
                        closeCall={closeCall}
                        isNoCloseBtn={isNoCloseBtn}
                        isNoTitle={isNoTitle}
                        ref={windowLayRef}
                    >
                        {children}
                    </WindowLay>
                </MediaQuery>
            </>
        );
    }
);

export default SmartLay;
