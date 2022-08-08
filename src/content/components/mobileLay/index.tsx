//全局默认存在jquery
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { IwlProp } from '@bobliao/window-lay-react/src/iWindow';
import { useableFuncs } from '@bobliao/window-lay-react/src/iWindow';
import useJquery, { jQueryObject } from '@bobliao/use-jquery-hook';
import './index.scss';
import { ReactElement } from 'react';

const mobileLay = forwardRef<useableFuncs, IwlProp>(
    (
        {
            /**
             * 默认参数集合
             */
            children = null,
            //标题
            title = 'No Title',
            //位置
            position = {
                x: 'center',
                y: 'center',
            },
            //大小
            size = {
                width: 730,
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
        ref
    ) => {
        const [isMounted, setIsMounted] = useState<boolean>(false);
        //ref
        let m_lay_container = useRef(null);
        let ml_container = useRef(null);
        const $ = useJquery();

        //函数

        //隐藏
        let hide = function (_callback: Function = function () {}) {
            $(m_lay_container.current).animate(
                { top: $(window).height() },
                {
                    duration: 500,
                    easing: 'easeOutCubic',
                    complete: function () {
                        $(m_lay_container.current).css('display', 'none');
                        $(m_lay_container.current).css('top', '');
                        if (typeof _callback !== 'undefined') {
                            _callback();
                            if (typeof closeCall !== 'undefined') {
                                closeCall();
                            }
                        }
                    },
                }
            );
        };

        //显示
        let show = function (_callback: Function = function () {}) {
            var currentFontSize: string = window.document.documentElement.style.fontSize;
            var cfs: number = Number(currentFontSize.replace('px', ''));
            $(m_lay_container.current).css('display', 'block');
            $(m_lay_container.current).css('top', $(window).height() + 'px');
            $(m_lay_container.current).animate(
                { top: 40 / cfs + 'rem', height: $(window).height() - 40 / cfs + 'rem' },
                {
                    duration: 500,
                    easing: 'easeOutElastic',
                    complete: function () {
                        resize();
                        if (typeof _callback !== 'undefined') {
                            _callback();
                        }
                    },
                }
            );
        };

        let resize = function () {
            var currentFontSize: string = window.document.documentElement.style.fontSize;
            var cfs: number = Number(currentFontSize.replace('px', ''));
            $(ml_container.current).css('height', '');
            var height = 0;
            try {
                height = $(ml_container.current).offset().top;
                var sheight: string = ($(window).height() - height + $(document).scrollTop() - 80) / cfs + 'rem';
                $(ml_container.current).height(sheight);
            } catch (_e) {}
        };

        //暴露方法给上级
        useImperativeHandle(ref, () => ({
            //注入图表的数据
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
                $(window).unbind('resize', resize);
            };
        }, []);

        useEffect(
            function (): void {
                if (isMounted === true) {
                    $(window).resize(resize);
                }
            },
            [isMounted]
        );

        return (
            <>
                {/**移动端弹出层界面 */}
                <div className={'m_lay_container ' + classAdd} style={style} ref={m_lay_container}>
                    <label
                        className="close"
                        onClick={function () {
                            hide();
                        }}
                    >
                        r
                    </label>
                    {(function (): ReactElement {
                        if (!isNoTitle && title !== '') {
                            return (
                                <>
                                    {/**标题 */}
                                    <div className="ml_title">
                                        <span>{title}</span>
                                    </div>
                                </>
                            );
                        }
                    })()}
                    {/** 内容 */}
                    <div className="ml_container" ref={ml_container}>
                        {children}
                    </div>
                </div>
            </>
        );
    }
);
export default mobileLay;
