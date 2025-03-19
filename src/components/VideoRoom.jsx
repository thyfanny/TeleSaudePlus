import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID= '0bd5051c48e94ca799ad873e186a761e';
const TOKEN= '0060bd5051c48e94ca799ad873e186a761eIABIAyt2OT1FBbyqFNiBEMfEJz5uaQN327jXShwQ4TSMHQ9JtOYh39v0IgCmZUu5CHPbZwQAAQCYL9pnAgCYL9pnAwCYL9pnBACYL9pn';
const CHANNEL= 'teste';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
  });
  
  export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
  
    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
  
      if (mediaType === 'video') {
        setUsers((previousUsers) => [...previousUsers, user]);
      }
  
      if (mediaType === 'audio') {
        user.audioTrack.play()
      }
    };
  
    const handleUserLeft = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      );
    };
  
    useEffect(() => {
      client.on('user-published', handleUserJoined);
      client.on('user-left', handleUserLeft);
  
      client
        .join(APP_ID, CHANNEL, TOKEN, null)
        .then((uid) =>
          Promise.all([
            AgoraRTC.createMicrophoneAndCameraTracks(),
            uid,
          ])
        )
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setLocalTracks(tracks);
          setUsers((previousUsers) => [
            ...previousUsers,
            {
              uid,
              videoTrack,
              audioTrack,
            },
          ]);
          client.publish(tracks);
        });
  
      return () => {
        for (let localTrack of localTracks) {
          localTrack.stop();
          localTrack.close();
        }
        client.off('user-published', handleUserJoined);
        client.off('user-left', handleUserLeft);
        client.unpublish(localTracks).then(() => client.leave());
      };
    }, []);
  
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 200px)',
          }}
        >
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
      </div>
    );
  };