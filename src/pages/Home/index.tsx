import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import listImg from '../../assets/images/list.svg';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  function handleNavigateToProfile() {
    if (!user) {
      return;
    }
    history.push('/me');
  }

  return (
    <div id="page-home">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
      <div className="link-content">
        <Link to={`/rooms/all`}>
          <img src={listImg} alt="Salas abertas" />
        </Link>
      </div>
        <div className="main-content">
          <div className="logo-content">
            <img src={logoImg} alt="Letmeask" />
            {user?.id && (
              <div className="avatar">
                <button className="profile" type="button"  onClick={() => handleNavigateToProfile()} >
                  <img src={user?.avatar} alt={user?.name} referrerPolicy="no-referrer"/>
                </button>
              </div>
            )}
          </div>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}