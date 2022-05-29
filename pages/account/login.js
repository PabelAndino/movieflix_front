import Link from "next/link";
import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {Formik, Form} from "formik";
import AuthLayout from "../../src/layouts/AuthLayout";
import {loginSchema} from "./Schema";
import {TextField} from "../../src/components/inputs";
import {getAccessToken, getUser, loginUser, logoutUser} from "../../src/redux/action/auth";
import {Notifications} from "../../src/components/Notifications/Notifications";
import PreLoader from "../../src/layouts/PreLoader";

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const logged = useSelector((state) => state.userauth.login)
    const user = useSelector((state)=>state.auth.user)

    useEffect(()=>{
        dispatch (getUser())
    },[user])

    const layout = ()=> {

        if((logged)){
            router.push('/general/area')
            return (
                <PreLoader />
            )
        }else{
            return (
                <AuthLayout>
                    <h4 className="text-center mb-4">Inicia sesión en tu cuenta</h4>
                    <div className="new-account mt-3">
                        < Notifications/>

                        <Formik
                            initialValues={{ password: "", username: "" }}
                            validationSchema={loginSchema}

                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(loginUser(values));
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  isValid, dirty, setFieldValue
                              }) => (
                                <Form
                                    id="dz_login_signup_form"
                                    className="form-validate"
                                    onSubmit={handleSubmit}
                                >

                                    <div className="form-group">
                                        <label className="text-black" htmlFor="val-username">
                                            <strong>Usuario</strong>
                                        </label>
                                        <div>
                                            <TextField
                                                type="text"
                                                className="form-control"
                                                id="val-username"
                                                name="username"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.username}
                                            />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="val-password">
                                            <strong >Contraseña</strong>
                                        </label>
                                        <div>
                                            <TextField
                                                type="password"
                                                className="form-control"
                                                id="val-password"
                                                name="password"

                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />

                                        </div>
                                    </div>

                                    <div
                                        className="form-group text-center mt-4"

                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            id="dz-signup-submit"
                                            disabled={!(isValid && dirty && !logged)}
                                        >
                                            Iniciar Sesión
                                        </button>

                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </AuthLayout>
            )
        }
    }

    return (
        <Fragment>
            {layout()}
        </Fragment>

    );
};


export default Login;
