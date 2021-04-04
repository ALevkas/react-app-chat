import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: 'AIzaSyDT2yqH4-2-YvslIAp5sVAqmo7gFAucdM0',
    authDomain: 'react-chat-2c86f.firebaseapp.com',
    projectId: 'react-chat-2c86f',
    storageBucket: 'react-chat-2c86f.appspot.com',
    messagingSenderId: '106764172728',
    appId: '1:106764172728:web:19e6fb83577fef0f12234d',
    measurementId: 'G-2FBFFTWXLQ',
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
    <Context.Provider
        value={{
            firebase,
            auth,
            firestore,
        }}
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>,
    document.getElementById('root')
);
