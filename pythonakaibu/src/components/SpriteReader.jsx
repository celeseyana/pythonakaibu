import React from "react";

const Sprite = ({ frame, type }) => {
    const frameClass = `sprite sprite-frame-${frame}`;
    const typeClass = `${type}-buff`; 

    return (
        <div className={`${frameClass} ${typeClass}`}></div> 
    );
};

export default Sprite;


