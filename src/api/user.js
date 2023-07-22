import axios from "axios"

export const getUser = async (name) => {
    const { data } = await axios.post("/api/user/getUser", {
        name
    });
    return data;
}