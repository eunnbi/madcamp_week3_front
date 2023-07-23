import { useSetRecoilState } from "recoil";
import CommonItem from "../CommonItem";
import { roomFurnitureListState } from "../../store/furniture";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../Skeleton";

const FurnitureList = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const setRoomFurnitureList = useSetRecoilState(roomFurnitureListState);
    const onClick = (itemImagePath, furnitureId) => () => {
        setRoomFurnitureList((state) => ({
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
    useEffect(() => {
        setLoading(true);
        axios.post("/api/furniture/getMyFurniture", {
            userId: user._id
        }).then(({ data }) => {
            setList(data);
            setLoading(false);
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    if (loading) {
        return (
            <div className="white-box">
                <h2 className="white-box-title">내 가구</h2>
                <ul className="item-list">
                    {Array(3).fill("").map(() => <Skeleton width="100%" height="150px" />)}
                </ul>
            </div>
        )
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">내 가구</h2>
            {!loading && list.length === 0 ? (
                <p className="empty-text">내 가구가 없습니다.</p>
            ) : (
                <ul className="item-list">
                    {list.map(item => <CommonItem key={item._id} name={item.name} itemImagePath={item.imagePath} onClickItem={onClick(item.imagePath, item._id)} />)}
                </ul>
            )}
        </div>
    )
}

export default FurnitureList;