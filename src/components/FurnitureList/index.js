import { useSetRecoilState } from "recoil";
import CommonItem from "../CommonItem";
import { roomFurnitureState } from "../../store/furniture";
import { useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import FurnitureCategory from "../FurnitureCategory";
import { useQuery } from "@tanstack/react-query";

const FurnitureList = ({ user }) => {
    const [selected, setSelected] = useState(0);
    const { data: list, isLoading } = useQuery({
        queryKey: ["furniture list", selected, user],
        queryFn: async () => {
            const { data } = await  axios.post("/api/furniture/getMyFurniture", {
                userId: user._id,
                category: selected
            });
            return data;
        }
    })
    const setRoomFurnitureState = useSetRecoilState(roomFurnitureState);
    const onClickFurniture = (itemImagePath, furnitureId) => () => {
        setRoomFurnitureState((state) => ({
            ...state,
            nextId: state.nextId + 1,
            list: state.list.concat([{
                id: state.nextId,
                imagePath: itemImagePath,
                furnitureId,
                x: 0,
                y: 0
            }])
        }))
    }
    const onClickCategory = (index) => () => {
        setSelected(index);
    }


    if (isLoading) {
        return (
            <div className="white-box">
                <h2 className="white-box-title">내 가구</h2>
                <FurnitureCategory selected={selected} onClick={onClickCategory}  />
                <ul className="item-list">
                    {Array(3).fill("").map((_, index) => <Skeleton variant="rounded" width="100%" height={150} key={index} />)}
                </ul>
            </div>
        )
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">내 가구</h2>
            <FurnitureCategory selected={selected} onClick={onClickCategory}  />
            {list.length === 0 ? (
                <p className="empty-text">내 가구가 없습니다.</p>
            ) : (
                <ul className="item-list">
                    {list.map(item => <CommonItem key={item._id} name={item.name} itemImagePath={item.imagePath} onClickItem={onClickFurniture(item.imagePath, item._id)} />)}
                </ul>
            )}
        </div>
    )
}

export default FurnitureList;