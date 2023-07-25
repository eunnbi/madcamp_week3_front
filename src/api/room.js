import axios from "axios";

export const getRoom = async (userId) => {
    const data = await axios.post("/api/room/getRoom", {
        userId
    });
    return data;
}

export const setGreeting = async (roomId, greeting) => {
    const data = await axios.post("/api/room/setGreeting", {
        roomId, greeting
    });
    return data;
}