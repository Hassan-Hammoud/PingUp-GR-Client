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

const App = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
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
      </Routes>
    </>
  );
};

export default App;
