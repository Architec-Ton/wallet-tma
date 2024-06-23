import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import './i18n';
import { SDKProvider } from '@tma.js/sdk-react';
import Layout from './components/layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <SDKProvider acceptCustomStyles>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </SDKProvider>
      </Provider>
    </>
  );
}

export default App;
