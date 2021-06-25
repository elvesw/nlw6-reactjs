import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type ProfileProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}

export function Profile({
  content,
  author,
  children,
}: ProfileProps) {
  return (
    <div 
      className={cx(
        'profile'
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}