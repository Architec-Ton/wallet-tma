import { createBrowserRouter } from "react-router-dom";
import PlayGround from "./pages/playGround";
// import AddWallet from "./components/start-page/AddWallet/AddWallet.tsx";
// import YourSecretKey from "./components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey.tsx";

import Welcome from "./pages/registration/Welcome.tsx";
import ConfirmKey from "./pages/registration/ConfirmKey.tsx";
import AddWallet from "./pages/registration/AddWallet.tsx";
import SecretKey from "./pages/registration/SecretKey.tsx";
import RegistrationIsCompleted from "./pages/registration/RegistrationIsCompleted.tsx";
import Existing from "./pages/registration/Existing.tsx";
import Main from "./pages/Main.tsx";
import GamePage from "./pages/playGround/gamePage";
import LeaderBoard from "./pages/playGround/leaderBoard";
import CategoryGames from "./pages/playGround/categoryGames";
import AddCrypto from "./pages/addCrypto";
import ReceiveAsset from "./pages/addCrypto/ReceiveAsset.tsx";
import ChooseAddMethod from "./pages/addCrypto/AddCrypto.tsx";
import AddCryptoAddress from "./pages/addCrypto/Address.tsx";
// import Account from './pages/account/Account.tsx';
import News from "./pages/news/News.tsx";
import WalletLanguage from "./pages/account/account-settings-pages/WalletLanguage.tsx";
import MainCurrency from "./pages/account/account-settings-pages/MainCurrency.tsx";
import ApplicationSubmit from "./pages/account/account-settings-pages/ApplicationSubmit.tsx";
import WalletSafety from "./pages/account/account-settings-pages/WalletSafety.tsx";
import Notifications from "./pages/account/account-settings-pages/Notifications.tsx";
import BankMain from "./pages/banks/BankMain.tsx";
import BankingTasks from "./pages/banks/BankingTasks.tsx";
import BankStaking from "./pages/banks/BankStaking.tsx";
import Swap from "./pages/swap";
// import SelectAddress from './pages/send/SelectAddress.tsx';
// import SelectAmount from './pages/send/SelectAmount.tsx';
import SendPage from "./pages/send/send.tsx";
import AccountDisconnect from "./pages/AccountDisconnect.tsx";
import BankBuy from "./pages/banks/BankBuy.tsx";
import BankStakingHistory from "./components/ui/bank/BankStakingHistory.tsx";
import BankReferral from "./pages/banks/BankReferral.tsx";
import Histories from "./pages/history/history.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/playground",
      element: <PlayGround />,
    },
    {
      path: "/playground/:id",
      element: <GamePage />,
    },
    {
      path: "/playground/:id/leaders",
      element: <LeaderBoard />,
    },
    {
      path: "/playground/category/:id",
      element: <CategoryGames />,
    },
    {
      path: "/registration/welcome",
      element: <Welcome />,
    },
    {
      path: "/registration/add-wallet",
      element: <AddWallet />,
    },
    {
      path: "/registration/secret-key",
      element: <SecretKey />,
    },
    {
      path: "/registration/confirm-secret-key",
      element: <ConfirmKey />,
    },
    {
      path: "/registration/completed",
      element: <RegistrationIsCompleted />,
    },
    {
      path: "/registration/existing",
      element: <Existing />,
    },
    {
      path: "/account",
      element: <AccountDisconnect />,
    },
    {
      path: "/wallet-language",
      element: <WalletLanguage />,
    },
    {
      path: "/main-currency",
      element: <MainCurrency />,
    },
    {
      path: "/application-submit",
      element: <ApplicationSubmit />,
    },
    {
      path: "/wallet-safety",
      element: <WalletSafety />,
    },
    {
      path: "/histories",
      element: <Histories />,
    },
    {
      path: "/notifications",
      element: <Notifications />,
    },
    {
      path: "/dev-menu",
    },
    {
      path: "/add-crypto",
      element: <AddCrypto />,
      children: [
        {
          index: true,
          element: <ChooseAddMethod />,
        },
        {
          path: "receive",
          element: <ReceiveAsset />,
        },
        {
          path: "address",
          element: <AddCryptoAddress />,
        },
      ],
    },
    {
      path: "/news",
      element: <News />,
    },
    {
      path: "/bank",
      element: <BankMain />,
    },
    {
      path: "/bank/tasks",
      element: <BankingTasks />,
    },
    {
      path: "/bank/stake",
      element: <BankStaking />,
    },
    {
      path: "/bank/buy",
      element: <BankBuy />,
    },
    {
      path: "/bank/stake/history",
      element: <BankStakingHistory />,
    },
    {
      path: "/swap",
      element: <Swap />,
    },
    {
      path: "/send",
      element: <SendPage />,
    },
    {
      path: "/bank/referal",
      element: <BankReferral />,
    },
  ],
  { basename: "/wallet" }
);

export default router;
