import { createBrowserRouter } from 'react-router-dom';
import PlayGround from './pages/PlayGround';

const router = createBrowserRouter([
  {
    path: '/playground',
    element: <PlayGround />,
  },
  {
    path: '/',
    element: <PlayGround />,
  },
]);

export default router;
