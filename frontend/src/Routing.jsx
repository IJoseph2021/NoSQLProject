import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchBar } from './Components/SearchBar'
import { PostPaper } from './Components/PostPaper'
import { ViewAuthor } from './Components/ViewAuthor'
import { ViewPaper } from './Components/ViewPaper'
import { NavBar } from "./Components/NavBar";


export default function Routing({ appProps }) {
    return (
		<Router>
			<NavBar/>
			<Routes>
				<Route path="/" exact element={<SearchBar />} />
                <Route path="/postPaper" exact element={<PostPaper/> }/>
				<Route path="/viewAuthor/:name" element = {<ViewAuthor/>} />
				<Route path="/viewPaper/:title" element = {<ViewPaper/>} />
			</Routes>
		</Router>
	);


}
