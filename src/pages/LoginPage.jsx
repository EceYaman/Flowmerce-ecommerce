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
      <h3 className="h3 mb-4 text-center">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Alanı */}
        <div>
          <label htmlFor="email" className="form-label">Email</label>
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
            className="form-input"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-alert text-sm mt-1">{errors.email.message}</p>}
        </div>
        {/* Password Alanı */}
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="form-input"
            placeholder="********"
          />
          {errors.password && <p className="text-alert text-sm mt-1">{errors.password.message}</p>}
        </div>
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-text">Remember me</label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className="text-sm text-gray-text text-center">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold text-base">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
