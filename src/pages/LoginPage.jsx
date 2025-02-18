import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../store/thunks';

export function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser({ email: data.email, password: data.password }, data.rememberMe));
      

      const redirectTo = (location.state && location.state.from) ? location.state.from : '/';
      history.push(redirectTo);
    } catch (error) {
     
      const errorMsg = error.response?.data?.message || "Login failed"
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Alanı */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        {/* Password Alanı */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember me</label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
