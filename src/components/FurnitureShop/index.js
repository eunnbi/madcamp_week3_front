import { useState } from "react";
import CommonItem from "../CommonItem";
import Skeleton from "@mui/material/Skeleton";
import FurnitureCategory from "../FurnitureCategory";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AlertDialog from "../AlertDialog";
import { toast } from "react-toastify";

const FurnitureShop = ({ user }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [furniture, setFurniture] = useState(null);
    const [selected, setSelected] = useState(0);
    const { data: list, isLoading } = useQuery({
        queryKey: ["furniture shop", selected], 
        queryFn: async () => {
            const { data } = await axios.post("/api/furniture/getFurniture", {
                userId: user._id,
                category: selected
            })
            return data;
        }
    })
    const handleClose = () => {
        setOpen(false)
    }
    const onCancel = () => {
        setOpen(false)
    }
    const onConfirm = async () => {
        try {
            const { data } = await axios.post("/api/furniture/buyFurniture", {
                userId: user._id,
                furnitureId: furniture._id
            })
            setOpen(false);
            await queryClient.invalidateQueries(["furniture list", selected]);
            await queryClient.invalidateQueries(["furniture shop", selected])
            toast.success("구매 완료했습니다");
            console.log(data);
        }
        catch(e) {
            console.log(e);
            setOpen(false);
            toast.error("너무 비싸요");
        }
    }
    const onClickCategory = (index) => () => {
        setSelected(index);
    }
    const onClickItem = (furniture) => async () => {
        setOpen(true)
        setFurniture(furniture)
    }
    if (isLoading) {
        return (
            <div className="white-box">
                <h2 className="white-box-title">상점</h2>
                <FurnitureCategory onClick={onClickCategory} selected={selected} />
                <ul className="item-list">
                    {Array(3).fill("").map((_, index) => <Skeleton width="100%" height={150} key={index} />)}
                </ul>
            </div>
        )
    }
    return (
        <>
            <div className="white-box">
                <h2 className="white-box-title">상점</h2>
                <FurnitureCategory onClick={onClickCategory} selected={selected} />
                {list.length === 0 ? <p className="empty-text">가구가 없습니다.</p> : (
                    <ul className="item-list">
                        {list.map(item => <CommonItem key={item._id} name={item.name} price={item.price} itemImagePath={item.imagePath} onClickItem={onClickItem(item)} />)}
                    </ul>
                )}
            </div>
            <AlertDialog open={open} title={furniture ? `${furniture.name}을(를) 구매하시겠습니까?` : ''} handleClose={handleClose} onCancel={onCancel} onConfirm={onConfirm} />
        </>

    )
}

export default FurnitureShop;