import React, { useState } from 'react';

const CategorySelect = ({ categories, label, id, name, resultValue }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (typeof resultValue === "function") {
      resultValue({ [id]: e.target.value });
    }
  };

  return (
    <div className='col-span-2 flex flex-col'>
      <label htmlFor={id} className="font-medium rounded-xl flex-col">{label}</label>
      <select
        name={name}
        id={id}
        value={selectedCategory}
        onChange={handleCategoryChange}
        className='border px-4 py-1'
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((category) => (
          <option key={category[0]} value={category[0]}>
            {category[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
