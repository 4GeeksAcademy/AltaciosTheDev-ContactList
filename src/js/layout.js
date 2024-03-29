import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Contact } from "./views/Contact";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import {AddContact} from "./views/AddContact";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Contact />} />
						<Route path="/addContact" element={<AddContact/>}/>
						<Route path="/single/:theid" element={<Single />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

//invoking injectContext(Layout) with Layout as argument 
export default injectContext(Layout);
