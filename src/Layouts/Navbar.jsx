import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";
import { isAuthenticated, signOut, getUsername } from '../Utils/isAuthen';

import BtnIcon from '../Components/BtnIcon';
import BreadCrum from '../Components/Breadcrum';

import SettingIcon from '../Access/Icon/setting.svg'
import NotiIcon from '../Access/Icon/notification.svg'

function Navbar() {
    const navigate = useNavigate();
    const isAuthen = isAuthenticated(); // Kiểm tra trạng thái đăng nhập
    const username = getUsername();

    const redirectSignIn = () => {
        if (isAuthen === false){
            navigate("/login");   
        }
    }

    const handleSignOut = () => {
        // Xóa token từ localStorage hoặc sessionStorage
        localStorage.removeItem("token"); // Nếu dùng localStorage
        localStorage.removeItem("username");
        sessionStorage.removeItem("token"); // Nếu dùng sessionStorage
        
        // Chuyển hướng đến trang đăng nhập
        navigate("/login");
        console.log("Token removed, signed out successfully.");
    };
      

    return ( 
        <div className="p-3 px-10 flex items-center gap-4 justify-between ">
            
            <BreadCrum/>
            <div className=" flex items-center gap-4">
                <input type="text" className='' placeholder='Seach'/>
                <BtnIcon onClick={redirectSignIn} username={username} isAuthen ={isAuthen}/>
                {isAuthen && (
                    <a
                        onClick={handleSignOut}
                        className="text-red-500 text-sm font-bold cursor-pointer hover:underline"
                    >
                        Sign Out
                    </a>
                )}
                <img src={SettingIcon} alt="" className='icon-btn'/>
                <img src={NotiIcon} alt="" className='icon-btn'/>
            </div>
        </div>
     );
}

export default Navbar;