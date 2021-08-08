import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setContacts, deleteContact } from "../state/contactSlice";
import "./contact.css";

export default function ContactList() {
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const contacts = useSelector(state => state.contacts.listOfContacts);

    const removeContact = async id => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await fetch(`http://localhost:5000/contacts/${id}`, {
                method : "DELETE",
            });

            dispatch(deleteContact(id));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/contacts");
            const data = await res.json();
            dispatch(setContacts(data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => fetchContacts(), []);

    return (
        <div className="contacts">
            {contacts && contacts.length > 0 ? (
                contacts.map(contact => (
                    <div key={contact.id} className="contact">
                        <img
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            alt="headshot"
                            className="contact__image"
                        />
                        <div className="contact__info">
                            <button
                                className="contact__delete-button"
                                onClick={() => removeContact(contact.id)}
                            >
                                <FaTrashAlt />
                            </button>

                            <div className="contact__wrapper">
                                <FaUser />
                                <p className="contact__name">{contact.name}</p>
                            </div>
                            <div className="contact__wrapper">
                                <FaPhone />
                                <p className="contact__phone">
                                    {contact.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : contacts ? (
                <p>You have no contacts yet</p>
            ) : loading ? (
                <p>Loading...</p>
            ) : null}
        </div>
    );
}
