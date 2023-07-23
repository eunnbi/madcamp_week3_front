import { useNavigate } from "react-router-dom";
import "./style.css";

const GotoMyRoomButton = () => {
    const navigate = useNavigate();
    const goToMyRoom = () => {
        navigate("/room");
    }
    return (
        <button className="back-button" onClick={goToMyRoom}>
            <span className="chevron-right" />
        </button>
    )
}

export default GotoMyRoomButton;