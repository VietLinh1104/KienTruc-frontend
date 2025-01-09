import './App.css';

import {Routes, Route, Router} from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Layouts/Sidebar';
import Navbar from './Layouts/Navbar';
import TableSection from './Page/TableSection';
import AddProduct from './Page/AddProduct';
import UpdateProduct from './Page/UpdateProduct';
import SignIn from './Page/SignIn';

function App() {
  const location = useLocation();

  return (
    <div className="App flex grid-cols-5">

      <div className="zone w-[250px] h-screen fixed">
        <Sidebar/>
      </div>

      <div className=" ml-[250px] w-full col-span-4">
        <Navbar/>
        <div className="px-10 pr-20 space-y-5">
          <div className="title">
            <h1 className='text-xl'>{'Dashboard'}</h1>
            <p className='text-cusGray text-sm'></p>
          </div>
          <Routes>
            {/* hotel */}
            <Route path="/products" element={<TableSection />}/>
            <Route path="/login" element={<SignIn />}/>
            
              {/* add */}
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/update/:id" element={<UpdateProduct/>} />

            {/* not found */}
            {/* <Route path="*" element={<NotFound />} /> */}
            
          </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;
