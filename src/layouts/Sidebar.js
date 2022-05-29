import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
// import { sideBarActive } from "../redux/action/utils";
const Sidebar = () => {
  const [loveEmoji, setLoveEmoji] = useState(false);
  const [doc, setDoc] = useState();
  useEffect(() => {
    setDoc(window);
    // sideBarActive(doc);
  }, [doc]);
  // sideBarActive(doc);
  let path = doc && doc.location.pathname;
  path = path && path.split("/");
  path = path && path[path.length - 1];

  let curacion = [ "curacion/bultos"]
  let general = ["general/"]
  return (
    <div className="deznav">
      {doc && (
        <PerfectScrollbar className="deznav-scroll">
          <MetisMenu className="metismenu" id="menu">


            <li className={`${curacion.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-107-leaf" />
                <span className="nav-text">Curación</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/curacion/bultos">
                    <a
                      className={`${
                        path === "curacion/bultos" ? "mm-active" : ""
                      }`}
                    >
                      Bultos
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/curacion/home">
                    <a
                        className={`${
                            path === "curacion/home" ? "mm-active" : ""
                        }`}
                    >
                      Despalillo
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${general.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-006-key" />
                <span className="nav-text">General</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/general/area">
                    <a
                      className={`${
                        path === "general/area" ? "mm-active" : ""
                      }`}
                    >
                      Area
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/general/finca">
                    <a
                        className={`${
                            path === "general/finca" ? "mm-active" : ""
                        }`}
                    >
                      Finca
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/general/pilon">
                    <a
                        className={`${
                            path === "general/pilon" ? "mm-active" : ""
                        }`}
                    >
                      Pilon
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/general/clase">
                    <a
                        className={`${
                            path === "general/clase" ? "mm-active" : ""
                        }`}
                    >
                      Clase
                    </a>
                  </Link>
                  <Link href="/general/corte">
                    <a
                        className={`${
                            path === "general/corte" ? "mm-active" : ""
                        }`}
                    >
                      Corte
                    </a>
                  </Link>
                </li>
              </ul>
            </li>


          </MetisMenu>
          <div className="copyright">
            <p>
              <strong>Administración</strong> © {new Date().getFullYear()}{" "}
              NicaSource
            </p>

          </div>
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default Sidebar;
