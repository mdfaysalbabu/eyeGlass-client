import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/apiAuth/apiAuth";
import { useAppDispatch } from "../redux/features/hooks";
import { TUser, setUser } from "../redux/features/apiAuth/authSlice";
import { verifyToken } from "../utils/tokenVerify";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "babu@gmail.com",
      password: "123456",
    },
  });
  const navigate = useNavigate();
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await userLogin(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken) as TUser;
    dispatch(setUser({ user, token: res.data.accessToken }));
    toast.success("Logged in", { id: toastId, duration: 2000 });
    navigate(`/`);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[800px] m-4 shadow-lg bg-white flex flex-col lg:flex-row group text-[#0095ff] ">
        <div className="w-1/2 min-h-full bg-[#0095ff] relative overflow-hidden hidden lg:block">
          <div>
            <span>
              <h1 className="text-green-500 text-2xl absolute bottom-3 right-3 text-right">
                <span className="text-red-600">Hey!</span> <br /> Welcome to
                <br />
                <span className="text-orange-600">EyeGlass Inventory</span>
              </h1>
            </span>
          </div>
          <img
            className="w-full h-full"
            src="https://img.freepik.com/free-vector/sunglasses-with-feathers_24908-81042.jpg?w=740&t=st=1707994831~exp=1707995431~hmac=9642e646e370f53ee4769941c3a3cbddaa58c618ffc1f213508538ec6af88d0c"
            alt=""
          />
          <span className="bg-sky-800/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
          <span className="bg-sky-800/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex-1">
          <h1 className="text-3xl pb-4 text-blue-600 font-semibold ">
            Login
          </h1>
          <div className="space-y-5">
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
            Login
          </button>
          <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
            Don't have an account
            <Link
              to="/register"
              className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
