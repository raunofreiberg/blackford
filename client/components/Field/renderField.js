import React from 'react';

const Field = ({ input, placeholder, type }) => (
    <div className="inputWrapper">
        <input {...input} type={type} className="input" required />
        <label htmlFor={input.name}>{placeholder}</label>
        <span className="inputBar" />
    </div>
);

export default Field;