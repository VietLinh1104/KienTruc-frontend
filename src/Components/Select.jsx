import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';


function Select({options, className, placeHolder, name, onChange,sendValue, optionsClassName, changePH = true, icon = true, lClassName}) {
    const [toggle, setToggle] = useState(false);
    const [palaceHolderA, setPalaceHolder] = useState(placeHolder);
    const selectRef = useRef(null);

    
    
    const toggleHandle = (e) => {
        setToggle(!toggle); 
    }
    
    const optionHandle = (value) => (e) => {
        setToggle(false);

        if (changePH === true) {
            setPalaceHolder(value);
        } else {
            setPalaceHolder(placeHolder);
        }

        if (onChange){
            onChange(value);
        }

        sendValue(value);

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef]);

    return ( 
        <div ref={selectRef} className={`relative select w-[200px] ${lClassName}`}>
            <Button 
                className={`bg-white flex btn-secondary items-center !p-0 hover:bg-white hover:border-gray-300 w-full ${className}`} 
                onClick={toggleHandle}
                name={name}
            >
                <p className="px-2 py-1.5 pl-2 font-normal truncate flex items-center text-sm">{palaceHolderA}</p>
                <span className={`flex items-center right-0 absolute pr-2 ${icon ? '' : 'hidden'}`}>
                <i class={`bx bx-expand-vertical text-gray-500 text-xs `} >
                </i>
                </span>
                
            </Button>
            
            {toggle && 
                <div className='absolute select-options w-full transition'>
                    {options.map((option, index) => (
                        <div className= {`option-item flex relative `} key={index} onClick={optionHandle(option)}>
                            {option === palaceHolderA && <i class='absolute bx text-sm bx-check mr-2'></i>}
                            <p className={`px-5 text-sm ${optionsClassName}`}>{option}</p>
                        </div>
                    ))}        
                </div>
            }
        </div>
     );
}

export default Select;