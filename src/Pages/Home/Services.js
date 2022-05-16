import React from "react";
import fluoride from "../../assets/images/fluoride.png";
import cavity from "../../assets/images/cavity.png";
import whitening from "../../assets/images/whitening.png";
import Service from "./Service";
import ServiceBanner from "./ServiceBanner";
const Services = () => {
  const services = [
    {
      _id: 1,
      img: fluoride,
      name: "Fluoride Treatment",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 2,
      img: cavity,
      name: "Cavity Filling",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 3,
      img: whitening,
      name: "Teeth Whitening",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];
  console.log(services);

  return (
    <div className="my-28">
      <div className="text-center py-4">
        <h3 className="text-xl text-primary">OUR SERVICES</h3>
        <h2 className="text-4xl">Services We Provide</h2>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service service={service}></Service>
        ))}
      </div>
      <ServiceBanner></ServiceBanner>
    </div>
  );
};

export default Services;
