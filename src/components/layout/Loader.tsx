import Lottie from 'react-lottie';
import loaderAnimationData from '../../assets/loties/Loading_animation.json';
import './Loader.styles.css';

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimationData,
  };

  return (
    <>
      <div className="loader">
        <Lottie options={defaultOptions} />
      </div>
    </>
  );
}

export default Loader;
