import CommonItem from "../CommonItem";

const FurnitureList= () => {
    const list = Array(8).fill("");
    return (
        <div className="white-box">
            <h2 className="white-box-title">내 가구</h2>
            <ul className="item-list">
                {list.map(item => <CommonItem name={"편안한 의자"} itemImagePath={"/images/furniture.svg"} />)}
            </ul>
        </div>
    )
}

export default FurnitureList;