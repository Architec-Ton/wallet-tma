import Lottie from 'lottie-react';
import loaderAnimationData from '../../assets/loties/Loading_animation.json';
import './Loader.styles.css';

function Loader() {
  return (
    <>
      <div className="loader">
        <Lottie animationData={loaderAnimationData} loop={true} />
      </div>
    </>
  );
}

export default Loader;
