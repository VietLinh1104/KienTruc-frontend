import React, { Component } from 'react'

import BtnIcon from '../Components/BtnIcon';
import BreadCrum from '../Components/Breadcrum';

import SettingIcon from '../Access/Icon/setting.svg'
import NotiIcon from '../Access/Icon/notification.svg'

function Navbar() {
    return ( 
        <div className="p-3 px-10 flex items-center gap-4 justify-between ">
            
            <BreadCrum/>
            <div className=" flex items-center gap-4">
                <input type="text" className='' placeholder='Seach'/>
                <BtnIcon/>
                <img src={SettingIcon} alt="" className='icon-btn'/>
                <img src={NotiIcon} alt="" className='icon-btn'/>
            </div>
        </div>
     );
}

export default Navbar;