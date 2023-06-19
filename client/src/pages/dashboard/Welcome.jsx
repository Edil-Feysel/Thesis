import React from "react";
import "./index.css"; 

const Welcome = () => {
  const username = JSON.parse(sessionStorage.getItem("autenthicate"));

  return (
    <div className="welcome-container">
      <h2 className="welcome-text">
        Welcome Back, {username}!
      </h2>
      <p className="description-text">
        This website aims to revolutionize the conventional education system by introducing innovative changes. One significant aspect of our platform is the integration of the Chapa payment system. With this feature, we provide a seamless and efficient payment solution for transactions within the education ecosystem. The Chapa payment system streamlines financial processes, ensuring faster and more secure transactions for various educational services, such as course enrollment, resource access, and fee payments. Join us on this transformative journey to digitalize Ethiopia and to create a friendly, accessible, efficient, and engaging learning environment for learners and educators worldwide.
      </p>
    </div>
  );
};

export default Welcome;
