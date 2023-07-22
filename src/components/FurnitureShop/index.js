import CommonItem from "../CommonItem";

const FurnitureShop = () => {
    const list = Array(8).fill("");
    return (
        <div className="white-box">
            <h2 className="white-box-title">상점</h2>
            <ul className="item-list">
                {list.map(item => <CommonItem name={"편안한 의자"} price={200} itemImagePath={"/images/furniture.svg"} />)}
            </ul>
        </div>
    )
}

export default FurnitureShop;