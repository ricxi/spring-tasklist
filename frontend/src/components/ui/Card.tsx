import React from 'react';

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function Card({ children, style }: CardProps) {
  return (
    <div className='card' style={style}>
      {children}
    </div>
  );
}

export default Card;
