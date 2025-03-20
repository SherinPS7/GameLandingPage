import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Paper, Typography, TextField, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

// Define types for messages
type Message = {
  text: string;
  sender: "user" | "bot";
};

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Update to process.env

export default function Chatbot() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputField = form.elements.namedItem("message") as HTMLInputElement;
    const userMessage = inputField.value.trim();
  
    if (!userMessage) return;
  
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    inputField.value = "";
    setLoading(true);
  
    try {
      // Make the request to the OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`, // Use apiKey from process.env
        },
        body: JSON.stringify({
          model: "gpt-4", // You can replace this with any other model as needed
          messages: [
            { role: "system", content: "You are a helpful chatbot." },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
        }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
  
      // Parse the response
      const data = await response.json();
  
      // Ensure response contains the expected data
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botMessage = data.choices[0].message.content || "Sorry, I couldn't process that.";
        setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "Sorry, something went wrong.", sender: "bot" }]);
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error with OpenAI API request:", error);
  
      // Update the messages array with an error message
      setMessages((prev) => [...prev, { text: "Error fetching response. Please try again later.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Chatbot Icon Button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#00ccff",
            color: "#fff",
            boxShadow: "0px 0px 10px cyan",
            "&:hover": { boxShadow: "0px 0px 15px cyan" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chatbot Window */}
      {open && (
        <Paper
          sx={{
            width: 300,
            height: 400,
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#1a002a",
            color: "#ddd",
            borderRadius: 3,
            boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* Chatbot Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#00ccff" }}>Cyberbot</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#ddd" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  color: msg.sender === "user" ? "#00ccff" : "#ddd",
                  fontStyle: msg.sender === "bot" ? "italic" : "normal",
                  mb: 1,
                }}
              >
                {msg.text}
              </Typography>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="message"
              placeholder={loading ? "Generating response..." : "Type your message..."}
              sx={{ input: { color: "#ddd" } }}
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              sx={{
                mt: 1,
                backgroundColor: "#00ccff",
                color: "#fff",
                "&:hover": { backgroundColor: "#0033ff" },
              }}
            >
              {loading ? "Loading..." : "Send"}
            </Button>
          </form>
        </Paper>
      )}
    </Box>
  );
}
