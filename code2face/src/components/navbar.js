import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { NavbarBrand } from "react-bootstrap";
import "../styles/navbar.css"

const Navbar = () => {
	let { state, dispatch } = useContext(UserContext);
	let jwt = localStorage.getItem("jwt");
	if(jwt) {
		state=true;
	}


	const renderList = () => {
		if (state) {
			return [
				<>
				
				</>
			];
		} else {
			return [
				<>
					<Link key='motivation' className="navlink" to="/motivation">Motivation</Link>
					<Link key='slides' className="navlink" to="/slides">Revision</Link>
					
				</>,
			];
		}
	};

	return (
		<nav className="main-nav">
            <NavbarBrand className="logo">
                <Link key='logo' to="/">
                    Code2Face
                </Link>
            </NavbarBrand>
			<div className="navlinks" key="links">{renderList()}</div>
		</nav>
	);
};

export default Navbar;