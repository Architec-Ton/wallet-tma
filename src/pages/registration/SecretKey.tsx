// import MainButton from "../../../../tg-system-buttons/MainButton.tsx";
// import BackButton from "../../../../tg-system-buttons/BackButton.tsx";
// import {useNavigate} from "react-router-dom";
// import key_to_wallet from './24key.tsx'
// import React, {useEffect} from "react";

// const YourSecretKey: React.FC = () => {

//     const navigate = useNavigate();
//     const goNext = () => {
//         navigate('/confirmKey')
//     }

//     useEffect(()=>{
//             localStorage.setItem('secretWords', JSON.stringify(key_to_wallet));
//         }
//         , [])

//     const copyToClipboard = () => {
//         const textToCopy = key_to_wallet.map((word, index) => `${index + 1}. ${word}`).join(' ');
//         navigator.clipboard.writeText(textToCopy)
//             .then(() => alert('Words copied to clipboard'))
//             .catch(err => console.error('Failed to copy text: ', err));
//     };

//     const firstColumn = key_to_wallet.slice(0, 12);
//     const secondColumn = key_to_wallet.slice(12, 24);

//     return (
//         <div>
//             <h1>Your secret key</h1>

//             <div >
//                 <div>
//                     {firstColumn.map((word, index) => (
//                         <div key={index}>{index + 1}. {word}</div>
//                     ))}
//                 </div>
//                 <div>
//                     {secondColumn.map((word, index) => (
//                         <div key={index + 12}>{index + 13}. {word}</div>
//                     ))}
//                 </div>
//             </div>

//             <button onClick={copyToClipboard}>Copy words</button>
//             <MainButton text='Next' onClick={goNext} initialDelay={5000}/>
//             <BackButton/>
//         </div>
//     );
// };

// export default YourSecretKey;
