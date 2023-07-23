import { useEffect, useState } from "react";
import "./style.css";
import { getComment } from "../../api/comment";
import { getRoom } from "../../api/room";

const CommentList = ({user}) => {
    
    // const list = Array(8).fill("");
    const [list, setList] = useState([]);
    const [roomId, setRoomId] = useState([]);
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

    

    useEffect(() => {
        if(user != null) {
            getRoom(user._id).then(({data}) => {
                setRoomId(data._id);
                console.log(data._id);
            })
            getComment(roomId).then(({data}) => {
                setList(data);
                console.log(data.length);
            })
        }
    },[user, roomId])

    if(user === null) {
        return null;
    }    


    return (
        <div className="white-box">
            <h2 className="white-box-title">방명록</h2>
            <ul className="white-list-box">
                {list.slice(0, endIndex).map(item => <Item name={item.authorName} content={item.content} />)}
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