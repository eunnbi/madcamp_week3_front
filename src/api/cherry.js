import axios from "axios"

export const getRank = async (userId) => {
    const data = await axios.post("/api/cherry/getRank", {
        userId
    });
    return data;
}