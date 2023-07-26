import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import "../styles/Avatar.css";
import MyAvatarList from "../components/MyAvatar";
import ShopAvatarList from "../components/AvatarShop";
import { getUser } from "../api/user";
import { getMyAvatarImagePath } from "../api/avatar";
import { getLoggedInUser } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";
import GotoMyRoomButton from "../components/GotoMyRoomButton";
import Skeleton from "@mui/material/Skeleton";


const AvatarPage = () => {
    const loginUser = getLoggedInUser();
    const navigate = useNavigate();
    if (loginUser == null) {
        navigate("/");
    }
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await getUser(loginUser.name);
            return data;
        },
        initialData: loginUser
    })
    const { data } = useQuery({
        queryKey: ["avatar image"],
        queryFn: async () => {
            const { data } = await getMyAvatarImagePath(user._id);
            return data;
        }
    })

    return (
        <main className="avatar-page-main">
            <div className="left-section">
                <UserInfo user={user || null} />
                <div className="image-wrapper">
                    {data ? <img src={data.avatarImagePath} alt="Description" /> : <Skeleton variant="rounded" width={500} height={500} /> }
                </div>
            </div>
            <div className="right-section">
                <div className="top-row">
                    <GotoMyRoomButton />
                </div>
                <div>
                    <MyAvatarList userId={user ? user._id : null} />
                    <ShopAvatarList userId={user ? user._id : null} />
                </div>
            </div>
        </main>
    )
}

export default AvatarPage;