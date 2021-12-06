import React, { useState, useEffect, } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AccountRepository } from '../api/accountRepository';



export const ViewAuthor = () => {
    
    
    
    
    
    const params = useParams();
    
    const arrName = params.name.split(" ");

    
    






 

    
        return (
            <div>
                {params.name}
                
               
            </div>
        );
        
}




export default ViewAuthor;