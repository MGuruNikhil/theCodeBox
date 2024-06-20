import React from 'react'
import PrimarySearchAppBar from '../MUIComponents.jsx/PrimarySearchAppBar';
import Feed from '../components/Feed';
import axios from 'axios';
import { apiUrl } from '../config';

const Blogs = () => {

	const hc = () => {
		axios.get(apiUrl+"auth/user")
		.then((res) => {
			console.log(res.data.user);
			setCurrentUser(res.data.user);
		})
		.catch((error) => {
			console.log(error.message);
		});
	}

	return (
		<div className='w-full h-full'>
			<PrimarySearchAppBar />
			<button onClick={hc}>get</button>
			<Feed />
		</div>
	)
}

export default Blogs;
