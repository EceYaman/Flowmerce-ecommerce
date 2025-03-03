import { useState } from "react";
import { data } from "../../data";
import { useForm } from "react-hook-form";

export function Footer() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');

  const onSubmit = (data) => {
    console.log('Email submitted:', data.email);
  };

    return (
      <>
      <div className="w-full p-8 bg-gray-light my-16 md:flex md:justify-between md:items-center md:px-32 md:py-14">
        <img src={data.footer.logo} alt="Logo" className="w-40" />
        <div className="flex gap-x-5 pt-8 md:pt-0">
          {data.footer.socialMedia.map((item, index) => (
            <img key={index} src={item} className="w-6"/>
          ))}
        </div>
      </div>

      <div className="md:flex md:flex-row md:justify-between md:mx-24 md:my-16">
      <div className="flex flex-col items-start gap-y-4 font-semibold px-8 md:flex-row md:gap-x-28">
        {data.footer.columns.map((column, index) => (
          <div key={index}>
            <h6 className="text-dark-text text-lg leading-12">{column.title}</h6>
            <ul className="text-gray-text text-base leading-8">
              {column.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start font-semibold px-8 mb-16">
        <h6 className="text-dark-text text-lg pt-4 leading-12">Get in Touch</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Your email"
            className="bg-gray-light h-14 rounded px-4"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-alert">{errors.email.message}</p>}
          <button type="submit" className="btn bg-primary">Subscribe</button>
        </form>
      </div>
      </div>  

      <div className="w-full p-8 bg-gray-light text-xl text-gray-text font-semibold md:px-32">
        <p className="w-60 mx-auto text-center md:text-left md:w-full">Made With Love By Finland All Right Reserved</p>
      </div>
      
      </>
    )
}