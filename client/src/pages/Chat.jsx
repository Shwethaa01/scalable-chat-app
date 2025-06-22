// gets all contacts and set a socketio connection with backend

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../socket";

import Contacts from "../components/Contacts";
import NoSelectedContact from "../components/NoSelectedContact";
import ChatContainer from "../components/ChatContainer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Chat() {
  const socketRef = useSocket();
  const token = localStorage.getItem("token");
  console.log("token. : " + token);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  const [isLoading, setIsLoading] = useState(false);

  const getContacts = async () => {
    // get all contact through api call
    const response = await axios.get("http://localhost:5000/api/contacts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setContacts(response.data);
    setIsLoading(false);
    console.log("loading : ", isLoading);
  };

  useEffect(() => {
    setIsLoading(true);
    getContacts();
  }, []);

  useEffect(() => {
    socketRef.current.connect();
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <Container>
      <div className="container">
        {isLoading ? (
          <div style={{ height: "100vh" }}>
            <Skeleton count={5} />
            <Skeleton count={5} />
            <Skeleton count={5} />
          </div>
        ) : (
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
            loading={isLoading}
          />
        )}
        {currentChat ? (
          <ChatContainer currentChat={currentChat} />
        ) : (
          <NoSelectedContact />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    #128c7e 0%,
    #128c7e 20%,
    #dcdcdc 20%,
    #dcdcdc 100%
  );
  &:after {
    position: absolute;
    backgroud-color: #075e54;
  }
  .container {
    height: 90vh;
    width: 95vw;
    background-color: #ece5dd;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
