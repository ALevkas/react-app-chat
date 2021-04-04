import { Button, Container, Grid, TextField, Avatar } from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../../index';
import Loader from '../Shared/Loader';
import firebase from 'firebase';

export const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );

    const refMessages = useRef(null);

    const [value, setValue] = useState('');

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setValue('');
    };

    useEffect(() => {
        if (refMessages.current) {
            refMessages.current.scrollTop = refMessages.current.scrollHeight;
        }
    }, [messages]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 84, marginTop: 20 }}
                justify={'center'}
            >
                <div
                    ref={refMessages}
                    style={{
                        width: '80%',
                        height: '70vh',
                        background: '#fff',
                        border: '1px solid gray',
                        overflowY: 'auto',
                        borderRadius: '6px',
                        scrollTop: '999',
                        padding: '25px',
                    }}
                >
                    {messages.map((message) => (
                        <div
                            style={{
                                margin: 10,
                                marginLeft:
                                    user.uid === message.uid
                                        ? 'calc(80% - 60px)'
                                        : '10px',
                                width: 'fit-content',
                                padding: 5,
                            }}
                        >
                            <Grid container>
                                <div
                                    style={{
                                        display: 'flex',
                                        direction: 'row',
                                        gap: 10,
                                    }}
                                >
                                    <Avatar src={message.photoURL} />
                                    <Grid container direction={'column'}>
                                        <div
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'rgb(25, 118, 210)',
                                            }}
                                        >
                                            {message.displayName}
                                        </div>{' '}
                                        <div>{message.text}</div>
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    ))}
                </div>
                <Grid
                    container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{ width: '80%' }}
                >
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        rowsMax={2}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                        style={{ background: '#fff' }}
                    />
                    <Button
                        onClick={sendMessage}
                        variant={'outlined'}
                        style={{ background: '#3F51B5', marginTop: 10 }}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
