import { getMyAvatar,setAvatar } from "../../api/avatar";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import CommonItem from "../CommonItem";


const MyAvatarList = ({ userId }) => {
    const { data: myAvatarList, isLoading } = useQuery({
        queryKey: ["my avatar list"],
        queryFn: async () => {
            const { data } = await getMyAvatar(userId);
            return data;
        }
    })
    const handleClick = (name, avatarId, userId) => () => {
        alert(`${name}이가 적용되었습니다. `); // 클릭 이벤트를 처리하는 로직
        setAvatar(userId, avatarId).then((data) => {
            window.location.reload();
        }).catch((e) => {
            alert("error");
        });
    }
    if (isLoading) {
        return (
            <div class="white-box">
                <h2 className="white-box-title">내 아바타</h2>
                <ul className="item-list">
                    {Array(3).fill("").map((_, index) => <Skeleton variant="rounded" width="100%" height={150} key={index} />)}
                </ul>
            </div>
        )
    }

    return (
        <div className="white-box">
            <h2 className="white-box-title">내 아바타</h2>
            {myAvatarList.length === 0 ? <p className="empty-text">아바타가 없습니다</p> : (
                <ul className="item-list">
                    {myAvatarList.map(item => <CommonItem name={item.name} itemImagePath={item.itemImagePath} onClickItem={handleClick(item.name, item._id)} />)}
                </ul>
            )}
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