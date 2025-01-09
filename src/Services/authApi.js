import axiosInstance from "./axiosConfig";

const authApi = {
  // Đăng ký người dùng mới
  register: (newUser) => {
    return axiosInstance.post("/auth/register", newUser);
  },

  // Đăng nhập
  login: (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
  },

  // Kiểm tra token hợp lệ
  validateToken: () => {
    return axiosInstance.get("/auth/validate-token");
  },
};

export default authApi;
