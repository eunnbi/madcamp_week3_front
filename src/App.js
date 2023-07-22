import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MyRoomPage from './pages/MyRoomPage';
import OtherRoomPage from './pages/OtherRoomPage';
import RoomDecorationPage from './pages/RoomDecorationPage';
import AvatarPage from './pages/AvatarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/auth" Component={AuthPage} />
        <Route path="/myroom" Component={MyRoomPage}/>
        <Route path="/myroom/decoration" Component={RoomDecorationPage} />
        <Route path="/myroom/avatar" Component={AvatarPage} />
        <Route path="/otherRoom" Component={OtherRoomPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
