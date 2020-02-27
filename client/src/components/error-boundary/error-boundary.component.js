import React, { Component } from 'react';

import './error-boundary.styles.scss';

class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError() {
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.info(`${error}, ${info}`);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <div className="error-boundary">
                    <div className="error-image" />
                    <span className="error-title">This Page is a Ghost</span>
                    <p className="error-description">Once alive and now dead, this ghost appears to have some unfinished business. Could it be with you? Or the treasure hidden under the floorboards of the old mansion in the hills that may never reach its rightful owner, a compassionate school teacher in Brooklyn.</p>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;