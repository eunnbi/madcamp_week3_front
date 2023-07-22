import { Link } from "react-router-dom";
import "../styles/Home.css";

const HomePage = () => {
    return (
        <main className="home-main">
            <div>
                <img src="/images/logo.png" alt="Give Me Cherry" className="logo-image" />
                <div className="button-box">
                    <button type="button"><Link to="/auth">로그인</Link></button>
                    <button type="button"><Link to="/auth?register=true">회원가입</Link></button>
                </div>
            </div>
        </main>
    )
}

export default HomePage;