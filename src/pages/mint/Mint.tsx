// import FooterButton from './mint-components/buttons/FooterButton.tsx';
import Layout2Row from './mint-components/layout/Layout2Row.tsx';
import MintContainer from './mint-components/container/MintContainer.tsx';
import MintInput from './mint-components/input/MintInput.tsx';
import assets from './mint-components/assets';
import React, { useEffect, useState } from 'react';
//import { useTonClient } from '../../hooks/useTonClient';
//import { TonClientContext } from "tonconnect-react-ui";
import {
    useTonAddress,
    //   useTonClientUI,
    // useTonWallet,
} from '@tonconnect/ui-react';
// import { TonClientData } from '@tonclient/core';
import { Address } from '@ton/ton';
import { BE_URL } from '../../constants.ts';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from './mint-components/hooks/useTonConnect';
import useCrowdSaleContract from './mint-components/hooks/useCrowdSaleContract';
// import Footer from '../../components/ui/Footer';
import { useCloudStorage, useInitData } from '@tma.js/sdk-react';
import useApiMint from './mint-components/hooks/useAPIMint.ts';
import {usePage} from "../../hooks/usePage.ts";
import {useTmaMainButton} from "../../hooks/useTma.ts";
import useLanguage from "../../hooks/useLanguage.ts";

function Mint() {
    // if (error) return <div className="failed">failed to load</div>;
    // if (isLoading) return <div className="Loading">Loading...</div>;
    const tadddress = useTonAddress();

    const [tonBalance, setTonBalance] = useState<number | null>(null);
    const [isGLoading, setIsGLoading] = useState<boolean>(true);
    const [bankBalance, setBankBalance] = useState<number | null>(null);
    const [refState, setSetRefState] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [ContractAddress, setContractAddress] = useState<string | null>(null);

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { connected } = useTonConnect();
    const t = useLanguage('mint')
    const page = usePage();
    const btn = useTmaMainButton();
    //const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading } = useSWR(
        `${BE_URL}/account/${tadddress}`,
        connected ? fetcher : null
    );

    const navigate = useNavigate();

    const storageTelegram = useCloudStorage();

    const initData = useInitData();

    let ref = initData.startParam;

    useEffect(() => {
        const a = async () => {
            if (!ref || ref == '') {
                ref = await storageTelegram.get('ref');
            }
            setSetRefState(ref);
            console.log('REF in async:', ref);
        };
        a();
    }, [ref]);


    //const walletAddress = '0QCto-hxbOIBe_G6ub3s3_murlWrPBo__j8zI4Fka8PAMGBK';
    const { writeData } = useApiMint();
    const [recvBank, setRecvBank] = useState<number>(1);
    const [sendTon, setSendTon] = useState<number>(1);
    const [buyDisabled, setbuyDisabled] = useState<boolean>(false);

    const onChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value);
        setRecvBank(value);
        setSendTon(value * 1.5); // /10
        // setSendTon(value * 0.5); // /10
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChangeTon = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value);
        setRecvBank(Math.floor(value / 1.5));
        setSendTon(value); // /10
    };
    //const ContractAddress = 'EQBXfJkeDheR_vzI1DDXcZipaKBhyMtkfophZI8CbKuvMZZX';
    const { buyBank, buyRefferalBank } = useCrowdSaleContract();
    const handleBuyBanks = async () => {
        //console.log('Try buy: ', sendTon, ref);
        const tx = refState
            ? await buyRefferalBank(sendTon, Address.parse(refState))
            : await buyBank(sendTon);
        //console.log('Transaction responce:', tx);
        setIsGLoading(true);
        await writeData(`/bank/${tadddress}?tgid=${initData.user.id}`, {
            bankBefore: bankBalance,
            bankAfter: bankBalance + recvBank,
            ref: refState && refState != '' ? refState : null,
            tx: {
                tx: tx,
                ref: refState,
                sendTon: sendTon,
                recvBank: recvBank,
            },
        });
        navigate('/');
    };

    useEffect(() => {
        if (isLoading === false) {
            //console.log('DATA:', data);
            if (data) {
                // fetchData();
                setTonBalance(Number(data.tons) / 1e9);
                // setContractAddress(data.address);
                setBankBalance(data.banks);
                setIsGLoading(false);
                const tons = Math.floor(Number(data.tons) / 1e9 / 1.5) * 1.5;
                if (tons > 10.5) {
                    setRecvBank(7);
                    setSendTon(10.5); // /10
                } else if (tons <= 10 && tons > 0) {
                    const bank = Math.floor(tons / 1.5);
                    setRecvBank(bank);
                    setSendTon(bank * 1.5); // /10
                } else {
                    setRecvBank(1);
                    setSendTon(1.5); // /10
                }
            }
        }
    }, [isLoading, data]);

    useEffect(() => {
        if (sendTon > tonBalance) {
            setbuyDisabled(true);
        } else {
            setbuyDisabled(false);
        }
    }, [sendTon, tonBalance]);

    useEffect(() => {
        page.setLoading(false, false);
         btn.init(
            t("buy" ),
            () => {
                handleBuyBanks();
            },
             buyDisabled
        );
    }, []);

    return (
        <Layout2Row>
            <MintContainer isLoading={false}>
                <div>
                    <h1
                        style={{
                            textAlign: 'center',
                        }}>
                        {t(`title`)}
                    </h1>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '2rem',
                    }}>
                    <MintInput
                        icon={assets.iconBankColor}
                        onChange={onChangeBank}
                        selected={false}
                        value={recvBank}
                        balance={bankBalance ? bankBalance : 0}
                    />
                    <div
                        style={{
                            margin: '-1rem 0',
                            zIndex: 100,
                        }}>
                        <img src={assets.iconExchange} />
                    </div>
                    <MintInput
                        icon={assets.iconTon}
                        receive={false}
                        title="TON"
                        balance={tonBalance ? tonBalance : 0}
                        value={sendTon}
                        selected={false}
                        onChange={onChangeTon}
                    />
                    <p
                        // className="text-small"
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '0.75rem',
                        }}>
                        * {t('comment')}
                    </p>
                </div>
            </MintContainer>
        </Layout2Row>
    );
}

export default Mint;
