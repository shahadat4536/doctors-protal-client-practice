import React, { useEffect } from "react";
import auth from "../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  let signError;
  useEffect(() => {
    if (user || googleUser) {
      navigate(from, { replace: true });
    }
  }, [user, googleUser]);
  if (loading || googleLoading) {
    return <Loading></Loading>;
  }
  if (error || googleError) {
    signError = (
      <p className="text-red-500 text-center">
        {error?.message || googleError?.message}
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              value="Login"
              type="submit"
            />
          </form>
          <p className="text-center">
            <small>
              New to Doctors Portal?{" "}
              <Link className="text-primary" to="/signup">
                Create new account
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

export default Login;
