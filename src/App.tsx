import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import "./i18n";
import { SDKProvider } from "@tma.js/sdk-react";
import Layout from "./components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { FE_URL, MANIFEST_URL } from "./constants";
import { TonProvider } from "./components/layout/TonProvider";
import TransactionProvider from "./components/layout/TransactionProvider";

// import { Buffer } from "buffer/";
// window.Buffer = Buffer;

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
              <Layout>
                <TransactionProvider>
                  <RouterProvider router={router} />
                </TransactionProvider>
              </Layout>
            </TonProvider>
          </SDKProvider>
        </Provider>
      </TonConnectUIProvider>
    </>
  );
}

export default App;
