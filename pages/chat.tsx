import { NextPage } from 'next';
import Layout from '../components/layout';
import { useState } from 'react';

import styles from '../styles/Chat.module.css';
import axios from 'axios';

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<{ from: string; message: string }[]>([]);
  const [message, setMessage] = useState<{ from: string; message: string }>({
    from: 'user',
    message: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleMessageSend();
    }
  };
  const handleMessageSend = async () => {
    setMessages([...messages, message]);
    setMessage({ from: 'user', message: '' });
    setLoading(true);
    let tmpMessage = message;
    const r = await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL_DEV!}/chat_with_agent`,
      data: {
        query: message.message,
      },
    });
    setLoading(false);
    console.log(r.data.res);
    const aiMessage = { from: 'chatbot', message: r.data.res };
    setMessages([...messages, tmpMessage, aiMessage]);
  };
  return (
    <Layout home>
      <div className={styles['chatbox-container']}>
        {messages.map((message, index) => (
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
            onChange={(event) => setMessage({ from: 'user', message: event.target.value })}
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      </div>
    </Layout>
  );
};
export default Chat;
