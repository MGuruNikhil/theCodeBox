import React from 'react'
import CreateBlog from './pages/CreateBlog';
import Blogs from './pages/Blogs';
import ReadBlog from './pages/ReadBlog';
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
      		<CssBaseline />
			<div className='w-full h-full'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Blogs />} />
						<Route path='/create' element={<CreateBlog />} />
						<Route path='/read/:id' element={ <ReadBlog />} />
						<Route path='/*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	)
}

export default App;
