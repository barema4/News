import React from 'react';
export const Search = ({ value, onChange, children, onSubmit }) => 
        
            <form onSubmit={onSubmit}>
                <input type="text"
                value={value}
                onChange={onChange}
                />
                <button type="submit">
                {children}
                </button>
      
            </form>
        



   
    
        

