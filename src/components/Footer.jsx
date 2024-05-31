import React from 'react'

const Footer = () => {
  return (
    //<div>Footer</div>
    
    <footer className="footer">
    <div className="contact-information">
      <h3>Contact information</h3>
      <address>
        Antwerpdiamonds.direct<br />
        Pelikaanstraat 78 - room 2002, 2018 Antwerp, BE<br />
        0032-3-233-91-60<br />
        info@antwerpdiamonds.direct
      </address>
    </div>
    <div className="newsletter">
      <h3>Sign up to not miss any news</h3>
      <p>Enter your latest offers, news and promotions straight to your inbox. Join our email promotions list and we’ll let you know about the best deals!</p>
      <button className="subscribe-button">Subscribe</button>
    </div>
  </footer>
  )
}

export default Footer