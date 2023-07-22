import axios from "axios"

export const getAvatar = async (userId) => {
    const data = await axios.post("/api/avatar/getAvatar", {
        userId
    });
    return data;
}

export const getMyAvatar = async (userId) => {
    const data = await axios.post("/api/avatar/getMyAvatar", {
        userId
    });
    return data;
}

export const setAvatar = async (userId, avatarId) => {
    const data = await axios.post("/api/avatar/setAvatar", {
        userId, avatarId
    });
    return data;
}

export const buyAvatar = async (userId, avatarId) => {
    const data = await axios.post("/api/avatar/buyAvatar", {
        userId, avatarId
    });
    return data;
}

export const getMyAvatarImagePath = async (userId) => {
    const data = await axios.post("/api/avatar/getMyAvatarImagePath", {
        userId
    });
    return data;
}

