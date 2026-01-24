import React from 'react';
import DocsGPTChat from '@site/src/components/DocsGPTChat';

export default function Root({children}) {
  return (
    <>
      {children}
      <DocsGPTChat />
    </>
  );
}
