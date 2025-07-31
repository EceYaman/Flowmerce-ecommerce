import { PlayCircleIcon } from "lucide-react";
import { data } from "../../data";

export function AboutUsPage() {
    return(
        <>
            <div className="flex flex-col items-center px-8 gap-8 my-16 md:flex-row md:justify-between md:px-32">
                <div className="flex flex-col items-center gap-8 md:items-start">
                    <h3 className="title">ABOUT US</h3>
                    <p className="max-w-[70%] text-center text-base text-gray-text md:text-left">We know how large objects will act, but things on a small scale just do not act that way.</p>
                    <button className="btn bg-primary">Get Quote Now</button>
                </div>
                <img src="https://img.freepik.com/premium-photo/fashion-design-planning-team-meeting-with-ideas-color-texture-clothes-luxury-brand-creative-business-designer-boutique-teamwork-staff-brainstorming-creativity-office_590464-163863.jpg"/>
            </div>
            <div className="flex flex-col items-center px-8 gap-8 mb-16 md:flex-row md:justify-between md:px-32">
                <div className="flex flex-col items-center gap-8 md:items-start">
                    <h6 className="text-alert text-base font-semibold">Problems trying</h6>
                    <h4 className="text-dark-text font-bold text-2xl  max-w-[70%] text-center md:text-left">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent</h4>
                </div>
                <p className="text-center text-base text-gray-text  max-w-[70%] md:text-left">Problems trying to resolve the conflict bet the two major realms of Classical physics: Newtonian mechanics</p>
            </div>
            <div className="px-8 flex flex-col items-center gap-8 mb-16 md:flex-row md:justify-between md:px-32">
                <div className="text-center">
                    <p className="text-dark-text text-4xl font-bold">15K</p>
                    <p className="text-gray-text text-sm font-medium">Happy Customers</p>
                </div>
                <div className="text-center">
                    <p className="text-dark-text text-4xl font-bold">150K</p>
                    <p className="text-gray-text text-sm font-medium">Monthly Visitors</p>
                </div>
                <div className="text-center">
                    <p className="text-dark-text text-4xl font-bold">15</p>
                    <p className="text-gray-text text-sm font-medium">Countries Worldwide</p>
                </div>
                <div className="text-center">
                    <p className="text-dark-text text-4xl font-bold">100+</p>
                    <p className="text-gray-text text-sm font-medium">Top Partners</p>
                </div>
            </div>

            <div className="px-8 flex flex-col items-center mb-16 relative">
                <img src="https://img.freepik.com/premium-photo/fashion-design-planning-team-meeting-with-ideas-color-texture-clothes-luxury-brand-creative-business-designer-boutique-teamwork-staff-brainstorming-creativity-office_590464-163863.jpg" />
                <PlayCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-16 h-16" />
            </div>

            <div className="max-w-[65%] flex flex-col mx-auto text-center gap-10 my-10 md:max-w-[30%] px-8 mb-16">
                <h3 className="text-dark-text text-4xl font-bold">Meet Our Team</h3>
                <p className="text-gray-text text-base font-medium">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian machanics</p>
                <div className="flex flex-col gap-10 justify-center md:flex-row">
                    <div className="flex flex-col gap-3">
                        <img src="https://avatars.githubusercontent.com/u/8511119?v=4" className="md:max-w-64" />
                        <p className="text-dark-text text-xl font-semibold text-left">Gökhan Özdemir</p>
                        <p className="text-gray-text text-lg text-left">Project Manager</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <img src="https://i.ibb.co/FqXX8QHt/foto9.jpg" className="md:max-w-64" />
                        <p className="text-dark-text text-xl font-semibold text-left">Ece Yaman</p>
                        <p className="text-gray-text text-lg text-left">Full Stack Developer</p>
                    </div>
                </div>
           </div>

            <div className="flex flex-col items-center px-8 gap-8 mb-16 md:px-32">
                <h3 className="title text-center max-w-[70%]">Big Companies Are Here</h3>
                <p className="text-center text-base text-gray-text  max-w-[70%] md:max-w-[40%]">Problems trying to resolve the conflict bet the two major realms of Classical physics: Newtonian mechanics</p>
                <div className="flex flex-col items-center space-y-8 md:flex-row md:gap-28">
                    {data.brandLogos.map((logo, index) => (
                        <img
                        key={index}
                        src={logo.src}
                        alt={logo.alt}
                        className="w-20"
                        />
                    ))}
                </div>
            </div>
            
            <div className="bg-primary w-full px-8 flex flex-col items-center gap-8 py-12 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-8">
                    <h6 className="text-base font-semibold text-white">WORK WITH US</h6>
                    <h4 className="text-3xl font-bold text-white max-w-[70%] text-center">Now Let's Grow Yours</h4>
                    <p className="text-center text-base text-white  max-w-[70%] md:max-w-[40%] ">The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th</p>
                    <button className="btn border border-white rounded text-base font-medium">Contact</button>
                </div>
                <img src="https://img.freepik.com/premium-photo/midsection-businessmen-with-color-swatch-desk-office_1048944-5002920.jpg" className="hidden md:block"/>
            </div>
        </>
    )
}