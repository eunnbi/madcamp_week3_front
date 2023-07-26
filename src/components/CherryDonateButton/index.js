import { useRef, useState, useCallback } from "react";
import { debounce } from "lodash";
import "./style.css"
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const CherryDonateButton = ({ userId, sponsorId }) => {
    const [emoticons, setEmoticons] = useState([]);
    const cherry = useRef(0);
    const queryClient = useQueryClient();

    const handleClick = () => {
        cherry.current++;
        setEmoticons([...emoticons, {}]);
        callAddCherryAPI();
    };
    const callAddCherryAPI = useCallback(
		debounce(async () => {
			try {
				const response = await axios.post("/api/cherry/addCherry", {
                    userId,
                    sponsorId,
                    cherry: cherry.current
                })
                cherry.current = 0;
				console.log(response);
                queryClient.invalidateQueries(["rank", userId]);
			} catch (e) {
				console.log(e);
                cherry.current = 0;
			}
		}, 1000),
		[userId, sponsorId],
	);
    
    return (
        <div className="button-wrapper">
            <button className="cherry-donate-button" onClick={handleClick}>
                <div className="cherry-image-box">
                    <span className="cherry-bg" />
                    {emoticons.map((_, index) => (
                        <div className="floating-image" key={index}>
                            <img src="/images/cherry.svg" alt="Cherry Icon" />
                        </div>
                    ))}
                </div>
                
                <span className="cherry-text-bg" />
            </button>
            <div className="emoticons">
                
            </div>
        </div> 
    )
}

export default CherryDonateButton;