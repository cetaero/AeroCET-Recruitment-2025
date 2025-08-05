
import React from 'react';

const spinnerStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  border: '8px solid #f3f3f3',
  borderTop: '8px solid rgb(10, 49, 74)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const containerStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1c002a',
  color: 'white',
};

const Loading = () => {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loading;
