import React, { useEffect, useContext } from "react";
import {Context} from "../store/appContext.js"
import {ContactCard} from "../component/ContactCard.js";
import "../../styles/home.css";
import personLogo from "../../img/personLogo.png";
import femaleLogo from "../../img/femaleLogo.png"
export const Contact = () => {
	// const [store, actions] = useContext(Context)
	const {store, actions} = useContext(Context)

	//to run once on component mount
	useEffect(() => {
		actions.loadSomeData()
	},[])	

	const contactsElements = store.contacts.map((contact, index) => {
		return (
			<ContactCard
				name={contact.full_name}
				address={contact.address}
				phone={contact.phone}
				email={contact.email}
				image={index % 2 ? personLogo : femaleLogo}
				deleteContact={() => actions.deleteContact(contact.id)}
				key={index}
				id={contact.id}

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
