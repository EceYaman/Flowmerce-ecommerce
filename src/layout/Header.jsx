export function Header() {
    return (
      <>
      <div className="w-full flex justify-between">
      <img src="./logo.svg" className="w-40"/>
      <div className="flex gap-x-5">
        <img src="./user.svg" className="w-8"/>
        <img src="./search.svg" className="w-8"/>
        <img src="./shop.svg" className="w-8"/>
        <img src="./menu.svg" className="w-8"/>
      </div>
      </div>

      <nav className="flex flex-col text-xl gap-y-5 my-10">
        <a href="">Home</a>
        <a href="">Product</a>
        <a href="">Pricing</a>
        <a href="">Contact</a>
      </nav>
      </>
    )
}
 