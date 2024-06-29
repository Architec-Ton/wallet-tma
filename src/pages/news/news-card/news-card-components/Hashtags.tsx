import './Hashtags.styles.css'

interface HashtagsProps {
    hashtags: string[];
    className: 'news-card'|'news-top-bar';
}

const Hashtags: React.FC<HashtagsProps>  = ({hashtags, className}) => {

    return (
        <div className={`${className}-container`}>
            {hashtags.map((hashtag, index) =>{
                return (
                    <div className={className} key={index}>
                        #{hashtag}
                    </div>
                )
            })}
        </div>
    );
};

export default Hashtags;