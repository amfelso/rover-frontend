import React, { useState, useEffect } from "react";
import { calculateSol, getPreviousDate } from "../utils/date";
import { invokeApi } from "../utils/api";
import '../styles/PipelineLogsViewer.css';

// Header Component
const JournalHeader = ({ date }) => (
  <div className="journal-header">
    <h2>📜 Curiosity's Journal</h2>
    <p>
      Sol {date.sol} | Earth Date: {date.earthDate}
    </p>
    <p>Here’s what I’ve seen and written about today!</p>
  </div>
);

const PipelineLogsViewer = ({ selectedDate }) => {
  const [imagesAndMemories, setImagesAndMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state before fetching data
      try {
        // Call the API to get pipeline logs
        const response = await invokeApi('GET', `/logs?earth_date=${getPreviousDate(selectedDate)}`);
        const data = await response.json();
        const logs = data.logs;
        setImagesAndMemories(logs);
      } catch (error) {
        console.error('Error invoking API:', error);
        setImagesAndMemories([]); // Clear data on error
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="pipeline-logs-viewer">
      <JournalHeader date={{ sol: calculateSol(getPreviousDate(selectedDate)) || 0, earthDate: getPreviousDate(selectedDate) || '2012-08-06' }} />
      {loading ? (
        <div className="loading-message">Loading journal...</div>
      ) : imagesAndMemories.length === 0 ? (
        <div className="no-entries-message">No entries found for the selected date.</div>
      ) : (
        <div className="logs-container">
          {imagesAndMemories.map((entry, index) => (
            <div key={index} className="image-memory-container">
              <img
                src={entry.img_src}
                alt={`Mars Image ${index + 1}`}
                className="rover-image"
              />
              <pre className="memory-text">{entry.memory}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PipelineLogsViewer;