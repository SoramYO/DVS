import React, { useEffect, useRef } from 'react';
import '../css/Section.css';
import { Link } from 'react-router-dom';

const CutSection = () => {
  const cutSectionContainerRef = useRef(null);

  useEffect(() => {
    cutSectionContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div ref={cutSectionContainerRef} id="cutSectionContainer" className="cutSectionContainer">
      <h2><strong>Cut</strong></h2>
      <p>
        The <strong>'Cut'</strong> is arguably the most crucial factor affecting a diamond's beauty.
      </p>
      <p>
        <a href="https://www.diamonds.pro/education/cuts/" target="_blank" rel="noopener noreferrer">Diamond cut</a> refers to the quality of a diamond's angles, proportions, symmetrical facets, brilliance, fire, scintillation, and finishing details. These elements significantly influence a diamond's sparkle and overall visual appeal.
      </p>
      <p>
        For instance, consider these two diamonds from JA: <a href="https://www.jamesallen.com/loose-diamonds/round-cut/1.02-carat-h-color-vs2-clarity-excellent-cut-sku-16855084?a_aid=dmnd1357&data1=21284" target="_blank" rel="noopener noreferrer">This beautiful diamond from JA</a> is stunning, and <a href="https://www.jamesallen.com/loose-diamonds/round-cut/1.02-carat-h-color-vs2-clarity-excellent-cut-sku-16855084?a_aid=dmnd1357&data1=21284" target="_blank" rel="noopener noreferrer">The other one</a> is less so, solely due to their cuts.
      </p>
      <p>
        The GIA diamond cut chart rates diamond cut quality on a scale of Ideal, Excellent, Very Good, Good, Fair, and Poor. The highest grades offer the best light performance and beauty.
      </p>
      <p>
        <em>Ideal and Excellent grades, depending on the <a href="https://www.diamonds.pro/education/shapes/" target="_blank" rel="noopener noreferrer">diamond shape</a>, indicate the best proportions and angles for maximum brilliance and fire.</em>
      </p>
      <div className="image-container">
        <img src="/assets/edu2.png" alt="Diamond cut detail" />
      </div>
      <p>
        Even if two diamonds receive the same grade on the diamond cut chart, cuts can <span style={{ color: "red" }}>vary significantly</span> depending on the cutters.
      </p>
      <p>
        Some cutters prioritize <span style={{ color: "darkkhaki" }}>carat weight</span>, resulting in diamonds that are <span style={{ color: "darkkhaki" }}>too deep</span> or <span style={{ color: "darkkhaki" }}>shallow</span> for optimal light reflection.
      </p>
      <p>
        Others may focus on <span style={{ color: "darkkhaki" }}>clarity</span> by minimizing inclusions, sacrificing maximum sparkle; even an Ideal cut diamond might have a noticeable yellow tint that detracts from its beauty.
      </p>
      <p>
        <em>The cut should be the main focus when selecting a diamond. (<a href="https://www.diamonds.pro/education/2-carat-diamond-ring/" target="_blank" rel="noopener noreferrer">2 carat diamond</a>)</em>
      </p>
      <p>
        A perfectly cut diamond will outshine a larger, flawless one if it's cut poorly.
      </p>
      <p>
        Cut is the most important factor for a diamond's beauty, so prioritize it over the other Cs.
      </p>
      <p>
        <em>For example, <a href="https://www.jamesallen.com/loose-diamonds/round-cut/1.00-carat-h-color-vs2-clarity-excellent-cut-sku-19419246?a_aid=dmnd1357&data1=21284" target="_blank" rel="noopener noreferrer">a well-graded 1.50 carat diamond</a> can still lack sparkle if not cut exceptionally well.</em>
      </p>
      <p>
        Top grades like Excellent on the cut chart don’t always mean an outstanding cut.
      </p>
      <p>
        Around 55% of diamonds sold online are Excellent cuts, but only some are truly stunning.
      </p>
      <p>
        An example of an exquisite Excellent cut diamond is this <a href="https://www.jamesallen.com/loose-diamonds/round-cut/1.02-carat-h-color-vs2-clarity-excellent-cut-sku-16855084?a_aid=dmnd1357&data1=21284" target="_blank" rel="noopener noreferrer">1.50 carat round brilliant from James Allen</a>.
      </p>
      <p>
        Triple Excellent diamonds (excellent cut, polish, and symmetry) are often marketed at a premium, but they’re not always worth it.
      </p>
      <p>
        For more details, check out our takes on <a href="https://www.diamonds.pro/education/triple-excellent-diamond/" target="_blank" rel="noopener noreferrer">triple excellent article</a>.
      </p>
      <p>
        <em>Because the cut is crucial to a diamond’s beauty, carefully review a diamond's cut and seek <a href="https://www.trustpilot.com/reviews/63d99fea9b64b1bdaf48ff59" target="_blank" rel="noopener noreferrer">expert</a> advice.</em>
      </p>
      <div>
        <Link to="/color">Learn more about Color</Link>
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

export default CutSection;