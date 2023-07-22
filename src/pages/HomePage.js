import { Link } from "react-router-dom";
import "../styles/Home.css";

const HomePage = () => {
    return (
        <main className="home-main">
            <img src="/images/logo.svg" alt="Give Me Cherry" className="logo-image" />
            <div className="button-box">
                <button type="button"><Link to="/auth">로그인</Link></button>
                <button type="button"><Link to="/auth?register=true">회원가입</Link></button>
            </div>
        </main>
    )
}

export default HomePage;