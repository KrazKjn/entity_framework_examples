import React, { useState, useEffect, useCallback } from "react";
import "./MessageBox.css"; // Optional styling

const MessageBox = ({ title, message, buttons, onClose, defaultButton, timeout }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleButtonClick = useCallback((result) => {
        setIsOpen(false);
        onClose(result);
    }, [onClose]);

    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                handleButtonClick(defaultButton || null);
            }, timeout);
            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [timeout, defaultButton, handleButtonClick]);

    if (!isOpen) return null;

    return (
        <div className="msgbox-modal-overlay">
            <div className="msgbox-modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="buttons">
                    {buttons.map((button, index) => (
                    <button
                        key={index}
                        autoFocus={defaultButton === button.value} // Highlight the default button
                        onClick={() => handleButtonClick(button.value)}
                        className={defaultButton === button.value ? "btn btn-primary" : "btn btn-secondary"}
                    >
                        {button.label}
                    </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;