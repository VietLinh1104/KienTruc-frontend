import './App.css';

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from './Layouts/Sidebar';
import Navbar from './Layouts/Navbar';
import TableSection from './Page/TableSection';
import AddProduct from './Page/AddProduct';
import UpdateProduct from './Page/UpdateProduct';
import SignIn from './Page/SignIn';
import Registration from './Page/Registration';

import { isAuthenticated } from './Utils/isAuthen'; // Import hàm kiểm tra xác thực

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthen = isAuthenticated(); // Kiểm tra trạng thái đăng nhập

  // Danh sách các đường dẫn không yêu cầu xác thực
  const publicRoutes = ["/login", "/registration"];

  useEffect(() => {
    // Chuyển hướng nếu không xác thực và không phải đường dẫn công khai
    if (!isAuthen && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [isAuthen, location, navigate]);

  return (
    <div className="App flex grid-cols-5">

      <div className="zone w-[250px] h-screen fixed">
        <Sidebar />
      </div>

      <div className="ml-[250px] w-full col-span-4">
        <Navbar />
        <div className="px-10 pr-20 space-y-5">
          <div className="title">
            <h1 className='text-xl'>{'Dashboard'}</h1>
            <p className='text-cusGray text-sm'></p>
          </div>
          <Routes>
            <Route path="/products" element={<TableSection />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
