import { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./contact.css";

export default function ContactInput({ setContacts, contacts }) {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();

    const [ loading, setLoading ] = useState(false);

    const submitForm = async event => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const phone = phoneInputRef.current.value;

        if (name === "" || phone === "") return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/contacts", {
                method  : "POST",
                body    : JSON.stringify({ name, phone }),
                headers : { "Content-Type": "application/json" },
            });

            const data = await res.json();

            nameInputRef.current.value = "";
            phoneInputRef.current.value = "";

            setContacts([ ...contacts, data ]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <div className="form">
                <div className="form__group">
                    <input
                        type="text"
                        className="form__input"
                        placeholder="name"
                        ref={nameInputRef}
                        disabled={loading}
                    />
                    <input
                        type="tel"
                        className="form__input"
                        placeholder="phone"
                        ref={phoneInputRef}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="form__button"
                    disabled={loading}
                >
                    {loading && <FaSpinner className="spinner" />}
                    {loading ? "" : "Add"}
                </button>
            </div>
        </form>
    );
}
