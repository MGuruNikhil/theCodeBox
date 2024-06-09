import React, { useState } from 'react'
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-around rounded-xl bg-white text-gray-600 p-5 gap-5'>
                <p className='font-bold text-3xl'>Register</p>
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
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
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
                <Button type='submit' variant="contained">Register</Button>
                <div className='flex items-center justify-center gap-2'>
                <span className='flex-shrink-0 inline-block whitespace-no-wrap'>already have an account ?</span>
                <Link className='flex-shrink-0 inline-block whitespace-no-wrap font-medium text-[#646cff] no-underline hover:text-[#535bf2]' to="/login">Log In</Link>
            </div>
            </form>
        </div>
    )
}

export default Register
