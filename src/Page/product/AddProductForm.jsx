import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !description) {
            setError('Tên, giá và mô tả sản phẩm không được để trống.');
            return;
        }

        const newProduct = {
            name,
            price: parseFloat(price),
            description,
        };

        // Gọi API để thêm sản phẩm vào backend
        fetch('http://localhost:8080/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then(response => response.json())
            .then(data => {
                onAddProduct(data); // Gọi hàm onAddProduct từ props
                setName('');
                setPrice('');
                setDescription('');
                setError('');
            })
            .catch(error => {
                console.error('Lỗi khi thêm sản phẩm:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thêm sản phẩm</h1>
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
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
