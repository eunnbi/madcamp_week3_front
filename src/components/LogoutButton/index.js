import { useNavigate } from "react-router-dom";
import "./style.css";

const LogoutButton = () => {
    const navigate = useNavigate();
    const onClick = () => {
        localStorage.removeItem("USER");
        navigate("/");
    }
    return (
        <button className="logout-button" onClick={onClick}>Logout<span className="logout-bg" /></button>
    )
}

export default LogoutButton;