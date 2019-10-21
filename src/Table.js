import React from 'react';
import Button from './Button'
import { SORTS }  from './App'
import { Sort } from './Sort'

export default function Table(props){
    const { 
      list, 
      onDismiss,
      sortKey,
      onSort,
      isSortReverse
    } = props

    const sortedList = SORTS[sortKey](list)

    const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList

    return(
       
    <div className="table">
    <div className="table-header">
      <span style={{ width: '40% '}}>
        <Sort
        sortKey= {'TITLE'}
        onSort={onSort}
        activeSortKey={sortKey}
        >
        Title
        </Sort>
      </span>
      <span style={{ width: '30% '}}>
        <Sort
        sortKey= {'AUTHOR'}
        onSort={onSort}
        activeSortKey={sortKey}
        >
        Author
        </Sort>
      </span>

      <span style={{ width: '10% '}}>
        <Sort
        sortKey= {'COMMENTS'}
        onSort={onSort}
        activeSortKey={sortKey}
        >
        COMMENTS
        </Sort>
      </span>

      <span style={{ width: '10% '}}>
        <Sort
        sortKey= {'POINTS'}
        onSort={onSort}
        activeSortKey={sortKey}
        >
        POINTS
        </Sort>
      </span>

      <span style={{ width: '10% '}}>
      ARCHIVE
      </span>

    </div>
    {reverseSortedList.map(item => 
  
    <div key={item.objectID} className="table-row">
      <span style={{ width: '40%' }}>
      <a href= {item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <Button
        onClick={() => onDismiss(item.objectID)}
        type="button"
        className="button-inline"
        >
        Dismiss
        </Button>
      </span>
      </div>
  )}
  </div>
    )

}
  