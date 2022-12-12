import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import AgoraRTC from "agora-rtc-sdk-ng";

const IntractiveLive = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [tokenInp, setTokenInp] = useState("");
  const [channelInp, setChannelInp] = useState("");
  let appId = "b1010079b6b941c48ef2897e61cd4277";

  ///// create client
  const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  client.init(appId, () => {
    client.join(
      tokenInp,
      channelInp,
      null,
      (uid) => {
        console.log("join success", uid);
      },
      (e) => {
        console.log("join failed", e);
      }
    );
  });

  //create audio vedio stram
  const localStream = AgoraRTC.createStream({ audio: true, video: true });
  localStream.init(
    () => {
      console.log("init stream success");
      localStream.play("DOM_ELEMENT_ID", { muted: true });
    },
    (e) => {
      console.log("init local stream failed", e);
    }
  );
  return (
    <div>
      {videoCall ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setChannelInp(e.target.value)}
            placeholder="channel name"
          />
          <br />
          <br />
          <input
            type="text"
            onChange={(e) => setTokenInp(e.target.value)}
            placeholder="toekn"
          />
          <br />
          <br />
          <button onClick={() => setVideoCall(true)}>Start Call</button>
        </>
      )}
    </div>
  );
};

export default IntractiveLive;
