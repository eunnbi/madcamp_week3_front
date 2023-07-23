import { useSetRecoilState } from "recoil";
import CommonItem from "../CommonItem";
import { roomFurnitureListState } from "../../store/furniture";
import { useEffect, useState } from "react";
import axios from "axios";

const FurnitureList = ({ user }) => {
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
        axios.post("/api/furniture/getMyFurniture", {
            userId: user._id
        }).then(({ data }) => {
            setList(data);
            console.log(data)
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    return (
        <div className="white-box">
            <h2 className="white-box-title">내 가구</h2>
            {list.length === 0 ? (
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