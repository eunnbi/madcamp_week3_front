import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GotoMyRoomButton from "../components/GotoMyRoomButton";
import UserInfo from "../components/UserInfo";
import FurnitureShop from "../components/FurnitureShop";
import FurnitureList from "../components/FurnitureList";
import { getUser } from "../api/user";

const RoomDecorationPage = () => {
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    if (value == null) {
        navigate("/");
    }
    const user = JSON.parse(value);
    useEffect(() => {
        getUser(user.name)
        .then(({ data }) => {
            localStorage.setItem("USER", JSON.stringify(data))
        }).catch((e) => {
            console.log(e);
        })
    }, []);
    return (
        <main>
            <div className="left-section">
                <UserInfo user={user} />
                <div className = "image-wrapper">
                   
                </div>
            </div>
            <div className="right-section">
                <div>
                    <GotoMyRoomButton />
                </div>
                <div>
                    <FurnitureList />
                    <FurnitureShop />
                </div>
            </div>
        </main>
    )
}

export default RoomDecorationPage;