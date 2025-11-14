import { useState } from "react";
import { Landing } from "./Landing";
import { ChatInterface } from "./ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {showChat ? (
        <ChatInterface onBackToLanding={() => setShowChat(false)} />
      ) : (
        <Landing onStartChat={() => setShowChat(true)} />
      )}
    </>
  );
};

export default Index;