import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Notification } from './components';
import { fetchConnections } from './features/connections/connectionsSlice.js';
import { addMessage } from './features/messages/messagesSlice.js';
import { fetchUser } from './features/user/userSlice.js';

const App = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();

        dispatch(fetchUser(token));
        dispatch(fetchConnections(token));
      }
    };
    fetchData();
  }, [user, getToken, dispatch]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(
        import.meta.env.VITE_BASEURL + '/api/message/' + user.id
      );
      eventSource.onmessage = event => {
        const message = JSON.parse(event.data);

        if (pathnameRef.current === '/messages/' + message.from_user_id._id) {
          dispatch(addMessage(message));
        } else {
          toast.custom(
            t => (
              <Notification
                t={t}
                message={message}
              />
            ),
            { position: 'bottom-right' }
          );
        }
      };
      return () => [eventSource.close()];
    }
  }, [user, dispatch]);

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
