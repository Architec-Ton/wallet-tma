import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import './i18n';
import { SDKProvider } from '@tma.js/sdk-react';
import Layout from './components/layout/Layout';

function App() {
  return (
    <>
      <SDKProvider acceptCustomStyles debug>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </SDKProvider>
    </>
  );
}

export default App;
