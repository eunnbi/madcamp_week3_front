import { useRecoilValue, useSetRecoilState } from "recoil";
import { roomFurnitureState, saveLoading } from "../../store/furniture";
import "./style.css";
import axios from "axios";

const RoomSaveButton = ({ roomId }) => {
    const setLoading = useSetRecoilState(saveLoading);
    const roomFurniture = useRecoilValue(roomFurnitureState);
    const onClick = async () => {
        setLoading(true);
        const list = roomFurniture.list.map((item, index) => ({...item, z: index + 1 }));
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
                setLoading(false);
            }
        }
        for (let i = 0; i < roomFurniture.initialList.length; i++) {
            const item = roomFurniture.initialList[i];
            const index = roomFurniture.list.findIndex(furniture => furniture.id === item.id);
            if (index === -1) {
                try {
                    const { data } = await axios.post("/api/furniture/deleteFurniturePosition", {
                        roomFurnitureId: item.id
                    })
                    console.log(data);
                }
                catch(e) {
                    console.log(e)
                    setLoading(false);
                }
            }
        }
        setLoading(false);
    }
    return (
        <button type="button" onClick={onClick} className="save-button" disabled={roomId === null}>저장</button>
    )
}

export default RoomSaveButton;