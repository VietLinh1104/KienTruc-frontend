import React from 'react';

function Button({className, children, onClick, onSubmit, type}) {
    return ( 
        <button onClick={onClick} onSubmit={onSubmit} type={type} className={`btn ${className}`}>
            <span className="text-base flex items-center justify-center">{children}</span>
        </button>
     );
}

export default Button;