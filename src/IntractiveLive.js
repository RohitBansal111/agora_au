import React, { useState, useEffect } from "react";
import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";
import AgoraRTC from "agora-rtc-sdk-ng";
const IntractiveLive = ({ appId, channele, token }) => {
  const [videocall, setVideocall] = useState(false);
  const [isHost, setHost] = useState(false);
  const [isPinned, setPinned] = useState(false);
  const [tokenInp, setTokenInp] = useState("");
  const [channelInp, setChannelInp] = useState("");
  const props = {
    rtcProps: {
      appId: appId,
      channel: channele,
      role: isHost ? "host" : "audience",
      token: token,
    },
    callbacks: {
      EndCall: () => setVideocall(false),
    },
    styleProps: {
      localBtnContainer: { backgroundColor: "blueviolet" },
    },
  };

  const handleCliendData = async () => {
    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

    try {
  
      const uid = await client.join(appId, channele, token, uid);
      await client.login({uid, token})
      console.log("join success");
    } catch (e) {
      console.log("join failed", e);
    }
  };
  useEffect( () => {
    if (videocall) {
      handleCliendData();
    }
  }, [isHost,videocall]);
  return (
    <div style={styles.container}>
      {videocall ? (
        <>
          <div style={styles.nav}>
            <p style={{ fontSize: 20, width: 200 }}>
              You're {isHost ? "a host" : "an audience"}
            </p>
            <p style={styles.btn} onClick={() => setHost(!isHost)}>
              Change Role
            </p>
          </div>
          <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <AgoraUIKit
              rtcProps={props.rtcProps}
              callbacks={props.callbacks}
              styleProps={props.styleProps}
            />
          </div>
        </>
      ) : (
        <>
          {/* <input
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
          /> */}
          <br />
          <br />
          <h3 style={styles.btn} onClick={() => setVideocall(true)}>
            Start Call
          </h3>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center", marginBottom: 0 },
  videoContainer: { display: "flex", flexDirection: "column", flex: 1 },
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: 5,
    color: "#ffffff",
    fontSize: 20,
  },
};

export default IntractiveLive;
