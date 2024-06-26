import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(apiUrl+"blogs")
            .then((res) => {
                console.log(res.data);
                setBlogs(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className='flex flex-col overflow-auto items-center m-auto w-[80%] h-full p-2 gap-2'>
            {isLoading ? <CircularProgress /> : 
                <> 
                    {blogs.length > 0 ? blogs.map((blog, index) => (
                        <div key={index} onClick={() => {navigate('/read/'+blog._id)}} className='w-full flex flex-col px-4 py-2 bg-[#69b3e3] rounded-xl cursor-pointer'>
                            <p className='font-bold text-2xl'>{blog.title}</p>
                            <p>{blog.body.substring(0, 100)}...</p>
                            <span className='self-end'>- {blog.authorDisplayName}</span>
                        </div>
                    )) : 
                        <>No blogs found</>
                    }
                </>
            }
        </div>
    );
}

export default Feed;
