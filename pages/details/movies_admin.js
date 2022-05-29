import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disableUser, loadDetailsUser, manageUserDetail} from "../../src/redux/action/adminUsers";
import * as Yup from "yup";
import swal from "sweetalert";
import {Form, Formik} from "formik";
import PageTitle_ from "../../src/components/PageTitle";
import {Notifications} from "../../src/components/Notifications/Notifications";
import {SelectFormik, TextField} from "../../src/components/inputs";
import {Button} from "react-bootstrap";
import {MoviesAdminTable, UserDetailsTable} from "../../src/components/table/TableDetails";
import {deactivateMovie, loadAdminMovies, loadGenres, saveMovie} from "../../src/redux/action/movies";

const MoviesAdmin = () => {
    const dispatch = useDispatch()
    const dataState = useSelector((state) => state.moviesAdmin.movies_admin_action)//espera cambios en dataSuccess
    const genres = useSelector((state) => state.genres.genres)
    const loadingState = useSelector((state) => state.loading.loading)
    const movies = useSelector((state)=> state.moviesAdmin.movies_admin)

    const [loading, setLoading] = useState(false)

    console.log(loadingState)
    useEffect(() => {
        dispatch(loadGenres())
        dispatch(loadAdminMovies())
    }, [dataState])

    useEffect(() => {
        loadingState ? setLoading(true) : setLoading(false)
    }, [loadingState])

    const validate = Yup.object({
        title: Yup.string().max(400, 'Must have a max of 400 characters').required("Can't be empty"),
        plot: Yup.string().max(1024, 'Must have a max of 1024 characters').required("Can't be empty"),
        genre:Yup.string().required("Put a release date")

    })

    const optionsNoData = [
        {value: null, label: "No data"},
    ];

    const optionFincas = genres ? (genres.map((i) => {
        return {
            value: i.id,
            label: `${i.name}`
        }
    })) : optionsNoData

    const onSubmit = (data, resetForm) => {
        const {id, title, release_date, genre, image_banner, image_poster, plot} = data
        dispatch(saveMovie(id, title, release_date, genre, image_banner, image_poster, plot, resetForm))

    }

    const deleteMovie = (id, nombre, resetForm) => {
        swal({
            title: `Are you sure to desactivate ${nombre} ?`,
            text: "Ones it is desactivate you have to activate it again manually!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deactivateMovie(id))
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
                    title: '',
                    release_date: '',
                    genre: '',
                    image_banner: '',
                    image_poster: '',
                    plot: '',

                }}
                validationSchema={validate}
                onSubmit={(values, {resetForm}) => {
                    onSubmit(values, resetForm)
                }}
            >
                {
                    ({isValid, dirty, values, setFieldValue, resetForm}) => (
                        <Fragment>
                            <PageTitle_ active="Movies" mother="Details" customText={"Movies Administration"}/>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Movies Administration</h4>
                                            < Notifications/>
                                        </div>

                                        <div className="card-body">
                                            <div className="basic-form">
                                                <Form>
                                                    <div className="form-row">


                                                        <TextField label={'Movie Title'} name={'title'} type={'text'}
                                                                   inputsize={"col-md-2"}/>
                                                        <TextField label={'Release Date'} name={'release_date'}
                                                                   type={'date'} inputsize={"col-md-2"}/>

                                                        <SelectFormik options={optionFincas} value={values.genre}
                                                                      onChange={value => setFieldValue('genre', value.value)}
                                                                      name={'genre'} inputsize={'col-md-2'}
                                                                      label={'Genres'}
                                                                      onBlur={() => setFieldTouched("genre", true)}
                                                                      selectLabel={'Genre'}
                                                        />

                                                        <div className={'col-md-12'}>

                                                            <img className={'rounded-lg shadow-lg'}
                                                                 src={(values.image_banner ? values.image_banner : "https://cdn2.iconfinder.com/data/icons/vivid/48/image-512.png")}
                                                                 style={{width: "25%"}} name={'image_banner'}
                                                                 alt="user image"/>
                                                        </div>

                                                        <TextField label={'Image Banner'} name={'image_banner'}
                                                                   type={'text'}
                                                                   inputsize={"col-md-6"} placeholder={'Image URL'}/>

                                                        <div className={'col-md-12'}>

                                                            <img className={'rounded-lg shadow-lg'}
                                                                 src={(values.image_poster ? values.image_poster : "https://cdn2.iconfinder.com/data/icons/vivid/48/image-512.png")}
                                                                 style={{width: "10%"}} name={'image_poster'}
                                                                 alt="user image"/>
                                                        </div>

                                                        <TextField label={'Image Poster'} name={'image_poster'}
                                                                   type={'text'}
                                                                   inputsize={"col-md-6"}
                                                                   placeholder={'Image URL'}/>


                                                        <TextField label={'Plot'} name={'plot'}
                                                                   type={'textarea'} inputsize={"col-md-12"}/>


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
                                        <MoviesAdminTable setFieldValue={setFieldValue} details={movies ? movies : ''}
                                                          deleteMovie={deleteMovie} resetForm={resetForm}/>
                                    </div>
                                </div>

                            </div>
                        </Fragment>
                    )
                }

            </Formik>

        </div>
    );
};

export default MoviesAdmin;