import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import Table from "../Components/Table";
import productApi, { sanPhamApi } from "../Services/productApi";

const header = ["ID Sản Phẩm", "Tên Sản Phẩm", "Mô Tả", "Giá"];

function TableSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);


  const token = localStorage.getItem("token");
  console.log('hehe',token);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDelete = async (selectedItems) => {
    try {
      // Giả sử bạn có API xóa sản phẩm theo danh sách ID
      await productApi.deleteProducts(selectedItems); 
      console.log("Xóa sản phẩm thành công!");

      // Gọi lại fetchProducts để cập nhật danh sách sản phẩm
      await fetchProducts();
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm:", error);
    }
  };

  const handleAddClick = () =>{
    navigate("/products/add");
  }

  const handleEditClick = (param) =>{
    navigate(`/products/update/${param}`);
  }
  return (
    <>
      <Table data={products} header={header} onDeleteClick={handleDelete} onAddClick={handleAddClick} onEditClick={handleEditClick}/>
    </>
  );
}

export default TableSection;
