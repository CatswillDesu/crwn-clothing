import React from 'react';
import {withRouter} from 'react-router-dom';

import './menu-item.styles.scss'

function MenuItem({title, imageUrl, size, history, linkUrl}) {
    return (
        <div
          className={`menu-item ${size}`}
          onClick={() => history.push(`${linkUrl}`)}
        >
          <div 
            className="background-image"
            style={{
              backgroundImage: `url(${imageUrl})`
            }}
          />
          <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="sub-title">SHOP NOW</span>
          </div>
        </div>
    )
}

export default withRouter(MenuItem);