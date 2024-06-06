import COIN from '../../../../assets/start-page-coin.svg'
import GAMEBOY from '../../../../assets/start-page-gameboy.svg'
import SHUELD_TICK from '../../../../assets/start-page-shield-tick.svg'

interface WelcomeMessage {
    title: string;
    icon: string;
    message: string;
}
 const welcomeMessages: WelcomeMessage[] = [
     {
        title: 'Low Transaction Fees',
        icon: COIN,
        message: 'Our wallet has some of the lowest transaction levels on the TON blockchain network in the world. We are working to make sure that you pay even less.'
     },
     {
         title: 'Combining Game Projects',
         icon: GAMEBOY,
         message: 'Massive support for tokens of a large number of game projects created on the basis of the TON blockchain. Tokenization of everyday products.'
     },
     {
         title: 'Data Security Level',
         icon: SHUELD_TICK,
         message: 'High level of personal data security. Full responsibility for the decentralization of all information.'
     },

]

 export default welcomeMessages


