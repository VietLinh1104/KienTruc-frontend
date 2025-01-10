import React, { Component } from 'react'
import Person from '../Access/Icon/person.svg'


function BtnIcon({onClick,username, isAuthen}) {
    return ( 
        <button className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition ease-in-out" onClick={onClick}>
            <img src={Person} alt="" className='w-[15px] '/>
            <p className='text-cusGray text-sm font-semibold'>
                {isAuthen ? username : 'Sign In'}
            </p>
        </button   >
     );
}

export default BtnIcon;