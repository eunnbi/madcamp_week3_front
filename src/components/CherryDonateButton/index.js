import { useState } from "react";
import "./style.css"

const CherryDonateButton = () => {
    const [emoticons, setEmoticons] = useState([]);

    const handleClick = () => {
        setEmoticons([...emoticons, {}]);
    };
    
    return (
        <div className="button-wrapper">
            <button className="cherry-donate-button" onClick={handleClick}>
                <span className="cherry-bg" />
                <span className="cherry-text-bg" />
            </button>
            <div className="emoticons">
                {emoticons.map((_, index) => (
                    <div className="floating-image" key={index}>
                        <img src="/images/cherry.svg" alt="Cherry Icon" />
                    </div>
                ))}
            </div>
        </div> 
    )
}

export default CherryDonateButton;