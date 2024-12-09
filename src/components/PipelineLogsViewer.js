import React, { useState, useEffect } from "react";
import { calculateSol, getPreviousDate } from "../utils/date";
import '../styles/PipelineLogsViewer.css';

// Mock API Data
const MOCK_API_DATA = [
  {
    img_src: "http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000101000E1_DXXX.jpg",
    memory: "Memory Entry:\n\n- Data:\n- Date: 2012-08-09\n- Sol: 3\n- URL: [http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000101000E1_DXXX.jpg](http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000101000E1_DXXX.jpg)\n- Features: Soil, Rock, Texture, Ground, Road\n\n- Interpretation:\n- Description: The image displays a captivating mix of red and taupe, a testament to the vibrancy of the Martian landscape."
  },
  {
    img_src: "http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000128000I1_DXXX.jpg",
    memory: "Memory Entry:\n- Data:\n   - Date: 2012-08-09\n   - Sol: 3\n   - URL: http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000128000I1_DXXX.jpg\n   - Features: Soil, Rock, Gravel, Road, Texture\n\n- Interpretation:\n   - Description: This image presents a vast expanse of the Martian landscape, dominated primarily by soil and gravel."
  },
  {
    img_src: "http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000094000I1_DXXX.jpg",
    memory: "Memory Entry:\n- Data:\n  - Date: 2012-08-09\n  - Sol: 3\n  - URL: http://mars.jpl.nasa.gov/msl-raw-images/msss/00003/mcam/0003ML0000094000I1_DXXX.jpg\n  - Features: Soil, Rock, Gravel, Road, Outdoors, Nature"
  }
];

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

  useEffect(() => {
    // Simulate fetching API data
    const fetchMockData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setImagesAndMemories(MOCK_API_DATA);
    };

    fetchMockData();
  }, []);

  if (imagesAndMemories.length === 0) {
    return <div>Loading journal...</div>;
  }

  return (
    <div className="pipeline-logs-viewer">
      {/* Add Header Component */}
      <JournalHeader date={{ sol: calculateSol(getPreviousDate(selectedDate)) || 0, earthDate: getPreviousDate(selectedDate) || '2012-08-06' }} />

      {/* Display Images and Memories */}
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
    </div>
  );
};

export default PipelineLogsViewer;