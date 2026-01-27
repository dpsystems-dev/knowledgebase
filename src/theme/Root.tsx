import React from 'react';
import AskDermotChat from '@site/src/components/AskDermotChat';

export default function Root({children}) {
  return (
    <>
      {children}
      <AskDermotChat />
    </>
  );
}
