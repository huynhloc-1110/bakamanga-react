import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import * as rbs from "react-bootstrap";
import { postFollow } from "../../service/api.follow";

export default function TestMessage() {
  const [connection, setConnection] = useState(null);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7036/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("SignalR connection established"))
      .catch((e) => console.error("SignalR connection failed:", e));

    newConnection.on("ReceiveMessage", (user, message) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        `${user} says ${message}`,
      ]);
    });

    return () => {
      newConnection.off("ReceivePing");
    };
  }, []);

  const handleSendMessage = async () => {
    if (connection) {
      // Play the SendPing function in asp.net
      await connection.invoke("SendMessage", user, message);
      setMessage("");
    }
  };

  return (
    <rbs.Form onSubmit={(e) => e.preventDefault()}>
      <rbs.FormGroup as={rbs.Row}>
        <rbs.FormLabel>User</rbs.FormLabel>
        <rbs.Col>
          <rbs.FormControl
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
          />
        </rbs.Col>
      </rbs.FormGroup>
      <rbs.FormGroup as={rbs.Row}>
        <rbs.FormLabel>Message</rbs.FormLabel>
        <rbs.Col sm="11">
          <rbs.FormControl
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
        </rbs.Col>
        <rbs.Col>
          <rbs.Button onClick={handleSendMessage} variant="dark">
            Send
          </rbs.Button>
        </rbs.Col>
      </rbs.FormGroup>
      <ul>
        {receivedMessages.map((receivedMessage, index) => (
          <li key={index}>{receivedMessage}</li>
        ))}
      </ul>
      <button
        onClick={async () => {
          await postFollow("90b905eb-4016-41fa-aaae-041fef0938a9");
        }}
      >
        click here
      </button>
    </rbs.Form>
  );
}
