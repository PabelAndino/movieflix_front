import Link from "next/dist/client/link";
import React, {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import RatingIcon from "../../src/components/apps/RatingIcon";
import {allProducts} from "../../src/redux/action/apps";
import {moodChange, pageTitle} from "../../src/redux/action/utils";
import {Nav, Tab} from "react-bootstrap";
import PageTitle_ from "../../src/components/PageTitle";
import PerfectScrollbar from "react-perfect-scrollbar";
import {loadMovies, loadMoviesRecent, loadMoviesTopRate} from "../../src/redux/action/movies";
import MovieDetailModal from "../../src/components/modals/MovieDetailModal";
import {Notifications} from "../../src/components/Notifications/Notifications";


const ProductGrid = ({pageTitle, allProducts}) => {
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies.movies)
    const moviesByDate = useSelector((state) => state.recentMovies.moviesByDate)
    const moviesTopRating = useSelector((state) => state.topRateMovie.moviesTopRate)

    const [showModal, setDetailModal] = useState({
        'modalState': false,
        'movieTitle': '',
        'movieRating': '',
        'movieCode': '',
        'plot': '',
        'image': '',

    });


    useEffect(() => {
        dispatch(loadMovies())
        dispatch(loadMoviesRecent())
        dispatch(loadMoviesTopRate())
        //moodChange();

    }, []);

    const tabtitles = (url) => {
        console.log(url, ' the data')
    }

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


    const tabPan2_ = (event, data, d) => {
        return (
            <div className="row">
                {data &&
                    data.map((d, i) => (
                        <div className="col-xl-6 pb-3 mb-3 border-bottom" key={i}>
                            <div className="media shadow-hover " style={{cursor: "pointer"}}
                                 onClick={() => showDetails(d.title, d.rating, d.plot, d.image_banner, d.id)}>
                                <img
                                    className="rounded-lg mr-3 shadow-lg "

                                    src={d.image_poster}
                                    width={125}
                                    alt=""
                                />
                                <div className="media-body">
                                    <h5 className="mb-sm-4 mb-3">
                                        <a className="text-black" href="ecom-product-detail.html">
                                            {d.title}
                                        </a>
                                    </h5>
                                    <div className="d-flex mb-2">
                                        <svg
                                            className="mr-2 card-ico"
                                            width={15}
                                            height={15}
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="2.04545"
                                                height={15}
                                                rx="1.02273"
                                                fill="#FF720D"
                                            />
                                            <rect
                                                x="4.09082"
                                                y="4.0909"
                                                width="2.04545"
                                                height="10.9091"
                                                rx="1.02273"
                                                fill="#FF720D"
                                            />
                                            <rect
                                                x="8.18164"
                                                y="10.2273"
                                                width="2.04545"
                                                height="4.77273"
                                                rx="1.02273"
                                                fill="#FF720D"
                                            />
                                            <rect
                                                x="12.2725"
                                                y="2.04546"
                                                width="2.04545"
                                                height="12.9545"
                                                rx="1.02273"
                                                fill="#FF720D"
                                            />
                                        </svg>
                                        <span className="fs-14 text-black">
                        <strong className="mr-1">{d.release_date}</strong> Release Date
                      </span>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap fs-12">
                                        <div className="mb-2 star-review2">
                                            <i
                                                className={`fa fa-star ${d.rating >= 1 ? "" : "op5"}`}
                                            />{" "}
                                            <i
                                                className={`fa fa-star ${d.rating >= 2 ? "" : "op5"}`}
                                            />{" "}
                                            <i
                                                className={`fa fa-star ${d.rating >= 3 ? "" : "op5"}`}
                                            />{" "}
                                            <i
                                                className={`fa fa-star ${d.rating >= 4 ? "" : "op5"}`}
                                            />{" "}
                                            <i
                                                className={`fa fa-star ${d.rating >= 5 ? "" : "op5"}`}
                                            />{" "}
                                        </div>
                                        <span className="ml-3 text-dark mb-2">
                                        ({d.rating} rating)
                                      </span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}


            </div>


        );
    };

    return (
        <Fragment>
            <PageTitle_ active="Blank" mother="Layout" customText={true}/>

            <div className={'row'}>

                <div className="col-xl-12 col-xxl-12">
                    <div className={'row'}>
                        <div className="col-xl-12 col-md-12 col-xxl-12">

                            <div className="row">
                                <div className="col-xl-12">
                                    <Tab.Container defaultActiveKey="all_categories">
                                        <div className="card">

                                            <div className="card-header border-0 pb-0 flex-wrap">
                                                <div className="d-flex mb-3">
                                                    <div className="separator"/>
                                                    <div className="mr-auto">
                                                        <h4 className="card-title mb-2">
                                                            Movie List
                                                        </h4>
                                                        <p className="fs-14 mb-0">
                                                            You can find reviews details from your favorite movies
                                                        </p>
                                                        < Notifications/>
                                                    </div>
                                                </div>
                                                <div className="card-action card-tabs mb-3">
                                                    <Nav as="ul" className="nav nav-tabs" role="tablist">
                                                        {/*//Mapa de categorias*/}

                                                        {
                                                            !movies ? (
                                                                <Nav.Item as="li" key={1}>
                                                                    <Nav.Link eventKey={'movies'}>Movies</Nav.Link>
                                                                </Nav.Item>) : (
                                                                movies.detail.genres.map((c, i) => (

                                                                    <Nav.Item as="li" key={i}>
                                                                        <Nav.Link eventKey={c.id}
                                                                                  onClick={() => tabtitles(c.id)}>{c.name}</Nav.Link>
                                                                    </Nav.Item>
                                                                ))
                                                            )

                                                        }

                                                    </Nav>
                                                </div>
                                            </div>
                                            <div className="card-body most-favourite-items pb-0">
                                                <Tab.Content className="tab-content">
                                                    {/*{analyticsData &&
                                                        analyticsData.fvtItem.data.map((d, i) =>
                                                                //tabPan_(d.name, d.data, i)
                                                            //tabPan2_(d.genres, d.movies, i)
                                                        )
                                                    }*/}

                                                    {movies &&
                                                        movies.detail.data.movies.map((d, i) => (
                                                            //tabPan_(d.name, d.data, i)
                                                            tabPan2_('Adventure', d, i)
                                                            //console.log(d)
                                                            /* <Tab.Pane eventKey={'Adventure'} key={i}>
                                                                 {tabPan2_('Adventure', d, i)}
                                                             </Tab.Pane>*/

                                                        ))
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
                                    </Tab.Container>
                                </div>
                            </div>


                        </div>


                    </div>

                </div>

                <div className="col-xl-12 col-xxl-12">
                    <div className="row">
                        <div className="col-xl-6 col-xxl-6 ">
                            <div className="card trending-menus">
                                <div className="card-header border-0">
                                    <div className="separator"/>
                                    <div className="mr-auto">
                                        <h4 className="text-black fs-20">
                                            The most recent releases
                                        </h4>
                                        <p className="fs-13 mb-0">
                                            Find what's now actual
                                        </p>
                                    </div>
                                </div>

                                   { moviesByDate && (
                                       <PerfectScrollbar
                                           className="card-body dz-scroll height550"
                                           id="tredingMenus"
                                       >
                                           {moviesByDate && moviesByDate.map((data, i) => (
                                               <div
                                                   key={i}
                                                   className={`d-flex pb-3 mb-3 tr-row align-items-center border-bottom`}
                                                   style={{cursor: "pointer"}}
                                                   onClick={() => showDetails(data.title, 5, data.plot, data.image_banner, data.id)}>
                                                   >

                                                   <span className="num">#{i + 1}</span>
                                                   <div className="mr-auto pr-3">
                                                       <a>
                                                           <h2 className="text-black fs-14 font-w500">
                                                               {data.title}
                                                           </h2>
                                                       </a>
                                                       <span className="text-black font-w600  mr-3"><i
                                                           className={'fa fa-area-chart'}/>
                                                           {" "} {data.genre}{" "}
                          </span>{" "}
                                                       <span className="fs-14">Release Date {data.release_date}</span>

                                                   </div>
                                                   <img src={data.image_poster} className={'rounded-lg shadow-lg '}
                                                        alt="Picture of the author"/>
                                               </div>
                                           ))}


                                       </PerfectScrollbar>
                                    )}

                            </div>
                        </div>

                        <div className="col-xl-6 col-xxl-6">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div className="separator"/>
                                    <div className="mr-auto">
                                        <h4 className="text-black fs-20">
                                            Movies top rated
                                        </h4>
                                        <p className="fs-14 mb-0">
                                            Find best and top comments
                                        </p>
                                    </div>
                                </div>
                                {moviesTopRating && (
                                    <PerfectScrollbar
                                        className="height550 dz-scroll loadmore-content"
                                        id="sellerMenusContent"
                                    >
                                        {moviesTopRating &&
                                            moviesTopRating.map((d, i) => (
                                                <div
                                                    className={`card-body border-bottom pt-0`}
                                                    key={i}
                                                    style={{cursor: "pointer"}}
                                                    onClick={() => showDetails(d.title, d.rating, d.plot, d.image_banner, d.id)}
                                                >
                                                    <div className="media mb-3">
                                                        <img src={d.image_banner} className={'rounded-lg shadow-lg'} style={{width: "100%"}} alt=""/>
                                                    </div>
                                                    <div className="info">
                                                        <h5 className="text-black mb-3">
                                                            <a
                                                                href="ecom-product-detail.html"
                                                                className="text-black"
                                                            >
                                                                {d.genre}
                                                            </a>
                                                        </h5>
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <h4 className="font-w600 mb-0 text-black">
                                                                {d.title}
                                                            </h4>
                                                            <div className="d-flex align-items-center">
                                                                <svg
                                                                    className="mr-2 card-ico"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z"
                                                                        fill="#FF720D"
                                                                    />
                                                                </svg>
                                                                <h6 className="text-black mb-0"></h6>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <h6 className="text-black mb-0"></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </PerfectScrollbar>
                                )}

                            </div>
                        </div>

                    </div>
                </div>


                <MovieDetailModal modalData={showModal} setDetailModal={setDetailModal}/>


            </div>


        </Fragment>
    )
        ;
};

export default ProductGrid

