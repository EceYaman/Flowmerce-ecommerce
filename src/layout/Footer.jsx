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
      <div className="w-full left-0 absolute p-8 bg-gray-light">
        <img src={data.footer.logo} alt="Logo" className="w-40" />
        <div className="flex gap-x-5 pt-8">
          {data.footer.socialMedia.map((item, index) => (
            <img key={index} src={item} className="w-6"/>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-y-10 mt-64 font-semibold">
        {data.footer.columns.map((column, index) => (
          <div key={index}>
            <h3 className="text-dark-text text-lg leading-12">{column.title}</h3>
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

      <div className="flex flex-col items-start mb-20 font-semibold">
        <h3 className="text-dark-text text-lg pt-10 leading-12">Get in Touch</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Your email"
            className="bg-gray-light h-14 rounded px-8"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-alert">{errors.email.message}</p>}
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
      </div>
      <div className="w-full left-0 absolute p-8 bg-gray-light text-xl text-gray-text font-semibold text-center">
        <p>Made With Love By</p>
        <p>Finland All Right Reserved</p>
      </div>
      </>
    )
}