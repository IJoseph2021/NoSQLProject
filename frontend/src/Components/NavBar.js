import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export const NavBar = props => {
	return (
    
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
       
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <h4><a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a></h4>
            </li>
          </ul>
          
        </div>
      </nav>
    )
	
}