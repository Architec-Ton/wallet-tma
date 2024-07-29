import React, { useState, useEffect } from "react";
import {
  delButtonKeybord,
  bioButtonKeybord,
} from "../../assets/icons/pincode/index.ts";
import "./PinCode.style.css";
import Block from "../../components/typography/Block.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import Circle from "../../components/pin-page/Circle.tsx";

export interface PinInputProps {
  onSuccess?: (pin: string) => void;
  onFailure?: () => void;
}

const PinCode: React.FC<PinInputProps> = ({ onSuccess, onFailure }) => {
  const t = useLanguage("Pincode");
  const [pin, setPin] = useState<string>("");
  const [status, setStatus] = useState<"normal" | "error" | "success">(
    "normal"
  );
  useEffect(() => {
    switch (status) {
      case "success":
        if (onSuccess) onSuccess(pin);
        break;
      case "normal":
        break;
      case "error":
        setTimeout(() => setStatus("normal"), 300);
        if (onFailure) onFailure();
        break;
    }
  }, [status, pin]);

  const handleClick = (value: number) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleBiometry = () => {
    console.log("biometry");
  };

  useEffect(() => {
    if (pin.length === 4) {
      setStatus("success");
    }
  }, [pin]);

  const title = status !== "error" ? "confirm" : status;

  return (
    <div className="pin-container">
      <h1 className="pin-title">{t(title)}</h1>
      <div className="pin-input">
        <Block direction="row">
          {[...Array(4)].map((_, index) => (
            <Circle key={index} pin={pin} index={index} status={status} />
          ))}
        </Block>
      </div>

      <div className="pin-keypad">
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className="pin-button"
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleBiometry} className="pin-button">
          {" "}
          {
            <img
              src={bioButtonKeybord}
              style={{ marginTop: 8, blockSize: "50%" }}
              alt={"Bio"}
            />
          }
        </button>

        <button onClick={() => handleClick(0)} className="pin-button">
          0
        </button>

        <button onClick={handleDelete} className="pin-button">
          <img
            src={delButtonKeybord}
            style={{ marginTop: 8, blockSize: "50%" }}
            alt={"Del"}
          />
        </button>
      </div>
    </div>
  );
};

export default PinCode;
