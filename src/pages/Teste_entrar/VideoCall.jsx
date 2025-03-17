import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const VideoCall = ({ client }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            client.on('user-published', async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === 'video') {
                    const remoteVideoTrack = user.videoTrack;
                    remoteVideoTrack.play(remoteVideoRef.current);
                }
                if (mediaType === 'audio') {
                    const remoteAudioTrack = user.audioTrack;
                    remoteAudioTrack.play();
                }
            });

            client.on('user-unpublished', (user) => {
                const remoteVideoTrack = user.videoTrack;
                if (remoteVideoTrack) {
                    remoteVideoTrack.stop();
                }
            });

            const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
            localVideoTrack.play(localVideoRef.current);

            await client.join('YOUR_APP_ID', 'YOUR_CHANNEL_NAME', 'YOUR_TEMP_TOKEN', null);
            await client.publish([localAudioTrack, localVideoTrack]);
        };

        init();

        return () => {
            client.leave();
        };
    }, [client]);

    return (
        <div>
            <div ref={localVideoRef} style={{ width: '400px', height: '300px', backgroundColor: 'black' }}></div>
            <div ref={remoteVideoRef} style={{ width: '400px', height: '300px', backgroundColor: 'black' }}></div>
        </div>
    );
};

export default VideoCall;