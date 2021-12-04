import React, { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'


export const ViewAuthor = () => {
    const params = useParams();
    
    





 

    
        return (
            <div>
                {params.name}
            </div>

        );
        
}


export default ViewAuthor;