import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.component.styles.scss';

function Directory({ sections }) {
    const mappedSections = sections.map(({id, ...otherSectionProps}) => (
        <MenuItem key={id} {...otherSectionProps} />
        )
    )
    return (
        <div className="directory-menu">
            {mappedSections}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        sections: selectDirectorySections(state)
    }
}

export default withRouter(connect(mapStateToProps)(Directory));