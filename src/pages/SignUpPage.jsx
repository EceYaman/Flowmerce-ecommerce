import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import api from "../services/api"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUpPage() {
  const [roles, setRoles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      role_id: "customer",
    },
  })

  const password = watch("password", "")
  const roleId = watch("role_id", "customer")
  const isStoreSelected = roleId === "store" || roleId === "2"

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles")
        setRoles(response.data)
      } catch (error) {
        console.error("Error fetching roles:", error)
      }
    }
    fetchRoles()
  }, [])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const { confirmPassword, store_name, store_phone, tax_no, bank_account, ...formData } = data

      if (isStoreSelected) {
        formData.store = { name: store_name, phone: store_phone, tax_no, bank_account }
      }

      await api.post("/signup", formData)
      toast.success("Welcome!You need to click link in email to activate your account!")
      history.goBack()
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during signup")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderErrorMessage = (field) => errors[field] && <p className="mt-1 text-sm text-alert">{errors[field].message}</p>

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h3 className="title mb-2">Create your account</h3>
        <p className="text-gray-text text-base">Join us and explore amazing products</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            placeholder="Enter your full name"
            className="form-input"
          />
          {renderErrorMessage("name")}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
            })}
            placeholder="Enter your email"
            className="form-input"
          />
          {renderErrorMessage("email")}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/, message: "Password must include numbers, lowercase, uppercase, and special characters" },
            })}
            placeholder="Create a strong password"
            className="form-input"
          />
          {renderErrorMessage("password")}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className="form-input"
          />
          {renderErrorMessage("confirmPassword")}
        </div>

        {/* Account Type / Role */}
        <div>
          <label htmlFor="role_id" className="form-label">Account Type</label>
          <select
            id="role_id"
            {...register("role_id")}
            className="form-input"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {isStoreSelected && (
          <>
            {/* Store Name */}
            <div>
              <label htmlFor="store_name" className="form-label">Store Name</label>
              <input
                id="store_name"
                type="text"
                {...register("store_name", { required: "Store name is required", minLength: { value: 3, message: "Store name must be at least 3 characters" } })}
                placeholder="Enter your store name"
                className="form-input"
              />
              {renderErrorMessage("store_name")}
            </div>

            {/* Store Phone */}
            <div>
              <label htmlFor="store_phone" className="form-label">Store Phone</label>
              <input
                id="store_phone"
                type="tel"
                {...register("store_phone", { required: "Store phone is required", pattern: { value: /^(\+90|0)?[0-9]{10}$/, message: "Invalid Turkish phone number" } })}
                placeholder="0XXX XXX XX XX"
                className="form-input"
              />
              {renderErrorMessage("store_phone")}
            </div>

            {/* Store Tax ID */}
            <div>
              <label htmlFor="tax_no" className="form-label">Store Tax ID</label>
              <input
                id="tax_no"
                type="text"
                {...register("tax_no", { required: "Tax ID is required", pattern: { value: /^T\d{4}V\d{6}$/, message: "Invalid Tax ID format (TXXXXVXXXXXX)" } })}
                placeholder="T XXXX V XXXXXX"
                className="form-input"
              />
              {renderErrorMessage("tax_no")}
            </div>

            {/* Store Bank Account */}
            <div>
              <label htmlFor="bank_account" className="form-label">Store Bank Account</label>
              <input
                id="bank_account"
                type="text"
                {...register("bank_account", { required: "Bank account is required", pattern: { value: /^TR\d{24}$/, message: "Invalid IBAN format" } })}
                placeholder="TR..."
                className="form-input"
              />
              {renderErrorMessage("bank_account")}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div className="flex flex-col gap-2 items-center justify-center my-6">
        <p className="text-gray-text text-sm">-or continue with-</p>
        <div className="w-full flex justify-between">
        <button className="w-[48%] bg-white text-gray-text py-2 border border-light-text rounded-lg hover:text-dark-text">Google</button>
        <button className="w-[48%] bg-white text-gray-text py-2 border border-light-text rounded-lg hover:text-dark-text">Facebook</button>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center">
      <p className="text-gray-text text-sm">Already have an account?</p>
      <Link to="/login" className='text-base text-primary font-semibold'>Sign in</Link>
      </div>
    </div>
  )
}
