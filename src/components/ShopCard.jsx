export function ShopCard({ item, className }) {
    return (
      <div className="w-full relative ">
        <h2 className="bottom-16 left-16 absolute max-w-fit px-4 py-2 text-xl font-semibold text-dark-text bg-white">
          {item.title}
        </h2>
        <img src={item.image} alt={item.title} className="w-full object-cover h-full" />
      </div>
    );
  }
  