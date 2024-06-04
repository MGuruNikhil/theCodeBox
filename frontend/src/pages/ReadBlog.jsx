import React, { useEffect, useState } from 'react'
import PrimarySearchAppBar from '../MUIComponents.jsx/PrimarySearchAppBar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';
import { CircularProgress } from '@mui/material';

const ReadBlog = () => {

	const params = useParams();
	const id = params.id;
	const [blog, setBlog] = useState({});
	const [isLoading, setIsLoaing] = useState(false);

	useEffect(() => {
		setIsLoaing(true);
		axios.get(apiUrl+"blogs/"+id)
		.then((res) => {
			setBlog(res.data);
			setIsLoaing(false);
		})
		.catch((error) => {
			console.log(error);
			setIsLoaing(false);
		});
	},[])

	return (
		<div className='w-full h-full'>
			<PrimarySearchAppBar />
			<div className='w-[80%] m-auto flex items-center justify-center'>
				{isLoading ? <CircularProgress /> :
					<div className='w-full h-full flex flex-col gap-2'>
						<p className='text-3xl font-black'>{blog.title}</p>
						<p>{blog.body}</p>
						<p>Written by {blog.author}</p>
					</div>
				}
			</div>
		</div>
	)
}

export default ReadBlog
