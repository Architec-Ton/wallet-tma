import React, { useEffect, useState } from "react";

import { iconButtonPaste } from "assets/icons/buttons/index";

import useLanguage from "hooks/useLanguage";
import { usePage } from "hooks/usePage";
import useRouter from "hooks/useRouter";
import { useTmaMainButton } from "hooks/useTma";

import Button from "components/buttons/Button";
import Column from "components/containers/Column";
import Page from "components/containers/Page";
import Input from "components/inputs/Input";

import "./Existing.styles.css";

const Existing: React.FC = () => {
  const t = useLanguage("Existing");
  const page = usePage();
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const [inputs, setInputs] = useState<string[]>(Array(24).fill(""));
  const [errors, setErrors] = useState<boolean[]>(Array(24).fill(false));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    const newErrors = [...errors];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    newErrors[index] = event.target.value.includes(" ");
    setErrors(newErrors);
    setIsButtonEnabled(newInputs.every((input) => input.trim() !== "") && !newErrors.some((error) => error));
  };

  const handlePaste = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const clipboardData = await navigator.clipboard.readText();
    const words = clipboardData.trim().split(/\s+/);

    const newInputs = [...inputs];
    const newErrors = [...errors];

    for (let i = 0; i < Math.min(words.length, newInputs.length); i++) {
      newInputs[i] = words[i].toLowerCase();
      newErrors[i] = words[i].includes(" ");
    }

    setInputs(newInputs);
    setErrors(newErrors);
    setIsButtonEnabled(newInputs.every((input) => input.trim() !== "") && !newErrors.some((error) => error));
  };

  const handleInputPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = event.clipboardData.getData("Text");
    const words = clipboardData.trim().split(/\s+/);

    if (words.length === 24) {
      event.preventDefault();

      const newInputs = [...inputs];
      const newErrors = [...errors];

      for (let i = 0; i < Math.min(words.length, newInputs.length); i++) {
        newInputs[i] = words[i].toLowerCase();
        newErrors[i] = words[i].includes(" ");
      }

      setInputs(newInputs);
      setErrors(newErrors);
      setIsButtonEnabled(newInputs.every((input) => input.trim() !== "") && !newErrors.some((error) => error));
    }
  };

  useEffect(() => {
    page.setLoading(false);
  }, []);

  useEffect(() => {
    btn.init(
      t("next", "button"),
      () => {
        const mnemonic = inputs.join(" ");
        navigate("/registration/confirm-secret-key", {
          state: { mnemonic, confirm: true },
        });
      },
      isButtonEnabled,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, isButtonEnabled]);

  return (
    <Page title={t("enter-key")} hintMessage={t("enter-key-hint")}>
      <form className="center">
        <Column columns={2}>
          {inputs.map((value, index) => (
            <Input
              prefix={`${index + 1}.`}
              key={index}
              onChange={handleInputChange(index)}
              value={value}
              className={`registration-mnemonic-word ${errors[index] ? "input-error" : ""}`}
              onPaste={handleInputPaste}
            />
          ))}
        </Column>
        <div className="center p-1" style={{ position: "fixed", bottom: "var(--spacing-8)" }}>
          <Button title={t("paste", "button")} icon={iconButtonPaste} primary={false} onClick={handlePaste} />
        </div>
        <div style={{ height: "var(--spacing-64)" }} />
      </form>
    </Page>
  );
};

export default Existing;
