import "./style.css";
import { useEffect, useState } from "react";
import { getAvatar, buyAvatar} from "../../api/avatar";
import CommonItem from "../CommonItem";

const ShopAvatarList = ({userId}) => {
    const [avatarList, setAvatarList] = useState([]);
    useEffect(() => {
        getAvatar(userId).then(({data}) => {
            setAvatarList(data);
        })
    }, []);

    const handleClick = (name, avatarId) => () => {
        if (window.confirm(`${name}을(를) 구매하시겠습니까?`)) {
            buyAvatar(userId, avatarId).then((data) => {
                window.location.reload();
            }).catch((e) => {
                alert("너무 비싸요");
            })
        }
    }

    
    return (
        <div class="white-box">
            <h2 className="white-box-title">상점</h2>
            <ul className="item-list" id="avatarContainer">
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