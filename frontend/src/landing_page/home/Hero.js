import React from 'react';
import '../../index.css';
 function Hero() {
    return ( 
         <div className="container p-5 mb-5">
            <div className="row text-center">
               <img src="/media/images/homeHero.png" alt="Hero Image" className="mb-5" />
               <h1 className="mt-5 " style={{color:"#424242"}}>Invest in everything</h1>
               <p className='mt-2'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
               <button type="button" className="btn btn-primary button">Sign up for free</button>
            </div>
         </div>

     );
 }
 
 export default Hero;