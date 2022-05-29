import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Dropdown, Nav, Tab} from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {connect, useDispatch, useSelector} from "react-redux";
import Profile from "./Profile";
import {Notifications} from "../../components/Notifications/Notifications";
import {loadLiveSearchMovie} from "../../redux/action/movies";
import PreLoader from "../PreLoader";
import MovieDetailModal from "../../components/modals/MovieDetailModal";

const Header = ({title, searchData}) => {
    const [searchText, setSearchText] = useState("");
    const loading = useSelector((state) => state.loading.loading)
    const movies_finded = useSelector((state) => state.moviesFinded.movies_finded)
    const [showModal, setDetailModal] = useState({
        'modalState': false,
        'movieTitle': '',
        'movieRating': '',
        'movieCode': '',
        'plot': '',
        'image': '',

    });
    const showDetails = (movieTitle, movieRating, plot, image, id) => {

        setDetailModal({
            'modalState': true,
            'movieTitle': movieTitle,
            'movieRating': movieRating,
            'movieCode': id,
            'plot': plot,
            'image': image,

        })
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadLiveSearchMovie(searchText))
    }, [searchText]);

    return (
        <div className=" header">
            <div className="header-content">
                <nav className="navbar navbar-expand ">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div className="dashboard_bar">Movies Site</div>
                        </div>

                        <ul className="navbar-nav header-right">

                            <Dropdown as="li" className="nav-item ">
                                <Dropdown.Toggle
                                    variant=""
                                    as="a"
                                    className="i-false p-0 input-group search-area d-xl-inline-flex d-none"
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search here..."
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button className="input-group-text">
                                            <i className="flaticon-381-search-2"/>
                                        </button>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu alignRight={true} className="mt-3">
                                    <PerfectScrollbar
                                        id="DZ_W_Notification1"
                                        className=" dz-scroll p-1 "
                                        style={{maxWidth: 280}}
                                    >

                                        <div className={'row'}>
                                            <div className="col-xl-12 col-xxl-12">
                                                <div className={'row'}>
                                                    <div className="col-xl-12 col-md-12 col-xxl-12">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="card">
                                                                    <div
                                                                        className="card-header border-0 pb-0 flex-wrap">
                                                                        <div className="d-flex mb-3">
                                                                            <div className="separator"/>
                                                                            <div className="mr-auto">
                                                                                <h4 className="card-title mb-2">
                                                                                    Searching Movie
                                                                                </h4>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="card-body most-favourite-items pb-0">
                                                                        <Tab.Content className="tab-content">

                                                                            {
                                                                                loading ? (<PreLoader/>) : (

                                                                                    movies_finded && movies_finded.map((d, i) => (
                                                                                        <div
                                                                                            className={`card-body border-bottom pt-3`}
                                                                                            key={i}
                                                                                            style={{cursor: "pointer"}}
                                                                                            onClick={() => showDetails(d.title, d.rating, d.plot, d.image_banner, d.id)}
                                                                                        >
                                                                                            <div className="media mb-3">
                                                                                                <img src={d.image_banner} className={'rounded-lg shadow-lg'} style={{width: "100%"}} alt=""/>
                                                                                            </div>
                                                                                            <div className="info">

                                                                                                <div
                                                                                                    className="d-flex justify-content-between align-items-center">
                                                                                                    <h4 className="font-w600 mb-0 text-black">
                                                                                                        {d.title}
                                                                                                    </h4>

                                                                                                    <div className="d-flex align-items-center">
                                                                                                        <h6 className="text-black mb-0"></h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))

                                                                                )
                                                                            }


                                                                        </Tab.Content>
                                                                        <Tab.Content className="tab-content">

                                                                            <Tab.Pane eventKey={'The event'}>
                                                                                <div className="row">


                                                                                </div>
                                                                            </Tab.Pane>

                                                                        </Tab.Content>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PerfectScrollbar>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Profile/>
                            <MovieDetailModal modalData={showModal} setDetailModal={setDetailModal}/>
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
    );
};

const mapSateToProps = (state) => ({
    title: state.utils.pageTitle,
    searchData: state.utils.searchData,
});

export default connect(mapSateToProps,)(Header);
