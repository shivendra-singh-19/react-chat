import { v4 as uuid } from 'uuid';
import React, { JSX, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ChatMessage, { MessageInterface } from './chatMessages';
import { socket } from '../socket';

const Chat = (): JSX.Element => {
  const [conversation, setConversation] = useState<MessageInterface[]>([
    {
      _id: '1',
      sender: 'user',
      user: 'user',
      receiver: 'receiver',
      message: 'sender',
    },
    {
      _id: '2',
      sender: 'receiver',
      user: 'user',
      receiver: 'receiver',
      message: 'receiver',
    },
    {
      _id: '3',
      sender: 'receiver',
      user: 'user',
      receiver: 'receiver',
      message: 'receiver',
    },
  ]);
  const [text, setText] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to Socket.IO');
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Disconnected from Socket.IO');
      setIsConnected(false);
    };

    const handleNewMessage = (message: MessageInterface) => {
      setConversation((prev) => [message, ...prev]);
      setText('');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('message', handleNewMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message', handleNewMessage);
    };
  }, []);

  const handleSend = () => {
    if (!text.trim()) return; // Prevent sending empty messages

    const newMessage: MessageInterface = {
      _id: uuid(),
      sender: 'user',
      user: 'user',
      receiver: 'receiver',
      message: text,
    };

    socket.emit('message', newMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Box sx={styles.chatContainer}>
      <Box sx={styles.messageContainer}>
        <ChatMessage messages={conversation} />
      </Box>
      <Box sx={styles.inputContainer}>
        <TextField
          id="chat"
          variant="standard"
          placeholder="Type your message"
          sx={styles.inputField}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button sx={styles.sendButton} onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;

const styles = {
  chatContainer: {
    height: '50vh',
    width: '50vw',
    bgcolor: 'black',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 1,
  },
  messageContainer: {
    bgcolor: '#F1F0E9',
    height: '80%',
    padding: 2,
    borderRadius: '15px',
    overflowY: 'auto', // Ensure messages scroll properly
  },
  inputContainer: {
    marginTop: 'auto',
    display: 'flex',
  },
  inputField: {
    padding: 3,
    width: '50vw',
    height: '1.5vh',
    bgcolor: 'white',
    borderRadius: '15px 0 0 15px',
  },
  sendButton: {
    bgcolor: '#B3D8A8',
    color: 'black',
    borderRadius: '0 15px 15px 0',
  },
};
