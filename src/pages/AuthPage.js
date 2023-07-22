import { useRef, useState } from "react";
import "../styles/Auth.css";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { getUser } from "../api/user";

const AuthPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const isRegister = params.get('register');

    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState({
        type: "",
        value: ""
    });
    const checkedNickname = useRef("");
    const checkDuplicate = async () => {
        if (nickname === "") {
            setMessage({
                type: "error",
                value: "닉네임을 입력해주세요"
            });
            return;
        }
        setMessage("");
        try {
            const { data } = await axios.post("/api/user/checkDuplicate", {
                name: nickname
            })
            if (data.exists) {
                setMessage({
                    type: "error",
                    value: "중복된 닉네임입니다"
                });
            }
            else {
                checkedNickname.current = nickname;
                setMessage({
                    type: "success",
                    value: "사용 가능한 닉네임입니다"
                })
            }  
        }
        catch(e) {
            console.log(e);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (nickname === "") {
            setMessage({
                type: "error",
                value: "닉네임을 입력해주세요"
            });
            return;
        }
        else if (isRegister && checkedNickname.current !== nickname) {
            setMessage({
                type: "error",
                value: "중복확인을 해주세요"
            });
            return;
        } 
        setMessage("");
        if (isRegister) {
            try {
                const { data } = await axios.post("/api/user/add", {
                    name: nickname
                })
                console.log(data);
                navigate("/");
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            try {
                const { data } = await getUser(nickname);
                localStorage.setItem("USER", JSON.stringify(data));
                navigate("/room");
            }
            catch(e) {
                setMessage({
                    type: "error",
                    value: "존재하지 않은 닉네임입니다."
                })
                console.log(e);
            }
        }

    }
    const onChange = (e) => {
        setNickname(e.target.value)
    }
    return (
        <main className="auth-main">
            <div className="wrapper"></div>
            <form className="auth-form" onSubmit={onSubmit}>
                <div className="auth-box">
                    <div className={ message ? "input-box error": " input-box"}>
                        <input placeholder="이름을 입력해주세요" onChange={onChange} value={nickname} />
                        {isRegister && <button type="button" className="check-button" onClick={checkDuplicate}>중복확인</button>}
                    </div>
                    {message.value && <p className={ `message ${message.type}`}>* {message.value}</p>}
                </div>
                <button type="submit" className="submit-button">{isRegister ? "회원가입" : "로그인"}</button>
            </form>
        </main>
    )
}

export default AuthPage;