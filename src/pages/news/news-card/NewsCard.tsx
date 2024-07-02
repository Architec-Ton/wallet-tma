import Block from "../../../components/typography/Block.tsx";
import classNames from "classnames";
import React, {CSSProperties} from "react";
// import LikeDislike from "./news-card-components/LikeDislike.tsx";
// import LinkToPost from "./news-card-components/LinkToPost.tsx";
import TimeSinceCreation from "./news-card-components/TimeSinceCreation.tsx";
import './NewsCard.styles.css'
import Column from "../../../components/containers/Column.tsx";
import Hashtags from "./news-card-components/Hashtags.tsx";

interface NewsCardProps {
    cardData: {
        authors: {name: string, img: string},
        dateOfCreation: Date,
        title?: string,
        description: string[],
        images: string[],
        hashtags?: string[],
        likesDislikes: { likes: number; dislikes: number },
        link: string,
    },
    style?: CSSProperties;
    className?: string;
}


const NewsCard: React.FC<NewsCardProps>  = ({cardData,style, className }) => {

    return (
        <Block>
            <div className={classNames(className, "news-card")} style={style}>

                <div className='news-card-authors'>
                    <img src={cardData.authors.img} alt="img"/>
                    <h2>{cardData.authors.name}</h2>
                    <p><TimeSinceCreation date={cardData.dateOfCreation}/></p>
                </div>

                <div className='title-bottom-line'/>

                <Column>
                    <h3>{cardData.title}</h3>
                    {cardData.description[0]}
                    <img src={cardData.images[0]} alt='img'/>
                    {cardData.description[1]}
                </Column>

                <div>
                    {cardData.hashtags && <Hashtags hashtags={cardData.hashtags} className={'news-card'}/>}
                </div>

                {/*    {cardData.likesDislikes && <LikeDislike likesDislikes={cardData.likesDislikes}  className={'news-card'}/>}*/}
                {/*    {cardData.link && <LinkToPost  className={'news-card'}/>}*/}

            </div>
        </Block>
    );
};

export default NewsCard;