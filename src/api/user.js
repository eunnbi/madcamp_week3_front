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

export const getRandomUser = async () => {
    const data = await axios.get("/api/user/random");
    return data;
}