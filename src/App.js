import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import RoomPage from './pages/RoomPage';
import RoomDecorationPage from './pages/RoomDecorationPage';
import AvatarPage from './pages/AvatarPage';
import NotFoundPage from './pages/NotFoundPage';
import "./styles/WhiteBox.css";

function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>

  );
}

export default App;
