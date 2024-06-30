import { useMemo, useState } from "react"
import { AssetInfo } from "@ston-fi/api"
import Modal from "../../modal"

import "./index.css"
import Column from "../../../containers/Column"
import useLanguage from "../../../../hooks/useLanguage"
import SearchBar from "../../searchBar"
import Block from "../../../typography/Block"
import Row from "../../../containers/Row"
import Delimiter from "../../../typography/Delimiter"
import { useAppSelector } from "../../../../hooks/useAppDispatch"
import { selectAssets } from "../../../../features/swap/swapSelectors"
import useDebounce from "../../../../hooks/useDebounce"
import { useClosure } from "../../../../hooks/useClosure"

type OwnPropsType = {
    assets?: AssetInfo[]
    jettonWallets?: any
    onJetonSelect: (asset: AssetInfo) => void
    onClose?: () => void
}

export default function AssetsList({ jettonWallets, onJetonSelect, onClose }: OwnPropsType) {
    const t = useLanguage("swap")
    const debounce = useDebounce()
    const assets = useAppSelector(selectAssets)
    const [filteredAssets, setFilterdAssets] = useState(assets)

    const sortedAssets = useMemo(() => {
        if (filteredAssets) {
            const _assets = [...filteredAssets]
            return _assets.sort((a, b) => {
                if (!!jettonWallets[a.contractAddress] && !jettonWallets[b.contractAddress]) {
                    return -1
                } else if (!jettonWallets[a.contractAddress] && !!jettonWallets[b.contractAddress]) {
                    return 1
                }
                return 0
            })
        }
        return []
    }, [filteredAssets])

    const searchHandler = (value: string) => {
        debounce(() => {
            const _assets = assets.filter(asset => asset.displayName?.toLowerCase().includes(value.toLowerCase()) )
            setFilterdAssets(_assets)
        }, 300)
    }

    const clickHandler = useClosure((contractAddress: string) => () => {
        const asset = assets.find(a => a.contractAddress === contractAddress)
        onJetonSelect(asset as AssetInfo)
    })
        
    return (
        <Modal onClose={onClose} title={t("select-token")} allowFullScreen>
            <SearchBar onChange={searchHandler} />
            <Delimiter className="assets-modal-delimiter" />
            <Column className="assets-modal__content">
                <div className="asset-list__content">
                    {sortedAssets.map(asset => {
                        const decimals = Math.pow(10, asset.decimals)
                        const balance = !!jettonWallets[asset.contractAddress] ? Math.round(jettonWallets[asset.contractAddress].balance) / decimals : '--'
                        return (
                            <Block key={asset.contractAddress} className="asset-list__row" onClick={clickHandler(asset.contractAddress)}>
                                <Row>
                                    <img src={asset.imageUrl} alt="" className="asset-icon large" />
                                    <div className="asset-info">
                                        <div className="asset-symbol">{asset.symbol}</div>
                                        <div className="asset-dex-price">
                                            {new Intl.NumberFormat('en-EN', {style: 'currency', currency: 'USD'}).format(Number(asset.dexPriceUsd))}
                                        </div>
                                    </div>
                                    <div className="asset-balance">{balance}</div>
                                </Row>
                            </Block>
                        )}
                    )}
                </div> 
            </Column>
        </Modal>
    )
}