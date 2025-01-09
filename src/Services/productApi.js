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

  // Lấy sản phẩm theo danh sách ID
  findProductsByIds: (ids) => {
    return axiosInstance.post("/products/find-by-ids", ids);
  },

  // Cập nhật sản phẩm theo ID
  updateProductById: (id, updatedProduct) => {
    return axiosInstance.put(`/products/update/${id}`, updatedProduct);
  },

  // Xóa nhiều sản phẩm theo danh sách ID
  deleteProducts: (ids) => {
    return axiosInstance.delete("/products/delete", { data: ids });
  },
};

export default productApi;
