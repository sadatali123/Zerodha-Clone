import React from 'react';

function NotFound() {
    return ( 
      <div className="container p-5 mb-5">
            <div className="row text-center">
               <h2 className="mt-5 " style={{color:"#424242"}}>404 Not Found</h2>
               <p className='mt-2'>Sorry, the page you are looking for does not exist.</p>
            </div>
         </div>
    );
}

export default NotFound;