import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";

const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-12">
      <InfoCard
        text="Lorem Ipsum is simply dummy text of the pri"
        img={clock}
        title="Opening Hours"
        bgClass="bg-gradient-to-r from-secondary to-primary"
      ></InfoCard>
      <InfoCard
        text="Brooklyn, NY 10036, United States"
        img={marker}
        title="Visit our location"
        bgClass="bg-accent"
      ></InfoCard>
      <InfoCard
        text="+000 123 456789"
        img={phone}
        title="Contact us now"
        bgClass="bg-gradient-to-r from-secondary to-primary"
      ></InfoCard>
    </div>
  );
};

export default Info;
