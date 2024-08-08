import './App.css'
import { RouterProvider } from 'react-router-dom'
import ReactGA from 'react-ga4'
import router from './Routes'
import './i18n'
import { SDKProvider } from '@tma.js/sdk-react'
import Layout from './components/layout/Layout'
import { Provider } from 'react-redux'
import { store } from './store'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { FE_URL, GA_ID, MANIFEST_URL } from './constants'
import { TonProvider } from './components/layout/TonProvider'
import AlertContainer from './components/ui/alert/AlertContainer.tsx'
import { TmaProvider } from './components/layout/TmaProvider.tsx'

if (GA_ID) ReactGA.initialize(GA_ID)

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
                <Layout>
                  <AlertContainer />
                  <RouterProvider router={router} />
                </Layout>
              </TmaProvider>
            </TonProvider>
          </SDKProvider>
        </Provider>
      </TonConnectUIProvider>
    </>
  )
}

export default App
