import React from "react";

const InfoCard = ({ img, title, bg, text }) => {
  return (
    <div class={`card lg:card-side bg-base-100 shadow-xl  ${bg}`}>
      <figure>
        <img className="pl-5" src={img} alt="Album" />
      </figure>
      <div class="card-body text-white">
        <h2 class="card-title">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default InfoCard;
