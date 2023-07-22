import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import "../styles/Avatar.css";
import MyAvatarList from "../components/MyAvatar";
import ShopAvatarList from "../components/AvatarShop";
import { useEffect, useState } from "react";
import { getAvatar, getMyAvatar,setAvatar, buyAvatar, getMyAvatarImagePath} from "../api/avatar";


const AvatarPage = () => {
    const value = localStorage.getItem("USER");
    const navigate = useNavigate();
    if (value == null) {
        navigate("/");
    }
    const user = JSON.parse(value);

    const [myAvatarImagePath, setMyAvatarImagePath] = useState(0);
    useEffect(() => {
        getMyAvatarImagePath(user._id).then(({data}) => {
            setMyAvatarImagePath(data.avatarImagePath);
        })
    }, []);

    return (
        <main>
            <div className="left-section">
                <UserInfo user={user} />
                <div className = "image-wrapper">
                    <img src={myAvatarImagePath} alt="Description" />
                </div>
            </div>
            <div className="right-section">
                <MyAvatarList userId={user._id} />
                <ShopAvatarList userId = {user._id} />
            </div>
        </main>
    )
}

export default AvatarPage;