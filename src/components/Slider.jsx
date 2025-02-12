import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { data } from '../../data';


export function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.slides.map((slide) => (
          <div key={slide.id} className="w-full relative flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 max-w-sm mx-auto">
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white text-center ">
                <h3 className="text-xl font-semibold mb-4">
                  {slide.subtitle}
                </h3>
                <h2 className="text-5xl font-bold mb-6">
                  {slide.title}
                </h2>
                <p className="text-xl mb-8">
                  {slide.paragraph}
                </p>
                <button className="btn bg-secondary-light">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2  text-white"
      >
        <ChevronLeft className="w-16 h-16"/>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2  text-white"
      >
        <ChevronRight className="w-16 h-16" />
      </button>
    </div>
  );
}