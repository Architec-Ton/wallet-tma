import React, { useRef } from "react";

import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";

import loaderAnimationData from "assets/loties/Loading_animation.json";

import "./Loader.styles.css";

function Loader() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <>
      <div className="loader">
        <Lottie lottieRef={lottieRef} animationData={loaderAnimationData} loop />
      </div>
    </>
  );
}

export default Loader;
