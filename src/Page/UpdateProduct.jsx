import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import Form from "../Components/Form";
import Input from "../Components/Input";

import productApi from '../Services/productApi';

function UpdateProduct() {
  const { id } = useParams();  // Sử dụng trực tiếp useParams để lấy id
  const [formData, setFormData] = useState({}); // State để lưu dữ liệu form
  const [products, setProducts] = useState(null);
  const selectData = ["haha", "hihi"];

  const fetchProductsByIds = async (ids) => {
    try {
      const response = await productApi.findProductsByIds(ids);
      setProducts(response[0]); // Giả sử response[0] là sản phẩm bạn muốn set
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (id && !products) {
      const idArray = [];
      idArray.push(id);
      fetchProductsByIds(idArray);
    }
  }, [id, products]); // Chỉ chạy effect khi `id` hoặc `products` thay đổi

  const handleInputChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newValue,
    }));
  };

  const handleSend = async () => {
    if (formData && Object.keys(formData).length > 0) {
      try {
        const data = await productApi.updateProductById(id, formData);
        console.log("Product updated successfully:", data);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      console.log("Form không có dữ liệu hợp lệ.");
    }
  };


  if (!products) {
    return <div>Loading...</div>; // Hiển thị loading khi `products` chưa được lấy về
  }


  return (
    <div className="grid grid-cols-6 gap-4">
      <Form className="col-span-4">

        <Input
          type="text"
          name="Tên Sản Phẩm"
          id="name"
          setValue={products.name}
          resultValue={handleInputChange}
        />

        <Input
          type="number"
          name="Giá Sản Phẩm"
          id="price"
          setValue={products.price}
          resultValue={handleInputChange}
        />

        <Input
          type="select"
          name="Thương Hiệu"
          id="brand"
          setValue={products.brand}
          selectData={selectData}
          resultValue={handleInputChange}
        />

        <Input
          type="select"
          name="Danh Mục"
          id="category"
          setValue={products.category}
          selectData={selectData}
          resultValue={handleInputChange}
        />

        <Input
          type="number"
          name="Tồn Kho"
          id="quantity"
          setValue={products.quantity}
          selectData={selectData}
          resultValue={handleInputChange}
        />

        <Input
          type="text"
          name="Mô Tả"
          id="description"
          setValue={products.description}
          resultValue={handleInputChange}
        />


        
      </Form>
      <div className="bg-white rounded-xl p-6 col-span-2">
        <button onClick={handleSend} className="col-span-1 bg-blue-500 text-white rounded-lg row-start-4 py-1 px-4">
          Send
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
