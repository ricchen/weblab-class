import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition";
import { SlideIn } from "../modules/Transition";
import { Redirect } from "@reach/router";
import "./Start.css";
import NavBar from "../modules/NavBar";
import { post } from "../../utilities";
import img from "../../public/tileset/referenceimage.png";

const Start = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  };

  const handleCreate = (event) => {
    const createRoom = (code) => {
      const body = { roomId: code };
      post("/api/createRoom", body).then((log) => {
        setMessage(log.msg);
        if (log.msg == "Success") {
          setCode(code);
        }
      });
    };

    event.preventDefault();
    createRoom(value);
    setValue("");
  };

  const handleJoin = (event) => {
    const joinRoom = (code) => {
      const body = { roomId: code };
      post("/api/joinRoom", body).then((log) => {
        setMessage(log.msg);
        if (log.msg == "Success") {
          setCode(code);
        }
      });
    };

    event.preventDefault();
    joinRoom(value);
    setValue("");
  };

  // if (isToggled == true && code != null) {
  // }

  return (
    <>
      <BrowserRouter>
        <div className="Start-container">
          <div className="Start-left-container">
            <div className="Start-panel">
              <div className="Start-text">conquer the maize!</div>
            </div>
            <div className="Start-panel">
              <img src={img} className="Start-image" />
            </div>
          </div>
          <div className="Start-right-container">
            <input
              type="text"
              placeholder="ROOM CODE"
              value={value}
              onChange={handleChange}
              className="Start-textbox"
            ></input>
            <button
              type="submit"
              value="Join"
              onClick={handleJoin}
              className="Start-button"
              style={{ width: "80%", marginBottom: "3em" }}
            >
              join lobby
            </button>
            <button
              type="submit"
              value="Create"
              onClick={handleCreate}
              className="Start-button"
              style={{ width: "80%" }}
            >
              create lobby
            </button>
            <div className="Start-text Start-error">{message}</div>
          </div>
          <div className="Start-navbar"></div>
          <NavBar
            userId={props.userId}
            name1="profile"
            name2="tutorial"
            url1="/profile/"
            url2="/tutorial/"
          />
        </div>

        {isToggled && <SlideIn />}
        {code == null ? null : <Redirect exact from="/start/" to={`/lobby/${code}`} />}

        <SlideOut />
      </BrowserRouter>
    </>
  );
};

export default Start;

{
  /* <NavBar userId={props.userId} back="/" /> */
}
