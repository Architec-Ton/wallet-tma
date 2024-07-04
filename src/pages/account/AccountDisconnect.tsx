import { useEffect } from "react";
import Column from "../../components/containers/Column";
import Page from "../../components/containers/Page";
import { useAppSelector } from "../../hooks/useAppDispatch";
import useRouter from "../../hooks/useRouter.ts";
import { usePage } from '../../hooks/usePage';
import { selectIsTonLoading, selectTonMode } from "../../features/ton/tonSelector";
import { TonConnectionMode } from "../../features/ton/tonSlice";
import { useTon } from "../../hooks/useTon";
import { useTonConnectUI } from "@tonconnect/ui-react";

function AccountDisconnect() {
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

    return (
        <Page>
            <Column>
                <button
                    onClick={async () => {
                        ton.setDisconnect();
                        await tonConnectUI.disconnect();

                    }}
                    className="btn"
                >
                    Disconnect
                </button>
                {/* {tonMode == TonConnectionMode.tonconnect && <TonConnectButton />} */}
            </Column>
        </Page>
    );
}

export default AccountDisconnect;