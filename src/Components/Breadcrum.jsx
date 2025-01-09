import React, { Component } from 'react'

function BreadCrum() {
    return (  
        <div className="flex justify-between gap-1">
            
                    <div className="link text-md">Page</div>
                    <span className='font-medium text-cusGray text-md'>/</span>
                    <div className="link text-md">Home</div>

        </div>
    
    );
}

export default BreadCrum;