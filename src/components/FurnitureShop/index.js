import { useEffect, useState } from "react";
import CommonItem from "../CommonItem";
import Skeleton from "../Skeleton";
import axios from "axios";

const FurnitureShop = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    useEffect(() => {
        axios.post("/api/furniture/getFurniture", {
            userId: user._id
        }).then(({ data }) => {
            setList(data)
            setLoading(false)
        }).catch((e) => {
            console.log(e);
        });
    }, [])
    const onClickItem = (name, furnitureId) => async () => {
        try {
            if (window.confirm(`${name}을(를) 구매하시겠습니까?`)) {
                const { data } = await axios.post("/api/furniture/buyFurniture", {
                    userId: user._id,
                    furnitureId
                })
                console.log(data);
                window.location.reload();
            }
        }
        catch(e) {
            console.log(e)
            alert("너무 비싸요");
        }

    }
    if (loading) {
        return (
            <div className="white-box">
                <h2 className="white-box-title">상점</h2>
                <ul className="item-list">
                    {Array(3).fill("").map(() => <Skeleton width="100%" height="150px" />)}
                </ul>
            </div>
        )
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">상점</h2>
            <ul className="item-list">
                {list.map(item => <CommonItem name={item.name} price={item.price} itemImagePath={item.imagePath} onClickItem={onClickItem(item.name, item._id)} />)}
            </ul>
        </div>
    )
}

export default FurnitureShop;