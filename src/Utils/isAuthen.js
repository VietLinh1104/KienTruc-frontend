// isAuthen.js
export const isAuthenticated = () => {
    // Kiểm tra token trong localStorage, sessionStorage hoặc cookies
    const token = localStorage.getItem("token"); // Hoặc sessionStorage
    return token !== null && token !== undefined && token !== "";
};
  
export const getAuthToken = () => {
    // Lấy token nếu cần
    return localStorage.getItem("token");
};

export const getUsername = () => {
    // Lấy token nếu cần
    return localStorage.getItem("username");
};

export const signOut = () => {
    // Xóa token để đăng xuất
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
