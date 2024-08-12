import React, { useState } from 'react'
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import { apiUrl } from '../config'

const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        axios.post(apiUrl + "auth/login", {
            username: email,
            password,
        }).then((res) => {
            localStorage.setItem("token", res.data.token);
            setIsLoading(false);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    };
    

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-around gap-5'>
                <p className='font-bold text-3xl'>Log In</p>
                <TextField
                    required
                    id="filled-required"
                    label="Email"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                {isLoading ? 
                    <LoadingButton loading variant="outlined">
                        Log In
                    </LoadingButton> : 
                    <Button type='submit' variant="contained">
                        Log In
                    </Button>
                }
                
                <div className='flex items-center justify-center gap-2'>
                    <span className='flex-shrink-0 inline-block whitespace-no-wrap'>don't have an account ?</span>
                    <a onClick={() => props.setValue(0)} className='flex-shrink-0 inline-block whitespace-no-wrap font-medium text-[#646cff] no-underline hover:text-[#535bf2] cursor-pointer'>Register</a>
                </div>
            </form>
        </div>
    )
}

export default Login
