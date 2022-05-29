import Link from "next/link";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
const AuthLayout = ({children}) => {

    useEffect(() => {
        document.querySelector("body").classList.add("vh-100");
    }, []);


    return (
        <div className="authincation h-100">
            <div className="container vh-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="text-center mb-4">
                                            <Link href="/">
                                                <a>
                                                    <img src="/images/logo-full.png" alt=""/>
                                                </a>
                                            </Link>
                                        </div>
                                        <ToastContainer
                                            position="top-right"
                                            autoClose={5000}
                                            hideProgressBar={false}
                                            newestOnTop
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                        />
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AuthLayout;
