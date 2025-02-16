// import React from "react";
// import { Link } from "react-router-dom";
// // import "./style/Home.css";

// const Home = () => {
//   return (
//     <div>
//       <div className='bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-700'>
//         <img className= 'w-16 ml-8 'src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
//          <div className='bg-white pb-7 py-4 px-4 '>
//           <h2 className= 'text-3xl font-bold '>Get Started with uber</h2>
//           <Link to ='/login' className='flex items-centre justify-centre w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css" // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="background">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="content">
          <h2 className="title">Get Started with Uber</h2>
          <Link to="/login" className="continue-btn">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
