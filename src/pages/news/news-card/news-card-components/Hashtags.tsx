import "./Hashtags.styles.css";

interface HashtagsProps {
  hashtags: string[];
  className: "news-card" | "news-top-bar";
}

const Hashtags: React.FC<HashtagsProps> = ({ hashtags, className }) => (
    <div className={`${className}-container__hashtag`}>
      {hashtags.map((hashtag, index) => (
          <div className={`${className}__hashtag`} key={index}>
            #{hashtag}
          </div>
        ))}
    </div>
  );

export default Hashtags;
