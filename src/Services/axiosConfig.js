import axios from "axios";

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // URL API của Spring Boot
  timeout: 10000,                      // Thời gian chờ request (10 giây)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor xử lý request
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Thêm Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request sent: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Chỉ trả về data từ response
  },
  (error) => {
    console.error("API Error: ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
