import React from "react";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { SDKProvider } from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "./App.css";
import router from "./Routes";
import Layout from "./components/layout/Layout";
import { TmaProvider } from "./components/layout/TmaProvider";
import { TonProvider } from "./components/layout/TonProvider";
import AlertContainer from "./components/ui/alert/AlertContainer";
import { FE_URL, GA_ID, MANIFEST_URL } from "./constants";
import "./i18n";
import { store } from "./store";
import PopupProvider from "components/layout/PopupProvider";

if (GA_ID) ReactGA.initialize(GA_ID);

function App() {
  return (
    <>
      <TonConnectUIProvider
        manifestUrl={MANIFEST_URL}
        // uiPreferences={{ theme: THEME.LIGHT }}
        actionsConfiguration={{
          twaReturnUrl: FE_URL,
        }}
      >
        <Provider store={store}>
          <SDKProvider acceptCustomStyles>
            <TonProvider>
              <TmaProvider>
                <PopupProvider>
                  <Layout>
                    <AlertContainer />
                    <RouterProvider router={router} />
                  </Layout>
                </PopupProvider>
              </TmaProvider>
            </TonProvider>
          </SDKProvider>
        </Provider>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
