import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategories = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy thông tin danh mục theo ID
        fetch(`http://localhost:8080/api/categories/get/${id}`)
            .then(response => response.json())
            .then(data => {
                setCategory(data);
                setName(data.name);
                setDescription(data.description);
            })
            .catch(error => console.error('Lỗi khi tải danh mục:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description) {
            setError('Tên và mô tả danh mục không được để trống.');
            return;
        }

        const updatedCategory = { name, description };

        // Gửi yêu cầu PUT để cập nhật danh mục
        fetch(`http://localhost:8080/api/categories/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategory),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Danh mục đã được cập nhật', data);
                navigate('/'); // Chuyển hướng về trang danh sách danh mục
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật danh mục:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa danh mục</h1>
            {category ? (
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
                        Cập nhật danh mục
                    </button>
                </form>
            ) : (
                <p>Đang tải danh mục...</p>
            )}
        </div>
    );
};

export default EditCategories;
