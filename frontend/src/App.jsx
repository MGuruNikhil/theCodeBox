import React from 'react'
import CreateBlog from './pages/CreateBlog';
import Blogs from './pages/Blogs';
import ReadBlog from './pages/ReadBlog';
import EditBlog from './pages/EditBlog';
import DeleteBlog from './pages/DeleteBlog';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<div className='w-full h-full'>
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
		</div>
	)
}

export default App;
