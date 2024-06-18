import { useParams } from "react-router-dom"
import { useGetGameLeadersQuery } from "../../features/gaming/gamingApi"
import { useEffect } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setLoading } from "../../features/page/pageSlice"
import Section from "../../components/containers/Section"
import Grid from "../../components/containers/Grid"
import GameLeaderRow from "./GameLeaderRow"
import Page from "../../components/containers/Page"

const LeaderBoard = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetGameLeadersQuery({id: id as string})

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  return (
    <Page>
      <Section title="Leaderboard" className="leaders-section">
        <Grid columns={12} gap={2} className="game-leader__head" isOrderedList>
          <GameLeaderRow num="#" name="Name" totalCoins="Total coins" asset="Asset" time="Time" isHeader />
        </Grid>
        {data && data.map((leader, index) => {
          return (
            <Grid key={`${leader.name}-${index}`} columns={12} gap={2} className="block game-leader__row" isOrderedList>
              <GameLeaderRow num={index + 1} name={leader.name} totalCoins={leader.totalCoins} asset={leader.asset} time={leader.time} />
            </Grid>
          )
        }) }
      </Section>
    </Page>
  )
}

export default LeaderBoard