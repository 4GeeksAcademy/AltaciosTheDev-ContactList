import React, { useEffect, useContext } from "react";
import {Context} from "../store/appContext.js"
import {ContactCard} from "../component/ContactCard.js";
import "../../styles/home.css";
import personLogo from "../../img/personLogo.png";
import femaleLogo from "../../img/femaleLogo.png"
import { useNavigate } from "react-router";

export const Contact = () => {
	// const [store, actions] = useContext(Context)
	const {store, actions} = useContext(Context)

	//always store in const 
	const navigate = useNavigate()

	//to run once on component mount
	useEffect(() => {
		actions.loadSomeData()
	},[])	

	const contactsElements = store.contacts.map((contact, index) => {
		//it is important to know that where you map is where you have access to index and id. 
		//This means we can send functions as props with the id
		return (
			<ContactCard
				key={index}
				name={contact.full_name}
				address={contact.address}
				phone={contact.phone}
				email={contact.email}
				image={index % 2 ? personLogo : femaleLogo}
				deleteContact={() => actions.deleteContact(contact.id)}
				editMode={() => actions.editMode(contact.id)}
			/>
		)
	})

	return(
		<div className="container">
			{store.contacts.length === 0 && <h1 className="text-center">No contacts... please get some friends</h1>}
			{contactsElements}
		</div>
	)
}
