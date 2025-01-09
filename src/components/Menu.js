import React, { useEffect, useState, useContext } from "react";
import { MenuItem } from "./MenuItem.js";
import "../styles/Menu.css";
import hungryContext from "../Context/hungryContext";

export const Menu = () => {
    const { fetchItems } = useContext(hungryContext);
    const [allItems, setAllItems] = useState([]); // State to store fetched items

    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchItems(); // Fetch items using context
            setAllItems(items); // Update state with fetched items
        };
        fetchData();
    }, [fetchItems]); // Dependency array ensures `fetchItems` changes are accounted for

    return (
        <div className="menuContainer">
            <h1 className="menu-title">Menu</h1>
            <div className="menu-items">
                {allItems.length === 0 ? (
                    <p>No items available</p>
                ) : (
                    allItems.map(menuItem => (
                        <div className="menu-item" key={menuItem.id}>
                            <MenuItem menuItem={menuItem} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
