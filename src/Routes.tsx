import { createBrowserRouter } from 'react-router-dom';
import PlayGround from './pages/playGround/index.tsx';
// import AddWallet from './components/start-page/AddWallet/AddWallet.tsx';
// import YourSecretKey from './components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey.tsx';

import Welcome from './pages/registration/Welcome.tsx';
import ConfirmKey from './pages/registration/ConfirmKey.tsx';
import AddWallet from './pages/registration/AddWallet.tsx';
import SecretKey from './pages/registration/SecretKey.tsx';
import RegistrationIsCompleted from './pages/registration/RegistrationIsCompleted.tsx';
import Existing from './pages/registration/Existing.tsx';
import Main from './pages/Main.tsx';
import GamePage from './pages/playGround/GamePage.tsx';
import LeaderBoard from './pages/playGround/LeaderBoard.tsx';
import CategoryGames from './pages/playGround/CategoryGames.tsx';
import PinCode from "./pages/pincode/PinCode.tsx";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/playground',
      element: <PlayGround />,
    },
    {
      path: '/playground/:id',
      element: <GamePage />
    },
    {
      path: '/playground/:id/leaders',
      element: <LeaderBoard />
    },
    {
      path: '/playground/category/:id',
      element: <CategoryGames />
    },
    {
      path: '/registration/welcome',
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
    {
      path: '/pin-code',
      element: <PinCode/>,
    },
  ],
  { basename: '/wallet' }
);

export default router;
