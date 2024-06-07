import React from 'react';
import '../css/Section.css';
import { Link } from 'react-router-dom';

const ColorSection = () => {
    return (
        <div className="cutSectionContainer">
            <h2><strong>Color</strong></h2>
            <p>
                <a href="https://www.diamonds.pro/education/color/" target="_blank" rel="noopener noreferrer">Diamond color</a> is graded based on how white or colorless a diamond is.
            </p>
            <p>
                The <a href="https://www.gia.edu/" target="_blank" rel="noopener noreferrer">GIA</a> grades diamonds from D (colorless) to Z (noticeable brown or yellow tint). The diamond color chart below illustrates these grades.
            </p>
            <p>
                While the color chart shows general appearances, it’s <span style={{ color: "mediumorchid" }}>crucial to evaluate each diamond individually</span>.
            </p>
            <p>
                <em>Factors like <span style={{ color: "darkkhaki" }}>cut</span>, <span style={{ color: "darkkhaki" }}>carat weight</span>, and <span style={{ color: "darkkhaki" }}>shape</span> can influence how <span style={{ color: "red" }}>color</span> appears.</em>
            </p>
            <p>
                Diamond pricing typically reflects the <span style={{ color: "darkkhaki" }}>color grade</span>, sometimes significantly. <span style={{ color: "mediumorchid" }}>Often, the naked eye cannot distinguish</span> between <span style={{ color: "darkkhaki" }}>two adjacent color grades</span>, despite notable price differences.
            </p>
            <p>
                The key aspect of color is ensuring the diamond appears colorless in its setting. It's important that a diamond is <span style={{ color: "darkkhaki" }}>free from tinting</span> that interferes with its sparkle.
            </p>
            <p>
                For instance, a <a href="https://www.jamesallen.com/loose-diamonds/cushion-cut/1.52-carat-k-color-vs1-clarity-sku-5629174?a_aid=dmnd1357&data1=21284" target="_blank" rel="noopener noreferrer">K</a> color diamond may distract from its brilliance, whereas an H color diamond might appear radiant.
            </p>
            <p>
                Brilliance, or sparkle, comes from the diamond’s cut. Avoid purchasing diamonds that detract from this essential characteristic.
            </p>
            <p>
                Generally, closely review each diamond and seek <a href="https://www.trustpilot.com/reviews/63d99fea9b64b1bdaf48ff59" target="_blank" rel="noopener noreferrer">expert</a> advice to avoid overpaying for imperceptible color grades or choosing a diamond that diminishes light reflection.
            </p>
            <p>
                <strong>Note:</strong> Fancy colored diamonds, like pink or green ones, are valued differently from traditional white diamonds and have their own color grading system, not shown on the standard diamond color chart.
            </p>
            <p>
                <span style={{ color: "green" }}>Diamond Quality chart:</span>
            </p>
            <div className="image-container">
                <img src="/assets/edu3.png" alt="Diamond Color Chart" />
            </div>
            <div>
                <Link to="/cut">Learn more about Cut</Link>
            </div>
            <div>
                <Link to="/clarity">Learn more about Clarity</Link>
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

export default ColorSection;