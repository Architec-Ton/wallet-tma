import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Page from "../../components/containers/Page";
import { usePage } from "../../hooks/usePage";
import "./index.css";

const AddCrypto = () => {
  const page = usePage();

  useEffect(() => {
    page.setLoading(false);
  }, []);

  return (
    <Page>
      <Outlet />
    </Page>
  );
};

export default AddCrypto;
