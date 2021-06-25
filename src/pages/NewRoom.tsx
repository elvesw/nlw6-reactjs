import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Loading } from '../components/Loading';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import logoutImg from '../assets/images/logout.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function NewRoom() {
  const { user,signInWithGoogle,signOutGoogle } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    if (!user) {
      await signInWithGoogle();
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  if(!user){
    return <Loading/>
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
        <div className="logo-content">
            <img src={logoImg} alt="Letmeask" />
            {user?.id && (
              <>
                <div className="avatar">
                  <img src={user?.avatar} alt={user?.name} />
                  <span>{user?.name}</span>
                </div>
              
                <button className="logout" type="button"  onClick={() => signOutGoogle()} >
                  <img  src={logoutImg} alt="Sair" />
                </button>
              </>
            )}
          </div>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}