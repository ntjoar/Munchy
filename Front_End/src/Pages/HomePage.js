//This is a public page route

import React, { Component, Fragment } from "react";
import HeaderApp from "../Components/Header";
//import Carousel from "../Components/Slide";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AliceCarousel from 'react-alice-carousel';
import image1 from "../images/img1.jpg"
import image2 from "../images/img3.jpg"
import image3 from "../images/img4.jpg"
import image4 from "../images/img5.jpg"
import { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'; 

const items = [
  {
    src: image1,
    altText: '',
    caption: ''
  },
  {
    src: image2,
    altText: '',
    caption: ''

  },
  {
    src: image3,
    altText: 'Slide 3',
    caption: ''

  },
  {
    src: image4,
    altText: 'Slide 4',
    caption: ''

  }
];
const HomePage = (props) =>  {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

    return (
      <Fragment>
        <HeaderApp />
        <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>

      </Fragment>
    );
  
}

export default HomePage;
