import React from "react";
import { createBrowserRouter } from "react-router-dom";

import BankStakingHistory from "./components/ui/bank/BankStakingHistory";
import AccountDisconnect from "./pages/AccountDisconnect";
import Main from "./pages/Main";
import ApplicationSubmit from "./pages/account/account-settings-pages/ApplicationSubmit";
import MainCurrency from "./pages/account/account-settings-pages/MainCurrency";
import Notifications from "./pages/account/account-settings-pages/Notifications";
import WalletLanguage from "./pages/account/account-settings-pages/WalletLanguage";
import WalletSafety from "./pages/account/account-settings-pages/WalletSafety";
import AddCrypto from "./pages/addCrypto";
import ChooseAddMethod from "./pages/addCrypto/AddCrypto";
import AddCryptoAddress from "./pages/addCrypto/Address";
import ReceiveAsset from "./pages/addCrypto/ReceiveAsset";
import BankBuy from "./pages/banks/BankBuy";
import BankMain from "./pages/banks/BankMain";
import BankReferral from "./pages/banks/BankReferral";
import BankStaking from "./pages/banks/BankStaking";
import BankingTasks from "./pages/banks/BankingTasks";
import Histories from "./pages/history/history";
// import Account from './pages/account/Account.tsx';
import News from "./pages/news/News";
import PlayGround from "./pages/playGround";
import CategoryGames from "./pages/playGround/categoryGames";
import GamePage from "./pages/playGround/gamePage";
import LeaderBoard from "./pages/playGround/leaderBoard";
import AddWallet from "./pages/registration/AddWallet";
import ConfirmKey from "./pages/registration/ConfirmKey";
import Existing from "./pages/registration/Existing";
import RegistrationIsCompleted from "./pages/registration/RegistrationIsCompleted";
import SecretKey from "./pages/registration/SecretKey";
// import AddWallet from "./components/start-page/AddWallet/AddWallet"
// import YourSecretKey from "./components/start-page/AddWallet/create-wallet/your-secret-key/YourSecretKey"
import Welcome from "./pages/registration/Welcome";
// import SelectAddress from './pages/send/SelectAddress.tsx';
// import SelectAmount from './pages/send/SelectAmount.tsx';
import SendPage from "./pages/send/send";
import Swap from "./pages/swap";
import Market from "pages/market";
import CreateMarketOrder from "pages/market/createOrder";
import ConfirmOrder from "pages/market/confirmOrder";
import MarketBuy from "pages/market/buy";
import MarketSell from "pages/market/sell";

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
    {
      path: "/market",
      element: <Market />,
    },
    {
      path: "/market/buy",
      element: <MarketBuy />,
    },
    {
      path: "/market/sell",
      element: <MarketSell />,
    },
    {
      path: "/market/create-order",
      element: <CreateMarketOrder />,
    },
    {
      path: "/market/create-order/confirm",
      element: <ConfirmOrder />,
    },
  ],
  { basename: "/wallet" },
);

export default router;
