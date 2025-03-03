import { AlarmClock, ChevronRight, ChartArea} from 'lucide-react';

export function BlogCard({ item}) {
    return (
        <div className="bg-white shadow-sm">
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-md text-base font-medium">
              NEW
            </span>
          </div>
          
          <div className="p-6">
            <div className="flex gap-3 mb-3">
              {item.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-gray-text text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
    
            <h4 className="text-2xl font-semibold mb-3 text-dark-text">
              {item.title}
            </h4>
            
            <p className="text-gray-text text-sm font-medium  mb-6">
              {item.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-gray-text text-sm font-medium mb-6">
              <div className="flex items-center">
                <AlarmClock className="w-4 h-4 mr-1 stroke-primary" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center">
                <ChartArea className="w-4 h-4 mr-1 stroke-secondary" />
                <span>{item.comments} comments</span>
              </div>
            </div>
    
            <button className="flex items-center text-gray-text font-semibold text-lg">
              <span>Learn More</span>
              <ChevronRight className="w-8 h-8 stroke-1 stroke-primary" />
            </button>
          </div>
        </div>
      );
};

