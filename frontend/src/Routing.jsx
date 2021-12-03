import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchBar } from './Components/SearchBar'
import { PostPaper } from './Components/PostPaper'


export default function Routing({ appProps }) {
    return (
		<Router>
			<Routes>
				<Route path="/" exact element={<SearchBar />} />
                <Route path="/postPaper" exact element={<PostPaper/> }/>
			</Routes>
		</Router>
	);


}
