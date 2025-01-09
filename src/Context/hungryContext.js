import { createContext, useState } from "react";
import axios from "axios";

const hungryContext = createContext();

function Provider({ children }) {
    const [items, setItems] = useState([]);   // Selected items
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [comments, setComments] = useState([]);

    const addItem = async (menuItemId) => {
        const allItems = await fetchItems();
        const itemSelected = allItems.find(menuItem => menuItem.id === menuItemId);

        if (itemSelected) {
            if (items.find(item => item.id === itemSelected.id)) {
                console.log("Item already in cart");
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 2000);
                return;
            }
            itemSelected.quantity = 1;
            itemSelected.totalPriceOfItem = itemSelected.price * 1;
            setItems([...items, itemSelected]);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };


    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/items");
            return response.data;
        } catch (error) {
            console.error("Error while fetching items", error);
            return [];
        }
    };



    const removeItem = async (menuItemId) => {         // remove from selectedList
        const allItems = await fetchItems();
        const itemSelected = allItems.find(menuItem => menuItem.id === menuItemId);
        if (itemSelected) {
            const newItems = items.filter(item => item.id !== menuItemId);
            setItems(newItems);
        }
    }

    const updateItemQuantity = (menuItemId, newQuantity) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === menuItemId
                    ? {
                        ...item,
                        quantity: newQuantity,
                        totalPriceOfItem: parseFloat((item.price * newQuantity).toFixed(2)),
                    }
                    : item
            )
        );
    };


    // Comments
    const getComments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/comments");
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error("Error while fetching comments:", error);
        }
    }

    const addComments = async (e, name, text) => {
        e.preventDefault();
        if (name && text) {
            setComments([...comments, { name, text }]);
            try {
                const response = await fetch("http://localhost:3001/comments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, text }),
                });

                if (!response.ok) {
                    console.error("Failed to save comment to server.");
                }
            } catch (error) {
                console.error("Error while sending comment:", error);
            }
        }
    };


    return (
        <hungryContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, fetchItems, 
            comments, getComments, addComments
         }}>
            {children}
            {showWarning && (
                <div style={cardStyle("warning")}>
                    <p>Item already in cart!</p>
                </div>
            )}
            {showSuccess && (
                <div style={cardStyle("success")}>
                    <p>Item added to cart!</p>
                </div>
            )}
        </hungryContext.Provider>
    );

}

// Dinamik kart stilini döndüren fonksiyon
const cardStyle = (type) => {
    const baseStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "20px 30px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: "26px",
        zIndex: 1000,
    };

    const typeStyles = {
        warning: {
            backgroundColor: "#f8d7da",
            color: "#721c24",
        },
        success: {
            backgroundColor: "#d4edda",
            color: "#155724",
        },
    };

    return { ...baseStyle, ...typeStyles[type] }; // Temel stil ve tür stilini birleştirir
};

export { Provider };
export default hungryContext;
