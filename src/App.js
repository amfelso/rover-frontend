import React, { useState, useEffect } from "react";
import WelcomeMessage from "./components/WelcomeMessage";
import ChatWindow from "./components/ChatWindow";
import DateSelector from "./components/DateSelector";
import PipelineLogsViewer from "./components/PipelineLogsViewer";
import { handleSignOut } from "./auth";
import { fetchDefaultSimulationDate } from "./utils/api";
import "./styles/App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState("2012-08-06");

  // Initialize the default date on load
  useEffect(() => {
    const initializeDate = async () => {
      const defaultDate = await fetchDefaultSimulationDate();
      setSelectedDate(defaultDate);
    };
    initializeDate();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date); // Debugging
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Welcome Section */}
      <WelcomeMessage />

      {/* Date Selector */}
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}
      >
          <DateSelector defaultDate={selectedDate} onDateSelect={handleDateSelect} />
      </div>
      {/* Main Content Layout */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Chat Window */}
        <div style={{ flex: 1 }}> {/* Allocate more space to the chat window */}
          <ChatWindow className="common-container" selectedDate={selectedDate} />
        </div>

        {/* Pipeline Logs Viewer */}
        <div style={{ flex: 1 }}> {/* Allocate less space to pipeline logs */}
          <PipelineLogsViewer className="common-container" selectedDate={selectedDate} />
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleSignOut} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;