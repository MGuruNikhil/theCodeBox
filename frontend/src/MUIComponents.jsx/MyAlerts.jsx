import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertContext } from '../context/alertContext';

export default function MyAlert() {

    const { isAlertOpen ,setIsAlertOpen, alertDetaile } = React.useContext(AlertContext);


    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={isAlertOpen}>
                <Alert
                    severity={alertDetaile.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{
                        position: 'fixed',
                        bottom: '10px',
                        left: '10px',
                        zIndex: "50"
                    }}
                >
                    {alertDetaile.text}
                </Alert>
            </Collapse>
        </Box>
    );
}
