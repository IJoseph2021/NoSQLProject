import React, { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import { AccountRepository } from '../api/accountRepository';



export const ViewPaper = () => {
    const accountRepository = new AccountRepository();
    
    
    

    
    





 

    
        return (
            <div>
                <span>
                    <h2>Title:</h2> 
                    <h3>{sessionStorage.getItem("paperTitle")}</h3>
                </span>
                
                <p>url: {sessionStorage.getItem("paperURL")}</p>
            
                <p>Authors: {sessionStorage.getItem("paperAuthors")}</p>
                

                
            </div>

        );
        
}


export default ViewPaper;