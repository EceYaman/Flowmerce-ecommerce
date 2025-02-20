import { Link } from "react-router-dom";

export function CategoryCard({ item }) {
  
  const genderToText = (g) => (g === 'k' ? 'kadin' : 'erkek');

  const formatTitle = (title) => {
    return title
      .toLowerCase()
      .replace('ı', 'i')
      .replace('ç', 'c')
      .replace('ş', 's')
      .replace('ğ', 'g')
      .replace('ü', 'u')
      .replace('ö', 'o')
      .replace(/[^a-z0-9]/gi, ''); 
  };

    return (
      <div className="w-full relative transform transition-transform duration-300 hover:scale-105">
        <Link to={`/shop/${genderToText(item.gender)}/${formatTitle(item.title)}/${item.id}`}>
        
        <h2 className="text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white shadow ">
          {item.title}
        </h2> 
        <img src={item.img} alt={item.title} className="w-full object-cover max-h-80 md:max-h-56 " />

        </Link>
      </div>
      
    );
  }
  