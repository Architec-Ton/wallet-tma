import { Outlet } from "react-router-dom";
import Page from "../../components/containers/Page";

import "./index.css";
import { usePage } from "../../hooks/usePage";
import { useEffect } from "react";

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
