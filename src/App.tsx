import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import './i18n';
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
