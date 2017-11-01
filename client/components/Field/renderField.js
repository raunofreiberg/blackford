import React from 'react';

const Field = ({ input, placeholder, type }) => (
    <div className="input__container">
        <input {...input} type={type} className="input" required />
        <label htmlFor={input.name}>{placeholder}</label>
        <span className="input__bar" />
    </div>
);

export default Field;