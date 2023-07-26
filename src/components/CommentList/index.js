import { useEffect, useState } from "react";
import "./style.css";
import { getComment } from "../../api/comment";
import { getRoom } from "../../api/room";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

const CommentList = ({ user }) => {
    const initialEndIndex = 3;
    const inc = 5;
    const [endIndex, setEndIndex] = useState(initialEndIndex);
    const { data } = useQuery({
        queryKey: ["comment list", user ? user._id : null],
        queryFn: async () => {
            if (user === null) return null
            const { data } = await getRoom(user._id);
            const { data: list } = await getComment(data._id);
            return list;
        },
        initialData: null
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
    if (user === null || !data) {
        return (
            <div className="white-box">
                <h2 className="white-box-title">방명록</h2>
                <ul className="white-list-box">
                    {Array(3).fill("").map((_, index) => <Skeleton variant="rounded" width="100%" height={24} key={index} />)}
                </ul>
            </div>
        );
    }
    return (
        <div className="white-box">
            <h2 className="white-box-title">방명록</h2>
            {data.length === 0 ? <p className="empty-text">방명록이 없습니다 😢</p> : (
                <ul className="white-list-box">
                    {data.slice(0, endIndex).map((item, index) => <Item name={item.authorName} content={item.content} key={index} />)}
                </ul>
            )}
            {data.length > initialEndIndex && <button className="more-button" onClick={showMoreContent}>{hasNextContent() ? "더보기" : "접기"}</button>}
        </div>
    )
}

const Item = ({ content, name }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const element = document.querySelector(".comment-item");
        setWidth(element.parentElement.clientWidth);
    }, []);
    return (
        <li className="comment-item">
            <span className="name">{name}</span>
            <p className="content" style={{
                width
            }}>{content}</p>
        </li>
    )
}

export default CommentList;