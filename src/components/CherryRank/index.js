import "./style.css";

const CherryRank = () => {
    const list = Array(3).fill("");
    return (
        <div className="white-box cherry-rank">
            <h2 className="white-box-title">Cherry Rank</h2>
            <ul className="white-list-box">
                {list.map((item, index) => <Item rank={index + 1} name={"박윤배"} cherry={300} />)}
            </ul>
        </div>
    )
}

const Item = ({ rank, name, cherry }) => {
    return (
        <li className="cherry-rank-item">
            <span className="rank-name">#{rank} {name}</span>
            <span className="cherry-count"><span className="cherry-bg" />{cherry}</span>
        </li>
    )
}

export default CherryRank;