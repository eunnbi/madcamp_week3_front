import "./style.css";
import { getRank } from "../../api/cherry";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

const CherryRank = ({ user }) => {
    const { data } = useQuery({
        queryKey: ["rank", user ? user._id : null],
        queryFn: async () => {
            if (user === null) return null;
            const { data } = await getRank(user._id);
            return data;
        },
        initialData: null
    })

    if (user === null || !data) {
        return (
            <div className="white-box cherry-rank">
                <h2 className="white-box-title">Cherry Rank</h2>
                <ul className="white-list-box">
                    {Array(3).fill("").map((_, index) => <Skeleton variant="rounded" width="100%" height={24} key={index} />)}
                </ul>
            </div>
        )
    }
    return (
        <div className="white-box cherry-rank">
            <h2 className="white-box-title">Cherry Rank</h2>
            {data.length === 0 ? <p className="empty-text">체리를 기부한 사람이 없습니다. 😢</p> : (
                <ul className="white-list-box">
                    {data.map((item, index) => <Item rank={index + 1} name={item.sponsorName} cherry={item.cherry} key={index} />)}
                </ul>
            )}
           
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