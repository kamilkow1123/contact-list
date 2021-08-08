import { FaUser, FaPhone, FaTrashAlt } from "react-icons/fa";
import "./contact.css";

export default function ContactList({ contacts, loading, setContacts }) {
    const deleteContact = async id => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await fetch(`http://localhost:5000/contacts/${id}`, {
                method : "DELETE",
            });

            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

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
                                onClick={() => deleteContact(contact.id)}
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
