import React from 'react';

const Select = ({ id, onChange, value, options, label, disabled }) => {
  return (
    <div className="relative">
      <select
        onChange={onChange}
        value={value}
        id={id}
        className={`${disabled ? "cursor-not-allowed" : ""} block w-full px-6 pt-6 pb-1 text-white rounded-md appearance-none text-md bg-neutral-700 focus:outline-none focus:ring-0 peer invalid:border-b-1`}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label 
        htmlFor={id} 
        className="
          absolute 
          text-md
          text-zinc-400
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          top-4 
          z-10 
          origin-[0] 
          left-6
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-3
        ">{label}</label>
    </div>
  );
};

export default Select;
