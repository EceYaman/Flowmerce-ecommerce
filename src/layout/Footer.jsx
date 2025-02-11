import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email submitted:', email);
    };
    return (
      <>
      <img src="./logo.svg" className="w-40"/>
      <div className="flex gap-x-5 pt-10">
        <img src="./facebook.svg" className="w-6"/>
        <img src="./instagram.svg" className="w-6"/>
        <img src="./twitter.svg" className="w-6"/>
      </div>

          <div>    
          <div>
            <h3 className="text-lg font-semibold">Company Info</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Carrier</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Carrier</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Features</h3>
            <ul>
              <li><a href="#">Business Marketing</a></li>
              <li><a href="#">User Analytic</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">Unlimited Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul>
              <li><a href="#">IOS & Android</a></li>
              <li><a href="#">Watch a Demo</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="border p-2 rounded" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="p-2 bg-blue-500 text-white rounded">Subscribe</button>
            </form>
          </div>
      </>
    )
}