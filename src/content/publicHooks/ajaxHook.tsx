/*!
 * ajaxHook
 * 廖力编写 2022/03/28
 */
import React from 'react';
import IajaxConfig, { IfetchCondition } from './interfaces/iAjax';
const _ajaxProxy = require('../nativeComs/ajaxProxy/ajaxProxy.js');
import { isRunningInServer } from '@bobliao/use-jquery-hook';
import { useCommonContext } from './commonHook';
import { IpClass } from './interfaces/iComon';

export type TfetchCondition = string | IfetchCondition;

/**
 * 使用ajax请求器,并填入接口配置
 */
const useAjax = function (ajaxConfig: IajaxConfig) {
    if (!isRunningInServer) {
        const { data, popUp } = useCommonContext();
        const ajaxProxy = new _ajaxProxy();
        ajaxProxy.loadConfig(ajaxConfig);

        /**
         * 请求接口
         */
        const fetch = function (condition: TfetchCondition): Promise<any> {
            return ajaxProxy
                .fetch(condition)
                .then(
                    function (_data) {
                        return _data._data;
                    },
                    function (_errorPars: any) {
                        popError(condition, _errorPars);
                    }
                )
                .catch(function (_errorPars: any) {
                    popError(condition, _errorPars);
                });
        };

        /**
         * 弹出错误
         */
        const popError = function (condition: TfetchCondition, _errorPars: any) {
            if (data.envTag !== 'production') {
                var errorMessage = (
                    <>
                        <div>Ajax Request Error!</div>
                        <div>Request : {_errorPars._params.url}</div>
                        <div>Message : {_errorPars._msg}</div>
                        <div>HTTP StatusText : {_errorPars._xmlHr.statusText}</div>
                    </>
                );
                popUp(errorMessage, 100000, IpClass.RED);
            }
        };

        return { ajaxProxy, fetch };
    }
    return { function(): void {} };
};

export { useAjax as default };
