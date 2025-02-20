export function ShopCard({ item }) {
    return (
      <div className="w-full relative ">
        <h5 className="card-title bottom-6 left-6 absolute  p-3  bg-white">
          {item.title}
        </h5>
        <img src={item.img} alt={item.title} className="w-full object-cover h-full" />
      </div>
    );
  }
  