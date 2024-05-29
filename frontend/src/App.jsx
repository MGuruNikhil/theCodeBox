import React from 'react'
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import ReadBlog from './components/ReadBlog';
import EditBlog from './components/EditBlog';
import DeleteBlog from './components/DeleteBlog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Blogs />} />
				<Route path='/create' element={<CreateBlog />} />
				<Route path='/read/:id' element={ <ReadBlog />} />
				<Route path='/edit/:id' element={<EditBlog />} />
				<Route path='/delete/:id' element={<DeleteBlog />} />
				<Route path='/*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
