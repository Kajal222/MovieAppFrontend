import { useEffect } from "react";
import FooterBg from "../../assets/images/footer.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { initialValueDto, loginResponseDto } from "../../dto/auth.dto";
import { registerService } from "../../services/auth.service";
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
});
const initialValues: initialValueDto = {
    email: "",
    password: "",
}
interface ApiErrors {
    name?: string;
    email?: string;
    password?: string;
}
const Register = () => {
    const navigate = useNavigate();
    const tokenValue = sessionStorage.getItem("authToken")
    useEffect(() => {
        window.scrollTo(0, 0);
        // sessionStorage.removeItem("authToken");  
        if (tokenValue && tokenValue.length > 0) {
            // navigate("/dashboard");
        }
    }, [tokenValue]);

    return (
        <div className="h-screen w-full bg-pageBackgroundColor relative flex flex-col jusitfy-center items-center overflow-auto">
            <div className="h-5/6 w-4/5 p-0 m-auto md:rounded-2xl overflow-auto h-fit">
                <div className="p-0 h-fit">
                    <div className="flex flex-col md:flex-row h-fit w-full">
                        <div className=" p-14 pb-0 flex-column overflow-auto w-full">
                            <div className="montserrat-font pt-14 w-full max-w-80 m-auto">
                                <div className="text-white font-bold text-6xl pt-15 text-center montserrat-font pb-5">
                                    Sign Up
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, { setSubmitting, setFieldError, resetForm, setStatus }) => {
                                        try {
                                            const { email, password } = values;
                                            const data = { email, password };
                                            const result: loginResponseDto = await registerService(data);
                                            setStatus("Suscessfully Registered");

                                            await sessionStorage.setItem("authToken", result.loginToken);
                                            sessionStorage.setItem('email', result.email);
                                            navigate("/movieList")
                                            resetForm();
                                        } catch (error: any) {
                                            if (error.response) {
                                                const status = error.response.status;

                                                if (status === 400) {
                                                    const apiErrors: ApiErrors = error.response.data.errors;
                                                    if (apiErrors) {
                                                        (Object.keys(apiErrors) as (keyof ApiErrors)[]).forEach((field) => {
                                                            setFieldError(field, apiErrors[field]!);
                                                        });
                                                    }
                                                    setStatus(error.response.data.message);

                                                } else if (status === 500) {
                                                    setStatus("Server error. Please try again later.");
                                                }
                                            } else if (error.request) {
                                                setStatus("No response from server. Please try again later.");
                                            } else {
                                                setStatus("An unexpected error occurred. Please try again.");
                                            }
                                        } finally {
                                            // Set submitting to false once the API call is complete
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ isSubmitting, status }) => (
                                        <Form className="pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                {status && (
                                                    <div className="text-red-600 text-sm mb-4">{status}</div>
                                                )}
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    className="appearance-none bg-fieldBg bg-opacity-50 rounded-lg font-medium text-white text-sm w-full py-2 px-3 mb-3 leading-tight h-11"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    className="appearance-none bg-fieldBg bg-opacity-50 rounded-lg font-medium text-white text-sm w-full py-2 px-3 mb-3 leading-tight h-11"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="text-red-600 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="bg-successBtnBg text-white font-medium text-sm py-2 px-4 rounded-lg w-full h-12" disabled={isSubmitting}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <div className="text-center my-6">
                                                <label className="flex items-center justify-center text-center text-white font-normal">
                                                    <a className="text-sm" href="/#/login">
                                                        Already have an account? Login.
                                                    </a>
                                                </label>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <img src={FooterBg} />
            </div>
        </div >
    );
}

export default Register;