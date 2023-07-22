import "./style.css";

const UserInfo = ({ user, isMyRoom }) => {
    if (user === null) {
        return null;
    }
    return (
        <div className="userinfo-wrapper">
            <h1 className="username">{user.name}</h1>
            {isMyRoom && (
                <>
                    <div className="line"></div>
                    <div className="cherry">{user.cherry} <span className="cherry-bg"></span></div>
                </>
            )}
        </div>
    )
}

UserInfo.defaultProps = {
    isMyRoom: true
}
export default UserInfo;