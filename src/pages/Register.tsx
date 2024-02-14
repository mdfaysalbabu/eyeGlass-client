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
    // <div  className="w-full min-h-screen flex items-center justify-center ">
    //   <div className=" p-10 space-y-3 rounded-xl border b  font-sans mx-auto lg:w-[500px] drop-shadow-lg bg-teal-200 overflow-hidden  items-center justify-center  w-full max-w-[700px] m-12 shadow-lg ">
    //     <div className="md:mt-6 mt-10">
    //       <h1 className="text-3xl font-bold text-center text-indigo-600">
    //         Register
    //       </h1>

    //       <form
    //         onSubmit={handleSubmit(onSubmit)}
    //         action=""
    //         className="space-y-4 "
    //       >
    //         <div className="space-y-2 text-sm">
    //           <label htmlFor="name" className="block ">
    //             Your name
    //           </label>
    //           <input
    //             {...register("username")}
    //             type="text"
    //             id="username"
    //             placeholder="username"
    //             className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
    //           />
    //         </div>
    //         <div className="space-y-2 text-sm">
    //           <label htmlFor="email" className="block ">
    //             Your Email
    //           </label>
    //           <input
    //             {...register("email")}
    //             type="text"
    //             id="email"
    //             placeholder="email"
    //             className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
    //           />
    //         </div>
    //         <div className="space-y-2 text-sm">
    //           <label htmlFor="password" className="block ">
    //             Password
    //           </label>
    //           <input
    //             {...register("password")}
    //             type="password"
    //             name="password"
    //             id="password"
    //             placeholder="Password"
    //             className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group"
    //         >
    //           Register
    //           <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
    //             Let's go
    //           </span>
    //           <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
    //           <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
    //           <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
    //           <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
    //         </button>
    //       </form>

    //       <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
    //         have an account
    //         <Link
    //           to="/login"
    //           className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
    //         >
    //           Login
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[800px] m-4 shadow-lg bg-white flex flex-col lg:flex-row group text-[#0095ff] ">
        <div className="w-1/2 min-h-full  relative overflow-hidden hidden lg:block">
          <h1 className="text-teal-700 text-2xl absolute bottom-3 right-3 text-right">
            Hey! <br /> Welcome to
            <br /> EyeGlass Inventory
          </h1>
          <img
            className="w-full h-full rounded-lg"
            src="https://img.freepik.com/free-photo/cartoon-character-with-handbag-sunglasses_71767-99.jpg?w=740&t=st=1707879151~exp=1707879751~hmac=d7343d46ef3f3107e2ff5cf399829611dd77133fffffe7974cc50aa7d04ff775"
            alt=""
          />
          <span className="bg-sky-800/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
          <span className="bg-sky-800/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex-1">
          <h1 className="text-4xl pb-4">Register</h1>
          <div className="space-y-5">
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
