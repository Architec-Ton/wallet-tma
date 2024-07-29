import { useNavigate } from "react-router-dom"
import { iconButtonArraw } from "../../assets/icons/buttons"
import { iconScanBarcode } from "../../assets/icons/pages/add-crypto"
import Section from "../../components/containers/Section"
import Tile from "../../components/typography/Tile"

const ChooseAddMethod = () => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate("address")
  }
  return (
    <Section title="How do you want to add crypto?" className="add-crypto__container">
      <Tile 
        title="External Wallet" 
        description="Receive from another wallet" 
        icon={iconScanBarcode} 
        iconAction={iconButtonArraw}
        onClick={clickHandler}
        className="icon-start"
      />
    </Section>
  )
}

export default ChooseAddMethod