"use client";
import { AppBar, Toolbar, Container, Box, Typography, Button, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chatbot from "./chatbot";
import Parallax from "react-parallax";

import { useState, useEffect, useRef  } from "react";
// Styled Cyberpunk Button
const CyberpunkButton = styled(Button)({
  background: "linear-gradient(45deg, #00ccff, #0033ff)",
  borderRadius: 5,
  border: "2px solid #00ccff",
  color: "#ffffff",
  padding: "12px 25px",
  fontSize: "18px",
  fontWeight: "bold",
  textShadow: "0px 0px 15px rgba(0, 204, 255, 0.7)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 0px 20px rgba(0, 204, 255, 1)",
    transform: "scale(1.1)",
  },
});

// Navbar Styles
const Navbar = styled(AppBar)({
  background: "rgba(5, 5, 20, 0.95)",
  boxShadow: "0px 0px 10px rgba(0, 204, 255, 0.5)",
  backdropFilter: "blur(10px)",
  padding: "10px 0",
});

// Smooth scrolling
const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
const cyberpunkCity = "/images/cyberpunck.png";
const neonStreet = "/images/neon-street.jpg";
const neonStreet1 = "/images/neonstreet.jpg";
const pricingbg = "/images/pricing.png";
const headphonebg = "/images/headphone-bg.png";
// Images List
const images = ["/images/game1.jpg", "/images/game2.jpg", "/images/game3.jpg", "/images/game4.jpg"];

// Game Features
const features = [
  {
    title: "Neon Open World",
    description: "Explore a breathtaking cyberpunk city filled with neon-lit streets, hidden alleys, and futuristic skyscrapers.",
    image: "/images/game4.jpg",
  },
  {
    title: "AI Enemies",
    description: "Battle against intelligent AI enemies that adapt to your strategies in real-time, making every encounter unique.",
    image: "/images/game3.jpg",
  },
  {
    title: "Hacking Mechanics",
    description: "Use advanced hacking skills to take control of security systems, disable drones, and manipulate the cyber world.",
    image: "/images/game2.jpg",
  },
];

