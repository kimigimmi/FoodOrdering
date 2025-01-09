import React, { useContext, useState, useEffect } from "react";
import "../styles/Comments.css";
import hungryContext from "../Context/hungryContext";


export const Comments = () => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");


    const { comments, getComments, addComments } = useContext(hungryContext);

    useEffect(() => {
        getComments();
    })

    const typingName = (e) => {
        setName(e.target.value);
    };

    const typingComment = (e) => {
        setText(e.target.value);
    };

    const addComment = async (e) => {
        await addComments(e, name, text);
        setName("");
        setText("");
    }



    return (
        <div className="comments">
            <form className="comment-box" onSubmit={addComment}>
                <div className="name comment-form">
                    <label>Type Your Name :</label>
                    <input
                        value={name}
                        type="text"
                        placeholder="Your Name"
                        onChange={typingName}
                    />
                </div>
                <div className="comment-text comment-form">
                    <label>Type Your Comment :</label>
                    <textarea
                        value={text}
                        placeholder="Your Comment"
                        rows={5}
                        onChange={typingComment}
                    />
                </div>
                <button type="submit">Send</button>
            </form>

            <div className="comment-list comment-box">
                <h2>Comments</h2>
                <div className="comment">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <label className="name-section">{comment.name}</label>
                            <p className="comment-section">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
