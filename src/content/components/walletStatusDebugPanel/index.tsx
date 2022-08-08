import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  FC,
  ReactElement,
} from 'react';
import ReactDOM from 'react-dom';
import { useWalletContext } from '../../publicHooks/walletHelperHook';
import useMmOperator, {
  EWorkingMode,
} from '../../publicHooks/blockChanOperator/mmOperatorHook';
import Panel from '../panel';
import { IcontractConfig } from '../../publicHooks/interfaces/iMmOperator';
import useSign from '../../publicHooks/signInHook';

/**
 * 参数的接口
 */
export interface Iprops {
  /**
   * 合约配置文件
   */
  _contractConfig?: IcontractConfig;
}

const WalletStateusDebugPanel: FC<Iprops> = (
  { _contractConfig = null },
  _ref
): ReactElement => {
  const operator = useMmOperator(_contractConfig);
  const { walletData, walletFuncs } = useWalletContext();
  const signTool = useSign();

  return (
    <>
      <Panel>
        <div className="rrb-split">
          {'當前登錄的錢包賬號:'}
          {walletData.currentAccount}
        </div>
        <div className="rrb-split">
          {'當前使用的網絡:'}
          {walletData.currentNetwork}
        </div>
        <div className="rrb-split">
          {'當前是否安裝了錢包:'}
          {walletData.isWalletInstalled.toString()}
        </div>
        <div className="rrb-split">
          {'當前是否連接了錢包:'}
          {walletData.isConnectedWallet.toString()}
        </div>
        <div className="rrb-split">
          {'錢包狀態更改指示:'}
          {walletData.changeStemp}
        </div>
        <div className="rrb-split">
          {'錢包狀態更改次數:'}
          {walletData.changeTimes}
        </div>
        <div className="rrb-split">
          {'當前合約操作器的合約是否載入完成:'}
          {operator.data.isLoaded.toString()}
        </div>
        <div className="rrb-split">
          {'合約操作器加載合約的次數:'}
          {operator.data.changeTimes.toString()}
        </div>
        <div className="rrb-split">
          {'當前合約操作器的工作模式:'}
          {operator.data.workingMode.toString()}(
          {(function() {
            if (operator.data.workingMode === EWorkingMode.ETHEREUM) {
              return '(ethereum)本地錢包的工作模式';
            }
            if (operator.data.workingMode === EWorkingMode.NODE) {
              return '(HttpProvider)直接訪問預設節點的工作模式';
            }
          })()}
          )
        </div>
        <div className="rrb-split">
          {'是否爲非合約需求的網路:'}
          {operator.data.isWrongNetWork.toString()}
        </div>
        <div className="rrb-split">
          Wallet working mode:
          {walletData.workingMode}
        </div>
      </Panel>
      <Panel>
        <div className="rrb-split">
          {'簽名登陸器當前的登陸賬號:'}
          {signTool.data.userSignInfo.publicAddress}
        </div>
        <div className="rrb-split">
          {'簽名登陸器當前是否已經簽名登錄:'}
          {signTool.data.isSigned.toString()}
        </div>
        <div className="rrb-split">
          {'簽名器的更改次數:'}
          {signTool.data.loadTimes.toString()}
        </div>
      </Panel>
    </>
  );
};

export default WalletStateusDebugPanel;
