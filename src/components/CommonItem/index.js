import "./style.css";

const CommonItem = ({ name, price, itemImagePath, onClickItem}) => {
    return (
        <div className="item" onClick={onClickItem}>
            <img src={itemImagePath} alt={name} />
            <p className="name">{name}</p>
            {price && <div className="cherry"><span className="cherry-bg"></span>{price}</div>}
        </div>
    )
}

export default CommonItem;