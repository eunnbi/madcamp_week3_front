import { getAvatar, buyAvatar} from "../../api/avatar";
import CommonItem from "../CommonItem";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";

const ShopAvatarList = ({userId}) => {
    const { data: avatarList, isLoading } = useQuery({
        queryKey: ["shop avatar list"],
        queryFn: async () => {
            const { data } = await getAvatar(userId);
            return data;
        }
    })

    const handleClick = (name, avatarId) => () => {
        if (window.confirm(`${name}을(를) 구매하시겠습니까?`)) {
            buyAvatar(userId, avatarId).then((data) => {
                window.location.reload();
            }).catch((e) => {
                alert("너무 비싸요");
            })
        }
    }
    if (isLoading) {
        return (
            <div class="white-box">
                <h2 className="white-box-title">내 아바타</h2>
                <ul className="item-list">
                    {Array(3).fill("").map((_, index) => <Skeleton variant="rounded" width="100%" height={150} key={index} />)}
                </ul>
            </div>
        )
    }
    
    return (
        <div class="white-box">
            <h2 className="white-box-title">상점</h2>
            <ul className="item-list">
                {avatarList.map((avatar, index) => (
                    <CommonItem 
                        key={index} 
                        name={avatar.name}
                        itemImagePath={avatar.itemImagePath} 
                        price={avatar.price} 
                        onClickItem={handleClick(avatar.name, avatar._id)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ShopAvatarList;