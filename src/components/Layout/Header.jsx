import React, { useContext } from 'react';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';

export const Header = () => {
    const { auth } = useContext(Context);
    const [isUser] = useAuthState(auth);
    return (
        <header className='header'>
            <AppBar position='static'>
                <Toolbar>
                    <Grid container justify={'flex-end'}>
                        {isUser ? (
                            <Button
                                onClick={() => auth.signOut()}
                                variant={'outlined'}
                            >
                                Выйти
                            </Button>
                        ) : (
                            <NavLink to={LOGIN_ROUTE}>
                                <Button variant={'outlined'}>Войти</Button>
                            </NavLink>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </header>
    );
};
