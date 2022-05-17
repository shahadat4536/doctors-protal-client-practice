import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const BookingModal = ({ treatment, date, setTreatment }) => {
  const [user, loading, error] = useAuthState(auth);
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
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || " "}
              placeholder="Full Name"
              class="input input-bordered w-full"
            />
            <input
              type="text"
              name="email"
              value={user.email || " "}
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
