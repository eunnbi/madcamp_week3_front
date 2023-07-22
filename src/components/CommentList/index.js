import "./style.css";

const CommentList = () => {
    const list = Array(8).fill("");
    return (
        <div className="white-box">
            <h2>방명록</h2>
            <ul className="comment-list-box">
                {list.map(item => <Item name={"이름"} content={"내용이 들어가요"} />)}
            </ul>
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