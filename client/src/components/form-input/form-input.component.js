import React from 'react';

import './form-input.styles.scss';

function FormInput({ handleChange, label, ...otherProps }) {
    const inputLabel = label && <label className={`form-input-label ${otherProps.value.length ? 'shrink' : ''}`}>{label}</label>
    return(
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {inputLabel}
        </div>
    )
}

export default FormInput;