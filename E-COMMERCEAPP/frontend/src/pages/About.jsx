import React from "react";
import "../App.css";
import aboutImg from "../assets/aboutimg.png";

const About = () => {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About US</h1>
        <p>Where style meets purpose — redefining fashion for the modern woman.</p>
      </section>

      {/* About Section (Image Left, Text Right) */}
<section className="about-overview-with-img">
  <div className="about-img">
    <img src={aboutImg} alt="About Womenzia" />
  </div>

  <div className="about-text-content">
    <h2>About WOMENZIA</h2>
    <p>
      At <strong>WOMENZIA</strong>, fashion is more than just clothing — it’s an expression of identity, confidence, and empowerment. We create timeless, elegant collections designed to inspire and uplift every woman’s unique style.
    </p>

    <div className="overview-boxes">
      {/* <div className="overview-box">
        <h3>Who We Are</h3>
        <p>
          A modern fashion brand dedicated to empowering women through quality, comfort, and style — blending trends with individuality.
        </p>
      </div> */}

      <div className="overview-box">
        <h3>Our Mission</h3>
        <p>
          To inspire confidence and expression in every woman by providing fashion that empowers, celebrates, and transforms.
        </p>
      </div>

      <div className="overview-box">
        <h3>Our Vision</h3>
        <p>
          To become the most loved women-centric brand that combines innovation, inclusivity, and elegance in everyday fashion.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose WOMENZIA?</h2>
        <div className="choose-cards">
          <div className="choose-card" data-aos="fade-up">
            <h4>Premium Quality</h4>
            <p>Every fabric, every stitch reflects care and class.</p>
          </div>
          <div className="choose-card" data-aos="fade-up" data-aos-delay="200">
            <h4>Made for Women</h4>
            <p>Designed with women, for women — inclusive and empowering.</p>
          </div>
          <div className="choose-card" data-aos="fade-up" data-aos-delay="400">
            <h4>Trendy & Timeless</h4>
            <p>We mix trends with elegance for a fashion that never fades.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
