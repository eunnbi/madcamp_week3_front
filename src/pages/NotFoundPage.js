import React from 'react';
import { getLoggedInUser } from "../utils/auth";
import { useNavigate } from 'react-router-dom';
import "../styles/NotFound.css";

const NotFoundPage = ({user}) => {

    const loginUser = getLoggedInUser();
    const navigate = useNavigate(); // navigate 함수를 가져옵니다.

    const handleButtonClick = () => {
        // 버튼을 클릭했을 때 실행되는 함수입니다.
        // 원하는 작업을 여기에 추가하세요.
        navigate(`/room?name=${loginUser.name}`);
      };

    return (
        <main className='notfound-main'>
            <img src="/images/notfound.png" alt="Your Image" className="notfound-image" />
            <button className="notfound-button" onClick={handleButtonClick}>돌아가기</button>
        </main>
       
      );

    
}

export default NotFoundPage;