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
import AgoraRTC from "agora-rtc-sdk-ng";
const config = {
  mode: "live",
  codec: "vp8",
};

const appId = "b1010079b6b941c48ef2897e61cd4277";
const token =
  "007eJxTYMhn+eSXbD07fa3gNLHSDKlDJZqydqFR61XVGPbLNbtqLFFgSDI0MDQwMLdMMkuyNDFMNrFITTOysDRPNTNMTjExMjeXOjMtuSGQkWHlvXeMjAwQCOJzMpSkFpckZ6QmZzMwAACQbB3E";
const channele = "testcheck";
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useScreenVideoTrack = createScreenVideoTrack(config);

const NewCheckTest = () => {
  const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(async () => {
    try {
        await client.setClientRole("host");
      const localAudio = await AgoraRTC.createMicrophoneAudioTrack();
      const localVideo = await AgoraRTC.createCameraVideoTrack();
      const uid = await client.join(appId, channele, token, 0);
     
      await client.publish([localAudio, localVideo]);
      
      console.log("join success", uid);
    } catch (e) {
      console.log("join failed", e);
    }
  }, [client, ready, tracks]);
  return (
    <div>
      <div style={{ height: "500px", width: "500px" }} id="videos">
        <AgoraVideoPlayer
          style={{ height: "95%", width: "95%" }}
          className="vid"
          videoTrack={tracks[1]}
        />
      </div>
    </div>
  );
};

export default NewCheckTest;
