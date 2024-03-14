import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import {Context} from "../store/appContext.js"
import { Link } from "react-router-dom";

export function ContactCard({address, email, name, phone, image, deleteContact, editMode}){
	const {store, actions} = useContext(Context)

    return(
    <div className="row text-center mt-4">
		<div className="col-8 contact-card">
			<div className="contact-image-container">
				<img className="contact-img" src={image}/>
			</div>
			<div className="contact-body">
				<h3>{name}</h3>
				<p>
					<span className="icons"><FaLocationDot/></span>
					{address}</p>
				<p>
					<span className="icons"><FaPhone/></span>
					{phone}
				</p>
				<p>
					<span className="icons"><FaEnvelope/></span>
					{email}
				</p>
			</div>
			<div className="contact-controls">
				<button className="nostyle" onClick={editMode}>
					<Link to="/addContact">
						<FaEdit />
					</Link>
				</button>
				{/* modal trigger  */}
				<button className="trash nostyle" data-bs-toggle="modal" data-bs-target="#exampleModal">
					<FaTrash/>
				</button>
			</div>
		</div>

			{/* <!-- Modal --> */}
		<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete this contact?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						If you delete, you will lose the contact forever.
					</div>
					<div className="modal-footer">
						<button type="button" className="btn coolBtn" data-bs-dismiss="modal" onClick={deleteContact}>Delete Contact</button>
					</div>
				</div>
			</div>
		</div>

	</div>
	
    )
}
