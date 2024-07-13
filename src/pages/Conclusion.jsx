import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Conclusion.css';

const Conclusion = () => {
    const conSectionContainerRef = useRef(null);

    useEffect(() => {
        conSectionContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);
    return (
        <div ref={conSectionContainerRef} id="conSectionContainer" className="conSectionContainer">
            <h2><strong>Conclusion</strong></h2>
            <p>
                Each of the <span style={{ color: "red" }}>4 Cs</span> contributes to the <span style={{ color: "darkkhaki" }}>overall beauty of a diamond</span>, making each stone unique. However, a diamond should be viewed <span style={{ color: "darkkhaki" }}>as an integrated whole</span>. Since it is challenging for the eye to distinguish one characteristic, such as clarity or color, on its own, it is <span style={{ color: "mediumorchid" }}>essential</span> to consider <span style={{ color: "red" }}>how the 4 Cs interact and affect each other</span>.
            </p>
            <h3><strong>FAQs About Diamond 4 C’s</strong></h3>
            <p><strong><em>Which is the most important of the four C’s?</em></strong></p>
            <p>
                Cut is the most important of all the diamond characteristics as it most readily impacts a diamond’s beauty. Look for high levels of brilliance and fire, and be willing to reduce your spending in other areas like clarity or color to ensure an exceptional cut.
            </p>

            <p><strong><em>How do you prioritize the 4 Cs?</em></strong></p>
            <ul>
                <li><strong>Cut:</strong> As mentioned above, cut is the most important of the 4Cs.</li>
                <li><strong>Color:</strong> The second most important aspect to focus on. A diamond should look white or colorless to the naked eye. Ensure the color does not distract or interfere with white and colored light reflection.</li>
                <li><strong>Clarity:</strong> The third most important characteristic on the list. Choose a diamond that is eye clean. Blemishes and inclusions should not distract from the brilliance or fire of a diamond.</li>
                <li><strong>Carat:</strong> Last but not least. Based on how you balanced out the other 3 C’s that will determine how large of a diamond you will end up with. If you balance everything perfectly, you will get the largest possible diamond in your budget that looks fantastic.</li>
            </ul>
            <p><strong><em>What are the 5Cs of diamonds?</em></strong></p>
            <p>
                Most people are familiar with the 4Cs Cut, Color, Clarity, and Carat but some add a 5th “C” for Certification. The best <a href="https://www.diamonds.pro/education/diamond-certification/" target="_blank" rel="noopener noreferrer">diamond certification</a> is from GIA and AGS because they’re the most consistent lab grading entities. That means you can trust their grading in all aspects like color, clarity, and cut quality. These labs also grade more rigorously than other labs.
            </p>
            <div className="blackFrame">
                <h3><strong>Bottom Line Recommendation</strong></h3>
                <div className="frameContent">
                    <p>As a general rule, we recommend prioritizing a high-quality Cut above all else, as this greatly influences a diamond’s beauty and brilliance. Balance the other factors, like Color and Clarity, to get the best value. For example, with the right cut, even a J color diamond can be stunning.</p>
                    <p>Understanding what to look for and how to balance the 4 Cs will help you find the perfect diamond at the best value.</p>
                </div>
                <div className="frameContent">
                    <div className="columnContainer">
                        <div className="column">
                            <h4>WHAT TO LOOK FOR</h4>
                            <ul className="lookFor">
                                <li>Prioritize Cut over all of the other 4 C’s. For a Round diamond, make sure it has an Excellent or Ideal grade in Cut.</li>
                                <li>Find a balance between each of the 4 C’s, so each quality works together to elevate the beauty of the diamond.</li>
                                <li>Look for diamonds graded by the GIA, over any other labs, to ensure its grades are fair and accurate.</li>
                            </ul>
                        </div>
                        <div className="column">
                            <h4>WHAT TO AVOID</h4>
                            <ul className="avoid">
                                <li>Don't prioritize Carat weight over the quality of the Cut, Color, and Clarity.</li>
                                <li>Avoid diamonds with noticeable inclusions or blemishes that affect the diamond’s beauty.</li>
                                <li>Be wary of diamonds graded by less reputable labs that may inflate quality grades.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h3><strong>Still afraid of getting ripped off?</strong></h3>
            <h3>Our team are on standby for any questions you may have, just a call away!!</h3>
            <div className="button-container">
                <Link to="/request">
                    <button type="button" className="booking-button">Book an Appointment</button>
                </Link>
            </div>
        </div>
    );
};

export default Conclusion;
