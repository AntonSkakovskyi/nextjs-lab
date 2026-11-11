"use client";
import { useEffect, useState } from "react";

const ChatRoom = () => {
  const [roomId, setRoomId] = useState("general");

  useEffect(() => {
    console.log(`connect room <${roomId}>`)

    return () => {
      console.log(`disconnect room <${roomId}>`)
    }
  }, [roomId])

  console.log(`render room <${roomId}>`)
  
  return (
    <div>
      <p>
        Room Id is: <span>{roomId}</span>
      </p>
      <div>
        <button onClick={() => setRoomId('general')}>General</button>
        <button onClick={() => setRoomId('random')}>Random</button>
      </div>
    </div>
  );
};

export default ChatRoom;
