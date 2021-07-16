import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Loading } from '../../../components/Loading';
import illustrationImg from '../../../assets/images/illustration.svg'
import logoImg from '../../../assets/images/logo.svg';

import { Button } from '../../../components/Button';
import { database } from '../../../services/firebase';
import { useAuth } from '../../../hooks/useAuth';

import './styles.scss';

export function NewRoom() {
  const { user,signInWithGoogle } = useAuth()
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
      authorAvatar: user?.avatar,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  function handleNavigateToProfile() {
    if (!user) {
      return;
    }
    history.push('/me');
  }

  if(!user){
    return <Loading/>
  }

  return (
    <div id="page-new">
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
                <div className="avatar">
                  <button className="profile" type="button"  onClick={() => handleNavigateToProfile()} >
                    <img src={user?.avatar} alt={user?.name} />
                  </button>
                  <span>{user?.name}</span>
                </div>
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