import React from "react";
import { useContext } from 'react';
import hungryContext from "../Context/hungryContext";

export const MenuItem = ({ menuItem }) => {
    const { addItem } = useContext(hungryContext);

    return (
        <div
            className="menu-item"
            onClick={() => addItem(menuItem.id)}
        >
            <img src={`${menuItem.image}`} alt={menuItem.name} />
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p className="price">${menuItem.price.toFixed(2)}</p>
        </div>
    );
};
