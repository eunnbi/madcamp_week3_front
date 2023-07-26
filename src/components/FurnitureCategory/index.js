import "./style.css";
const CATEGORY = ["베이직", "해변", "고3", "할로윈", "공주", "시골"];

const FurnitureCategory = ({ selected, onClick }) => {
    return (
        <ul className="category-list">
            {CATEGORY.map((item, index) => <li key={item} onClick={onClick(index)} className={"category-item" + (selected === index ? " selected" : "")}>{item}</li>)}
        </ul>
    )
}

export default FurnitureCategory;