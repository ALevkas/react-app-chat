import React from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';

const Loader = () => {
    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 64 }}
                alignItems={'center'}
                justify={'center'}
            >
                <Grid container alignItems={'center'} direction={'column'}>
                    <div class='lds-spinner'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;
