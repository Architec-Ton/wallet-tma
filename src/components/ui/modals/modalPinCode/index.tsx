import PinCode, { PinInputProps } from "../../../../pages/pincode/PinCode";
import Modal from "../../modal";

const ModalPinCode = (props: PinInputProps) => {
  return (
    <Modal fullScreenMode>
      <PinCode {...props} />
    </Modal>
  );
};

export default ModalPinCode;
