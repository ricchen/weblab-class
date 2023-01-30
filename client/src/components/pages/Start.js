import React from "react";

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition";
import { SlideIn } from "../modules/Transition";
import { Link } from "react-router-dom";
import Button from "../modules/Button";

import "./Start.css";
import NavBar from "../modules/NavBar";
import SpecialButton from "../modules/SpecialButton";

import { post } from "../../utilities";

const Start = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  // const [value, setValue] = useState("");
  // const [code, setCode] = useState(null);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const handleCreate = async (event) => {
  //   const createRoom = (code) => {
  //     const body = { roomId: code };
  //     let valid = false;
  //     post("/api/createRoom", body)
  //       .then((log) => {
  //         if (log.msg == "Success") {
  //           console.log("TRUEE");
  //           valid = true;
  //         }
  //       })
  //       .then(() => {
  //         return valid;
  //       });
  //   };

  //   setValue("");
  //   return await createRoom(value);
  // };

  // const handleJoin = async (event) => {
  //   const joinRoom = (code) => {
  //     const body = { roomId: code };
  //     let valid = false;
  //     post("/api/joinRoom", body)
  //       .then((log) => {
  //         if (log.msg == "Success") {
  //           console.log("TRUEE");
  //           valid = true;
  //         }
  //       })
  //       .then(() => {
  //         console.log(valid);
  //         return valid;
  //       });
  //   };

  //   setValue("");
  //   return await joinRoom(value);
  // };

  return (
    <>
      <BrowserRouter>
        <div className="Start-container">
          <div className="Start-left-container"></div>
          <div className="Start-right-container">
            <input type="text" placeholder="NAME" className="Start-textbox"></input>
            <input
              type="text"
              placeholder="GAME CODE"
              className="Start-textbox"
              value={value}
            ></input>
            <SpecialButton
              url={`/game/`}
              name="JOIN LOBBY"
              className="Start-textbox Start-button"
              style={{ marginBottom: "3em", width: "80%" }}
            />
            <SpecialButton
              url={`/game/`}
              name="CREATE LOBBY"
              className="Start-textbox Start-button"
              style={{ width: "80%" }}
            />
          </div>
          <div className="Start-navbar"></div>
          <NavBar
            userId={props.userId}
            name1="profile"
            name2="achievements"
            url1="/profile/"
            url2="/achievements/"
          />
        </div>

        {isToggled && <SlideIn />}

        <SlideOut />
      </BrowserRouter>
    </>
  );
};

export default Start;

{
  /* <NavBar userId={props.userId} back="/" /> */
}
