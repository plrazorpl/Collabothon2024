import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import './widget.css';

function MyWidget() {
    return (
    <div className="widget-root" style={{ marginTop: '160px' }}>

        <h2>BOTTINA WIDGET</h2>
            <div className="yellow-rectangle">
                <Grid container sx={{ height: 400, width: 1200 }}>

                    {/* Left Section */}
                    <Grid item xs={4}>
                        <div className="bottina-background">
                            <p>Bottina here</p>
                        </div>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={8}>
                        <Grid container direction="column" sx={{ height: '100%' }}>

                            {/* First Row */}
                            <Grid item container sx={{ height: 250 }}>
                                <div className="bottina-input">
                                    <p>Bottina input here</p>
                                </div>
                            </Grid>

                            {/* Second Row */}
                            <Grid
                                item
                                container
                                sx={{ height: 150 }}
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <div style={{ display: 'flex', gap: '16px', marginRight: '30px', marginTop: '30px' }}>
                                    {/* Mic Button */}
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: '560px',
                                            height: '60px',
                                            backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                            borderRadius: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '&:hover': {
                                                backgroundColor: 'darkgrey',
                                            },
                                            '&:focus': {
                                                outline: 'none',  // Removes the focus outline
                                                boxShadow: 'none', // Removes any box shadow on focus
                                            },
                                            '&:active': {
                                                outline: 'none',  // Removes the outline on active state
                                                boxShadow: 'none', // Removes any box shadow on active state
                                            },
                                        }}
                                    >
                                        <MicIcon />
                                    </Button>

                                    {/* Connect Button */}
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: '160px',
                                            height: '60px',
                                            backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                            borderRadius: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '&:hover': {
                                                backgroundColor: 'darkgrey',
                                            },
                                            '&:focus': {
                                                outline: 'none',  // Removes the focus outline
                                                boxShadow: 'none', // Removes any box shadow on focus
                                            },
                                            '&:active': {
                                                outline: 'none',  // Removes the outline on active state
                                                boxShadow: 'none', // Removes any box shadow on active state
                                            },
                                        }}
                                    >
                                        connect
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MyWidget;