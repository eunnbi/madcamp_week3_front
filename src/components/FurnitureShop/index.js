import { useEffect, useState } from "react";
import CommonItem from "../CommonItem";
import Skeleton from "../Skeleton";
import FurnitureCategory from "../FurnitureCategory";
import axios from "axios";

const FurnitureShop = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        setLoading(true);
        axios.post("/api/furniture/getFurniture", {
            userId: user._id,
            category: selected
        }).then(({ data }) => {
            setList(data)
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        });
    }, [selected])
    const onClickCategory = (index) => () => {
        setSelected(index);
    }
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
                <FurnitureCategory onClick={onClickCategory} selected={selected} />
                <ul className="item-list">
                    {Array(3).fill("").map(() => <Skeleton width="100%" height="150px" />)}
                </ul>
            </div>
        )
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">상점</h2>
            <FurnitureCategory onClick={onClickCategory} selected={selected} />
            {list.length === 0 ? <p className="empty-text">가구가 없습니다.</p> : (
                <ul className="item-list">
                    {list.map(item => <CommonItem name={item.name} price={item.price} itemImagePath={item.imagePath} onClickItem={onClickItem(item.name, item._id)} />)}
                </ul>
            )}
        </div>
    )
}

export default FurnitureShop;