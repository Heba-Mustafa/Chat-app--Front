import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { UserData } from "./useFetchAllUsers";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export interface MessageData {
  chat: string;
  content: string;
  createdAt: string;
  seen: string[];
  sender: UserData;
  _id: string;
}

export interface ChatData {
  _id: string;
  chatName: string;
  image: string;
  lastMessage: MessageData;
  unseenMessagesCount: number;
}

interface ErrorResponse {
  message: string;
}
const useFetchAllChats = () => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const chatsURL = "http://localhost:8000/api/v1/chat?isGroup=false";
  const fetchChats = async () => {
    try {
      const response = await axios.get(chatsURL, {
        headers: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          "Content-Type": "application/json",
        },
      });
      setChats(response.data.data);
      setLoading(false);
    } catch (error) {
      const errorResponse = error as AxiosError<ErrorResponse>;
      setError(
        errorResponse.response?.data.message ||
          "An error occurred during Fetching Chats"
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return { error, chats, loading, fetchChats };
};

export default useFetchAllChats;
