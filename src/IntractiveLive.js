import React, { useState } from "react";
import AgoraUIKit, { PropsInterface, layout } from "agora-react-uikit";

const IntractiveLive = () => {
  const [videocall, setVideocall] = useState(false);
  const [isHost, setHost] = useState(false);
  const [isPinned, setPinned] = useState(false);
  const [tokenInp, setTokenInp] = useState("");
  const [channelInp, setChannelInp] = useState("");
  const props = {
    rtcProps: {
      appId: "b1010079b6b941c48ef2897e61cd4277",
      channel: channelInp,
      role: isHost ? "host" : "audience",
      layout: isPinned ? layout.pin : layout.grid,
      token: tokenInp,
    },
    callbacks: {
      EndCall: () => setVideocall(false),
    },
    styleProps: {
      localBtnContainer: { backgroundColor: "blueviolet" },
    },
  };
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
            <p style={styles.btn} onClick={() => setPinned(!isPinned)}>
              Change Layout
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
