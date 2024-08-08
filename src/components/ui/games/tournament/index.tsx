import React, { useEffect, useState } from "react";

import { useSubscribeTournamentMutation } from "features/gaming/gamingApi";
import Lottie from "lottie-react";

import fireWorkData from "assets/loties/firework.json";

import useLanguage from "hooks/useLanguage";

import Column from "components/containers/Column";
import Section from "components/containers/Section";
import Block from "components/typography/Block";

import "./index.css";

const Tournament = ({ id }: { id?: string }) => {
  const t = useLanguage("game-tournament");
  const [subscribe] = useSubscribeTournamentMutation();
  const [isSended, setIsSended] = useState(false);
  const [showFireWork, setShowFireWork] = useState(false);

  useEffect(() => {
    if (isSended) {
      setShowFireWork(true);
    }
  }, [isSended]);

  const clickHandler = () => {
    subscribe(id as string)
      .then(() => {
        setIsSended(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const hideFireWork = () => {
    setShowFireWork(false);
  };

  if (!id) {
    return null;
  }

  return (
    <Section title={t("title")}>
      {!isSended && (
        <Column>
          <Block>{t("description")}</Block>
          <button className="tournament-button" onClick={clickHandler}>
            {t("button")}
          </button>
        </Column>
      )}

      {isSended && (
        <Column>
          <Block className="success-block">{t("success")}</Block>
          <Block className="info-block">{t("info")}</Block>
        </Column>
      )}

      {showFireWork && (
        <div className="firework-container">
          <Lottie
            animationData={fireWorkData}
            loop={false}
            onComplete={hideFireWork}
            width="auto"
            renderer="svg"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
            allowTransparency
          />
        </div>
      )}
    </Section>
  );
};

export default Tournament;
