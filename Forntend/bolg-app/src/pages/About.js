import React, { useState } from 'react';
import Base from "../components/Base";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
    {
      id: 1,
      altText: 'Slide it',
      caption: 'Slide it',
      image: 'https://img.freepik.com/premium-photo/front-view-laptop-white-table-nearby-is-document-paper-pencil-holder-modern-office-workplace_1029469-52592.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715385600&semt=ais_user',
    },
    {
      id: 2,
      altText: 'Slide to next',
      caption: 'Slide to next',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9mZmljZSUyMGRlc2t8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 3,
      altText: 'The end',
      caption: 'The end',
      image: 'https://e1.pxfuel.com/desktop-wallpaper/810/708/desktop-wallpaper-office-desk-work-table.jpg',
    },
  ];
  

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
        <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={item.image} alt={item.altText} className="d-block w-100" />
        <CarouselCaption
          className="text-black"
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Base>
      <style>
        {`.custom-tag {
          max-width: 100%;
          height: 700px;
          // background: black;
          background:rgba(0,0,0,0.8);
        }`}
      </style>
      
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </Base>
  );
};

export default About;
