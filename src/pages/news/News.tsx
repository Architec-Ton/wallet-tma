import Page from "../../components/containers/Page.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import {useEffect} from "react";
import {usePage} from "../../hooks/usePage.ts";
import NewsCard from "./news-card/NewsCard.tsx";
import NewsAutor from "../../assets/images/News-autor.png"
import NewsPicture from "../../assets/images/News-picture.png"
import Hashtags from "./news-card/news-card-components/Hashtags.tsx";

interface CARD_DATA {
    authors: {name: string, img: string},
    dateOfCreation: Date,
    title: string,
    description: string[],
    images: string[],
    hashtags: string[],
    likesDislikes: { likes: number; dislikes: number },
    link: string,
}

const cardData: CARD_DATA= {
    authors: {name: 'Architec.ton', img: NewsAutor},
    dateOfCreation: new Date(2024, 5, 25, 14, 45),
    title: 'Новая игровая платформа',
    description: ['Проект Architec.ton запустил MVP игрового лаунчера, созданного на базе блокчейна TON. Основной функционал тестовой версии включает в себя четыре раздела: Wallet, Apps, News и Account.', ' В ближайшее время команда проекта планирует создать и добавить первую в истории блокчейна TON торговую площадку игровых предметов. — Абсолютно каждый пользователь сможет обменять, купить или продавать айтемы различных игр, заключивших партнёрство с Architec.ton.'],
    images: [NewsPicture],
    hashtags: ['new','games','architecton','crypto'],
    likesDislikes: {
        likes: 0,
        dislikes: 0,
    },
    link: '',
}


const News = () => {
    const t = useLanguage('News')
    const page = usePage()

    
    useEffect(() => {
        page.setLoading(false, true)
    }, []);


    return (
        <Page title={t('title')}>
            <Hashtags hashtags={cardData.hashtags} className={'news-top-bar'}/>
            <NewsCard cardData={cardData}/>
        </Page>
    );
};

export default News;