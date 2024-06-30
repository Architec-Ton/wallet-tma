import { useState } from "react"
import Modal from "../../../components/ui/modal"
import Column from "../../../components/containers/Column"
import useLanguage from "../../../hooks/useLanguage"
import SearchBar from "../../../components/ui/searchBar"
import Block from "../../../components/typography/Block"
import Row from "../../../components/containers/Row"
import Delimiter from "../../../components/typography/Delimiter"
import useDebounce from "../../../hooks/useDebounce"
import { useClosure } from "../../../hooks/useClosure"
import { CoinDto } from "../../../types/assest"

import "./index.css"

type OwnPropsType = {
    assets: CoinDto[] | null | undefined
    onJetonSelect: (asset: CoinDto) => void
    onClose?: () => void
}

export default function AssetsList({ assets, onJetonSelect, onClose }: OwnPropsType) {
    const t = useLanguage("swap")
    const debounce = useDebounce()
    const [filteredAssets, setFilterdAssets] = useState<typeof assets>(assets)

    const searchHandler = (value: string) => {
        debounce(() => {
            const _assets = assets?.filter(asset => asset.meta?.name?.toLowerCase().includes(value.toLowerCase()) )
            setFilterdAssets(_assets)
        }, 300)
    }

    const clickHandler = useClosure((contractAddress: string) => {
        const asset = assets?.find(a => a.meta?.address === contractAddress)
        onJetonSelect(asset as CoinDto)
    })

    if (!assets) {
        return null
    }
        
    return (
        <Modal onClose={onClose} title={t("select-token")} allowFullScreen>
            <SearchBar onChange={searchHandler} />
            <Delimiter className="assets-modal-delimiter" />
            <Column className="assets-modal__content">
                <div className="asset-list__content">
                    {filteredAssets && filteredAssets.map(asset => {
                        return (
                            <Block key={asset.meta?.address} className="asset-list__row" onClick={clickHandler(asset.meta?.address as string)}>
                                <Row>
                                    <img src={asset.meta?.image} alt="" className="asset-icon large" />
                                    <div className="asset-info">
                                        <div className="asset-symbol">{asset.meta?.symbol}</div>
                                        <div className="asset-dex-price">
                                            {asset.usdPrice.toLocaleString(undefined, { style: 'currency', currency: 'USD'})}
                                        </div>
                                    </div>
                                    <div className="asset-balance">
                                        <div>{asset.amount.toLocaleString(undefined, {maximumFractionDigits: asset.meta?.decimals})}</div>
                                        <div className="asset-dex-price">
                                            {(asset.amount * asset.usdPrice).toLocaleString(undefined, { style: 'currency', currency: 'USD'})}
                                        </div>
                                    </div>
                                </Row>
                            </Block>
                        )}
                    )}
                </div> 
            </Column>
        </Modal>
    )
}