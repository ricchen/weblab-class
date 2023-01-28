import React, { useState, useEffect } from "react";
import { Redirect } from "@reach/router";
import NavBar from "../modules/NavBar.js";

import { SlideOut } from "../modules/Transition.js";

import { post } from "../../utilities";

const Join = (props) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(null);
  // useEffect(() => {
  //   if (message == "Success") setOkJoin(true);
  // }, [message]);

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
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

  return (
    <>
      <SlideOut />
      <input type="text" placeholder="Room Code" value={value} onChange={handleChange} />
      <button type="submit" value="Create" onClick={handleCreate}>
        Create
      </button>
      <button type="submit" value="Join" onClick={handleJoin}>
        Join
      </button>
      {code == null ? null : <Redirect exact from="/join/" to={`/game/${code}`} />}
    </>
  );
};

export default Join;
