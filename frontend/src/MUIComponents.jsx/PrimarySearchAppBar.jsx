import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';
import BootstrapTooltip from './BootstrapTooltip';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Search, SearchIconWrapper, StyledInputBase } from './SearchComponents';
import Modal from '@mui/material/Modal';
import SignUpLoginTabs from './SignupLoginTabs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

export default function PrimarySearchAppBar() {

    const [currentUser, setCurrentUser] = React.useState(null);
    const token = localStorage.getItem("token");

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpenModel = () => setOpen(true);
    const handleCloseModel = () => setOpen(false);

    React.useEffect(() => {
        setCurrentUser(null);
        if (token) {
            axios.get(apiUrl + 'auth/user', {
                headers: {
                    Authorization: token,
                }
            }).then(res => {
                setCurrentUser(res.data.user);
            }).catch(error => {
                console.log(error.message);
            })
        }
        setIsLoading(false);
    }, []);

    const handleCreateBlog = () => {
        navigate('/create');
    }

    const handleShowProfile = () => {

    }

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleCreateBlog}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <EditNoteIcon />
                </IconButton>
                <p>Create Blog</p>
            </MenuItem>

            <MenuItem onClick={handleShowProfile}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            <MenuItem onClick={handleLogOut}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>Log Out</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Logo />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {currentUser ?
                            <div className='flex gap-2'>
                                <BootstrapTooltip title="Create Blog">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleCreateBlog}
                                        color="inherit"
                                    >
                                        <EditNoteIcon />
                                    </IconButton>
                                </BootstrapTooltip>
                                <BootstrapTooltip title="profile">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleShowProfile}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </BootstrapTooltip>
                                <BootstrapTooltip title="logout">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleLogOut}
                                        color="inherit"
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                </BootstrapTooltip>
                            </div> :
                            <BootstrapTooltip title="login">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleOpenModel}
                                    color="inherit"
                                >
                                    <LoginIcon />
                                </IconButton>
                            </BootstrapTooltip>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        {currentUser ?
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        :
                            <BootstrapTooltip title="login">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleOpenModel}
                                    color="inherit"
                                >
                                    <LoginIcon />
                                </IconButton>
                            </BootstrapTooltip>
                        }  
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            <Modal
                open={open}
                onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{zIndex: 49}}
            >
                <Box sx={style}>
                    <SignUpLoginTabs />
                </Box>
            </Modal>
        </Box>
    );
}
