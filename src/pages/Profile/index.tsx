import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';
import { RoomProfileList } from '../../components/RoomProfileList';

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
            <img src={user?.avatar} alt={user?.name} referrerPolicy="no-referrer"/>
            <Button isOutlined onClick={handleSignOut}>sair de todas as salas</Button>
           </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{user?.name}</h1>
          { rooms.length > 0 ? (<span>{rooms.length} sala(s)</span>):
          (<span>Opps, você ainda não criou nenhuma sala</span>) }
        </div>
        <div className="room-list">
          {rooms.map(room => {
            return (
              <RoomProfileList
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
              </RoomProfileList>
            );
          })}
        </div>
      </main>
    </div>
  );
}