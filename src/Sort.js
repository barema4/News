import React from 'react';
import Button from './Button'
import classNames from 'classnames';

export const Sort = ({ sortKey, onSort,activeSortKey, children }) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    )

        // if (sortKey === activeSortKey) {
        // sortClass.push('button-active');
        // }
   return(  
       <Button 
       onClick={() => onSort(sortKey)}
       className={sortClass}
       >
        {children}
       </Button>) 

}

