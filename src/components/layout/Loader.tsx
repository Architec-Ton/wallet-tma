import React, { useEffect, useRef, useState } from "react";

import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";

import loaderAnimationData from "assets/loties/Loading_animation.json";

import Button from "components/buttons/Button";
import LinkButton from "components/buttons/LinkButton";

import "./Loader.styles.css";

function Loader({
  isLoading,
  isClicked,
  onClick,
}: {
  isLoading: boolean;
  isClicked: boolean;
  onClick: (s: boolean) => void;
}) {
  const [lottieFileLoaded, setLottieFileLoaded] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isClicked) {
        onClick(true)
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isClicked && !isLoading && lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [isClicked, isLoading]);

  return (
    <>
      <div className="loader">
        <Lottie
          lottieRef={lottieRef}
          onDOMLoaded={() => setLottieFileLoaded(true)}
          animationData={loaderAnimationData}
          loop
        />
        <p className="loader-text">
          <LinkButton to="https://chng.it/RyTJYnyZ5z" style={{ opacity: lottieFileLoaded ? 1 : 0 }}>
            #FreeDurov
          </LinkButton>
        </p>

        <Button
          style={{ opacity: !isClicked && !isLoading ? 1 : 0 }}
          onClick={() => onClick(true)}
          className="loader-button"
        >
          Continue
        </Button>
      </div>
    </>
  );
}

export default Loader;
