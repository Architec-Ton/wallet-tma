import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import './i18n';
import { SDKProvider } from '@tma.js/sdk-react';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <>
    <TonConnectUIProvider
        manifestUrl="https://architecton.site/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.LIGHT }}
        actionsConfiguration={{
          twaReturnUrl: import.meta.env.VITE_BE_TWA_RETURN,
        }}>
          <Provider store={store}>
            <SDKProvider acceptCustomStyles>
              <Layout>
                <RouterProvider router={router} />
              </Layout>
            </SDKProvider>
            </Provider>
    </TonConnectUIProvider>
    </>
  );
}

export default App;
