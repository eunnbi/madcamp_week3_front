import axios from "axios"

export const getUser = async (name) => {
    const data = await axios.post("/api/user/getUser", {
        name
    });
    return data;
}

export const checkDuplicate = async (name) => {
    const data = await axios.post("/api/user/checkDuplicate", {
        name
    });
    return data;
}