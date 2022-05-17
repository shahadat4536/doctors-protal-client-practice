import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, date, setTreatment }) => {
  const { _id, name, slots } = treatment;
  const handleBookinInfo = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    console.log(_id, name, slot);
    setTreatment(null);
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="booking-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">{name}</h3>
          <form
            onSubmit={handleBookinInfo}
            className="grid grid-cols-1 gap-5 mt-2"
          >
            <input
              type="text"
              name="date"
              value={format(date, "PP")}
              class="input input-bordered w-full"
            />
            <select name="slot" class="select select-bordered w-full">
              {slots.map((slot) => (
                <option value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              class="input input-bordered w-full"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              class="input input-bordered w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              class="input input-bordered w-full"
            />
            <input
              type="submit"
              value="Submit"
              class="btn btn-secondary text-white w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
