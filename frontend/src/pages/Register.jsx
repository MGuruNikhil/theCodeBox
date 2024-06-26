import React, { useContext, useState } from 'react'
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import { apiUrl } from '../config'
import { AlertContext } from '../context/alertContext'

const Register = (props) => {

    const [showPassword, setShowPassword] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { setIsAlertOpen, setAlertDetails } = useContext(AlertContext);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (password == confirmPassword) {
            axios.post(apiUrl + "auth/register", {
                username: email,
                password,
                displayName
            }).then((res) => {
                console.log(res.data);
                localStorage.clear();
                setIsLoading(false);
                setIsAlertOpen(true);
                setAlertDetails(prev => ({
                    ...prev,
                    severity: "success",
                    text: "User Created Successfully, Log In to continue as authenticated user."
                }));
                props.setValue(1);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
            setIsAlertOpen(true);
            setAlertDetails(prev => ({
                ...prev,
                severity: "error",
                text: "Password field and confirm password field must be equal."
            }));
            setPassword("");
            setConfirmPassword("");
        }
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-around p-5 gap-5'>
                <p className='font-bold text-3xl'>Register</p>
                <TextField
                    required
                    id="filled-required"
                    label="Display Name"
                    variant="filled"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
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
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Register
                    </LoadingButton> :
                    <Button type='submit' variant="contained">
                        Register
                    </Button>
                }

                <div className='flex items-center justify-center gap-2'>
                    <span className='flex-shrink-0 inline-block whitespace-no-wrap'>already have an account ?</span>
                    <a onClick={() => props.setValue(1)} className='flex-shrink-0 inline-block whitespace-no-wrap font-medium text-[#646cff] no-underline hover:text-[#535bf2] cursor-pointer'>Log In</a>
                </div>
            </form>
        </div>
    )
}

export default Register
