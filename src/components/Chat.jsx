import React from 'react';
import Messages from  './Messages'
import Input from './Input'
import {BiVideo} from 'react-icons/bi';
import {FiUserPlus} from 'react-icons/fi'
import {BsThreeDots} from 'react-icons/bs';
function Chat() {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Jane</span>
        <div className="chatIcons">
          <span className="iconss"><BiVideo/></span>
          <span className="iconss"><FiUserPlus/></span>
          <span className="iconss"><BsThreeDots/></span>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat