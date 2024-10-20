// src/widgets/Kittens/Kittens.tsx

import React from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import kitten1 from '../../assets/kittens/kitten-1.jpg';
import kitten2 from '../../assets/kittens/kitten-2.jpg';
import kitten3 from '../../assets/kittens/kitten-3.jpg';
import kitten4 from '../../assets/kittens/kitten-4.jpg';
import kitten5 from '../../assets/kittens/kitten-5.jpeg';

import 'swiper/css';
import 'swiper/css/effect-fade';

import './Kittens.scss';

const Kittens: React.FC = () => {
  const kittenImages = [kitten1, kitten2, kitten3, kitten4, kitten5];

  return (
    <div className="kittens-widget fadeIn">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 10000 }}
        className="kittens-swiper"
      >
        {kittenImages.map((imgSrc, index) => (
          <SwiperSlide key={index} className="kittens-swiper__slide">
            <img src={imgSrc} alt={`Kitten ${index + 1}`} className="kittens-swiper__image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Kittens;
