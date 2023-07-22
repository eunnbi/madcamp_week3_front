import { useState } from "react";
import "./style.css";

const CommentList = () => {
    const list = Array(8).fill("");
    const initialEndIndex = 3;
    const inc = 5;
    const [endIndex, setEndIndex] = useState(initialEndIndex);
    const hasNextContent = () => list.length > endIndex + 1;
    const showMoreContent = () => {
        if (hasNextContent()) {
            setEndIndex((value) => value + inc);
        }
        else {
            setEndIndex(initialEndIndex);
        }  
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">방명록</h2>
            <ul className="white-list-box">
                {list.slice(0, endIndex).map(item => <Item name={"이름"} content={"내용이 들어가요"} />)}
            </ul>
            <button className="more-button" onClick={showMoreContent}>{hasNextContent() ? "더보기" : "접기"}</button>
        </div>
    )
}

const Item = ({ content, name }) => {
    return (
        <li className="comment-item">
            <span className="name">{name}</span>
            <p className="content">{content}</p>
        </li>
    )
}

export default CommentList;