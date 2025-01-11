import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm'; // Nếu bạn sử dụng component form ở một nơi khác
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API từ backend Spring Boot
        fetch('http://localhost:8080/api/products/get-all') // Thay đổi URL nếu cần
            .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
            .then(data => setProducts(data)) // Cập nhật danh sách sản phẩm
            .catch(error => console.error('Error fetching products:', error));
    }, []); // useEffect chạy 1 lần khi component được render

    const handleEdit = (id) => {
        // Điều hướng đến trang chỉnh sửa sản phẩm
        navigate(`/product/edit/${id}`);
    };

    const handleDelete = (id) => {
        console.log('Xóa sản phẩm có ID:', id);

        // Gửi yêu cầu xóa sản phẩm tới backend
        fetch(`http://localhost:8080/api/products/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Cập nhật lại danh sách sản phẩm sau khi xóa
                    setProducts(products.filter(product => product.id !== id));
                    console.log('Xóa sản phẩm thành công');
                } else {
                    console.error('Lỗi khi xóa sản phẩm');
                }
            })
            .catch(error => {
                console.error('Lỗi khi gửi yêu cầu xóa:', error);
            });
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowAddForm(false); // Đóng form thêm sản phẩm sau khi thêm thành công
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

            {/* Nút Add sản phẩm */}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowAddForm(!showAddForm)}
            >
                Thêm sản phẩm
            </button>

            {/* Hiển thị form thêm sản phẩm khi nút Add được nhấn */}
            {showAddForm && <AddProductForm onAddProduct={handleAddProduct} />}

            {/* Bảng danh sách sản phẩm */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-b">ID</th>
                        <th className="px-4 py-2 border-b">Tên sản phẩm</th>
                        <th className="px-4 py-2 border-b">Giá</th>
                        <th className="px-4 py-2 border-b">Mô tả</th>
                        <th className="px-4 py-2 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b">
                            <td className="px-4 py-2">{product.id}</td>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">{product.price}</td>
                            <td className="px-4 py-2">{product.description}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
