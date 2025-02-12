import { data } from "../../data"

export function Header() {
    return (
      <>
      <div className="w-full flex justify-between">
        <img src={data.header.logo} className="w-40"/>

        <div className="flex gap-x-5">
          {data.header.icons.map((item, index) => (
            <img key={index} src={item} className="w-8"/>
          ))}
        </div>
      </div>

      <nav className="flex flex-col gap-y-5 my-12 text-xl text-center text-gray-text">
        {data.header.menu.map((item, index) => (
          <a key={index} href={item.href}>{item.text}</a>
        ))}
      </nav>

      </>
    )
}
 