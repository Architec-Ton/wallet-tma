import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { usePage } from "hooks/usePage";

import Page from "components/containers/Page";

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
