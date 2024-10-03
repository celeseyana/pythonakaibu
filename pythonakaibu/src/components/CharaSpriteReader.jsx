import React from "react";

const CharaSprite = ({ frame, type }) => {
    const frameClass = `charasprite sprite-frame-${frame}`;
    const typeClass = `${type}`; 

    return (
        <div className={`${frameClass} ${typeClass}`}></div> 
    );
};

export default CharaSprite;