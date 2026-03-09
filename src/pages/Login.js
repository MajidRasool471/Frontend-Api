import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function Login() {
     const navigate = useNavigate();

      const validationSchema =
        Yup.object({
            email: Yup.string().email("Invalid email").required("Email Required"),
            password: Yup.string().min(8,
                "Minimum 8 characters").required("Password Required"),
            });

    const handleLogin = async (values) => {
         try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                values
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            navigate("/dashboard");
         } catch (error) {
            alert("Login Failed");
         }
    };
         return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <Formik
                    initialValues={{email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}>
                        <Form className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <Field type="email"
                                name="email"
                                placeholder="Enter Email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                <ErrorMessage 
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                 <Field type="password"
                                name="password"
                                placeholder="Enter Password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                <ErrorMessage 
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1" />
                            </div>
                                <div className="text-left -mt-4">
                                <Link to="/forgot-password"
                                className="text-sm text-blue-300 hover:underline">Forgot Password?</Link>
                               </div>
                                <button type="submit"
                                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-blue-500 transition">Login</button>
                                <p className="text-center text-sm text-gray-600">Don't have an account?
                                    <a href="/signup"
                                    className="text-blue-500 ml-1">Signup</a>
                                </p>
                        </Form>
                    </Formik>
                </div>
            </div>
         );
}
    
export default Login;