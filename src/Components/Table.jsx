import React, { useState,useEffect } from "react";
import MoreBtn from '../Access/Icon/more-btn.svg';
import Select from '../Components/Select';


const Table = ({ data, header , onDeleteClick, onAddClick, onEditClick}) => {
  const [selectedItems, setSelectedItems] = useState([]); 
  const [selectAll, setSelectAll] = useState(false); 
  const [deleteBtnShow , setDeleteBtnShow] = useState(false);
  
  const locations = ["Filler", "Sort By"];

  // Hàm chọn tất cả
  const handleSelectAll = (checked) => {
    if (checked) {
      // Tích tất cả checkbox
      const allIds = data.map((item) => item.id_product); // sử dụng id_product làm key
      setSelectedItems(allIds);
    } else {
      // Bỏ tích tất cả
      setSelectedItems([]);
    }
    setSelectAll(checked);
  };
  

  const handleCheckboxChange = (id, checked) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  // Hàm điều khiển hiển thị nút xóa
  const handleDeleteBtnShow = () => {
    if (selectedItems.length > 0) {
      setDeleteBtnShow(true);
    } else {
      setDeleteBtnShow(false);
    }
  };

  useEffect(() => {
    handleDeleteBtnShow();
  }, [selectedItems]);

  return (
    <>
    <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Select placeHolder="Filler" options={locations}></Select>
          {deleteBtnShow && (
            <button 
              className="btn bg-red-600 hover:bg-red-400 text-white border-none" 
              onClick={() => onDeleteClick(selectedItems)}
            >
              Delete
            </button>
          ) }

        </div>
        <button 
          className="btn btn-primary border-none"
          onClick={() => onAddClick()}
        >Add</button>
    </div>
    <div className="bg-white p-3 rounded-xl shadow-lg">
      <table border="1">

        {/* Header */}
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="checkAll"
                id="checkAll"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            {header.map((item) => (
              <th key={item} className="">{item}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>


        {/* BODY */}
        <tbody>
          {Array.isArray(data) && data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  name={item.id}
                  id={item.id}
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                />
              </td>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
              <td>
                <button className="text-blue-500 hover:underline" onClick={()=>{onEditClick(item.id)}}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </>

  );
};

export default Table;
