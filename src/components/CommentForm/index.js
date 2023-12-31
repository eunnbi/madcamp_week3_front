import { useState } from "react";
import "./style.css"
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CommentForm = ({ roomId, userId, authorId }) => {
    const [value, setValue] = useState("");
    const queryClient = useQueryClient();
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (value === "") {
            toast.warn("내용을 입력해주세요")
            return;
        }
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
        <form onSubmit={onSubmit} className="comment-form">
            <input placeholder="방명록을 남겨주세요" value={value} onChange={onChange} className="comment-input"  />
            <button className="send-button" type="submit"><span className="send-icon"></span></button>
        </form>
    )
}

export default CommentForm;