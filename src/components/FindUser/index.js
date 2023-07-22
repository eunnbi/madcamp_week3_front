import "./style.css";

const FindUser = () => {
    return (
        <div className="white-box">
            <h2 className="white-box-title wave">파도타기</h2>
            <div className="finduser-input-box">
                <input className="finduser-input" placeholder="이름을 입력해주세요" />
                <button className="finduser-button" type="button"><span className="chevron-left" /></button>
            </div>
            <button type="button" className="random-button">랜덤 파도타기</button>
        </div>
    )
}

export default FindUser;