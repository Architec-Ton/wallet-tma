import { createBrowserRouter } from 'react-router-dom';
import PlayGround from './pages/PlayGround';
import Welcome from "./components/start-page/welcome/Welcome.tsx";
import AddWallet from "./components/start-page/AddWallet/AddWallet.tsx";
import YourSecretKey from "./components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey.tsx";
import ConfirmKey from "./components/start-page/AddWallet/create-wallet/your-secret-key/confirm-key/ConfirmKey.tsx";

const router = createBrowserRouter([
  {
    path: '/playground',
    element: <PlayGround />,
  },
  // {
  //   path: '/',
  //   element: <PlayGround />,
  // },
  {
    path: '/',
    element: <Welcome/>,
  },
  {
    path: '/addWallet',
    element: <AddWallet/>,
  },
  {
    path: '/newWallet',
    element: <YourSecretKey/>,
  },
  {
    path: '/confirmKey',
    element: <ConfirmKey/>,
  },
]);

export default router;
