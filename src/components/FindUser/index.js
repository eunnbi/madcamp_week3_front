import "./style.css";

const FindUser = () => {
    return (
        <div className="finduser-wrapper">
            <h2>파도타기</h2>
            <div className="finduser-input-box">
                <input className="finduser-input" />
                <button></button>
            </div>
            <button>랜덤 파도타기</button>
        </div>
    )
}

export default FindUser;