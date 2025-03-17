import AgoraRTC from "agora-rtc-sdk-ng";

function AgoraRTCClient () {
    // RTC client instance
    let client = null;
    // Declare variables for the local tracks
    let localAudioTrack = null;
    let localVideoTrack = null;
    // Connection parameters
    let appId = "0bd5051c48e94ca799ad873e186a761e";
    let channel = "teste";
    let token =
      "007eJxTYLD8maG6M/f/tmePZgprJp2cxabiJSwavUxfaElwali5wTEFBoOkFFMDU8NkE4tUS5PkRHNLy8QUC3PjVEMLs0RzM8PUufOvpjcEMjJ8t0piZWSAQBCflaEktbgklYEBAAiHHro=";
    let uid = 0; // User ID
    // Initialize the AgoraRTC client
    function initializeClient() {
      client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setupEventListeners();
      console.log("Client initialized");
    }
    // Handle client events
    function setupEventListeners() {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          displayRemoteVideo(user);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });
      client.on("user-unpublished", (user) => {
        const remotePlayerContainer = document.getElementById(user.uid);
        remotePlayerContainer && remotePlayerContainer.remove();
      });
    }
    // Join a channel and publish local media
    async function joinChannel() {
      await client.join(appId, channel, token, uid);
      await createLocalTracks();
      await publishLocalTracks();
      displayLocalVideo();
      console.log("Publish success!");
    }
    // Create local audio and video tracks
    async function createLocalTracks() {
      localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    }
    // Publish local audio and video tracks
    async function publishLocalTracks() {
      await client.publish([localAudioTrack, localVideoTrack]);
    }
    // Display local video
    function displayLocalVideo() {
      const localPlayerContainer = document.createElement("div");
      localPlayerContainer.id = uid;
      localPlayerContainer.textContent = `Local user ${uid}`;
      localPlayerContainer.style.width = "640px";
      localPlayerContainer.style.height = "480px";
      document.body.append(localPlayerContainer);
      localVideoTrack.play(localPlayerContainer);
    }
    // Display remote video
    function displayRemoteVideo(user) {
      const remoteVideoTrack = user.videoTrack;
      const remotePlayerContainer = document.createElement("div");
      remotePlayerContainer.id = user.uid.toString();
      remotePlayerContainer.textContent = `Remote user ${user.uid}`;
      remotePlayerContainer.style.width = "640px";
      remotePlayerContainer.style.height = "480px";
      document.body.append(remotePlayerContainer);
      remoteVideoTrack.play(remotePlayerContainer);
    }
    // Leave the channel and clean up
    async function leaveChannel() {
      // Close local tracks
      localAudioTrack.close();
      localVideoTrack.close();
      // Remove local video container
      const localPlayerContainer = document.getElementById(uid);
      localPlayerContainer && localPlayerContainer.remove();
      // Remove all remote video containers
      client.remoteUsers.forEach((user) => {
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
      });
      // Leave the channel
      await client.leave();
    }
    // Set up button click handlers
    function setupButtonHandlers() {
      document.getElementById("join").onclick = joinChannel;
      document.getElementById("leave").onclick = leaveChannel;
    }
    // Start the basic call
    function startBasicCall() {
      initializeClient();
      window.onload = setupButtonHandlers;
    }
    startBasicCall();
  }

export default AgoraRTCClient;