import "./style.css";
const CATEGORY = ["베이직", "할로윈", "시골", "고3", "해변", "공주"];

const FurnitureCategory = ({ selected, onClick }) => {
    return (
        <ul className="category-list">
            {CATEGORY.map((item, index) => <li onClick={onClick(index)} className={"category-item" + (selected === index ? " selected" : "")}>{item}</li>)}
        </ul>
    )
}

export default FurnitureCategory;