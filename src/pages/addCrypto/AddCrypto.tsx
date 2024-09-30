import React from "react";
import { useNavigate } from "react-router-dom";

// import { useHapticFeedback } from "@tma.js/sdk-react";
import { showAlert } from "features/alert/alertSlice";

import { iconButtonArraw } from "assets/icons/buttons";
import { iconCard, iconEmptyWalletAdd, iconScanBarcode } from "assets/icons/pages/add-crypto";

import { useAppDispatch } from "hooks/useAppDispatch";

import Section from "components/containers/Section";
import Tile from "components/typography/Tile";

const ChooseAddMethod = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const hapticFeedback = useHapticFeedback();

  const clickHandler = () => {
    // hapticFeedback.impactOccurred("soft");
    navigate("address");
  };

  const clickHandlerDisabled = () => {
    // hapticFeedback.impactOccurred("soft");
    dispatch(
      showAlert({ message: `This feature is currently under development and will be available soon.`, duration: 5000 }),
    );
  };

  return (
    <Section title="How do you want to add crypto?" className="add-crypto__container">
      <Tile
        title="External Wallet"
        description="Receive from another wallet"
        icon={iconScanBarcode}
        iconAction={iconButtonArraw}
        onClick={clickHandler}
        className="icon-start add-crypto__tile"
      />
      <Tile
        title="Bank Card"
        description="Buy with your bank card"
        icon={iconCard}
        iconAction={iconButtonArraw}
        onClick={clickHandlerDisabled}
        className="icon-start add-crypto__tile add-crypto__tile--disabled"
      />
      <Tile
        title="P2P Market"
        description="Buy without intermediares"
        icon={iconEmptyWalletAdd}
        iconAction={iconButtonArraw}
        onClick={clickHandlerDisabled}
        className="icon-start add-crypto__tile add-crypto__tile--disabled"
      />
    </Section>
  );
};

export default ChooseAddMethod;
