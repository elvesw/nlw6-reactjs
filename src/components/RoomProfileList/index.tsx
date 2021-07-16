import { ReactNode } from 'react';
import settingsImg from '../../assets/images/settings.svg';
import answerCloseImg from '../../assets/images/answer-close.svg';
import answerEyeImg from '../../assets/images/answer-eye.svg';
import lockImg from '../../assets/images/lock.svg';
import unlockImg from '../../assets/images/unlock.svg';
import deleteImg from '../../assets/images/delete.svg';

import './styles.scss';
import { Link } from 'react-router-dom';
import { database } from '../../services/firebase';

type RoomProps = {
  id: string;
  authorId: string;
  title: string;
  endedAt?: string;
  children?: ReactNode;
}

export function RoomProfileList({
  id,
  authorId,
  title = '',
  endedAt = '',
  children
}: RoomProps) {

 

  async function handleDeleteRoom(roomId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta sala?')) {
      await database.ref(`rooms/${roomId}`).remove();
    }
  }

  async function handleEndRoom(roomId: string) {
    if(endedAt){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: null
      })
    }else{
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })
    }
  }


  return (
    <div className='room'>

      <footer>
        <div className="room-info">
          <span>{title}</span>
        </div>

        <div>
          <button type="submit" onClick={() => handleEndRoom(id)}>
              <img src={endedAt ? lockImg : unlockImg} alt="Status da sala" />
          </button>

          <Link to={`/admin/rooms/${id}`} target="_blank">
              <img src={settingsImg} alt="Sala admin" />
          </Link>

          {!endedAt ?
            ( <Link to={`/rooms/${id}`} target="_blank">
                <img src={answerEyeImg} alt="Sala de perguntas" />
              </Link> ):
            ( <img src={answerCloseImg} alt="Sala de perguntas" /> )
          }

            <button type="submit" onClick={() => handleDeleteRoom(id)}>
              <img src={deleteImg} alt="Remover sala" />
            </button>
        </div>
      </footer>
    </div>
  );
}