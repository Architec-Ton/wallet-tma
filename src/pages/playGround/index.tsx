import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import Input from '../../components/inputs/Input.tsx';
import { SearchIcon } from '../../assets/icons/inputs/index.ts'
import { ChangeEventHandler, useEffect, useState } from 'react';
import Row from '../../components/containers/Row.tsx';
import Slider from '../../components/ui/slider/index.tsx';
import cardImage from '../../assets/images/card.png'
import { SwiperSlide } from 'swiper/react';
import GameList from '../../components/ui/games/list/index.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch.ts';
import { selectGames, selectGamesStatus } from '../../features/gaming/gamingSelectors.ts';
import { fetchGames } from '../../features/gaming/actions.ts';
import { setLoading } from '../../features/page/pageSlice.ts';

const imageSliderData = [cardImage,cardImage,cardImage,cardImage,cardImage,cardImage]

const SearchIconComponent = () => <img src={SearchIcon} alt="" />

function PlayGround () {
  const [searchValue, setSearchValue] = useState<string>('')
  const games = useAppSelector(selectGames)
  const { isLoading } = useAppSelector(selectGamesStatus)


  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSearchValue(value)
  }
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])
  
  return (
    <Page>
      <Column>
        <Input type="text" value={searchValue} placeholder="Search" onChange={searchHandler} prefix={<SearchIconComponent />} />
        <Row className="w-screen">
          <Slider settings={{
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 5,
            pagination: {
              clickable: true,
            }
          }}>
            {imageSliderData.map((image, index) => (
              <SwiperSlide key={`playground_slide-${index}`}>
                <img src={image} alt="" className="w-full" />
              </SwiperSlide>
            ))}
          </Slider>
        </Row>
        <GameList games={games} />
      </Column>
    </Page>
  )
}

export default PlayGround;
