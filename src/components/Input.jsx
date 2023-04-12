import React,{useState} from "react";
import { MdAttachFile } from "react-icons/md";
import { FcPicture } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import InputEmoji from 'react-input-emoji'

function Input() {
  const [ text, setText ] = useState('')
  function handleOnEnter (text) {
    console.log('enter', text)
  }

  return (
    <div className="input">
       <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type Something..."
        />
      {/* <input type="text" placeholder="Type Something..." /> */}
      <div className="send">
        <span className="icons" style={{ fontSize: "20px", cursor: "pointer" }}>
          <MdAttachFile />
        </span>
       
        <input type="file" style={{ display: "none" }} id="files" />
        <label htmlFor="files" style={{ fontSize: "20px", cursor: "pointer" }}>
          {<FcPicture />}
        </label>
        <button style={{ border: "none", fontSize: "20px", cursor: "pointer" }}>
          {<BiSend />}
        </button>
      </div>
    </div>
  );
}

export default Input;
