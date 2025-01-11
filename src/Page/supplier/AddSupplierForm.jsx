import React, { useState } from 'react';

const AddSupplierForm = ({ onAddSupplier }) => {
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra xem các trường có được điền hay không
        if (!name || !contactInfo || !address) {
            setError('Tất cả các trường là bắt buộc.');
            return;
        }

        const newSupplier = {
            name,
            contactInfo,
            address,
        };

        // Gọi API để thêm nhà cung cấp vào backend
        fetch('http://localhost:8080/api/suppliers/add', { // URL API thêm nhà cung cấp
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSupplier),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi thêm nhà cung cấp.');
                }
                return response.json();
            })
            .then(data => {
                onAddSupplier(data); // Gọi hàm onAddSupplier từ props
                setName('');
                setContactInfo('');
                setAddress('');
                setError('');
            })
            .catch(error => {
                console.error('Lỗi khi thêm nhà cung cấp:', error);
                setError('Có lỗi xảy ra. Vui lòng thử lại.');
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Thêm nhà cung cấp</h1>
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
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Thêm nhà cung cấp
                </button>
            </form>
        </div>
    );
};

export default AddSupplierForm;
