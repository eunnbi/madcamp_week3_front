import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.css";

const CommonItem = ({ name, price, itemImagePath, onClickItem}) => {
    return (
        <div className="common-item" onClick={onClickItem}>
            <LazyLoadImage src={itemImagePath} alt={name} width={100} height={100} effect="blur" />
            <p className="name">{name}</p>
            {price && <div className="cherry"><span className="cherry-bg"></span>{price}</div>}
        </div>
    )
}

export default CommonItem;