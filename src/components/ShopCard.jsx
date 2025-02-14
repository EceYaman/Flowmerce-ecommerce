export function ShopCard({ item }) {
    return (
      <div className="w-full relative ">
        <h4 className="bottom-16 left-8 absolute max-w-fit px-4 py-2 text-xl font-semibold text-dark-text bg-white">
          {item.title}
        </h4>
        {item.subtitle ? (<h5 className="bottom-2 left-8 absolute px-4 py-2 text-lg font-semibold text-dark-text bg-white">
          {item.subtitle}
        </h5>) : ""}
        <img src={item.image} alt={item.title} className="w-full object-cover h-full" />
      </div>
    );
  }
  