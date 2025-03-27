import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className="video-player">
      <div ref={ref} style={{ width: '100%', height: '100%' }}></div>
      <div className="user-info">
        Participante: {user.uid}
      </div>
    </div>
  );
};