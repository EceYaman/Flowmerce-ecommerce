export function ShopCard({ item }) {
    return (
      <div className="w-full relative ">
        <h5 className="card-title bottom-10 left-8 absolute  px-2  bg-white">
          {item.title}
        </h5>
        {item.subtitle ? (<h6 className="card-subtitle bottom-2 left-8 absolute px-2 bg-white">
          {item.subtitle}
        </h6>) : ""}
        <img src={item.image} alt={item.title} className="w-full object-cover h-full" />
      </div>
    );
  }
  