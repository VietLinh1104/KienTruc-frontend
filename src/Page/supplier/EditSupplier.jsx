import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditSupplier = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [supplier, setSupplier] = useState(null);
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy thông tin nhà cung cấp theo ID
        fetch(`http://localhost:8080/api/suppliers/get/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không tìm thấy thông tin nhà cung cấp.');
                }
                return response.json();
            })
            .then(data => {
                setSupplier(data);
                setName(data.name);
                setContactInfo(data.contactInfo);
                setAddress(data.address);
            })
            .catch(error => setError(error.message));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !contactInfo || !address) {
            setError('Tất cả các trường là bắt buộc.');
            return;
        }

        const updatedSupplier = {
            name,
            contactInfo,
            address,
        };

        // Gửi yêu cầu PUT để cập nhật nhà cung cấp
        fetch(`http://localhost:8080/api/suppliers/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSupplier),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi cập nhật nhà cung cấp.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Nhà cung cấp đã được cập nhật:', data);
                navigate('/'); // Chuyển hướng về trang danh sách nhà cung cấp
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật nhà cung cấp:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chỉnh sửa nhà cung cấp</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {supplier ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tên nhà cung cấp</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập tên nhà cung cấp"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Thông tin liên hệ</label>
                        <input
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập thông tin liên hệ"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                            placeholder="Nhập địa chỉ"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Cập nhật nhà cung cấp
                    </button>
                </form>
            ) : (
                <p>Đang tải thông tin nhà cung cấp...</p>
            )}
        </div>
    );
};

export default EditSupplier;
