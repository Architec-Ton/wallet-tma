import { createBrowserRouter } from 'react-router-dom';
import PlayGround from './pages/PlayGround';
// import AddWallet from './components/start-page/AddWallet/AddWallet.tsx';
// import YourSecretKey from './components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey.tsx';

import Welcome from './pages/registration/Welcome.tsx';
import ConfirmKey from './pages/registration/ConfirmKey.tsx';
import AddWallet from './pages/registration/AddWallet.tsx';
import SecretKey from './pages/registration/SecretKey.tsx';
import RegistrationIsCompleted from './pages/registration/RegistrationIsCompleted.tsx';
import Existing from './pages/registration/Existing.tsx';

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
      path: '/registration/add-wallet',
      element: <AddWallet />,
    },
    {
      path: '/registration/secret-key',
      element: <SecretKey />,
    },
    {
      path: '/registration/confirm-secret-key',
      element: <ConfirmKey />,
    },
    {
      path: '/registration/completed',
      element: <RegistrationIsCompleted />,
    },
    {
      path: '/registration/existing',
      element: <Existing />,
    },
  ],
  { basename: '/wallet' }
);

export default router;
