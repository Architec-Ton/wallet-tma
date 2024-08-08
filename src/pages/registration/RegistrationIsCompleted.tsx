import React, { useEffect } from "react";

import SHIELD from "../../assets/icons/pages/registration-complete/shield-tick.svg";
import Page from "../../components/containers/Page";
import useLanguage from "../../hooks/useLanguage";
import { usePage } from "../../hooks/usePage";
import useRouter from "../../hooks/useRouter";
import { useTmaMainButton } from "../../hooks/useTma";
import "./RegistrationCompleted.style.css";

const RegistrationIsCompleted = () => {
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();
  const t = useLanguage("Registration");

  const description = (
    <p>
      {t("1-description")}
      <span>{t("2-description")}</span>
      {t("3-description")}
    </p>
  );

  useEffect(() => {
    // if (!isTonLoading) {
    page.setLoading(false, false);
    btn.init(
      t("next", "button"),
      () => {
        navigate("/", { replace: true });
      },
      true,
    );
    // }
  }, []);

  return (
    <Page title={t("registration-completed")}>
      {description}
      <div className="imgContainer">
        <img src={SHIELD} alt="Shield" />
      </div>
    </Page>
  );
};

export default RegistrationIsCompleted;
