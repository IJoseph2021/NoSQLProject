import React, { useState, useEffect, } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AccountRepository } from '../api/accountRepository';
import { Paper } from './Paper'




export const ViewPaper = () => {
      
    const params = useParams();
    const title = params.title
    const element = <Paper title = {title}/> 

        return (
            <div>
                {element}
            </div>
        );
        
}


export default ViewPaper;