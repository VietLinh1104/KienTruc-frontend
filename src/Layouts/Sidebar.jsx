import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Access/Logo/Logo.png';
import Line from '../Access/Icon/line.svg';
import Tabside from '../Components/Tabside';

const tab = {
    'Trang Chủ': '/',
    'Sản Phẩm': '/products',
    'Thương Hiệu': '/brand',
    'Nhà Cung Cấp': '/supplier',
    'Danh Mục': '/categories',
};

function Sidebar() {
    const location = useLocation().pathname;
    const basePath = location.split('/')[1];
    

    return (
        <div className="p-5 space-y-2">
            <div className="logo p-2">
                <img src={Logo} alt="Logo" />
            </div>


            <img src={Line} alt="Line" />
            <div className="tab p-2">
                {Object.entries(tab).map(([name, path]) => (
                    <Link to={path} key={path} className=''>
                        <Tabside className='mb-3' variant={`/${basePath}` === path ? 'forcus' : 'normal'}>
                            {name}
                        </Tabside>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
