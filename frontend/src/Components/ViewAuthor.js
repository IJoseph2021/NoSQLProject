import React, { useState, useEffect, } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AccountRepository } from '../api/accountRepository';
import { Author } from './Author'




export const ViewAuthor = () => {
      
    const params = useParams();
    const arrName = params.name.split(" ");
    const element = <Author name = {arrName}/> 

        return (
            <div>
                {element}
            </div>
        );
        
}


export default ViewAuthor;