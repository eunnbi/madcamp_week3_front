import "./style.css";
import { getRank } from "../../api/cherry";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../Skeleton";

const CherryRank = ({user}) => {
    const { isLoading, data } = useQuery({
        queryKey: ["rank", user ? user._id : null],
        queryFn: async () => {
            if (user != null) {
                console.log(user);
                const { data } = await getRank(user._id);
                return data;
            }
            return [];
        },
        initialData: []
    })

    if (user !== null || !isLoading) {
        <div className="white-box cherry-rank">
            <h2 className="white-box-title">Cherry Rank</h2>
            <ul className="white-list-box">
                {Array(3).fill("").map((_, index) => <Skeleton width="100%" height="2rem" key={index} />)}
            </ul>
        </div>
    }
    return (
        <div className="white-box cherry-rank">
            <h2 className="white-box-title">Cherry Rank</h2>
            <ul className="white-list-box">
                {data.map((item, index) => <Item rank={index + 1} name={item.sponsorName} cherry={item.cherry} />)}
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