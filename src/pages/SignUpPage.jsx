import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import api from "../services/api"

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

  // Roles API çağrısını yapıyoruz
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
      alert("You need to click the link in the email to activate your account!")
      history.goBack()
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during signup")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderErrorMessage = (field) => errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field].message}</p>

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-600">Join us today and explore amazing products</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {renderErrorMessage("name")}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
            })}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {renderErrorMessage("email")}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/, message: "Password must include numbers, lowercase, uppercase, and special characters" },
            })}
            placeholder="Create a strong password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {renderErrorMessage("password")}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              validate: (value) => value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {renderErrorMessage("confirmPassword")}
        </div>

        {/* Account Type / Role */}
        <div>
          <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
          <select
            id="role_id"
            {...register("role_id")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {/* Ekstra mağaza alanları: Eğer "store" seçiliyse */}
        {isStoreSelected && (
          <>
            {/* Store Name */}
            <div>
              <label htmlFor="store_name" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input
                id="store_name"
                type="text"
                {...register("store_name", { required: "Store name is required", minLength: { value: 3, message: "Store name must be at least 3 characters" } })}
                placeholder="Enter your store name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderErrorMessage("store_name")}
            </div>

            {/* Store Phone */}
            <div>
              <label htmlFor="store_phone" className="block text-sm font-medium text-gray-700 mb-1">Store Phone</label>
              <input
                id="store_phone"
                type="tel"
                {...register("store_phone", { required: "Store phone is required", pattern: { value: /^(\+90|0)?[0-9]{10}$/, message: "Invalid Turkish phone number" } })}
                placeholder="Enter your store phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderErrorMessage("store_phone")}
            </div>

            {/* Store Tax ID */}
            <div>
              <label htmlFor="tax_no" className="block text-sm font-medium text-gray-700 mb-1">Store Tax ID</label>
              <input
                id="tax_no"
                type="text"
                {...register("tax_no", { required: "Tax ID is required", pattern: { value: /^T\d{4}V\d{6}$/, message: "Invalid Tax ID format (TXXXXVXXXXXX)" } })}
                placeholder="e.g. T1234V123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderErrorMessage("tax_no")}
            </div>

            {/* Store Bank Account */}
            <div>
              <label htmlFor="bank_account" className="block text-sm font-medium text-gray-700 mb-1">Store Bank Account</label>
              <input
                id="bank_account"
                type="text"
                {...register("bank_account", { required: "Bank account is required", pattern: { value: /^TR\d{24}$/, message: "Invalid IBAN format" } })}
                placeholder="e.g. TR330006100519786457841326"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderErrorMessage("bank_account")}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  )
}
