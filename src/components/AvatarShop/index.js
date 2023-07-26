import { useState } from "react";
import { getAvatar, buyAvatar} from "../../api/avatar";
import CommonItem from "../CommonItem";
import Skeleton from "@mui/material/Skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AlertDialog from "../AlertDialog";
import { toast } from "react-toastify";

const ShopAvatarList = ({userId}) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const { data: avatarList, isLoading } = useQuery({
        queryKey: ["shop avatar list"],
        queryFn: async () => {
            const { data } = await getAvatar(userId);
            return data;
        }
    })
    const handleClose = () => {
        setOpen(false);
    }
    const onCancel = () => {
        setOpen(false);
    }
    const onConfirm = async () => {
        try {
            const { data } = await buyAvatar(userId, avatar._id);
            setOpen(false);
            await queryClient.invalidateQueries(["my avatar list"]);
            await queryClient.invalidateQueries(["shop avatar list"])
            console.log(data);
            toast.success("구매 완료했습니다");
        }
        catch(e) {
            console.log(e);
            setOpen(false);
            toast.error("너무 비싸요");
        }

    }
    const handleClick = (avatar) => () => {
        setOpen(true);
        setAvatar(avatar);
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
        <>
            <div class="white-box">
                <h2 className="white-box-title">상점</h2>
                <ul className="item-list">
                    {avatarList.map((avatar, index) => (
                        <CommonItem 
                            key={index} 
                            name={avatar.name}
                            itemImagePath={avatar.itemImagePath} 
                            price={avatar.price} 
                            onClickItem={handleClick(avatar)}
                        />
                    ))}
                </ul>
            </div>
            <AlertDialog open={open} title={avatar ? `${avatar.name}을(를) 구매하시겠습니까?` : ''} handleClose={handleClose} onCancel={onCancel} onConfirm={onConfirm} />
        </>

    )
}

export default ShopAvatarList;