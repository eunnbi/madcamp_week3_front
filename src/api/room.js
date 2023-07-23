import axios from "axios";

export const getRoom = async (id) => {
    const data = await axios.post("/api/room/getRoom", {
        userId: id
    });
    return data;
}