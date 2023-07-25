import { useState } from "react";
import "./style.css";
import { getComment } from "../../api/comment";
import { getRoom } from "../../api/room";
import { useQuery } from "@tanstack/react-query";

const CommentList = ({ user }) => {
    const initialEndIndex = 3;
    const inc = 5;
    const [endIndex, setEndIndex] = useState(initialEndIndex);
    const { data } = useQuery({
        queryKey: ["comment list", user ? user._id : null],
        queryFn: async () => {
            if (user === null) return []
            const { data } = await getRoom(user._id);
            const { data: list } = await getComment(data._id);
            return list;
        },
        initialData: []
    })
    const hasNextContent = () => data.length > endIndex + 1;
    const showMoreContent = () => {
        if (hasNextContent()) {
            setEndIndex((value) => value + inc);
        }
        else {
            setEndIndex(initialEndIndex);
        }  
    }
    if (user === null) {
        return null;
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">방명록</h2>
            <ul className="white-list-box">
                {data.slice(0, endIndex).map(item => <Item name={item.authorName} content={item.content} />)}
            </ul>
            {data.length > initialEndIndex && <button className="more-button" onClick={showMoreContent}>{hasNextContent() ? "더보기" : "접기"}</button>}
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