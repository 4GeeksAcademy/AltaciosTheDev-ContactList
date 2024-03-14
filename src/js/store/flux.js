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
			editContact: null 
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
			sendContact: async (newcontact) => {
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
			sendEditContact: async (editContact, id) => {
			
				try{
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "PUT",
						body: JSON.stringify(editContact),
						headers: {
						"Content-Type": "application/json"
						}
			  		})
					const data = await response.json()
					console.log(data)
					if(response.ok){
						setStore({editContact: null})
						return true
					}
				}	
				catch(error){
					console.error(error)
				}
			},
			editContact: (id) => {
				//get store to work with
				const store = getStore()
				//getActions to send the new contact through to the API
				const contactToEdit = store.contacts.find((contact) => {
					return contact.id === id
				})
				//modify the store accordingly
				if(contactToEdit){
					setStore({editContact: contactToEdit})
				}
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
			addContact: (newContact) => {
				//get store to work with
				const store = getStore()
				//getActions to send the new contact through to the API
				getActions().sendContact(newContact)
				//modify the store accordingly
				setStore({contacts: [newContact, ...store.contacts]})
			},
			deleteContact: (id) => {
				const store = getStore()
				const newContacts = store.contacts.filter((contact) => {
					return contact.id !== id
				})
				getActions().sendDeleteContact(id)
				setStore({contacts: newContacts})
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
