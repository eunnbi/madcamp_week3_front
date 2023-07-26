import Skeleton from "@mui/material/Skeleton";
import "./style.css";

const UserInfo = ({ user, isMyRoom }) => {
    return (
        <div className="userinfo-wrapper">
            {user === null ? <Skeleton variant="rounded" width={83} height={54} /> : <h1 className="username">{user.name}</h1> }
            {isMyRoom && (
                <>
                    <div className="line"></div>
                    <div className="cherry">{user === null ? <Skeleton variant="rounded" width={50} height={54} /> : user.cherry} <span className="cherry-bg"></span></div>
                </>
            )}
        </div>
    )
}

UserInfo.defaultProps = {
    isMyRoom: true
}
export default UserInfo;