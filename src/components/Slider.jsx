import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Slider({ slidesData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); 
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-out md:h-[90vh]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div key={slide.id} className="w-full relative flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 max-w-sm mx-auto md:max-w-lg md:mx-48">
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white text-center md:text-left md:items-start">
                <h5 className="text-xl font-semibold mb-4">{slide.subtitle}</h5>
                <h2 className="text-5xl font-bold mb-6">{slide.title}</h2>
                <p className="text-xl mb-8">{slide.paragraph}</p>
                <div className='flex flex-col gap-y-5 md:flex-row md:gap-x-10 md:items-center'>
                {slide.price ? (<p className='text-2xl font-bold'>{slide.price}</p>) : ""}
                <button className="btn bg-secondary-light">{slide.buttonText}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white"
      >
        <ChevronLeft className="w-16 h-16 stroke-1" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
      >
        <ChevronRight className="w-16 h-16 stroke-1" />
      </button>
    </div>
  );
}
