import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate} from "react-router-dom";
export default function ResetPassword() {
        const navigate = useNavigate();
        
    const initialValues = { newPassword: "", confirmPassword: ""};
    const validationSchema =
    Yup.object({
        newPassword: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Password must match")
        .required("Required"),
    });
      const handleSubmit = async (values) => {
        try {
            await axios.post("http://localhost:5000/api/auth/reset-password", {
                email: localStorage.getItem("resetEmail"),
                password: values.newPassword,
            });
            alert("Password reset successful");
             navigate("/");
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
                 <Formik 

                 initialValues={initialValues}

                 validationSchema={validationSchema}
                 onSubmit={handleSubmit}>
                    <Form className="space-y-4">
                        <div>
                            <Field 
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                            <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                            <Field 
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                            <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500 text-sm mt-1" />
                        </div>
                        <button type="submit"
                                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-blue-500 transition">Submit</button>
                                <p className="text-center text-sm text-gray-500 mt-2">Didn't get the code?{" "}
                                    <button type="button"
                                    className="text-blue-500 hover:underline">Resend</button>
                                </p>
                    </Form>
                 </Formik>
            </div>
        </div>
      );
}
 function ResestPassword() {
   return (
    <div>
        <h2>Reset Password page-Feature Branch</h2>
    </div>
   );
 }