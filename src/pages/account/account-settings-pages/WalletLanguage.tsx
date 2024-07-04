import {useEffect} from 'react';
import Page from "../../../components/containers/Page.tsx";
import useLanguage from "../../../hooks/useLanguage.ts";
import {usePage} from "../../../hooks/usePage.ts";
import SelectorTile from "../../../components/ui/selector-tile/SelectorTile.tsx";

const WalletLanguage = () => {
    const languages = [
        {
            language: 'English',
            description: 'English — Hello'
        },
        {
            language: 'Russian',
            description: 'Русский — Привет'
        }
    ]

    const onItemSelected = () => {

    }

    const t = useLanguage('account')
    const page = usePage();

    useEffect(() => {
        page.setLoading(false, false)
    }, []);

    return (
        <Page title={t('wallet-language')}>
            <SelectorTile
                selectItems={languages.map(lang => ({ type: 'object', value: lang }))}
                onItemSelected={onItemSelected}/>
        </Page>
    );
};

export default WalletLanguage;