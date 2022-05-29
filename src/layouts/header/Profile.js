import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import { logoutUser } from "../../redux/action/auth";
import {useRouter} from "next/router";
const Profile = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const user = 'Pabel Andino'//useSelector((state)=>state.auth.user)

  const logout = () =>{
     dispatch(logoutUser())
  }

  return (
    <Dropdown as="li" className="nav-item dropdown header-profile ">
      <Dropdown.Toggle
        as="a"
        variant=""
        className="i-false nav-link c-pointer"
        role="button"
        data-toggle="dropdown"
      >
        <Image src="/images/profile/pic1.svg" height={20} width={20} alt="" />
        <div className="header-info">
          <span className="fs-20 font-w500">{user}</span>
          <small>Administrador</small>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        alignRight={true}
        className="dropdown-menu dropdown-menu-right mt-4"
      >
        <Link href="/">
          <a className="dropdown-item ai-icon">
            <svg
              id="icon-user1"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
            <span className="ml-2">Profile </span>
          </a>
        </Link>

        <Link href="/">
          <a className="dropdown-item ai-icon">
            <svg
              id="icon-inbox"
              xmlns="http://www.w3.org/2000/svg"
              className="text-success"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="ml-2">Inbox </span>
          </a>
        </Link>
        <Link href="">
          <a onClick={() => logout()} className="dropdown-item ai-icon">
            <svg
              id="icon-logout"
              xmlns="http://www.w3.org/2000/svg"
              className="text-danger"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1={21} y1={12} x2={9} y2={12} />
            </svg>
            <span className="ml-2">Logout </span>
          </a>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Profile
