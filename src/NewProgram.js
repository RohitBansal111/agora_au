import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  createScreenVideoTrack,
} from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng"
const config = {
  mode: "live",
  codec: "vp8",
};

const appId = "b1010079b6b941c48ef2897e61cd4277";
const token =
  "007eJxTYMhn+eSXbD07fa3gNLHSDKlDJZqydqFR61XVGPbLNbtqLFFgSDI0MDQwMLdMMkuyNDFMNrFITTOysDRPNTNMTjExMjeXOjMtuSGQkWHlvXeMjAwQCOJzMpSkFpckZ6QmZzMwAACQbB3E";

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">Agora Testing</h1>
      {inCall ? (
        <>
          <VideoCall setInCall={setInCall} channelName={channelName} />
          {/* <ScreenShare setInCall={setInCall} channelName={channelName} /> */}
        </>
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useScreenVideoTrack = createScreenVideoTrack(config);

// const localStream = AgoraRTC.createStream({audio: true, video: true});

const VideoCall = (props) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState(IAgoraRTCRemoteUser);
  const [start, setStart] = useState(false);
  const client = useClient();
  //const client2 = useClient2();

  //const screenTracks = useScreenVideoTrack();

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
     //await client.setChannelProfile(1)
       //await  client.setClientRole('host') ;
       await  client.setClientRole('audience') ;
      
       
    //   await client.publish();
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success", client);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

       await client.join(appId, name, token, null);
       
       
        //if (tracks) await client.publish([tracks[0], tracks[1]]);
       setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="App">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props) => {
  const { users = [], tracks } = props;
  console.log("props", props);
  return (
    <div>
      <div style={{ height: "500px", width: "500px" }} id="videos">
        <AgoraVideoPlayer
          style={{ height: "95%", width: "95%" }}
          className="vid"
          videoTrack={tracks[1]}
        />

        {/* {users.length > 0 &&
          users.map((user) => {
            console.log("user", user);
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "95%", width: "95%" }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}*/}
      </div>
    </div>
  );
};

export const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      
     //const df=  await localStream.setAudioVolume(0)
     
      //await client.muteRemoteAudioStream(706169829,true)
      //await client.muteLocalAudioStrea(true)
      //await client.muteAllRemoteAudioStreams(true)
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
     
     
     
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default App;
