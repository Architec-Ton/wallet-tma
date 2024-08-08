import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "../../../components/containers/Grid";
import Page from "../../../components/containers/Page";
import Section from "../../../components/containers/Section";
import { useGetGameLeadersQuery } from "../../../features/gaming/gamingApi";
import { setLoading } from "../../../features/page/pageSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import useLanguage from "../../../hooks/useLanguage";
import GameLeaderRow from "./GameLeaderRow";

const LeaderBoard = () => {
  const t = useLanguage("game");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetGameLeadersQuery({ id: id as string });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  return (
    <Page>
      <Section title={t("leaderboard")} className="leaders-section">
        <Grid columns={12} gap={2} className="game-leader__head" isOrderedList>
          <GameLeaderRow
            num="#"
            name={t("leader-name")}
            totalCoins={t("leader-total-coins")}
            asset={t("leader-asset")}
            time={t("leader-time")}
            isHeader
          />
        </Grid>
        {data &&
          data.map((leader, index) => (
            <Grid key={`${leader.name}-${index}`} columns={12} gap={2} className="block game-leader__row" isOrderedList>
              <GameLeaderRow
                num={index + 1}
                name={leader.name}
                totalCoins={leader.totalCoins}
                asset={leader.asset}
                time={leader.time}
              />
            </Grid>
          ))}
      </Section>
    </Page>
  );
};

export default LeaderBoard;
