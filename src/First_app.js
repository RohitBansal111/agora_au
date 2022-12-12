import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import AgoraRTC from "agora-rtc-sdk-ng";
const FirstApp = ({ appId, token, channele }) => {
  const [videoCall, setVideoCall] = useState(false);
  const [role, setRole] = useState("audience");
  let checktoken = (Math.random() * 1000000).toFixed(0);
  const rtcProps = {
    appId: appId,
    channel: channele, // your agora channel
    token: token,
    role: role,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  const handelCheck = async () => {
    try {
      const uid = await client.join(appId, channele, token);
      rtcProps.uid = uid;
      console.log("join success", uid);
      await client.logIn({ uid, token });
    } catch (e) {
      console.log("join failed", e);
    }
  };
  useEffect(() => {
    if (videoCall) {
      handelCheck();
    }
  }, [role]);
  return (
    <div>
      <button
        onClick={() => {
          if (role == "audience") {
            setRole("host");
          } else {
            setRole("audience");
          }
        }}
      >
        Change Role{" "}
      </button>
      <h2>you are {role}</h2>
      {videoCall ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) : (
        <>
          <br />
          <br />
          <button onClick={() => setVideoCall(true)}>Start Call</button>
        </>
      )}
    </div>
  );
};

export default FirstApp;
