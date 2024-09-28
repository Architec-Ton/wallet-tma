import React, { useEffect } from "react";

import NewsAutor from "assets/images/News-autor.png";
import NewsPicture from "assets/images/News-picture.png";

import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";

import Page from "components/containers/Page";

import NewsCard from "./news-card/NewsCard";
import Hashtags from "./news-card/news-card-components/Hashtags";

interface CARD_DATA {
  authors: { name: string; img: string };
  dateOfCreation: Date;
  title: string;
  description: string[];
  images: string[];
  hashtags: string[];
  likesDislikes: { likes: number; dislikes: number };
  link: string;
}

const cardData: CARD_DATA = {
  authors: { name: "Architec.ton", img: NewsAutor },
  dateOfCreation: new Date(2024, 5, 25, 14, 45),
  title: "New Gaming Platform",
  description: [
    "The Architec.ton project has launched an MVP of a game launcher built on the TON blockchain. The main functionality of the test version includes four sections: Wallet, Apps, News, and Account.",
    "In the near future, the project team plans to create and add the first-ever marketplace for in-game items on the TON blockchain. Every user will be able to exchange, buy, or sell items from various games that have partnered with Architec.ton.",
  ],
  images: [NewsPicture],
  hashtags: ["new", "games", "architecton", "crypto"],
  likesDislikes: {
    likes: 0,
    dislikes: 0,
  },
  link: "",
};

const News = () => {
  const t = useLanguage("News");
  const page = usePage();

  useEffect(() => {
    page.setLoading(false, true);
  }, []);

  return (
    <Page title={t("title")}>
      <Hashtags hashtags={cardData.hashtags} className="news-top-bar" />
      <NewsCard cardData={cardData} />
    </Page>
  );
};

export default News;
