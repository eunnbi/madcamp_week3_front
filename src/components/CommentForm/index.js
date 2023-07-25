import { useState } from "react";
import "./style.css"
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
const CommentForm = ({ roomId, userId, authorId }) => {
    const [value, setValue] = useState("");
    const queryClient = useQueryClient();
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/comment/add", {
                roomId,
                authorId,
                content: value
            })
            setValue("")
            queryClient.invalidateQueries(["comment list", userId])
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <input placeholder="방명록을 남겨주세요" value={value} onChange={onChange}  />
            <button className="send-button" type="submit"><span className="send-icon"></span></button>
        </form>
    )
}

export default CommentForm;