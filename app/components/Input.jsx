import React from 'react';

const Input = ({ id, onChange, value, label, type, disabled }) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className={`${disabled ? "cursor-not-allowed" : ""} block w-full px-6 pt-6 pb-1 text-white rounded-md appearance-none text-md bg-neutral-700 focus:outline-none focus:ring-0 peer invalid:border-b-1`}
        placeholder=" " 
        disabled={disabled}
      />
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

export default Input;
