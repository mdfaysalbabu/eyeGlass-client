import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/features/hooks";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useRegisterMutation } from "../redux/features/register/registerApi";
import { setRegister } from "../redux/features/register/registerSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait");
    try {
      console.log(data);
      const userInfo = {
        name: data.username,
        email: data.email,
        password: data.password,
      };

      dispatch(
        setRegister({
          name: data.username,
          email: data.email,
          password: data.password,
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await registerUser(userInfo);
      console.log(res);
      if (res?.error?.data) {
        toast.error(`${data.email} Already used`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Registration successful!", {
          id: toastId,
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl border b  font-sans mx-auto lg:w-[500px] drop-shadow-lg bg-purple-200 mt-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        Register
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6 ">
        <div className="space-y-2 text-sm">
          <label htmlFor="name" className="block ">
            Your name
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="username"
            className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
          />
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="email" className="block ">
            Your Email
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="email"
            className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
          />
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="password" className="block ">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
          />
        </div>
        <button
          type="submit"
          className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group"
        >
          Register
          <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
            Let's go
          </span>
          <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
          <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
          <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
          <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
        </button>
      </form>

      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
        Don't have an account?
        <Link to="/login" className="underline hover:text-indigo-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
