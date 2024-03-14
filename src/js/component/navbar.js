import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-5">
			<div className="container">
				<Link to="/" className="cool">
					<h3>React Contact List</h3>
				</Link>
				<div className="ml-auto">
					<Link to="/addContact">
						<button className="btn coolBtn">Add new contact</button>
					</Link>
				</div>
			</div>

		</nav>
	);
};
