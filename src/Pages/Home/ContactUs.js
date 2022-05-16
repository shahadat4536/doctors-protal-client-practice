import React from "react";
import appointment from "../../assets/images/appointment.png";
import BtnPrimary from "../Shared/BtnPrimary";
const ContactUs = () => {
  return (
    <section
      style={{ background: `url(${appointment})`, backgroundSize: "cover" }}
      className=" flex flex-col justify-center items-center mt-16"
    >
      <div>
        <h2>Contact Us</h2>
        <h3>Stay connected with us</h3>
      </div>
      <div className=" grid grid-cols-1 gap-6">
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <textarea
          class="textarea input input-bordered w-full max-w-xs"
          placeholder="Bio"
        ></textarea>
      </div>
      <div>
        <BtnPrimary>Submit</BtnPrimary>
      </div>
    </section>
  );
};

export default ContactUs;
