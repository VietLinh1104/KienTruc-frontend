import React, { useState } from "react";
import Form from "../Components/Form";
import Input from "../Components/Input";

import productApi from '../Services/productApi';

function AddProduct() {
  const [formData, setFormData] = useState({}); // State để lưu dữ liệu form
  const selectData = ["haha", "hihi"];

  // Hàm xử lý khi nhận giá trị từ các Input
  const handleInputChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newValue,
    }));
  };

  

  // Hàm xử lý khi nhấn nút Send
  const handleSendss = () => {
    console.log("Dữ liệu gửi đi:", formData); // In ra console
  };

  const handleSend = async () => {
    try {
      const data = await productApi.addProduct(formData);
      console.log("Product added successfully:", data);
    } catch (error) {
      console.error("Error addadd products:", error);
    }
  };


  return (
    <div className="grid grid-cols-6 gap-4">
      <Form className="col-span-4">

        <Input
          type="text"
          name="Tên Sản Phẩm"
          id="name"
          nullable = {false}
          resultValue={handleInputChange}
        />

        <Input
          type="number"
          name="Giá Sản Phẩm"
          id="price"
          nullable = {false}
          resultValue={handleInputChange}
        />

        <Input
          type="select"
          name="Thương Hiệu"
          id="brand"
          selectData={selectData}
          resultValue={handleInputChange}
        />

        <Input
          type="select"
          name="Danh Mục"
          id="category"
          selectData={selectData}
          resultValue={handleInputChange}
        />

        <Input
          type="number"
          name="Tồn Kho"
          id="quantity"
          nullable = {false}
          resultValue={handleInputChange}
        />

        <Input
          type="text"
          name="Mô Tả"
          id="description"
          nullable = {false}
          resultValue={handleInputChange}
        />


        <button type="submit" onClick={handleSend} className="col-span-1 bg-blue-500 text-white rounded-lg row-start-4 py-1">
          Send
        </button>
      </Form>
      <div className="bg-white rounded-xl py-6 col-span-2"></div>
    </div>
  );
}

export default AddProduct;
