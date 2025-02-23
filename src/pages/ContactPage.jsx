export function ContactPage() {
    return(
        <div className="px-8">
            <div className="max-w-[65%] flex flex-col mx-auto text-center gap-10 my-10 md:max-w-[30%]">
                <h3 className="title">Get answers to all your questions.</h3>
                <p className="text-gray-text text-base font-medium">Problems trying to resolve the conflict between the two major realms of Classical physics:</p>
                <button className="btn bg-primary md:max-w-[60%] md:mx-auto">CONTACT OUR COMPANY</button>
                <div className="flex justify-center gap-10">
                    <img src="./twitter.svg"/>
                    <img src="./facebook.svg"/>
                    <img src="./instagram.svg"/>
                </div>
            </div>
        </div>
    )
}