import React, { useState } from 'react';

const AddCategoriesForm = ({ onAddCategory }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description) {
            setError('Tên danh mục và mô tả không được để trống.');
            return;
        }

        const newCategory = {
            name,
            description,
        };

        // Gọi API để thêm danh mục vào backend
        fetch('http://localhost:8080/api/categories/add', {  // URL API thêm danh mục
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        })
            .then(response => response.json())
            .then(data => {
                onAddCategory(data); // Gọi hàm onAddCategory từ props
                setName('');
                setDescription('');
                setError('');
            })
            .catch(error => {
                console.error('Lỗi khi thêm danh mục:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thêm danh mục</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                        placeholder="Nhập tên danh mục"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                        placeholder="Nhập mô tả"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Thêm danh mục
                </button>
            </form>
        </div>
    );
};

export default AddCategoriesForm;
