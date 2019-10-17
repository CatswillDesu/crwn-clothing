import React from 'react';

import './with-spinner.styles.scss';

function WithSpinner(WrappedComponent) {
    return function({ isLoading, ...otherProps }) {
        if (isLoading) {
            return (
                <div className="spinner-overlay">
                    <div className="spinner"/>
                </div>
            )
        }
        return <WrappedComponent {...otherProps} />
    }
}

export default WithSpinner;