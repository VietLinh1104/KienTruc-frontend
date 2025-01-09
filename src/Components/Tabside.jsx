import React, { Component } from 'react'
import HomeIcon from '../Access/Icon/home.svg'

function Tabside({ variant = 'normal', className, href,children }) {
    const variants = {
        forcus: 'bg-white shadow-sm',
        normal: 'text-[#A0AEC0] hover:text-[#2D3748] hover:text-opacity-60 transition ease-in-out',
    };

    return (
        <div className={`p-2 px-3 cursor-pointer rounded-3xl flex items-center gap-5 ${variants[variant]} ${className}`}>
            <div className="bg-teal-300 p-2 w-fit rounded-xl">
                <img
                    src={HomeIcon}
                    alt="Home Icon"
                    className="w-[18px] filter fill-teal-500"
                />
            </div>
            <p className="font-medium text-sm">{children}</p>
        </div>
    );
}


export default Tabside;