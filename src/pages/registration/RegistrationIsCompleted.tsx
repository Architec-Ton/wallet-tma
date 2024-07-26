import Page from "../../components/containers/Page.tsx";
import useLanguage from "../../hooks/useLanguage.ts";
import SHIELD from "../../assets/icons/pages/registration-complete/shield-tick.svg";
import "./RegistrationCompleted.style.css";
// import {useNavigate} from "react-router-dom";
// import {useTmaMainButton} from "../../hooks/useTma.ts";
import { useEffect } from "react";
import { usePage } from "../../hooks/usePage.ts";
import { useTmaMainButton } from "../../hooks/useTma.ts";
import useRouter from "../../hooks/useRouter.ts";

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
      true
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
