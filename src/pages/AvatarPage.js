import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import "../styles/Avatar.css";
import FindUser from "../components/FindUser";

const AvatarPage = () => {
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    if (value == null) {
        navigate("/");
    }
    const user = JSON.parse(value);
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user} />
            </div>
            <div className="right-section">
                <FindUser />
            </div>
        </main>
    )
}

export default AvatarPage;