"use client";
import PageTop from "@/components/native/PageTop";

const socket = new WebSocket("ws://localhost:8000");

export default function Notifications() {
  socket.onmessage = ({ data }) => {
    console.log(data);
  };

  return (
    <>
      <PageTop title="Notifications" />
      <button
        onClick={() => {
          socket.send("Hello vai");
        }}
      >
        click
      </button>
    </>
  );
}
