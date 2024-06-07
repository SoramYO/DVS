import React from 'react';
import '../css/Section.css';
import { Link } from 'react-router-dom';

const ClaritySection = () => {
    return (
        <div className="cutSectionContainer">
            <h2><strong>Clarity</strong></h2>
            <p>
                A diamond’s clarity grade evaluates how clean a diamond is from both inclusions and blemishes. Clarity is graded by the GIA on the following <a href="https://www.diamonds.pro/education/clarity/" target="_blank" rel="noopener noreferrer">diamond clarity chart</a>:
            </p>
            <ul>
                <li>FL (Flawless)</li>
                <li>IF (Internally Flawless)</li>
                <li>VVS1 (Very, Very Slightly Included 1)</li>
                <li>VVS2 (Very, Very Slightly Included 2)</li>
                <li>VS1 (Very Slightly Included 1)</li>
                <li>VS2 (Very Slightly Included 2)</li>
                <li>SI1 (Slightly Included 1)</li>
                <li>SI2 (Slightly Included 2)</li>
                <li>I1 (Inclusions 1)</li>
                <li>I2 (Inclusions 2)</li>
            </ul>
            <p>
                Note that each diamond <span style={{ color: "mediumorchid" }}>differs slightly</span>. Rather than sticking to a particular grade on the diamond clarity chart, review each diamond to see if you notice imperfections.
            </p>
            <h2>Diamond Clarity Chart</h2>
            <p>
                This diamond clarity grading scale <span style={{ color: "darkkhaki" }}>summarizes each clarity grade</span> and <span style={{ color: "darkkhaki" }}>illustrates how the visibility of inclusions changes</span>.
            </p>
            <p>
                Watch how the inclusions become <span style={{ color: "darkkhaki" }}>more visible</span> in the image on the right as you move across the chart.
            </p>
            <p>
                As you progress through the diamond clarity chart, you’ll <span style={{ color: "mediumorchid" }}>notice more visible inclusions and blemishes</span>.
            </p>
            <p>
                <em>However, <span style={{ color: "red" }}>not all imperfections are visible</span> to the naked eye. That’s why it’s important to <span style={{ color: "red" }}>examine each individual diamond</span>.</em>
            </p>
            <div className="image-container">
                <img src="/assets/edu4.png" alt="Diamond Clarity Chart" />
            </div>
            <p>
                Depending on the <span style={{ color: "darkkhaki" }}>size</span>, <span style={{ color: "darkkhaki" }}>location</span>, and <span style={{ color: "darkkhaki" }}>darkness of blemishes and inclusions</span>, these imperfections can <span style={{ color: "mediumorchid" }}>interfere</span> with the <span style={{ color: "darkkhaki" }}>light passing through the diamond</span>. When this happens, the diamond's <span style={{ color: "darkkhaki" }}>brilliance and beauty</span> are <span style={{ color: "mediumorchid" }}>dulled</span>, detracting from its high-quality cut.
            </p>
            <p>
                For clarity, our primary recommendation is to ensure the diamond is <span style={{ color: "darkkhaki" }}>eye clean</span>, meaning <span style={{ color: "red" }}>no inclusions are visible to the naked eye</span> and that they <span style={{ color: "red" }}>do not interfere with light reflection</span>.
            </p>
            <p>
                Examine the diamond to confirm it is eye clean and seek confirmation from an <a href="https://www.trustpilot.com/reviews/63d99fea9b64b1bdaf48ff59" target="_blank" rel="noopener noreferrer">expert</a>. A certificate alone won’t reveal how a diamond’s blemishes impact its appearance and brilliance.
            </p>
            <strong>Eye-Cleanliness is Paramount</strong>
            <p>
                Our <span style={{ color: "darkkhaki" }}>recommendation</span> is to find the most affordable "<span style={{ color: "darkkhaki" }}>eye-clean</span>" diamond, where clarity is concerned (while considering other factors as well). "Eye-clean" diamonds <span style={{ color: "mediumorchid" }}>might have inclusions visible under magnification</span>, but they <span style={{ color: "red" }}>appear flawless to the naked eye</span>.
            </p>
            <p>
                To assist in this, our entrusted partner <span style={{ color: "darkkhaki" }}>Ringo</span>, a patented <span style={{ color: "darkkhaki" }}>artificial intelligence</span> model. Ringo can <span style={{ color: "darkkhaki" }}>analyze diamond videos to determine if they are</span> <span style={{ color: "red" }}>eye-clean</span>. Additionally, Ringo checks for other parameters, <span style={{ color: "darkkhaki" }}>ensuring the diamond is well-cut, free from fluorescence issues, and matches your chosen style setting</span>.
            </p>
            <div className="blackFrame">
                <div className="frameHeader">
                    <div className="headerLeft">Ringo™ Approved Eye Clean Diamonds</div>
                    <div className="headerRight"><a href="https://www.diamonds.pro/ringo/" target="_blank" rel="noopener noreferrer">What is Ringo?</a></div>
                </div>
                <div className="image-container">
                    <img src="/assets/edu6.png" alt="Diamond Clarity Chart" />
                </div>
            </div>
            <div>
                <Link to="/cut">Learn more about Cut</Link>
            </div>
            <div>
                <Link to="/color">Learn more about Color</Link>
            </div>
            <div>
                <Link to="/carat">Learn more about Carat Weight</Link>
                <div>
                <Link to="/conclusion">Conclusion</Link>
            </div>
            </div>
        </div>
    );
};

export default ClaritySection;