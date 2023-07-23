import axios from "axios"

export const getRoom = async (userId) => {
    const data = await axios.post("/api/room/getRoom", {
        userId
    });
    return data;
}