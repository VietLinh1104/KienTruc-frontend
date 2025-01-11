import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBrand = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [brand, setBrand] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy thông tin thương hiệu theo ID
        fetch(`http://localhost:8080/api/brands/get-all-by-id/${id}`)
            .then(response => response.json())
            .then(data => {
                setBrand(data);
                setName(data.name);
            })
            .catch(error => console.error('Lỗi khi tải thương hiệu:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setError('Tên thương hiệu không được để trống.');
            return;
        }

        const updatedBrand = { name };

        // Gửi yêu cầu PUT để cập nhật thương hiệu
        fetch(`http://localhost:8080/api/brands/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBrand),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Thương hiệu đã được cập nhật', data);
                navigate('/'); // Chuyển hướng về trang danh sách thương hiệu
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật thương hiệu:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa thương hiệu</h1>
            {brand ? (
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
                        Cập nhật thương hiệu
                    </button>
                </form>
            ) : (
                <p>Đang tải thương hiệu...</p>
            )}
        </div>
    );
};

export default EditBrand;
