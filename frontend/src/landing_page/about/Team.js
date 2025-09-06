import React from "react";
function Team() {
  return (
    <div className="container mb-5">
      <div className="row text-center mt-3">
        <h2 className="mt-5 fs-3 text-center" style={{ color: "#424242" }}>
          People
        </h2>
      </div>

      <div className="row mt-5">
        <div className="col-6 text-center" style={{marginRight:"-55px", color: "#424242"  }}>
          <img src="media/images/nithinKamath.jpg" alt="Nithin Kamath, CEO" style={{ borderRadius: "100%", width:"50%", marginLeft:"100px", marginTop:"-30px"}}/>
          <h4 className="mt-4" style={{marginLeft:"80px"}}>Nithin Kamath</h4>
          <h6 className="mt-3" style={{marginLeft:"80px"}}>Founder, CEO</h6>
        </div>
        <div className="col-5"  style={{ textAlign: "justify",fontSize:"16px", lineHeight:"1.8"}}>
         <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
         </p>
         <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
         </p>
         <p>
            Playing basketball is his zen.
         </p>
         <p >
            Connect on <a href="#" style={{textDecoration:"none"}}>Homepage / TradingQnA / Twitter</a>
         </p>
        </div>
        <div className="col-1"></div>
      </div>
     

       <div className="row mt-5 p-5">
        <div className="col-4 team-container text-center" >
          <img src="media\images\Nikhil.jpg" alt="Nikhil Kamath, Cheif Investment Officer" style={{ borderRadius: "100%", width:"60%"}}/>
          <h4 className="mt-4">Nikhil Kamath</h4>
          <h6 className="mt-3">Co-founder & CFO</h6>
        </div>
        <div className="col-4 team-container text-center">
           <img src="media\images\Kailash.jpg" alt="Dr. Kailash Nadh," style={{ borderRadius: "100%", width:"60%"}}/>
           <h4 className="mt-4" >Dr. Kailash Nadh</h4>
          <h6 className="mt-3" >CTO</h6>
        </div>
        <div className="col-4 team-container text-center">
           <img src="media\images\Venu.jpg" alt="Venu Madhav" style={{ borderRadius: "100%", width:"60%"}}/>
           <h4 className="mt-4" >Venu Madhav</h4>
          <h6 className="mt-3" >COO</h6>
        </div>
      </div>

       <div className="row mt-5 p-5">
        <div className="col-4 team-container text-center" >
          <img src="media\images\Hanan.jpg" alt="Hanan Delvi" style={{ borderRadius: "100%", width:"60%"}}/>
          <h4 className="mt-4">Hanan Delvi</h4>
          <h6 className="mt-3">CCO</h6>
        </div>
        <div className="col-4 team-container text-center">
           <img src="media\images\Seema.jpg" alt="Seema Patil," style={{ borderRadius: "100%", width:"60%"}}/>
           <h4 className="mt-4" >Seema Patil</h4>
          <h6 className="mt-3" >Director</h6>
        </div>
        <div className="col-4 team-container text-center">
           <img src="media\images\Karthik.jpg" alt="Karthik Rangappa" style={{ borderRadius: "100%", width:"60%"}}/>
           <h4 className="mt-4" >Karthik Rangappa</h4>
          <h6 className="mt-3" >Chief of Education</h6>
        </div>
      </div>
     
      <div className="row mt-5 p-5">
        <div className="col-4 team-container text-center" >
          <img src="media\images\Austin.jpg" alt="Austin Prakesh" style={{ borderRadius: "100%", width:"60%"}}/>
          <h4 className="mt-4">Austin Prakesh</h4>
          <h6 className="mt-3">Director Strategy</h6>
        </div>
      </div>
    </div>
  );
}

export default Team;
