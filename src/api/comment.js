import axios from "axios"

export const getComment = async (roomId) => {
    const data = await axios.post("/api/comment/getComment", {
        roomId
    });
    return data;
}

export const addComment = async (roomId, authorId, content) => {
    const data = await axios.post("/api/comment/add", {
        roomId, authorId, content
    });
    return data;
}