import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  ChatBox,
  Connections,
  CreatePost,
  Discover,
  Feed,
  Layout,
  Login,
  Messages,
  Profile,
} from './pages';

import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchUser } from './features/user/userSlice.js';

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log('🚀 ~ fetchData ~ user:', user);
      if (user) {
        const token = await getToken();
        console.log('🚀 ~ fetchData ~ token:', token);
        dispatch(fetchUser(token));
      }
    };
    fetchData();
  }, [user, getToken, dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={!user ? <Login /> : <Layout />}
        >
          <Route
            index
            element={<Feed />}
          />
          <Route
            path='/messages'
            element={<Messages />}
          />
          <Route
            path='/messages/:userId'
            element={<ChatBox />}
          />
          <Route
            path='/connections'
            element={<Connections />}
          />
          <Route
            path='/discover'
            element={<Discover />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/profile/:profileId'
            element={<Profile />}
          />
          <Route
            path='/create-post'
            element={<CreatePost />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
