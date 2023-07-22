import "./style.css";
import { useEffect, useState } from "react";
import { getAvatar, getMyAvatar,setAvatar } from "../../api/avatar";


const MyAvatarList = ({ userId }) => {
    const [myAvatarList, setMyAvatarList] = useState([]);
    useEffect(() => {
        getMyAvatar(userId).then(({data}) => {
            setMyAvatarList(data);
        })
    }, []);

    const Item = ({ name, itemImagePath , avatarId}) => {
        const handleClick = () => {
            alert(`${name}이가 적용되었습니다. `); // 클릭 이벤트를 처리하는 로직
            setAvatar(userId, avatarId).then((data) => {
                window.location.reload();
            }).catch((e) => {
                alert("error");
            });
        }
    
        return (
            <div className="avatar-item" onClick={handleClick}>
                <img src={itemImagePath} alt={name} />
                <p>{name}</p>
            </div>
        )
    }

    return (
        <div class="white-box">
            <h2 className="avatar-title">옷장 탭 제목</h2>
            <ul className="avatar-wrapper" id="avatarContainer">
                {myAvatarList.map((avatar, index) => (
                <Item key={index} name={avatar.name} itemImagePath={avatar.itemImagePath} avatarId = {avatar._id} />
            ))}
            </ul>
        </div>
    )

    
}




// Example usage of the Item component
const avatarsData = [
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    { name: "Avatar 1", itemImagePath: "/images/avatar1.png" , avatarId : "123"},
    // More avatar objects...
];


// // JavaScript 코드
// async function fetchAvatarsFromServer() {
//     try {
//       const response = await fetch('https://example.com/api/avatars'); // API 엔드포인트를 입력해주세요.
//       const data = await response.json();
//       return data; // 이미지 경로와 이름이 담긴 배열을 반환하는 것으로 가정합니다.
//     } catch (error) {
//       console.error('Error fetching avatars:', error);
//       return []; // 에러 발생 시 빈 배열을 반환합니다.
//     }
//   }
  
//   async function renderAvatars() {
//     const avatarContainer = document.getElementById('avatarContainer');
//     const avatarsData = await fetchAvatarsFromServer(); // API로부터 데이터를 받아옵니다.
  
//     avatarsData.forEach((avatar) => {
//       const avatarItem = document.createElement('div');
//       avatarItem.classList.add('avatar-item');
  
//       const img = document.createElement('img');
//       img.src = avatar.imagePath; // 이미지 경로를 설정합니다.
//       img.alt = avatar.name;
  
//       const p = document.createElement('p');
//       p.textContent = avatar.name;
  
//       avatarItem.appendChild(img);
//       avatarItem.appendChild(p);
//       avatarContainer.appendChild(avatarItem);
//     });
//   }
  
//   // 페이지 로드 후 실행
//   renderAvatars();
  


export default MyAvatarList;