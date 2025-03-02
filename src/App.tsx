import { Container } from '@mui/material';
import Login from './landing/login';
import { Route, Routes } from 'react-router-dom';
import Chat from './landing/chat';
import SignIn from './landing/signIn';
function App() {
  return (
    <Container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifySelf: 'center',
        height: '100vh',
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Container>
  );
}

export default App;
