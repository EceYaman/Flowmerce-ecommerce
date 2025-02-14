export function ProductCard({ item }){
 return(
        <div className="flex flex-col gap-y-5 text-center">
            <img src={item.image} alt="Product" />
            <h3 className="title">{item.title}</h3>
            <h4 className="subtitle text-gray-text">{item.subtitle}</h4>
            <div className="flex justify-center gap-2">
                <h4 className="subtitle text-light-text ">{item.price.original}</h4>
                <h4 className="subtitle text-secondary">{item.price.discount}</h4>
            </div>
            <div className="flex justify-center gap-2">
                {item.colors.map((item, index) => (
                <span
                    key={index}
                    className={`w-5 h-5 rounded-full ${item}`} 
                />
                ))}
            </div>
        </div>
    )
}