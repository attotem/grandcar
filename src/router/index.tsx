import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { WelcomePage } from '../pages/WelcomePage';
import { MemberLayout } from '../components/MemberLayout';
import { ProfilePage } from '../pages/member/ProfilePage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { CarDetailPage } from '../pages/CarDetailPage/CarDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MemberLayout />,
        children: [
          {
            index: true,
            element: <WelcomePage />,
          },
          {
            path: 'cars/:id',
            element: <CarDetailPage />,
          },
          {
            path: 'favorites',
            element: <FavoritesPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
