import {
    PAGE_TITLE,
    SEND_MSG,
} from "./type";


export const pageTitle = (title) => (dispatch) => {
    dispatch({
        type: PAGE_TITLE,
        payload: title,
    });
};

// Resize window
export const resizeWindow = () => {
    const body = document.querySelector("body");
    window.innerWidth >= 768 && window.innerWidth < 1024
        ? body.setAttribute("data-sidebar-style", "mini")
        : window.innerWidth <= 768
            ? body.setAttribute("data-sidebar-style", "overlay")
            : body.setAttribute("data-sidebar-style", "full");
};

//  Body attributes
export const bodyArt = () => {
    const body = document.querySelector("body");
    body.setAttribute("data-typography", "poppins");
    body.setAttribute("data-theme-version", "dark");
    body.setAttribute("data-layout", "vertical");
    body.setAttribute("data-nav-headerbg", "color_1");
    body.setAttribute("data-headerbg", "color_1");
    body.setAttribute("data-sidebar-style", "full");
    body.setAttribute("data-sibebarbg", "color_1");
    body.setAttribute("data-primary", "color_1");
    body.setAttribute("data-sidebar-position", "fixed");
    body.setAttribute("data-header-position", "fixed");
    body.setAttribute("data-container", "wide");
    body.setAttribute("direction", "ltr");
    body.setAttribute("data-sidebar-style", "full");
};

// preloader
export const preloaderAction = () => {
    window.addEventListener("load", () => {
        document.querySelector("#main-wrapper").classList.add("show");
        document.querySelector("#preloader").style.display = "none";
    });
};

// dark and light mood
export const moodChange = () => {
    const path = window.location.pathname;
    const body = document.querySelector("body");
    if (path.includes("dark")) {
        body.setAttribute("data-theme-version", "dark");
    } else {
        body.setAttribute("data-theme-version", "light");
    }
};

export const sideBarActive = (doc) => {
    let active = doc ? document.querySelectorAll(".mm-collapse a") : [];
    for (let i = 0; i < active.length; i++) {
        const element = active[i];
        if (element.href) {
            if (element.href !== window.location.href) {
                element.classList.remove("mm-active");
                console.log("not match", element.href);
            } else {
                element.classList.add("mm-active");
                element.parentElement.classList.add("mm-active");
                element.parentElement.parentElement.classList.add("mm-show");
                element.parentElement.parentElement.parentElement.classList.add(
                    "mm-active"
                );
                element.parentElement.parentElement.parentElement.parentElement.classList.add(
                    "mm-show"
                );
                element.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
                    "mm-active"
                );

                console.log("match", element.href);
            }
        }

        if (window.location.pathname == "/widget-basic") {
        } else {
            document.querySelector("#widget-basic").classList.remove("mm-active");
        }
    }
};




export const sentMsg = (msg) => (dispatch) => {
    let time = new Date()
        .toLocaleDateString([], {hour: "2-digit", minute: "2-digit"})
        .split(" ")[1];
    let newMsg = {
        img: "/images/avatar/2.jpg",
        name: "me",
        msg,
        time: `${time}, Today`,
    };

    dispatch({
        type: SEND_MSG,
        payload: newMsg,
    });
};


