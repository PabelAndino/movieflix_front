import Head from "next/head";
import "nouislider/distribute/nouislider.css";
import {useEffect, useState} from "react";
// redux
import {Provider, useSelector} from "react-redux";
import SimpleReactLightbox from "simple-react-lightbox";
// Css style
import "../public/styles/chart.css";
import "../public/styles/colors.css";
import "../public/styles/custom.css";
import "../public/styles/print.css";
import "../public/styles/style.css";
import "../public/styles/wizard.css";

import Layout from "../src/layouts/Layout";
// action
import {bodyArt, resizeWindow} from "../src/redux/action/utils";
import store from "../src/redux/store";
import {getUser} from "../src/redux/action/auth";

function MyApp({Component, pageProps}) {

    const [doc, setDoc] = useState();
    const [pages, setPages] = useState();


    useEffect(() => {
        bodyArt();
        setDoc(document);
        setPages(window.location.pathname);
        resizeWindow();
        //setPages(window.location.pathname);
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);


    }, [pages]);


    return (
        <Provider store={store}>
            <SimpleReactLightbox>
                <Head>
                    <title>Movies - nicasourče</title>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/images/favicon.png"
                    />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                {/*{pages && window.location.pathname.includes("account") ? (
                    <Component  {...pageProps} />
                ) : (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                )}*/}
            </SimpleReactLightbox>
        </Provider>
    );
}

export default MyApp;
