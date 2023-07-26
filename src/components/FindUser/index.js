import "./style.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkDuplicate, getRandomUser } from "../../api/user";
import { toast } from "react-toastify";

const FindUser = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate(); // navigate 함수를 가져옵니다.

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // 입력 값이 변경될 때마다 inputValue를 업데이트합니다.
    };

    const handleButtonClick = () => {
        checkDuplicate(inputValue).then(({data})=>{
            if(!data.exists) {
                toast.error("존재하지 않는 이름입니다")
            } else {
                navigate(`/room?name=${inputValue}`); // 입력된 이름으로 /room?name=<name>로 이동합니다.
                setInputValue("")
            }
        }).catch((e) => {
            toast.error("존재하지 않는 이름입니다")
        }) 
    };

    const handleRandomButtonClick = () => {
        getRandomUser().then(({data}) => {
            navigate(`/room?name=${data.name}`);
            setInputValue("")
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className="white-box">
            <h2 className="white-box-title wave">파도타기</h2>
            <div className="finduser-input-box">
                <input 
                className="finduser-input" 
                placeholder="이름을 입력해주세요" 
                value={inputValue} // 입력 필드의 값으로 inputValue를 설정합니다.
                onChange={handleInputChange} // 값이 변경될 때 handleInputChange를 호출합니다.
                />
                <button 
                    className="finduser-button" 
                    type="button"
                    onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick를 호출합니다.
                ><span className="chevron-left" /></button>
            </div>
            <button type="button" className="random-button" onClick={handleRandomButtonClick}>랜덤 파도타기</button>
        </div>
    )
}

export default FindUser;