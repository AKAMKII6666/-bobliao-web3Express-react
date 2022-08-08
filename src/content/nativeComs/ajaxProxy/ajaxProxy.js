import { jQueryObject } from "@bobliao/use-jquery-hook";
import defaultCgiConfig from "./cgiConfig/default.json";

const $ = jQueryObject;

/*!
 * ajaxProxy.js
 * (c) 2014-2021 bobliao
 * Released under the MIT License.
 */
var _ajaxProxy = function () {
	const self = this;
	this.common = {
		console: {
			write: function (_t) {
				console.log(_t);
			},
		},
	};

	this.account = null;

	//ajax请求链接
	this.ajaxPort = "";
	this.ajaxPortDev = "";
	this.ajaxPortGray = "";
	this.ajaxPortPro = "";
	this.urlList = {};
	//ajax请求堆
	this.ajaxArr = [];

	//环境变量，通过它来判要使用正式版的智能合约还是测试版的
	this.projEvn = RUNNING_ENV;

	if (this.projEvn === "development") {
		//简写环境变量
		this.projEvn = "dev";
	} else if (this.projEvn === "gray") {
		//简写环境变量
		this.projEvn = "gray";
	} else {
		//简写环境变量
		this.projEvn = "pro";
	}

	//初始化
	this.init = function (_common, _parent) {
		try {
			const $ = jQuery;
			this.$ = jQuery;
			self.$ = jQuery;
		} catch (_e) {}

		if (typeof _common !== "undefined") {
			this.common = _common;
		}
	};

	/**
	 * 加载/更换配置
	 * @param {Object} _config  接口配置文件
	 */
	this.loadConfig = function (_config) {
		this.ajaxCGI = _config;
		this.ajaxPortDev = _config.devPort;
		this.ajaxPortGray = _config.grayPort;
		this.ajaxPortPro = _config.proPort;
		//调试环境
		if (this.projEvn === "dev") {
			this.ajaxPort = this.ajaxPortDev;
		}

		//灰度环境
		if (this.projEvn === "gray") {
			this.ajaxPort = this.ajaxPortGray;
		}

		//线上正式版本
		if (this.projEvn === "pro") {
			this.ajaxPort = this.ajaxPortPro;
		}

		for (var i in _config) {
			if (i !== "cgiName" && i !== "devPort" && i !== "proPort" && i !== "grayPort") {
				this.urlList[i] = this.ajaxPort + _config[i].url;
			}
		}
	};

	//先自我初始化一遍
	this.loadConfig(defaultCgiConfig);

	//检查登陆情况
	this.getIsLogin = function (_loginedCallBack, _unLoginCall) {
		if (self.account === null) {
			_unLoginCall();
		} else {
			_loginedCallBack();
		}
	};

	//获取登陆账号
	this.getLoginAccount = function () {
		return this.account;
	};

	//服务器状态处理器
	this.stateProcresser = function (_data, _apiName) {
		if (typeof _data.code !== "undefined") {
			if (this.projEvn === "dev") {
				if (Number(_data.code) === 500) {
					self.common.console.write("====开发环境提醒====");
					self.common.console.write("接口错误:");
					self.common.console.write("服务器内部错误！");
					self.common.console.write("来自:" + _apiName);
					self.common.console.write("接口名称:" + self.ajaxCGI[_apiName].url);
					self.common.console.write(_data.message);
					self.common.console.write("====开发环境提醒====");
					return "error";
				}

				if (Number(_data.code) === 502) {
					self.common.console.write("====开发环境提醒====");
					self.common.console.write("接口错误:");
					self.common.console.write("服务器内部错误！");
					self.common.console.write("来自:" + _apiName);
					self.common.console.write("接口名称:" + self.ajaxCGI[_apiName].url);
					self.common.console.write(_data.message);
					self.common.console.write("====开发环境提醒====");
					return "error";
				}

				if (Number(_data.code) === 404) {
					self.common.console.write("====开发环境提醒====");
					self.common.console.write("接口错误:");
					self.common.console.write("找不到文件或接口..");
					self.common.console.write("来自:" + _apiName);
					self.common.console.write("接口名称:" + self.ajaxCGI[_apiName].url);
					self.common.console.write(_data.message);
					self.common.console.write("====开发环境提醒====");
					return "error";
				}

				//数据为空就放开
				if (
					Number(_data.code) === 1008 ||
					Number(_data.code) === 1001 ||
					Number(_data.code) === 1002
				) {
					if (typeof _data.result !== "undefined") {
						return _data.result;
					} else if (typeof _data.data !== "undefined") {
						return _data.data;
					} else {
						return _data;
					}
				}

				if (Number(_data.code) !== 0) {
					self.common.console.write("====开发环境提醒====");
					self.common.console.write("接口错误:");
					self.common.console.write("未知错误！");
					self.common.console.write("来自:" + _apiName);
					self.common.console.write("接口名称:" + self.ajaxCGI[_apiName].url);
					self.common.console.write(_data.code);
					self.common.console.write(_data.message);
					self.common.console.write("====开发环境提醒====");
					return "error";
				}
			} else {
				//数据为空就放开
				if (
					Number(_data.code) === 1008 ||
					Number(_data.code) === 1001 ||
					Number(_data.code) === 1002
				) {
					if (typeof _data.result !== "undefined") {
						return _data.result;
					} else if (typeof _data.data !== "undefined") {
						return _data.data;
					} else {
						return _data;
					}
				}

				if (Number(_data.code) !== 0) {
					self.common.console.write(
						"Server has temporarily asleep, Please try again later.."
					);
					console.log("接口错误:");
					console.log("来自:" + _apiName);
					console.log("接口名称:" + self.ajaxCGI[_apiName].url);
					console.log(_data.code);
					console.log(_data.message);
					return "error";
				}
			}

			if (typeof _data.result !== "undefined") {
				return _data.result;
			} else if (typeof _data.data !== "undefined") {
				return _data.data;
			}
		} else {
			return _data;
		}
	};

	/**
	 * 直接请求数据/推送数据
	 * @param {String or Object} _name  请求接口的名称或者参数
	 */
	this.fetch = function (_arg) {
		var config = {
			name: "",
			params: {},
			urlPar: "",
			dataType: "",
			headersPar: {},
			requestSendType: "form",
		};
		if (typeof _arg === "string") {
			config.name = _arg;
		} else {
			config = $.extend(config, _arg);
		}

		if (typeof this.ajaxCGI[config.name] === "undefined") {
			if (this.projEvn === "dev") {
				self.common.console.write("ajaxProxy::接口配置不存在:" + config.name);
			}
			return;
		}

		var cgi = this.ajaxCGI[config.name];
		var func = null;
		if (
			JSON.stringify(config.params) === "{}" &&
			!(config.urlPar !== "" && JSON.stringify(config.urlPar) !== "{}") &&
			typeof cgi.defaultPatams !== "undefined" &&
			cgi.defaultPatams !== ""
		) {
			if (cgi.paramsType === "url") {
				config.urlPar = cgi.defaultPatams;
			} else if (cgi.paramsType === "json") {
				config.params = cgi.defaultPatams;
			}
		}

		if (cgi.method.toLowerCase() === "get") {
			func = this.get;
		} else if (cgi.method.toLowerCase() === "post") {
			func = this.post;
		} else {
			if (this.projEvn === "dev") {
				self.common.console.write(
					"ajaxProxy::接口配置文件错误:" + config.name + "   未表明请求方式!"
				);
			}
			return;
		}
		return func(
			config.name,
			config.params,
			config.urlPar,
			config.headersPar,
			config.requestSendType,
			config.dataType
		);
	};

	/**
	 * POST请求
	 * @param {String} _name 请求接口名称
	 * @param {Object} _params 请求参数，必须为json格式
	 * @param {String} _urlPar 放在url上的参数
	 * @param {String} _datatType 请求成功后的数据格式
	 * @returns 返回一个Promise对象参数为.then(_data, _status, _xhr,_ajaxObj)
	 * @error .catch(_xmlHr, _msg, _obj, _params)
	 */
	this.post = function (_name, _params, _urlPar, _headersPar, _requestSendType, _datatType) {
		return new Promise(function (resolve, reject) {
			var ajaxObj = self.postAction(
				_name,
				_params,
				_headersPar,
				_requestSendType,
				function (_data, _status, _xhr) {
					resolve({ _data, _status, _xhr, ajaxObj });
				},
				function (_xmlHr, _msg, _obj, _params) {
					reject({ _xmlHr, _msg, _obj, _params });
					//throw new Error(_msg);
				},
				_urlPar,
				_datatType
			);
		});
	};

	/**
	 * GET请求
	 * @param {String} _name 请求接口名称
	 * @param {Object} _params 请求参数，必须为json格式
	 * @param {String} _urlPar 放在url上的参数
	 * @param {String} _datatType 请求成功后的数据格式
	 * @returns 返回一个Promise对象参数为.then(_data, _status, _xhr,_ajaxObj)
	 * @error .catch(_xmlHr, _msg, _obj, _params)
	 */
	this.get = function (_name, _params, _urlPar, _headersPar, _requestSendType, _datatType) {
		return new Promise(function (resolve, reject) {
			var ajaxObj = self.getAction(
				_name,
				_params,
				_headersPar,
				_requestSendType,
				function (_data, _status, _xhr) {
					resolve({ _data, _status, _xhr, ajaxObj });
				},
				function (_xmlHr, _msg, _obj, _params) {
					reject({ _xmlHr, _msg, _obj, _params });
					//throw new Error(_msg);
				},
				_urlPar,
				_datatType
			);
		});
	};

	//系统专用ajaxPost
	/**
	 *
	 * @param {String} _name 请求接口名称
	 * @param {Object} _params 请求参数，必须为json格式
	 * @param {Function} _succCall 成功请求后的回调函数
	 * @param {Function} _faiCall 请求失败后的回调函数
	 * @param {String} _urlPar 放在url上的参数
	 * @param {String} _datatType 请求成功后的数据格式
	 * @returns  返回ajax对象
	 */
	this.postAction = function (
		_name,
		_params,
		_headersPar,
		_requestSendType,
		_succCall,
		_faiCall,
		_urlPar,
		_datatType
	) {
		_urlPar = this.makeUrlPar(_urlPar);
		if (typeof _datatType === "undefined") {
			_datatType = "JSON";
		}
		var params = {
			url: this.ajaxPort + self.ajaxCGI[_name].url + _urlPar,
			type: "POST",
			data: _params,
			headers: _headersPar,
			cache: false,
			dataType: _datatType,
			requestSendType: _requestSendType,
			success: function (_data, _status, _xhr) {
				var errorResult = self.stateProcresser(_data, _name);
				if (errorResult === "error") {
					_faiCall(_xhr, JSON.stringify(_data), _data, _params);
				} else {
					_succCall(errorResult, _status, _xhr);
				}
			},
			error: _faiCall,
		};
		return this.arrowAjax(params);
	};

	//系统专用ajaxGet
	/**
	 *
	 * @param {String} _name 请求接口名称
	 * @param {Object} _params 请求参数，必须为json格式
	 * @param {Function} _succCall 成功请求后的回调函数
	 * @param {Function} _faiCall 请求失败后的回调函数
	 * @param {String} _urlPar 放在url上的参数
	 * @param {String} _datatType 请求成功后的数据格式
	 * @returns 返回ajax对象
	 */
	this.getAction = function (
		_name,
		_params,
		_headersPar,
		_requestSendType,
		_succCall,
		_faiCall,
		_urlPar,
		_datatType
	) {
		_urlPar = this.makeUrlPar(_urlPar);
		if (typeof _datatType === "undefined") {
			_datatType = "JSON";
		}
		var params = {
			url: this.ajaxPort + self.ajaxCGI[_name].url + _urlPar,
			type: "GET",
			data: _params,
			headers: _headersPar,
			cache: false,
			dataType: _datatType,
			requestSendType: _requestSendType,
			success: function (_data, _status, _xhr) {
				var errorResult = self.stateProcresser(_data, _name);
				if (errorResult === "error") {
					_faiCall(_xhr, JSON.stringify(_data), _data, _params);
				} else {
					_succCall(errorResult, _status, _xhr);
				}
			},
			error: _faiCall,
		};
		return this.arrowAjax(params);
	};

	//制造url请求参数
	this.makeUrlPar = function (_par) {
		if (typeof _par === "undefined") {
			return "";
		}
		if (typeof _par === "object") {
			var resultStr = "?";
			for (var i in _par) {
				if (resultStr !== "?") {
					resultStr += "&";
				}
				resultStr += i + "=" + _par[i];
			}
			return resultStr;
		}
		if (typeof _par === "string") {
			return _par;
		}
	};

	//ajax请求方法
	/**
	 *
	 * @param {Object} _params 参数
	 * @returns 返回ajax对象
	 */
	this.arrowAjax = function (_params) {
		//创建ajax参数集
		var ajaxItem = self.makeAjaxItem(_params);
		if (!ajaxItem) {
			return;
		}

		var contentType = "";
		if (_params.requestSendType === "json") {
			contentType = "application/json;charset=utf-8";
		} else if (_params.requestSendType === "form") {
			contentType = "application/x-www-form-urlencoded";
		}

		var aParams = {
			url: _params.url,
			type: _params.type,
			data: _params.data,
			cache: _params.cache,
			dataType: _params.dataType,
			contentType: contentType,
			crossDomain: true,
			xhrFields: {
				//是否允许跨域访问
				"Access-Control-Allow-Origin": "http://localhost:3000",
			},
			success: function (data, status, xhr) {
				_params.success(data, status, xhr);
			},
			error: function (xmlHr, msg, obj) {
				self.makeError(xmlHr, msg, obj, _params);
			},
			fail: function (xmlHr, msg, obj) {
				self.makeError(xmlHr, msg, obj, _params);
			},
		};
		if (typeof _params.headers !== "undefined") {
			aParams.headers = _params.headers;
		}
		ajaxItem.ajax = $.ajax(aParams).fail(function (xmlHr, msg, obj) {
			self.makeError(xmlHr, msg, obj, _params);
		});

		return ajaxItem.ajax;
	};

	//创建ajax错误
	self.makeError = function (xmlHr, msg, obj, params) {
		//如果使用调试码开启了调试模式
		if (self.projEvn === "dev") {
			console.log(msg);
			console.log(params);
			console.log(obj);
			self.common.console.write("====开发环境提醒====");
			self.common.console.write("接口请求错误!");
			self.common.console.write("接口请求:" + params.url);
			self.common.console.write("状态:" + xmlHr.status);
			self.common.console.write("返回数据:" + xmlHr.responseText);
			self.common.console.write(msg);
			self.common.console.write(
				"可能是数据接口服务未开启,或者没设置跨域,或是您的网络已经断开,请打开网络控制面板以查看请求情况.."
			);
			self.common.console.write("====开发环境提醒====");
		}
		if (params.error) {
			params.error(xmlHr, msg, obj, params);
		}
	};

	//创建ajax参数集
	self.makeAjaxItem = function (params) {
		if (typeof window.__ajaxArrCatch__ === "undefined") {
			window.__ajaxArrCatch__ = [];
		}
		if (window.__ajaxArrCatch__.length > 200) {
			window.__ajaxArrCatch__ = [];
		}
		//间隔时间
		//默认为1秒内连续触发5次就拒绝。
		if (!params.delay) {
			params.delay = 1000;
		}
		if (!params.times) {
			params.times = 2;
		}
		var times = 0;
		//url,type,data,cache,dataType,success,error
		for (var i = 0; i < window.__ajaxArrCatch__.length; i++) {
			if (
				params.url === window.__ajaxArrCatch__[i].params.url &&
				JSON.stringify(params.data) === JSON.stringify(window.__ajaxArrCatch__[i].params.data)
			) {
				if (+new Date() - window.__ajaxArrCatch__[i].time < params.delay) {
					times++;
				}
			}
		}
		var ajaxItem = { ajax: null, params: params, time: +new Date() };
		window.__ajaxArrCatch__.push(ajaxItem);
		if (times > params.times) {
			console.log("::" + times * 60);
			return false;
		}

		return ajaxItem;
	};

	//往接口配置中增加接口配置
	/**
	 *
	 * @param {Object} _options 新的接口
	 */
	this.addCGI = function (_options) {
		for (var i in _options) {
			this.ajaxCGI[i] = _options[i];
		}
	};

	//ajax接口配置
	this.ajaxCGI = defaultCgiConfig;
};

export default _ajaxProxy;
