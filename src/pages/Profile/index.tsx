import { FormEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg';
import logoutImg from '../../assets/images/logout.svg';

import { Loading } from '../../components/Loading';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';
import { RoomList } from '../../components/RoomList';

type FirebaseRooms = Record<string, {
  authorId: string;
  title: string;
  endedAt: string;
}>

type RoomType = {
  id: string;
  authorId: string;
  title: string;
  endedAt: string;
}

export function Profile() {
  const { user,signOutGoogle } = useAuth()
  const history = useHistory()
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    if(!user) return;

    const roomRef = database.ref(`rooms`);

    roomRef.orderByChild('authorId').equalTo(user.id).on('value', room => {
      const databaseRoom = room.val();
     const firebaseRooms: FirebaseRooms = databaseRoom ?? {};
     
      const parsedRooms = Object.entries(firebaseRooms).map(([key, value]) => {
        return {
          id: key,
          authorId: value.authorId,
          endedAt: value.endedAt,
          title: value.title,
        }
      })

      setRooms(parsedRooms);
    });

    return () => {
      roomRef.off('value');
    }
  }, [rooms, user]);

  async function handleSignOut() {
    if (window.confirm('Tem certeza que você deseja deslogar?')) {
      signOutGoogle();
    }
  }


  return (
    <div id="page-profile">
      <header>
        <div className="content">
          <Link to={`/`}>
            <img src={logoImg} alt="Letmeask" />
          </Link>
          <div>
            <img src={user?.avatar} alt={user?.name} />
            <Button isOutlined onClick={handleSignOut}>sair de todas as salas</Button>
           </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{user?.name}</h1>
          { rooms.length > 0 && <span>{rooms.length} sala(s)</span> }
        </div>
        <div className="room-list">
          {rooms.map(room => {
            return (
              <RoomList
                id={room.id}
                title={room.title}
                authorId={room.authorId}
                endedAt={room.endedAt}
              >
               
                <button
                  type="button"
                  onClick={() => {}}
                >
                 {/*  <img src={deleteImg} alt="Remover pergunta" /> */}
                </button>
              </RoomList>
            );
          })}
        </div>
      </main>
    </div>
  );
}