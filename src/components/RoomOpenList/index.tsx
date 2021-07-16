import { ReactNode } from 'react';
import answerEyeImg from '../../assets/images/answer-eye.svg';
import answerCloseImg from '../../assets/images/answer-close.svg';

import './styles.scss';
import { Link } from 'react-router-dom';

type RoomProps = {
  id: string;
  authorId: string;
  title: string;
  endedAt?: string;
  children?: ReactNode;
}

export function RoomOpenList({
  id,
  authorId,
  title = '',
  endedAt = '',
  children
}: RoomProps) {

  return (
    <div className='room-open'>
      <Link to={`/rooms/${id}`}>
        <button className="btn-open-room">
            {!endedAt ?
            ( <img src={answerEyeImg} alt="Sala de perguntas" /> )
             :
            ( <img src={answerCloseImg} alt="Sala de perguntas" /> )
          }
          {title}
        </button>
      </Link>
    </div>
  );
}