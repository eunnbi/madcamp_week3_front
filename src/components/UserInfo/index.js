import { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import "./style.css";

const UserInfo = ({ user }) => {
    const [cherry, setCherry] = useState(0);
    useEffect(() => {
        getUser(user.name).then(({data}) => {
            setCherry(data.cherry);
        })
    }, []);
    return (
        <div className="userinfo-wrapper">
            <h1 className="username">{user.name}</h1>
            <div className="line"></div>
            <div className="cherry">{cherry} <span className="cherry-bg"></span></div>
        </div>
    )
}

export default UserInfo;