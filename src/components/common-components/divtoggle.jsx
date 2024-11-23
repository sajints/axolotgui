import React, { useState } from 'react';

const Collapsible = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const parsedItem = JSON.parse(children);
    const title = parsedItem.id;
    // Function to toggle the collapse state
    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            {/* Title Area */}
            <div
                onClick={toggleCollapse}
                style={{
                    background: '#f4f4f4',
                    color: '#333',
                    padding: '10px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* Collapsible Content */}
            {isOpen && (
                <div
                    style={{
                        padding: '10px',
                        background: '#fff', // Set the background to white
                        color: '#333', // Set the text color to a dark shade
                        borderTop: '1px solid #ccc',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;
