import { Box } from '@mui/material';
import { JSX, useEffect, useRef } from 'react';

export type MessageInterface = {
  _id: string;
  sender: string;
  user: string;
  receiver: string;
  message: string;
};

const ChatMessage = (props: { messages: MessageInterface[] }): JSX.Element => {
  const { messages } = props;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {messages.map((message: MessageInterface) => {
        return <Message message={message} key={message._id} />;
      })}
    </Box>
  );
};

const Message = (props: { message: MessageInterface }) => {
  const { message } = props;
  return (
    <Box
      sx={{
        display: 'inline-block',
        bgcolor: message.sender == 'user' ? '#FBFFE4' : '#A3D1C6',
        borderRadius: 2,
        padding: 2,
        margin: 1,
        maxWidth: '60%',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        alignSelf: message.sender == 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      {message.sender == 'user' ? message.message : message.message}
    </Box>
  );
};

export default ChatMessage;
