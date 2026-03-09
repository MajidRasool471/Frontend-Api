import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function ForgotPassword() {
      const navigate = useNavigate();

    const initialValues = { email: ""};
        const validationSchema =
        Yup.object({
            email: Yup.string().email("Invalid email").required("Email Required"),
        });
          const handleSubmit = async (values,
            {setFieldError}) => {
            try {
                await axios.post("http://localhost:5000/api/auth/forgot-password", {
                    email: values.email,
                });
                  localStorage.setItem("resetEmail",
                    values.email);

             navigate("/reset-password");
            } catch (error) {
            if (error.response &&
                error.response.data.message) {
                 setFieldError("email",
                    error.response.data.message);
                }
            }
    };
    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
                      <p className="text-center text-gray-700 mb-6">Please enter your email address</p>
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                      <Form className="space-y-3">
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <Field
                                 type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                <ErrorMessage 
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1" />
                            </div>
                            <button type="submit"
                                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-blue-500 transition">Send Reset Link</button>
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    <Link to="/"
                                    className="text-blue-500 hover:underline">Back</Link>
                                </p>
                            </Form>
                    </Formik>
                    </div>
                    </div>
    )
}