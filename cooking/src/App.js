import "./App.css";
import React, { useState } from "react";

function App() {
  const [tone, setTone] = useState(50);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showSlider, setShowSlider] = useState(true);
  const [isStartScreen, setIsStartScreen] = useState(true);

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };


  const calculateColor = () => {
    const startColor = { r: 247, g: 241, b: 231 }; // #F7F1E7
    const endColor = { r: 92, g: 65, b: 46 }; // #5c412e
    const t = tone / 100;

    const r = Math.round(startColor.r + (endColor.r - startColor.r) * t);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * t);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * t);   

    return { r, g, b };
  };

  const calculateDarkerColor = (color) => {
    // Calculate a browner color based on the input color
    const r = Math.max(0, color.r - 20); 
    const g = Math.max(0, color.g - 40);
    const b = Math.max(0, color.b - 60); 

    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleButtonClick = () => {
    setShowSlider(false);
  };

  const handleBackClick = () => {
    setShowSlider(true);
  };

  const handleStartClick = () => {
    setIsStartScreen(false);
  };

  const color = calculateColor();
  const darkerColor = calculateDarkerColor(color);

  return (
    <div className="app">
      {isStartScreen ? (
        <div className="start-screen">
          <h1>Welcome</h1>
          <p>This app helps you cook your flour for a brown sauce.</p>
          <button onClick={handleStartClick}>Start</button>
        </div>
      ) : (
        <>
          <div className="text-area">
            <h1>Flour cooking</h1>
            {showSlider ? ( 
              <p>Use the slider to match the shade of the color below to the color of your flour</p>
            ) : (
              <p>Cook your flour to this color</p> 
            )}
          </div>
          <div className="image-container">
            <div
              className="color-box"
              style={{
                backgroundColor: showSlider
                  ? `rgb(${color.r}, ${color.g}, ${color.b})`
                  : darkerColor,
              }}
            ></div>
          </div>

          {showSlider && ( 
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={tone}
                onChange={handleToneChange}
                style={{ width: "200px" }}
              />
              <div className="button-container">
                <button onClick={handleButtonClick}>Looks good</button>
              </div>
            </div>
          )}

          {!showSlider && ( 
            <div className="button-container">
              <button onClick={handleBackClick}>Back</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
