import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L1LUkCdaLiCtPNZgNYqZ9z0GEVKqa9SHtw8G3xMMBtJAPrlR9jJQpUh3HMQKSGZjWAuK35HlMzN76QbcrnBuF5w00qUa6eAMj"
);
const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/booking/${id}`;
  const {
    data: appointment,
    isLoading,
    refetch,
  } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div class="card-body">
          <p className="text-success">Hi, {appointment.patientName}</p>
          <h2 class="card-title">Pay for {appointment.treatment}</h2>
          <p>
            Your Appointment{" "}
            <span className="text-orange-600">{appointment.date}</span> at{" "}
            {appointment.slot}
          </p>
          <p>Please pay : ${appointment.price}</p>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
