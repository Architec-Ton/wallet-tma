import { createBrowserRouter } from 'react-router-dom';
import PlayGround from './pages/PlayGround';
// import AddWallet from './components/start-page/AddWallet/AddWallet.tsx';
// import YourSecretKey from './components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey.tsx';
// import ConfirmKey from './components/start-page/AddWallet/create-wallet/your-secret-key/confirm-key/ConfirmKey.tsx';
import Welcome from './pages/registration/Welcome.tsx';
import AddWallet from './pages/registration/AddWallet.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/playground',
      element: <PlayGround />,
    },
    {
      path: '/',
      element: <Welcome />,
    },
    {
      path: '/add-wallet',
      element: <AddWallet />,
    },
    // {
    //   path: '/newWallet',
    //   element: <YourSecretKey />,
    // },
    // {
    //   path: '/confirmKey',
    //   element: <ConfirmKey />,
    // },
  ],
  { basename: '/wallet' }
);

export default router;
