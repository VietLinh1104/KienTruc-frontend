import React, { useState } from 'react';

const AddBrandForm = ({ onAddBrand }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            // setError('Tên thương hiệu không được để trống.');
            return;
        }

        const newBrand = {
            name,
        };

        // Gọi API để thêm thương hiệu vào backend
        fetch('http://localhost:8080/api/brands/add', {  // URL API thêm thương hiệu
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBrand),
        })
            .then(response => response.json())
            .then(data => {
                onAddBrand(data); // Gọi hàm onAddBrand từ props
                setName('');
                setError('');
            })
            .catch(error => {
                console.error('Lỗi khi thêm thương hiệu:', error);
                // setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thêm thương hiệu</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên thương hiệu</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                        placeholder="Nhập tên thương hiệu"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Thêm thương hiệu
                </button>
            </form>
        </div>
    );
};

export default AddBrandForm;
