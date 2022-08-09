/**
 * 导出钩子
 */
/**
 * 钱包状态警告钩子
 */
import warnBlockChainHook from "./content/publicHooks/warnBlockChainHook";
/**
 * 钱包操作器钩子
 */
import walletContext, {
	//创建钱包操作器的函数
	useWallet,
	//在子组件中,获取钱包操作器的钩子函数
	useWalletContext,
} from "./content/publicHooks/walletHelperHook";
/**
 * 用于签名登录的钩子
 */
import useSign from "./content/publicHooks/signInHook";
/**
 * 公共函数钩子
 */
import commonContext, {
	//创建context的函数
	useCommon,
	//在子组件中,获取context的钩子函数
	useCommonContext,
} from "./content/publicHooks/commonHook";
/**
 * 合约操作器钩子
 */
import useMmOperator from "./content/publicHooks/blockChanOperator/mmOperatorHook";
/**
 * ajax钩子
 */
import useAjax from "./content/publicHooks/ajaxHook";

/**
 * 导出组件
 */
/**
 * 钱包链接菜单
 */
import ConnectSelect from "./content/components/connectSelect";
/**
 * 钱包状态指示面板
 */
import WalletStatusDebugPanel from "./content/components/walletStatusDebugPanel";
/**
 * 警告组件
 */
import Warn from "./content/components/warn";

/**
 * 按钮组件
 */
import Button from "./content/components/button";

/**
 * 接口
 */
/**
 * ajax用的接口
 */
import * as Iajax from "./content/publicHooks/interfaces/iAjax";
/**
 * 公共组件使用的接口
 */
import * as Icomon from "./content/publicHooks/interfaces/iComon";
/**
 * 合约操作器使用的接口
 */
import * as ImmOperator from "./content/publicHooks/interfaces/iMmOperator";
/**
 * 签名登录组件的接口
 */
import * as IsignIn from "./content/publicHooks/interfaces/iSignIn";
/**
 * 钱包操作器的接口
 */
import * as IwalletHelper from "./content/publicHooks/interfaces/iWalletHelper";

export default {
	commonContext,
	warnBlockChainHook,
	walletContext,
	useWallet,
	useWalletContext,
	useSign,
	useCommon,
	useCommonContext,
	useMmOperator,
	useAjax,
	ConnectSelect,
	WalletStatusDebugPanel,
	Warn,
	Button,
	Iajax,
	Icomon,
	ImmOperator,
	IsignIn,
	IwalletHelper,
};
