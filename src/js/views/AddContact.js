import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const AddContact = () => {
    //always store in a const
    const navigate = useNavigate()

	const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
		full_name: store.edit ? store.edit.full_name : "",
		email: store.edit ? store.edit.email : "",
		agenda_slug: "altacios",
		address: store.edit ? store.edit.address : "",
		phone: store.edit ? store.edit.phone : ""
    })

     useEffect(() => {
        console.log(formData) 
     },[formData])

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => ({...prevFormData, [name]:value}))
    }

    //siempre que se llama una funcion async, se debe hacer la padre una async y await al hijo.
    async function handleSubmit(event){
        event.preventDefault()
        //call actions.addContact that will add to store.contacts
        if(store.edit){
            const results = await actions.sendEditContact(formData, store.edit.id)

            //if results finished and truth value, navigate over to main page.
            if(results){
                navigate("/")
            }
        }
        else{
            actions.addContact(formData)
        }
        setFormData({
            full_name: "",
            email: "",
            agenda_slug: "altacios",
            address:"",
            phone:""
        })
    }

	return (
		<div className="container">
             <div className="row mt-5">
                    <form className="col-8 myForm" onSubmit={handleSubmit}>
                        <h2 className="text-center cool">Add a new contact</h2>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                            <input 
                                placeholder="Enzo Altamirano" 
                                type="text" 
                                className="form-control" 
                                id="exampleInputName"
                                name="full_name"
                                value={formData.full_name} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                            <input  
                                placeholder="enzo.altamirano98@gmail.com" 
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                            <input 
                                placeholder="3355-5344" 
                                type="text" 
                                className="form-control" 
                                id="exampleInputPhone"
                                name="phone"
                                value={formData.phone} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                            <input 
                                placeholder="Jardines del valle" 
                                type="text" 
                                className="form-control" 
                                id="exampleInputAddress"
                                name="address"
                                value={formData.address} 
                                onChange={handleChange}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your information with anyone else.</div>
                        </div>
                        <button type="submit" className="btn myBtn coolBtn">Submit</button>
                    </form>
                    <div className="col-8 mx-auto">
                        <Link to="/">Back to contact list</Link>
                    </div>  
             </div>
		</div>
	);
};
