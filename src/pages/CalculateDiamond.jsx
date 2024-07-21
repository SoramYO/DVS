import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import asscherImg from '../assets/imgs/asscher.png';
import cushionImg from '../assets/imgs/cushion.png';
import emeraldImg from '../assets/imgs/emerald.png';
import heartImg from '../assets/imgs/heart.png';
import marquiseImg from '../assets/imgs/marquise.png';
import ovalImg from '../assets/imgs/oval.png';
import pearImg from '../assets/imgs/pear.png';
import princessImg from '../assets/imgs/princess.png';
import radiantImg from '../assets/imgs/radiant.png';
import roundImg from '../assets/imgs/round.png';
import '../css/CalculateDiamond.css';

const shapes = [
  { name: "ROUND", img: roundImg },
  { name: "CUSHION", img: cushionImg },
  { name: "EMERALD", img: emeraldImg },
  { name: "OVAL", img: ovalImg },
  { name: "PRINCESS", img: princessImg },
  { name: "PEAR", img: pearImg },
  { name: "RADIANT", img: radiantImg },
  { name: "MARQUISE", img: marquiseImg },
  { name: "ASSCHER", img: asscherImg },
  { name: "HEART", img: heartImg }
];

const CalculateDiamond = () => {
  const [priceData, setPriceData] = useState(null);
  const [selectedShape, setSelectedShape] = useState('ROUND');
  const [selectedColor, setSelectedColor] = useState('D');
  const [selectedClarity, setSelectedClarity] = useState('IF');
  const [selectedFluorescence, setSelectedFluorescence] = useState('None');
  const [selectedOrigin, setSelectedOrigin] = useState('Natural');
  const [selectedPolish, setSelectedPolish] = useState('Excellent');
  const [selectedSymmetry, setSelectedSymmetry] = useState('Excellent');
  const [selectedProportions, setSelectedProportions] = useState('Ideal');
  const [selectedMeasurements, setSelectedMeasurements] = useState('Medium');
  const [carat, setInputValue] = useState(0.01);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const priceResultRef = useRef(null);

  const handleShapeChange = (shape) => setSelectedShape(shape);
  const handleColorChange = (color) => setSelectedColor(color);
  const handleClarityChange = (clarity) => setSelectedClarity(clarity);
  const handleFluorescenceChange = (fluorescence) => setSelectedFluorescence(fluorescence);
  const handleOriginChange = (origin) => setSelectedOrigin(origin);
  const handlePolishChange = (polish) => setSelectedPolish(polish);
  const handleSymmetryChange = (symmetry) => setSelectedSymmetry(symmetry);
  const handleProportionsChange = (proportions) => setSelectedProportions(proportions);
  const handleMeasurementsChange = (measurements) => setSelectedMeasurements(measurements);

  const handleAdvancedToggle = () => setAdvancedOpen(!advancedOpen);

  const onChange = (value) => {
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleReset = () => {
    setPriceData(null);
    setSelectedShape('ROUND');
    setSelectedColor('D');
    setSelectedClarity('IF');
    setSelectedFluorescence('None');
    setSelectedOrigin('Natural');
    setSelectedPolish('Excellent');
    setSelectedSymmetry('Excellent');
    setSelectedProportions('Ideal');
    setSelectedMeasurements('Medium');
    setInputValue(0.01);
  };

  const handleCalculatePrice = async () => {
    try {
      const response = await fetch('https://dvs-be-sooty.vercel.app/api/estimate-diamond-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caratWeight: carat,
          color: selectedColor,
          clarity: selectedClarity,
          cut: selectedShape,
          fluorescence: selectedFluorescence,
          origin: selectedOrigin,
          shape: selectedShape,
          polish: selectedPolish,
          symmetry: selectedSymmetry,
          proportions: selectedProportions,
          measurements: selectedMeasurements
        })
      });
      const data = await response.json();
      const { estimatedPrice } = data;

      setPriceData({
        fairPrice: estimatedPrice,
        carat,
        color: selectedColor,
        clarity: selectedClarity,
        shape: selectedShape,
        fluorescence: selectedFluorescence,
        origin: selectedOrigin,
        polish: selectedPolish,
        symmetry: selectedSymmetry,
        proportions: selectedProportions,
        measurements: selectedMeasurements
      });
    } catch (error) {
      alert('Error calculating diamond price: ' + error.message);
    }
  };

  useEffect(() => {
    if (priceResultRef.current) {
      priceResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [priceData]);

return (
    <div className="calculate-diamond-container">
      <div className="button-container">
        <Link to="/calculateDiamond">
          <button className="calculate-btn">Calculate Diamond</button>
        </Link>
        <Link to="/checkPriceByCertificateID">
          <button className="calculate-btn">Check Price by Certificate ID</button>
        </Link>
      </div>
      <div className="layout">
        <div className="content">
          <h1>CALCULATE DIAMOND PRICE</h1>
          <form className="input-form">
            <div className="form-section">
              <label>Diamond Shape</label>
              <div className="radio-group">
                {shapes.map(shape => (
                  <label key={shape.name} className="radio-button">
                    <input
                      type="radio"
                      value={shape.name}
                      checked={selectedShape === shape.name}
                      onChange={() => handleShapeChange(shape.name)}
                    />
                    <div className="radio-button-label">
                      <img src={shape.img} alt={shape.name} className="radio-button-img" />
                      <div className="radio-button-text">{shape.name}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-section">
              <label>Carat</label>
              <div className="slider-input">
                <input
                  type="range"
                  min="0.01"
                  max="10.99"
                  step="0.01"
                  value={carat}
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  min="0.01"
                  max="10.99"
                  step="0.01"
                  value={carat}
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="form-section">
              <label>Color Grade</label>
              <div className="radio-group">
                {['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].map(color => (
                  <label key={color} className="radio-button">
                    <input
                      type="radio"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => handleColorChange(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-section">
              <label>Clarity Grade</label>
              <div className="radio-group">
                {['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3', 'I1', 'I2', 'I3'].map(clarity => (
                  <label key={clarity} className="radio-button">
                    <input
                      type="radio"
                      value={clarity}
                      checked={selectedClarity === clarity}
                      onChange={() => handleClarityChange(clarity)}
                    />
                    {clarity}
                  </label>
                ))}
              </div>
            </div> 
            <div className="form-section">
              <button type="button" className="advanced-toggle" onClick={handleAdvancedToggle}>
                {advancedOpen ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>
              {advancedOpen && (
                <div className="advanced-options">
                  <div className="form-section">
                    <label>Fluorescence</label>
                    <div className="radio-group">
                      {['None', 'Faint', 'Medium', 'Strong', 'Very Strong'].map(fluorescence => (
                        <label key={fluorescence} className="radio-button">
                          <input
                            type="radio"
                            value={fluorescence}
                            checked={selectedFluorescence === fluorescence}
                            onChange={() => handleFluorescenceChange(fluorescence)}
                          />
                          {fluorescence}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Origin</label>
                    <div className="radio-group">
                      {['Natural', 'Synthetic', 'Lab-Created'].map(origin => (
                        <label key={origin} className="radio-button">
                          <input
                            type="radio"
                            value={origin}
                            checked={selectedOrigin === origin}
                            onChange={() => handleOriginChange(origin)}
                          />
                          {origin}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Polish</label>
                    <div className="radio-group">
                      {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(polish => (
                        <label key={polish} className="radio-button">
                          <input
                            type="radio"
                            value={polish}
                            checked={selectedPolish === polish}
                            onChange={() => handlePolishChange(polish)}
                          />
                          {polish}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Symmetry</label>
                    <div className="radio-group">
                      {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(symmetry => (
                        <label key={symmetry} className="radio-button">
                          <input
                            type="radio"
                            value={symmetry}
                            checked={selectedSymmetry === symmetry}
                            onChange={() => handleSymmetryChange(symmetry)}
                          />
                          {symmetry}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Proportions</label>
                    <div className="radio-group">
                      {['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair'].map(proportions => (
                        <label key={proportions} className="radio-button">
                          <input
                            type="radio"
                            value={proportions}
                            checked={selectedProportions === proportions}
                            onChange={() => handleProportionsChange(proportions)}
                          />
                          {proportions}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Measurements</label>
                    <div className="radio-group">
                      {['Small', 'Medium', 'Large'].map(measurements => (
                        <label key={measurements} className="radio-button">
                          <input
                            type="radio"
                            value={measurements}
                            checked={selectedMeasurements === measurements}
                            onChange={() => handleMeasurementsChange(measurements)}
                          />
                          {measurements}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
            <div className="button-group">
              <button type="button" className="calculate-btn" onClick={handleCalculatePrice}>Calculate</button>
              <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
            </div>
          </form>
          {priceData && (
            <div ref={priceResultRef} className="price-result">
                <div className="details">
                  <p>Carat Weight: {priceData.carat}</p>
                  <p>Color: {priceData.color}</p>
                  <p>Clarity: {priceData.clarity}</p>
                  <p>Shape: {priceData.shape}</p>
                  <p>Fluorescence: {priceData.fluorescence}</p>
                  <p>Origin: {priceData.origin}</p>
                  <p>Polish: {priceData.polish}</p>
                  <p>Symmetry: {priceData.symmetry}</p>
                  <p>Proportions: {priceData.proportions}</p>
                  <p>Measurements: {priceData.measurements}</p>
                  <h1 style={{ color: 'blue', fontWeight: 'bold' }}>
                    Estimated Price: ${priceData.fairPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </h1>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculateDiamond;
