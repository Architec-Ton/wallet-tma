import React from "react";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import * as Sentry from "@sentry/browser";
import { SDKProvider } from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import PopupProvider from "components/layout/PopupProvider";

import "./App.css";
import router from "./Routes";
import Layout from "./components/layout/Layout";
import { TmaProvider } from "./components/layout/TmaProvider";
import { TonProvider } from "./components/layout/TonProvider";
import AlertContainer from "./components/ui/alert/AlertContainer";
import { FE_URL, GA_ID, MANIFEST_URL } from "./constants";
import "./i18n";
import { store } from "./store";

if (GA_ID) ReactGA.initialize(GA_ID);

if (!import.meta.env.DEV) {
  const dsnProd = "https://82aa908726ad43ee9b5dd7511e58dc60@glitchtip.architecton.site/1";
  const dsnDev = "https://8e83fb5ea47542a5948003fa3e1c0a34@glitchtip.architecton.site/2";
  const isDev = import.meta.env.VITE_APP_URL === "https://t.me/ATonDevBot/Wallet";

  Sentry.init({ dsn: isDev ? dsnDev : dsnProd, environment: isDev ? "dev-stand" : "production" });
}

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
