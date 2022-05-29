import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import PageTitle_ from "../../src/components/PageTitle";
import {UserDetailsTable} from "../../src/components/table/TableDetails";
import {deactivateFinca, loadFinca, saveFinca} from "../../src/redux/action/general";
import * as Yup from "yup";
import swal from "sweetalert";
import {Form, Formik} from "formik";
import {Notifications} from "../../src/components/Notifications/Notifications";
import {TextField} from "../../src/components/inputs";
import {Button} from "react-bootstrap";

import {disableUser, loadDetailsUser, manageUserDetail} from "../../src/redux/action/adminUsers";
import {Switch} from "@material-ui/core";


const AdminComments = () => {
    const dispatch = useDispatch()
    const dataState = useSelector((state) => state.userAdminReducer.user_data_action)//espera cambios en dataSuccess
    const users = useSelector((state) => state.userAdminReducer.user_data)//espera cambios en dataSuccess
    const loadingState = useSelector((state) => state.loading.loading)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(loadDetailsUser())
    }, [dataState])

    useEffect(() => {
        loadingState ? setLoading(true) : setLoading(false)
    }, [loadingState])

    const validate = Yup.object({
        first_name: Yup.string().min(4, 'At list must have 4 charactares on the name').max(15, 'Must have a max of 15 characters').required("Can't be empty"),
        last_name: Yup.string().min(4, 'At list must have 4 charactares on the last name').max(15, 'Must have a max of 15 characters').required("Can't be empty"),
        username: Yup.string().min(4, 'At list must have 4 charactares on the user name').max(15, 'Must have a max of 15 characters').required("Can't be empty"),
        email: Yup.string().email('Invalid email format try user@gmail.com')


    })

    const onSubmit = (data, resetForm) => {
        const {id, username, first_name, last_name, email, is_superuser, password, user_image} = data
        dispatch(manageUserDetail(id, username, first_name, last_name, email, is_superuser, password, user_image, resetForm))

    }

    const deleteUser = (id, nombre, resetForm) => {
        swal({
            title: `Are you sure to desactivate ${nombre} ?`,
            text: "Ones it is desactivate you have to activate it again manually!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(disableUser(id, resetForm))
            } else {
                swal("You canceled the desactivation!");
            }
        })

    }

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    first_name: '',
                    last_name: '',
                    username: '',
                    password: '',
                    user_image: '',
                    email: '',
                    is_superuser: 0,
                    estado: true,
                    disabled: false,
                }}
                validationSchema={validate}
                onSubmit={(values, {resetForm}) => {
                    onSubmit(values, resetForm)
                }}
            >
                {
                    ({isValid, dirty, values, setFieldValue, resetForm}) => (
                        <Fragment>
                            <PageTitle_ active="Users" mother="Details" customText={"Profile Administration"}/>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">User Profile</h4>
                                            < Notifications/>
                                        </div>

                                        <div className="card-body">
                                            <div className="basic-form">
                                                <Form>
                                                    <div className="form-row">
                                                        <div className={'col-md-1'}>

                                                            <img className={'rounded-pill  '}
                                                                 src={(values.user_image ? values.user_image : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png")}
                                                                 style={{width: "60%"}} name={'user_image'}
                                                                 alt="user image"/>
                                                        </div>

                                                        <TextField label={'Name'} name={'first_name'} type={'text'}
                                                                   inputsize={"col-md-2"}/>
                                                        <TextField label={'Last Name'} name={'last_name'}
                                                                   type={'text'} inputsize={"col-md-4"}/>

                                                        <TextField label={'User Name'} name={'username'} type={'text'}
                                                                   inputsize={"col-md-2"}/>

                                                        <TextField label={'Password'} name={'password'}
                                                                   type={'password'}
                                                                   inputsize={"col-md-2"} disabled={values.disabled}
                                                                   placeholder={'Password'}/>


                                                        <TextField label={'Image URL'} name={'user_image'}
                                                                   type={'text'} inputsize={"col-md-4"}/>
                                                        <TextField label={'Email'} name={'email'} type={'email'}
                                                                   inputsize={"col-md-4"}
                                                                   placeholder={'email@email.com'}/>
                                                        {/*<TextField label={'Is Super User'} name={'is_superuser'}
                                                                   type={'text'}
                                                                   inputsize={"col-md-4"}/>*/}

                                                        <div className={'col-md-2 border-1'}>
                                                            <label>Is Super User</label>
                                                            <Switch
                                                                name="is_superuser"
                                                                value={0}
                                                                checked={values.is_superuser === 1}
                                                                onChange={(event, checked) => {
                                                                    setFieldValue("is_superuser", checked ? 1 : 0);
                                                                }}
                                                            />
                                                        </div>


                                                    </div>
                                                    <div className={'form-row'}>
                                                        <div className={'form-group col-sm-4'}>
                                                            <Button variant="primary mr-2"
                                                                    disabled={!(isValid && dirty && !loading)}
                                                                    type={"submit"}>{loading ? 'Saving ...' : 'Save'}

                                                            </Button>
                                                            <Button variant="secondary" type={'reset'} onClick={() => {

                                                            }
                                                            }>Reset</Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12">
                                    <div className="table-responsive">
                                        <UserDetailsTable setFieldValue={setFieldValue} details={users ? users : ''}
                                                          deleteUser={deleteUser} resetForm={resetForm}/>
                                    </div>
                                </div>

                            </div>
                        </Fragment>
                    )
                }

            </Formik>

        </div>
    );
}
export default AdminComments


/*

https://images.generated.photos/p5pMfej8up1bpxAL5MT236zIYWvX6RbXz0VUb2yYWz4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDQ4/MDk5LmpwZw.jpg
https://images.generated.photos/M5EGlVA9VGfGoN0XxFNVEESPU4toHlC3kgz2givV1DY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDc0/NzY4LmpwZw.jpg
https://images.generated.photos/SXVSFAEYSrq-rF770sJoKImsba1HsyGNSuJZ0Kclzjo/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDkx/MzY5LmpwZw.jpg
https://images.generated.photos/nutmDcdNh3NrFBUY0ILTU_ZoC0cTEuVLf3t-svjBD8I/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDg3/MDA1LmpwZw.jpg
https://images.generated.photos/dfLWMe1jCmc5RgaxruT0DfoiHyDZOOsIday6ZyV6cXs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMTY5/NDE2LmpwZw.jpg
https://images.generated.photos/e18XdOGiLE_DCjcV07sGbJPUnQ7uZ7C9DVk9aY8F06A/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMjQ5/NzUyLmpwZw.jpg
https://images.generated.photos/DqEp4BJkcaLpymJnXBXA0PFiXOvB3VHIlk8Us61LrCQ/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDM2/NTI0LmpwZw.jpg
https://images.generated.photos/xee_JOrGvsARBoi0kP_FsvAwaIE9DO5kjENo6QPjzHw/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDky/NjkwLmpwZw.jpg
https://images.generated.photos/QIl4xCrEBZesPp3l1sHYVDo_niSKlE0p1juCRoNOSZw/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDky/NzMwLmpwZw.jpg
https://images.generated.photos/0R75Y3M37OGO5yq1KQHXJQwjgUcfGVFDHFoG-j0uu48/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy8wMDgx/NzI0LmpwZw.jpg

* */