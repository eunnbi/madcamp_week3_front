import { useRecoilValue } from "recoil";
import { roomFurnitureListState } from "../../store/furniture";
import "./style.css";
import axios from "axios";

const RoomSaveButton = ({ roomId }) => {
    const roomFurnitureList = useRecoilValue(roomFurnitureListState);
    const onClick = async () => {
        console.log(roomFurnitureList);
        const list = roomFurnitureList.list.map((item, index) => ({...item, z: index + 1 }));
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            try {
                const { data } = await axios.post("/api/furniture/saveFurniturePosition", {
                    roomId,
                    furnitureId: list[i].furnitureId,
                    roomFurnitureId: String(list[i].id).length < 12 ? Array(12).fill(list[i].id).join("") : String(list[i].id),
                    x: list[i].x,
                    y: list[i].y,
                    z: list[i].z
                });
                console.log(data);
            }
            catch(e) {
                console.log(e);
            }
        }
    }
    return (
        <button type="button" onClick={onClick} className="save-button" disabled={roomId === null}>저장</button>
    )
}

export default RoomSaveButton;