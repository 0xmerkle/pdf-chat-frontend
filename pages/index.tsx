import type { NextPage } from 'next';
import Head from 'next/head';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { uploadFile, sendMessage, getContextInfoFromDocuments } from '../api';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { userStore } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
const Home: NextPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const isAuthed = userStore((state) => state.isAuthed);
  const [authed, setAuthed] = useState<boolean>(false);
  const setMessages = userStore((state) => state.setMessages);

  const getContextInfo = async () => {
    const r = await getContextInfoFromDocuments();
    console.log('r.data', r.data);
    setMessages([{ from: 'chatbot', message: r.data.res, id: uuidv4() }]);
  };
  const handleCloseChat = () => setShowChat(false);
  const handleOpenChat = () => setShowChat(true);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const r = await uploadFile(file!);
      console.log(r.data);
      setData(r.data);
      if (r.data.status === 200) {
        setShowChat(true);
      }
      setLoading(false);
      setShowChat(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    setAuthed(isAuthed);
  }, [isAuthed]);
  return (
    <Layout home>
      <Head>
        <title>{'Chat PDF Light'}</title>
      </Head>
      {!showChat && (
        <>
          {!authed ? (
            <p>Authenticate before using</p>
          ) : (
            <button onClick={handleOpenChat} className={styles['back-to-chat-button']}>
              Go to Chat
            </button>
          )}
          <section className={utilStyles.headingMd}>
            <p>Upload PDF</p>
            <form>
              <input
                className={styles.uploadButton}
                type="file"
                disabled={!authed}
                onChange={handleFileChange}
                formEncType="multipart/form-data"
              />
            </form>
          </section>
          <GoogleSignIn />
        </>
      )}
      {loading && <div className={styles['spinner']}></div>}
      {showChat && (
        <>
          {' '}
          <div className={styles['util-button-container']}>
            <button onClick={handleCloseChat} className={styles['close-chat-button']}>
              Close Chat
            </button>
            <button onClick={getContextInfo} className={styles['context-button']}>
              What is the context?
            </button>
          </div>
          <Chat />{' '}
        </>
      )}
    </Layout>
  );
};

export default Home;

export type UserMessage = {
  from: string;
  message: string;
  id: string;
};
const Chat = () => {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [message, setMessage] = useState<UserMessage>({
    from: 'user',
    message: '',
    id: uuidv4(),
  });
  const chatMessages = userStore((state) => state.messages);
  const setChatMessages = userStore((state) => state.setMessages);
  const [loading, setLoading] = useState<boolean>(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    setChatMessages([...messages, message]);
    setMessage({ from: 'user', message: '', id: uuidv4() });
    setLoading(true);
    let tmpMessage = message;
    const r = await sendMessage(message.message);
    setLoading(false);
    console.log(r.data.res);
    const aiMessage = { from: 'chatbot', message: r.data.res, id: uuidv4() };
    setChatMessages([...messages, tmpMessage, aiMessage]);
  };

  return (
    <div>
      <div className={styles['chatbox-container']}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={
              message.from.startsWith('user')
                ? styles['user-message-container']
                : styles['message-container']
            }
          >
            {message.message}
          </div>
        ))}
        {loading && <div className={styles['spinner']}></div>}
        <div className={styles['message-input']}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={message.message}
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) =>
              setMessage({ from: 'user', message: event.target.value, id: uuidv4() })
            }
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      </div>
    </div>
  );
};
const GoogleSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const setAuthedUser = userStore((state) => state.setUser);
  const isAuthed = userStore((state) => state.isAuthed);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      setAuthedUser(result.user);

      setError(null);
    } catch (error) {
      console.error(error);
      setError('error');
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {isAuthed ? (
        <div>Authenticated</div>
      ) : (
        <button onClick={handleLogin} className={styles['sign-in-google-button']}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};
