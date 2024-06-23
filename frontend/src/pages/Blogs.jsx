import React from 'react'
import PrimarySearchAppBar from '../MUIComponents.jsx/PrimarySearchAppBar';
import Feed from '../components/Feed';

const Blogs = () => {

	return (
		<div className='w-full h-full overflow-hidden'>
			<PrimarySearchAppBar />
			<Feed />
		</div>
	)
}

export default Blogs;
