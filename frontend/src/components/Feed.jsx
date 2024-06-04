import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get(apiUrl+"blogs/")
            .then((res) => {
                console.log(res.data);
                if (Array.isArray(res.data)) {
                    setBlogs(res.data);
                } else {
                    console.error("API response is not an array");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className='flex flex-col overflow-auto items-center m-auto w-[80%] h-full p-2'>
            {isLoading ? <CircularProgress /> : 
                <> 
                    {blogs.length > 0 ? blogs.map((blog, index) => (
                        <div key={index} onClick={() => {navigate('/read/'+blog._id)}} className='w-full flex flex-col px-4 py-2 bg-[#69b3e3] rounded-xl cursor-pointer'>
                            <h1>{blog.title}</h1>
                            <p>{blog.body.substring(0, 100)}...</p>
                            <span className='self-end'>- {blog.author}</span>
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
