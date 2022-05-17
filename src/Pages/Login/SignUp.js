import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const SignUp = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("update done");
    navigate("/home");
  };
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  let signError;
  if (loading || googleLoading || updating) {
    return <Loading></Loading>;
  }
  if (error || googleError || updatingError) {
    signError = (
      <p className="text-red-500 text-center">
        {error?.message || googleError?.message || updatingError?.message}
      </p>
    );
  }
  if (user || googleUser) {
    console.log(user);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl">Sign Up</h2>
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
            {/* -------------------------------------------password------------------------------- */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },

                  minLength: {
                    value: 6,
                    message: "Must be 6 characters orr longer a valid Email",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors?.password?.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span class="label-text-alt text-red-500">
                    {errors?.password?.message}
                  </span>
                )}
              </label>
            </div>
            {signError}
            <input
              className="btn w-full max-w-xs text-white"
              value="SingUp"
              type="submit"
            />
          </form>
          <p className="text-center">
            <small>
              Already have an account{" "}
              <Link className="text-primary" to="/login">
                Please Login
              </Link>
            </small>
          </p>
          <div class="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            class="btn btn-outline uppercase"
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
