import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Column from "components/containers/Column";
import Row from "components/containers/Row";
import Section from "components/containers/Section";
import Delimiter from "components/typography/Delimiter";
import ListBlock from "components/ui/listBlock";
import ListBaseItem from "components/ui/listBlock/ListBaseItem";
import Modal from "components/ui/modal";
import SearchBar from "components/ui/searchBar";
import useLanguage from "hooks/useLanguage";
import { t } from "i18next";

import "./AssetsModal.styles.css"
import { CoinDto } from "types/assest";

type AssetsModalPropsType = {
  title: string;
  onSelect: (asset: CoinDto) => void;
  onClose: () => void;
  assets: CoinDto[]
}

const AssetsModal = ({title, onSelect, onClose, assets}: AssetsModalPropsType) => {
  const t = useLanguage("")
  const [showAssets, setShowAssets] = useState<boolean>(true)
  const [showNfts, setShowNfts] = useState<boolean>(false)

  const assetsTabHandler = () => {
    setShowAssets(true)
    setShowNfts(false)
  }

  const nftsTabHandler = () => {
    setShowAssets(false)
    setShowNfts(true)
  }

  const searchHandler = (value: string) => {
    console.log("search", value)
  }

  return (
    <Modal onClose={onClose} fullScreenMode>
      <Section title={title}>
        <SearchBar onChange={searchHandler} />
      </Section>
      <Delimiter />
      <Column>
        <Row className="assets-tab">
          <div className={classNames({"selected": showAssets})} onClick={assetsTabHandler}>{t("title", "assets")}</div>
          <div className={classNames({"selected": showNfts})} onClick={nftsTabHandler}>{t("title", "nft")}</div>
        </Row>
        {showAssets && (
          <ListBlock>
            {assets && assets.map(asset => (
              <ListBaseItem onClick={() => onSelect(asset)} key={asset.meta?.address}>
                <img className="asset-modal-icon" src={asset.meta?.image || asset.meta?.imageData} alt="" />
                <div className="grow">{asset.meta?.symbol}</div>
              </ListBaseItem>
            ))}
          </ListBlock>
        )}
        {showNfts && (
          <ListBlock className="nft-list-block">
            <ListBaseItem>
              <img className="nft-modal-icon" src={''} alt="" />
              <Column className="grow">
                <div>Nft collection 1</div>
                <div className="secondary-content text-sm">Collection name</div>
              </Column>
            </ListBaseItem>
            <ListBaseItem>
              <img className="nft-modal-icon" src={''} alt="" />
              <Column className="grow">
                <div>Nft collection 2</div>
                <div className="secondary-content text-sm">Collection name</div>
              </Column>
            </ListBaseItem>
            <ListBaseItem>
              <img className="nft-modal-icon" src={''} alt="" />
              <Column className="grow">
                <div>Nft collection 3</div>
                <div className="secondary-content text-sm">Collection name</div>
              </Column>
            </ListBaseItem>
          </ListBlock>
        )}
      </Column>
    </Modal>
  )
}

export default AssetsModal