// Testimonials Data
const testimonials = [
  { name: "Rogue Hacker", review: "Cyberverse is the future of gaming!", avatar: "/images/avatar1.png" },
  { name: "Synth Samurai", review: "The music and city vibes are incredible!", avatar: "/images/avatar2.png" },
  { name: "Tech Nomad", review: "A visually stunning and immersive experience.", avatar: "/images/avatar3.png" },
];

 
export default function Home() {
  const [scale, setScale] = useState(1);
  //Update scale based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 1.5;
      const scaleFactor = 1 + Math.min(scrollY / maxScroll, 0.5); // Max scale 1.5x
      setScale(scaleFactor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [isScaled, setIsScaled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScaled(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "#0a001f", color: "#ddd", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navbar */}
      <Navbar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00ccff", textShadow: "0px 0px 10px #00ccff" }}>
            CYBERVERSE
          </Typography>
          <Box>
            {["hero", "features", "testimonials"].map((section) => (
              <Button key={section} onClick={() => scrollToSection(section)} sx={{ color: "#ddd", mx: 2, fontSize: "16px" }}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Navbar>

      {/* Hero Section */}
      <Parallax bgImage={neonStreet1} strength={500} className="parallax">

      <Container id="hero" maxWidth="xl" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", pt: 10 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: "bold", textShadow: "0px 0px 15px cyan", fontSize: { xs: "2rem", md: "3rem" } }}>
              Welcome to <span style={{ color: "#00ccff" }}>CYBERVERSE</span>
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2, opacity: 0.9 }}>
              The Future is Here. Are You Ready?
            </Typography>
            <CyberpunkButton sx={{ marginTop: 4 }}>Join the Beta</CyberpunkButton>
          </Grid>
 <br></br>
          {/* Image Carousel */}
          <Grid item xs={12} md={6}>
            <Slider {...settings}>
              {images.map((src, index) => (
                <Box key={index} sx={{ textAlign: "center", 
                  padding: "10px", 
                  borderRadius: "12px", 
                  border: "4px solid rgba(0, 204, 255, 0.8)", 
                  boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)", 
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 30px rgba(0, 204, 255, 1)",}
                 }}>
                  <img src={src} alt={`Game Screenshot ${index}`} style={{ width: "100%", borderRadius: "10px" }} />
                </Box>
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Container>
      </Parallax>
      <Parallax
      bgImage={cyberpunkCity}
      strength={300}
      renderLayer={(percentage: number) => (
        <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${1 + percentage * 0.2})`, // Adjust scale effect for a more subtle scaling
        transition: "transform 0.3s ease-out", // Smooth transition for scaling
      }}
        >
      <img
        src={headphonebg}
        alt="Cyberpunk Headphone"
        style={{
          width: "80%", // Limit the size of the image to avoid it becoming too large
          maxWidth: "500px", // You can also set a maximum width to avoid it becoming too big
          objectFit: "cover", // Ensure the image fits well without distorting
        }}
      />
        </div>
      )}
    >
  <Container id="headphone" maxWidth="xl" sx={{ py: 10, textAlign: "center", minHeight: "100vh" }}>
    <Typography variant="h3" sx={{ textShadow: "0px 0px 15px #00ccff", mb: 5 }}>
      Immerse Yourself in Sound
    </Typography>
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
          Experience High-Fidelity Audio
        </Typography>
        <Typography sx={{ opacity: 0.8, mb: 3 }}>
          Dive into the futuristic soundscape of Cyberverse with our premium audio technology. Every beat, every whisper, every explosion—delivered in crystal-clear quality.
        </Typography>
      </Grid>
    </Grid>
  </Container>
</Parallax>

      {/* Features Section */}
       <Parallax bgImage={neonStreet} strength={500}>

      <Container id="features" maxWidth="xl" sx={{ py: 10 }}>
        <Typography variant="h3" sx={{ textAlign: "center", textShadow: "0px 0px 15px #00ccff", mb: 5 }}>
          Game Features
        </Typography>
        {features.map((feature, index) => (
          <Grid key={index} container spacing={4} alignItems="center" sx={{ flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }, mb: 5 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <img src={feature.image} alt={feature.title} style={{ width: "100%" }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
                {feature.title}
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>{feature.description}</Typography>
            </Grid>
          </Grid>
        ))}
      </Container>
      </Parallax>
      <Parallax bgImage={cyberpunkCity} strength={500}>
  <Container id="testimonials" maxWidth="xl" sx={{ py: 10, textAlign: "center" }}>
    <Typography variant="h3" sx={{ textShadow: "0px 0px 15px #00ccff", mb: 5 }}>
      What Players Say
    </Typography>
    <Grid container spacing={4}>
      {testimonials.map((testimonial, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box sx={{
            padding: 3,
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>{testimonial.name}</Typography>
            <Typography sx={{ mt: 1, opacity: 0.8, fontStyle: "italic", color: "#fff" }}>"{testimonial.review}"</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Parallax>

<Parallax bgImage={pricingbg} strength={500}>
  <Container id="pricing" maxWidth="xl" sx={{ py: 10, textAlign: "center" }}>
    <Typography variant="h3" sx={{ textShadow: "0px 0px 15px #00ccff", mb: 5 }}>
      Choose Your Plan
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[
        { title: "Free", price: "$0/mo", features: ["Basic Access", "Single-Player Mode", "Limited Upgrades"], buttonText: "Get Started" },
        { title: "Pro", price: "$9.99/mo", features: ["Multiplayer Mode", "Exclusive Skins", "Advanced Hacking Tools"], buttonText: "Upgrade to Pro" },
        { title: "Premium", price: "$19.99/mo", features: ["All Pro Features", "VIP Content", "Early Access to Updates"], buttonText: "Go Premium" }
      ].map((plan, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box sx={{
            p: 4,
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)",
            backdropFilter: "blur(10px)", // Apply blur effect
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <Typography variant="h4" sx={{ color: "#00ccff", fontWeight: "bold", mb: 2 }}>{plan.title}</Typography>
            <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>{plan.price}</Typography>
            <Box sx={{ textAlign: "left", mb: 3 }}>
              {plan.features.map((feature, idx) => (
                <Typography key={idx} sx={{ opacity: 0.8, color: "#ddd", mb: 1 }}>✔ {feature}</Typography>
              ))}
            </Box>
            <CyberpunkButton>{plan.buttonText}</CyberpunkButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Parallax>

    
{/* <Parallax bgImage={pricingbg} strength={500}>
  <Container id="pricing" maxWidth="xl" sx={{ py: 10, textAlign: "center" }}>
    <Typography variant="h3" sx={{ textShadow: "0px 0px 15px #00ccff", mb: 5 }}>
      Choose Your Plan
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[
        { title: "Free", price: "$0/mo", features: ["Basic Access", "Single-Player Mode", "Limited Upgrades"], buttonText: "Get Started" },
        { title: "Pro", price: "$9.99/mo", features: ["Multiplayer Mode", "Exclusive Skins", "Advanced Hacking Tools"], buttonText: "Upgrade to Pro" },
        { title: "Premium", price: "$19.99/mo", features: ["All Pro Features", "VIP Content", "Early Access to Updates"], buttonText: "Go Premium" }
      ].map((plan, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box sx={{
            p: 4,
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <Typography variant="h4" sx={{ color: "#00ccff", fontWeight: "bold", mb: 2 }}>{plan.title}</Typography>
            <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>{plan.price}</Typography>
            <Box sx={{ textAlign: "left", mb: 3 }}>
              {plan.features.map((feature, idx) => (
                <Typography key={idx} sx={{ opacity: 0.8, color: "#ddd", mb: 1 }}>✔ {feature}</Typography>
              ))}
            </Box>
            <CyberpunkButton>{plan.buttonText}</CyberpunkButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Parallax> */}

<Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
  <Chatbot />
</Box>

    </Box>
  );
}  