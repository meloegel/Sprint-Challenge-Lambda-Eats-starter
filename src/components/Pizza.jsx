import React from "react";

function Pizza({ details }) {
    if(!details) {
        return <h3>Locating your pizza</h3>
    }
    return (
        <div className='pizza container'>
            <h2>{details.name}</h2>
            <p>{details.size}</p>
            <p>{details.toppings}</p>
            <p>{details.special}</p>
        </div>
    )
}

export default Pizza