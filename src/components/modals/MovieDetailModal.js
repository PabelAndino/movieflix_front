import React, {useState} from 'react';
import {Button, Modal, TabContainer, TabContent, TabPane} from "react-bootstrap";
import {Formik, Form} from "formik";
//import {SelectFormik, TextField} from "../../src/components/inputs";
import * as Yup from "yup";
import RatingIcon from "../apps/RatingIcon";
import {SelectFormik, TextField} from "../inputs";
import {useDispatch} from "react-redux";
import {saveRateMovie} from "../../redux/action/movies";


const MovieDetailModal = ({modalData, setDetailModal}) => {

    const {modalState, movieTitle, movieRating, movieCode, plot, image} = modalData
    const [rating, setRating] = useState(1)
    const dispatch = useDispatch()
    const resetForm = (resetForm)=>{
        resetForm()
    }
    const hideModal = () => {
        setDetailModal({
            ...modalState,
            'modalState': false,

        })
    }

    const submitData = (data, resetForm) => {
        dispatch(saveRateMovie(data,rating, movieCode, resetForm))
    }

    const validate = Yup.object({
        //pilon : Yup.string().max(4,"Debe de contener hasta 4 numeros").required('required'),
        comment: Yup.string().min(10, "Please write a review bigger than 10 characters").required('Cant be empty, please write a review'),

    })

    /*Olnly Numbers*/
    const onKPress = (e) => {
        !/[0-9]/.test(e.key) && e.preventDefault()
    }

    return (
        <div>
            <Formik initialValues={{
                comment: '',
                rating: 1

            }}
                    validationSchema={validate}
                    onSubmit={ (values,{resetForm}) => {
                        submitData(values, resetForm)
                    }}

            >
                {
                    ({isValid, dirty, values, setFieldValue, resetForm}) => (
                        <Modal className="fade" size={'xl'} show={modalState}>

                            <Modal.Header>
                                <Modal.Title>Movie Details</Modal.Title>
                                <Button
                                    variant=""
                                    className="close"
                                    onClick={() => hideModal()}
                                ><span>&times;</span></Button>
                            </Modal.Header>
                            <Form>
                                <Modal.Body>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-6  col-md-6 col-xxl-5 ">
                                                            {/* Tab panes */}
                                                            <TabContainer defaultActiveKey="0">
                                                                {/* Tab panes */}
                                                                <TabContent>
                                                                    <img className="img-fluid rounded-lg shadow-lg"
                                                                         src={image} alt=""/>
                                                                </TabContent>

                                                            </TabContainer>
                                                        </div>
                                                        {/*Tab slider End*/}
                                                        <div
                                                            className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                                                            <div className="product-detail-content">
                                                                {/*Product details*/}
                                                                <div className="new-arrival-content pt-5">
                                                                    <h1>{movieTitle}</h1>
                                                                    <div className="comment-review star-rating">
                                                                        <ul>
                                                                            <RatingIcon
                                                                                rating={movieRating}/>
                                                                        </ul>

                                                                    </div>


                                                                    <p>
                                                                        Movie Code:
                                                                        <span className="item">
                                                                        {movieCode}
                                                                        </span>
                                                                    </p>

                                                                    <div1 className="d-table mb-2">
                                                                        <h3 className="float-left d-block">
                                                                            {plot}
                                                                        </h3>
                                                                    </div1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={'col-lg-12'}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="form-row">
                                                    <div className="col-xl-12 col-lg-6  col-md-6 col-xxl-5 ">

                                                            <TextField label={"Write a Review"} name={"comment"} type={"textarea"}
                                                                       inputsize={"col-xl-12"}/>

                                                            <div className="form-group">
                                                                <div className="rating-widget mb-5 text-center">
                                                                    {/* Rating Stars Box */}
                                                                    <div className="rating-stars" >
                                                                        <ul id="stars" className="d-flex justify-content-center">
                                                                            {[1, 2, 3, 4, 5].map((review_, i) => (
                                                                                <li
                                                                                    className={`c-pointer star ${
                                                                                        review_ <= rating && "selected"
                                                                                    } `}
                                                                                    key={i}
                                                                                    onClick={() => {
                                                                                        //alert(`Thanks! You rated this ${review_} stars.`);
                                                                                        setRating(review_);
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-star fa-fw" />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" disabled={!(isValid && dirty)}
                                            type={"submit"}>Comment</Button>{/*if you want the submit button to be disabled until all the fields are valid and if the fields values have been changed from their initial values then you would have to use both of the above attributes in conjunction as below:*/}
                                    <Button className="mr-2" type='reset' variant="warning" onClick={()=>resetForm(resetForm)}>
                                        Reset
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </Modal>

                    )
                }

            </Formik>
        </div>
    );
};

export default MovieDetailModal;