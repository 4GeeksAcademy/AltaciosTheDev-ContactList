
const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts:[],
			edit: null 
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadSomeData: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				try{
					const res = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/altacios")
					console.log(res)
					const data = await res.json()
					console.log(data)
					setStore({contacts: data})

					if(!res.ok){
						throw new Error("fetch contacts from slug failed...")
					}
				}
				catch(error){
					console.error(error)
				}
			},
			sendAddContact: async (newcontact) => {
				try{
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact", {
						method: "POST",
						body: JSON.stringify(newcontact),
						headers: {
						"Content-Type": "application/json"
						}
			  		})
					const data = await response.json()
					console.log(data)
				}	
				catch(error){
					console.error(error)
				}
			},
			addContact: (newContact) => {
				//get store to work with
				const store = getStore()
				//getActions to send the new contact through to the API
				getActions().sendAddContact(newContact)
				//modify the store accordingly
				setStore({contacts: [newContact, ...store.contacts]})
			},
			sendDeleteContact: async (id) => {
				try{
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {method: "DELETE"}) 
					const data = await response.json()
					console.log(data)
				}
				catch(error){
					console.error(error)
				}
			},
			deleteContact: (id) => {
				const store = getStore()
				const newContacts = store.contacts.filter((contact) => {
					return contact.id !== id
				})
				getActions().sendDeleteContact(id)
				setStore({contacts: newContacts})
			},
			sendEditContact: async (newFormData, id) => {
				//send http request with newFormData
				try{
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "PUT",
						body: JSON.stringify(newFormData),
						headers: {
						"Content-Type": "application/json"
						}
			  		})
					const data = await response.json()
					console.log(data)
					//if response successful, empty edit obj {}
					if(response.ok){
						setStore({edit: null})
						return true
					}
				}	
				catch(error){
					console.error(error)
				}
			},
			editMode: (id) => {
				//get store to work with
				const store = getStore()
				//get only the contactToEdit, find returns value of first to meet condition
				const contactToEdit = store.contacts.find((contact) => {
					return contact.id === id
				})
				//modify the store accordingly, if contactToEdit filled with truth value
				if(contactToEdit){
					setStore({edit: contactToEdit})
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
