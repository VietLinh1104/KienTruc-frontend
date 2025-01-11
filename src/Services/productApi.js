import axiosInstance from "./axiosConfig";

const productApi = {
  // Thêm sản phẩm mới
  addProduct: (newProduct) => {
    return axiosInstance.post("/products/add", newProduct);
  },

  // Lấy tất cả sản phẩm
  getAllProducts: () => {
    return axiosInstance.get("/products/get-all");
  },

  // Lấy sản phẩm theo ID
  getProductById: (id) => {
    return axiosInstance.get(`/products/get-all-by-id/${id}`);
  },

  // Cập nhật sản phẩm theo ID
  updateProductById: (id, updatedProduct) => {
    return axiosInstance.put(`/products/update/${id}`, updatedProduct);
  },

  // Xóa sản phẩm theo ID
  deleteProductById: (id) => {
    return axiosInstance.delete(`/products/delete/${id}`);
  },
};

export default productApi;
