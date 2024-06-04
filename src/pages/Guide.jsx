import React from 'react';
import "../css/Guide.css";
import { Link } from "react-router-dom";

const Guide = () => {
  return (
    <div>
      <nav>
      <Link to="/HomePage">Home</Link> &gt;<Link to="/Guide">Validation</Link>
      </nav>
      <section>
        <h1>Take into account the 4 C's when you are buying a diamond</h1>
        <p>Buying a diamond online can be overwhelming. You have a variety of possibilities to choose from once you begin your search. If you like to purchase a certified diamond for less money you will have to carefully research and make the right choices. If you are looking to design your personal diamond engagement ring or other diamond jewelry you need to choose a stone which fits your individual taste. Loose diamonds come in a variety of shapes, sizes, colors and cuts. Four fundamental characteristics determine the quality and value of the stone, they are also known as the 4 Cs:</p>
        <ol>
          <li>Diamond Cut: how the cut impacts the price of the diamond</li>
          <li>Diamond Clarity: how clarity can be used to save money on your diamond purchase</li>
          <li>Diamond Color: using color to buy the diamond you want at the right price</li>
          <li>Diamond Carat Weight: Buying your diamond smart using the weight as a factor</li>
        </ol>
        <h1>All these 4 qualities affect the look and pricing of your stone and must be considered when selecting your loose certified diamond.</h1>
        <ul>
          <li>
            <strong>Cut:</strong> This characteristic determines the brilliance or shine of your diamond. A diamond wrongly cut will look dull and unattractive.
          </li>
          <li>
            <strong>Colour:</strong> The color of a diamond represents the amount of color present in the diamond. Colorless diamonds are graded with a D, the more tints of yellow color present in a diamond the higher the grading will be. Colourless or white diamonds are the most precious ones.
          </li>
          <li>
            <strong>Carat:</strong> The weight of a diamond is represented by carat (one carat equals 0.2 gram).
          </li>
          <li>
            <strong>Clarity:</strong> The number of impurities (clouds, feathers,...) that are present in a diamond is measured with the clarity scale. Going from Flawless op to included (IF/F - I)
          </li>
        </ul>
        <p>It's very important to understand the different facts of diamond grading before you select your stone. We advice you to visit our Diamond Learning Center to learn more about certified diamonds, diamond characteristics and quality.</p>
        <h2>Need help finding what you are looking for?</h2>
        <p>Get in touch with our specialist team for assistance on finding the perfect diamond for you. We can arrange a video call, chat or office visit. (Or explore on your own with our simple diamond's chart:</p>
        <button>Book an Appointment</button>
      </section>
      <hr></hr>
    </div>
  );
};

export default Guide;
