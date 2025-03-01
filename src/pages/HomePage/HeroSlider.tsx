import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: "Organic Farming Solutions",
    subtitle: "Sustainable Agriculture for a Better Tomorrow",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop",
    description: "Discover our range of organic farming products and solutions."
  },
  {
    title: "Smart Farming Technology",
    subtitle: "Precision Agriculture at Your Fingertips",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a4?w=1200&h=600&fit=crop",
    description: "Leverage technology for better crop yields and farm management."
  },
  {
    title: "Sustainable Seeds",
    subtitle: "Quality Seeds for Better Yields",
    image: "https://images.unsplash.com/photo-1584942368913-b98dd9983c7e?w=1200&h=600&fit=crop",
    description: "Premium quality seeds for various crops and conditions."
  }
];

const HeroSlider = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="slide-overlay">
                <div className="slide-text">
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                  <p>{slide.description}</p>
                  <button onClick={() => navigate('/products')}>
                    View Products
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;