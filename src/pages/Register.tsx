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
   
    <div className="w-full min-h-screen flex items-center justify-center fixed ">
      <div className="w-full max-w-[800px] m-4 shadow-lg bg-white flex flex-col lg:flex-row group text-[#0095ff] ">
        <div className="w-1/2 min-h-full  relative overflow-hidden hidden lg:block mb-6">
          <img
            className="w-full h-full rounded-lg"
            src="https://img.freepik.com/free-vector/specs-concept-illustration_114360-435.jpg?w=740&t=st=1707994897~exp=1707995497~hmac=0f005ee1809f8cb43800654e496f8c3d0f87cd8e4420858262cd888f5e6c95c7"
            alt=""
          />
          <span className="bg-sky-800/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
          <span className="bg-sky-800/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex-1 ">
          <h1 className="text-4xl pb-2">Register</h1>
          <div className="space-y-5 ">
            <label htmlFor="name" className="block">
              Your Name
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="username"
              className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dashed  invalid:border-red-700 valid:border-[#0095ff]"
            />
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="email"
              min={5}
              className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dashed invalid:border-red-700 valid:border-[#0095ff]"
            />
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              min={5}
              className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dashed invalid:border-red-700 valid:border-[#0095ff]"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-5 mb-4 mt-8  w-full overflow-hidden shadow-lg border-2 rounded-md border-dashed border-[#0095ff] before:block before:absolute before:translate-x-full before:inset-0 before:bg-[#0095ff] before:hover:translate-x-0  before:duration-300 before:rounded-s-full before:-z-10 after:-z-10 after:rounded-e-full after:duration-300 after:hover:translate-x-0 after:block after:absolute after:-translate-x-full after:inset-0 after:bg-[#0095ff] relative inline-block hover:text-white z-50"
          >
            Register
          </button>
          <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
            Already have an account
            <Link
              to="/login"
              className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
