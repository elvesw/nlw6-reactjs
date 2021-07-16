import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../../assets/images/logo.svg';

import { database } from '../../../services/firebase';

import './styles.scss';
import { RoomOpenList } from '../../../components/RoomOpenList';

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

export function AllRoom() {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
   
    const roomRef = database.ref(`rooms`);

    roomRef.on('value', room => {
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
  }, [rooms]);


  return (
    <div id="page-profile">
      <header>
        <div className="content">
          <Link to={`/`}>
            <img src={logoImg} alt="Letmeask" />
          </Link>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Salas abertas e fechadas</h1>
          { rooms.length > 0 ? (<span>{rooms.length} sala(s)</span>):
          (<span>Opps, você ainda não criou nenhuma sala</span>) }
        </div>
        <div className="room-list">
          {rooms.map(room => {
            return (
              <RoomOpenList
                id={room.id}
                title={room.title}
                authorId={room.authorId}
                endedAt={room.endedAt}
              >
              </RoomOpenList>
            );
          })}
        </div>
      </main>
    </div>
  );
}