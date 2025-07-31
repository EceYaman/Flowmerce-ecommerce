export function TeamPage() {
    return(
        <div className="px-8">
            <div className="max-w-[65%] flex flex-col mx-auto text-center gap-10 my-10 md:max-w-[30%]">
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
        </div>
    )
}