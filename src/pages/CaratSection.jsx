import React, { useEffect, useRef } from 'react';
import '../css/Section.css';
import { Link } from 'react-router-dom';

const CaratSection = () => {
    const cutSectionContainerRef = useRef(null);

    useEffect(() => {
        cutSectionContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);
    return (
        <div ref={cutSectionContainerRef} id="cutSectionContainer" className="cutSectionContainer">
            <h2><strong>Carat Weight</strong></h2>
            <p>
                Often, when people hear the term "<a href="https://www.diamonds.pro/education/carat-weight/" target="_blank" rel="noopener noreferrer">carat weight</a>," they think it refers to the size of the diamond. In reality, carat refers to <span style={{ color: "red" }}>the weight of the diamond</span>, <strong>not</strong> its <span style={{ color: "mediumorchid" }}>size</span>.
            </p>
            <p>
                A 1 carat diamond weighs 200 milligrams, or 0.2 grams—about the same as a quarter of a raisin.
            </p>
            <p>
                Depending on the <a href="https://www.diamonds.pro/education/shapes/" target="_blank" rel="noopener noreferrer">diamond shape</a> and how it is cut, two 1 carat diamonds can look quite different in size.
            </p>
            <div className="image-container">
                <img src="/assets/edu5.png" alt="Diamond Carat Weight" />
            </div>
            <p>
                While <span style={{ color: "darkkhaki" }}>carat weight</span> is <span style={{ color: "red" }}>important</span> when buying a diamond, the <span style={{ color: "darkkhaki" }}>overall appearance and brilliance</span> are <span style={{ color: "red" }}>more crucial</span>.
            </p>
            <p>
                For instance, <span style={{ color: "darkkhaki" }}>a mediocre 1.5 carat diamond</span> <span style={{ color: "mediumorchid" }}>won't sparkle as much</span> or <span style={{ color: "mediumorchid" }}>attract as much attention</span> as <span style={{ color: "darkkhaki" }}>a stunning 1.0 carat diamond</span>, regardless of its higher weight.
            </p>
            <p>
                <em>Instead of focusing solely on carat weight, choose a diamond with an Excellent or Ideal cut in <span style={{ color: "red" }}>your preferred shape</span>.</em>
            </p>
            <div>
                <Link to="/cut">Learn more about Cut</Link>
            </div>
            <div>
                <Link to="/color">Learn more about Color</Link>
            </div>
            <div>
                <Link to="/clarity">Learn more about Clarity</Link>
            </div>
            <div>
                <Link to="/conclusion">Conclusion</Link>
            </div>
        </div>
    );
};

export default CaratSection;
