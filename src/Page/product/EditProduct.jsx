import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy thông tin sản phẩm theo ID
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
            })
            .catch(error => console.error('Lỗi khi tải sản phẩm:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price) {
            setError('Tên và giá sản phẩm không được để trống.');
            return;
        }

        const updatedProduct = { name, price: parseFloat(price), description };

        // Gửi yêu cầu PUT để cập nhật sản phẩm
        fetch(`http://localhost:8080/api/products/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Sản phẩm đã được cập nhật', data);
                navigate('/'); // Chuyển hướng về trang danh sách sản phẩm
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật sản phẩm:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
            {product ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập mô tả sản phẩm"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Cập nhật sản phẩm
                    </button>
                </form>
            ) : (
                <p>Đang tải sản phẩm...</p>
            )}
        </div>
    );
};

export default EditProduct;
