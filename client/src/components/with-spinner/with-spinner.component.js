import React from 'react';

import Spinner from '../spinner/spinner.component';

function WithSpinner(WrappedComponent) {
    return function({ isLoading, ...otherProps }) {
        if (isLoading) {
            return (
                <Spinner />
            )
        }
        return <WrappedComponent {...otherProps} />
    }
}

export default WithSpinner;