import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import Input from "../Components/Input";
import authApi from "../Services/authApi"; // Import authApi để gọi API đăng nhập

function Registration() {
  const [formData, setFormData] = useState({}); // State để lưu dữ liệu form
  const navigate = useNavigate();

  const handleInputChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newValue,
    }));
  };

  const handleSend = async () => {
    try {
      const token = await authApi.login(formData); // Gọi API login từ authApi
      localStorage.setItem("token", token.token); // Lưu token vào localStorage
      localStorage.setItem("username", token.username);
      navigate("/dashboard"); // Điều hướng sau khi đăng nhập thành công (tuỳ chỉnh đường dẫn)
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <Form className="col-span-4 !px-20">
        <Input
          type="text"
          name="Username"
          id="username"
          className='!col-span-4'
          fieldClassName='!col-span-4 w-[300px]'
          resultValue={handleInputChange}
        />
        <Input
          type="password"
          name="Password"
          id="password"
          className='!col-span-4'
          fieldClassName='!col-span-4 w-[300px]'
          resultValue={handleInputChange}
        />
        <Input
          type="password"
          name="Re-Password"
          id="re-password"
          className='!col-span-4'
          fieldClassName='!col-span-4 w-[300px]'
          resultValue={handleInputChange}
        />
      </Form>
      <div className="bg-white rounded-xl p-6 col-span-2">
        <button
          onClick={handleSend}
          className="col-span-1 bg-blue-500 text-white rounded-lg row-start-4 py-1 px-4"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;
