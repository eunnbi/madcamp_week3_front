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