import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import RoomPage from './pages/RoomPage';
import RoomDecorationPage from './pages/RoomDecorationPage';
import AvatarPage from './pages/AvatarPage';

import "./styles/WhiteBox.css";
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/auth" Component={AuthPage} />
        <Route path="/room" Component={RoomPage}/>
        <Route path="/room/decoration" Component={RoomDecorationPage} />
        <Route path="/room/avatar" Component={AvatarPage} />
        <Route path='*' Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
