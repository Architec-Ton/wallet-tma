import PinCode from "../../../../pages/pincode/PinCode"
import Modal from "../../modal"

const GamePinCode = () => {
  return (
    <Modal allowAnimation={false} fullScreenMode>
      <PinCode />
    </Modal>
  )
}

export default GamePinCode