import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from './index';

import AppRouter from './components/Shared/AppRouter';
import Loader from './components/Shared/Loader';

function App() {
    const { auth } = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
