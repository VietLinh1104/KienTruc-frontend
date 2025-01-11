import './App.css';

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from './Layouts/Sidebar';
import Navbar from './Layouts/Navbar';



import ProductTable from './Page/product/ProductTable';
import AddProductForm from './Page/product/AddProductForm';
import EditProduct from './Page/product/EditProduct';

import BrandTable from './Page/brand/BrandTable'
import AddBrandForm from './Page/brand/AddBrandForm';
import EditBrand from './Page/brand/EditBrand';

import SupplierTable from './Page/supplier/SupplierTable'
import AddSupplierForm from './Page/supplier/AddSupplierForm';
import EditSupplier from './Page/supplier/EditSupplier';

import CategoriesList from './Page/categories/CategoriesTable';
import AddCategoriesForm from './Page/categories/AddCategoriesForm';
import EditCategories from './Page/categories/EditCategories';


import { isAuthenticated } from './Utils/isAuthen'; // Import hàm kiểm tra xác thực

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthen = isAuthenticated(); // Kiểm tra trạng thái đăng nhập

  // Danh sách các đường dẫn không yêu cầu xác thực


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
            <Route path="/products" element={<ProductTable />} />
            <Route path="/products/add" element={< AddProductForm/>} />
            <Route path="/product/edit/:id" element={<EditProduct />} />

            <Route path="/brand" element={<BrandTable />} />
            <Route path="/brand/add" element={< AddBrandForm/>} />
            <Route path="/brand/edit/:id" element={<EditBrand />} />

            <Route path="/supplier" element={<SupplierTable />} />
            <Route path="/supplier/add" element={< AddSupplierForm/>} />
            <Route path="/supplier/edit/:id" element={<EditSupplier />} />

            <Route path="/supplier" element={<SupplierTable />} />
            <Route path="/supplier/add" element={< AddSupplierForm/>} />
            <Route path="/supplier/edit/:id" element={<EditSupplier />} />

            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/add" element={< AddCategoriesForm/>} />
            <Route path="/categories/edit/:id" element={<EditCategories />} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default App;
