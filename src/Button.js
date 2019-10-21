import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props){
    const { 
            onClick,
            className = '',
            children 
         } = props
return (  
    <button
    onClick={onClick}
    className={className}
    type="button">
    {children}
    </button>
    
    )
    
}
Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,

}  
          
    
