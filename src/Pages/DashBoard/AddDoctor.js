import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery("services", () =>
    fetch("http://localhost:5000/service").then((res) => res.json())
  );

  const imageStorageKey = "735cf8286683a0dafb3ab63d527b6b9d";
  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: img,
          };
        }
        console.log("Success:", result);
      });
  };

  /**
   * 3 ways to store images
   * 1. Third party storage // Free open public storage is ok for practice project
   * 2. your own storage in your own server (file system)
   * 3. Database: Mongodb
   *
   * YUP : to validate file: search : Yup File validation for react hook form
   */

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>Add a New Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------------------------------------------name start------------------------------- */}
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            class="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label class="label">
            {errors.name?.type === "required" && (
              <span class="label-text-alt text-red-500">
                {errors?.name?.message}
              </span>
            )}
          </label>
        </div>
        {/* -------------------------------------------name end------------------------------- */}

        {/* -------------------------------------------email------------------------------- */}
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            class="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
          />
          <label class="label">
            {errors.email?.type === "required" && (
              <span class="label-text-alt text-red-500">
                {errors?.email?.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span class="label-text-alt text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </label>
        </div>
        {/* -------------------------------------------specialty------------------------------- */}
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">specialty</span>
          </label>
          <select
            {...register("specialty")}
            class="select input-bordered w-full max-w-xs"
          >
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        {/* -------------------------------------------photo start------------------------------- */}
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Photo</span>
          </label>
          <input
            type="file"
            class="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Image is Required",
              },
            })}
          />
          <label class="label">
            {errors.name?.type === "required" && (
              <span class="label-text-alt text-red-500">
                {errors?.name?.message}
              </span>
            )}
          </label>
        </div>
        {/* -------------------------------------------photo end------------------------------- */}
        <input
          className="btn w-full max-w-xs text-white"
          value="Add"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
