import CIRCLE from '../../../../assets/add-wallet-circle.svg'
import KEY from '../../../../assets/add-wallet-key.svg'
import IMPORT from '../../../../assets/add-wallet-import.svg'

interface AddWalletsButtons {
    title: string;
    icon: string;
    message: string;
    path: string
}

const WalletButtons: AddWalletsButtons[] = [
    {
        title: 'New Wallet',
        icon: CIRCLE,
        message: 'Create a new custom wallet in two clicks',
        path: '/newWallet'
    },
    {
        title: 'An Existing Wallet',
        icon: KEY,
        message: 'Add an existing wallet using a 24-word secret key.',
        path: '/existingWallet'
    },
    {
        title: 'Import wallet',
        icon: IMPORT,
        message: 'Import Wallet, Ton Space,Tonkeeper, MyTonWallet and etc.',
        path: '/walletConnect'
    }
]


export default WalletButtons;