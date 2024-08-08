import React from "react";

import type { PinInputProps } from "pages/pincode/PinCode";
import PinCode from "pages/pincode/PinCode";

import Modal from "../../modal";

const ModalPinCode = (props: PinInputProps) => (
  <Modal fullScreenMode>
    <PinCode {...props} />
  </Modal>
);

export default ModalPinCode;
