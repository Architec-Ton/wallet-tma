import Page from "../../components/containers/Page.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import {useEffect} from "react";
import {usePage} from "../../hooks/usePage.ts";


const News = () => {
    const t = useLanguage('News')
    const page = usePage()

    
    useEffect(() => {
        page.setLoading(false)
    }, []);


    return (
        <Page title={t('title')}>
            <div>
                Бар хэштегов
            </div>
            <div>
                Карточка новости
            </div>
        </Page>
    );
};

export default News;