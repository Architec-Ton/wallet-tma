import { useEffect } from "react";
import Column from "../components/containers/Column";
import Page from "../components/containers/Page";
import { useAppSelector } from "../hooks/useAppDispatch";
import useRouter from "../hooks/useRouter";
import { usePage } from "../hooks/usePage";
import { selectIsTonLoading, selectTonMode } from "../features/ton/tonSelector";
import { TonConnectionMode } from "../features/ton/tonSlice";
import { useTon } from "../hooks/useTon";
import { useTonConnectUI } from "@tonconnect/ui-react";
import useLanguage from "../hooks/useLanguage.ts";
import {logOutIcon} from '../assets/icons/buttons'
import TileButton from "../components/buttons/TileButton.tsx";
import { initPopup } from '@telegram-apps/sdk';

function AccountDisconnect() {
  const popup = initPopup()
  const t = useLanguage('account')
  const navigate = useRouter();
  const isTonLoading = useAppSelector(selectIsTonLoading);
  const [tonConnectUI] = useTonConnectUI();
  const tonMode = useAppSelector(selectTonMode);
  const page = usePage();
  const ton = useTon();
  useEffect(() => {
    page.setTitle("Account", "Page");
    console.log("isTonLoading", isTonLoading);
    if (!isTonLoading) {
      console.log("Call ", isTonLoading, tonMode);
      if (tonMode == TonConnectionMode.disconnect) {
        console.log("mode disconnect");
        navigate("/registration/welcome");
      } else {
        // TODO: Get Balance data
        page.setLoading(false, true);
      }
    }
  }, [isTonLoading, tonMode]);

  const onClick = ()=>{
    popup
        .open({
          title: t('logout-title'),
          message: t('logout-description'),
          buttons: [
              { id: 'confirm', type: 'destructive', text: 'Сonfirm' },
              { id: 'cancel', type: 'default', text: 'Сancel' }
          ]
        })
        .then(buttonId => {
          if (buttonId === 'confirm') {
            ton.setDisconnect();
            tonConnectUI.disconnect();
            console.log("User confirmed disconnection");
            // navigate("/registration/welcome");
          } else {
            console.log("User cancelled disconnection");
          }
        })
  }

  return (
    <Page title={t('account')}>
      <Column>
        <TileButton
            title={t('my-wallet')}
            description={'test'}
            onClick={onClick}
            iconAction={logOutIcon}
            />
        {/* {tonMode == TonConnectionMode.tonconnect && <TonConnectButton />} */}
      </Column>
    </Page>
  );
}

export default AccountDisconnect;
