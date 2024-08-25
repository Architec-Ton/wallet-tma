import React, { useState } from "react";

import Lottie from "lottie-react";

import loaderAnimationData from "assets/loties/Loading_animation.json";

import LinkButton from "components/buttons/LinkButton";

import "./Loader.styles.css";

function Loader() {
  const [lottieFileLoaded, setLottieFileLoaded] = useState(false);

  return (
    <>
      <div className="loader">
        <Lottie onDOMLoaded={() => setLottieFileLoaded(true)} animationData={loaderAnimationData} loop />
        <p>
          <LinkButton
            to="https://chng.it/RyTJYnyZ5z"
            className="loader-text"
            style={{ opacity: lottieFileLoaded ? 1 : 0 }}
          >
            #FreeDurov
          </LinkButton>
        </p>
      </div>
    </>
  );
}

export default Loader;
