import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { addContact } from "../state/contactSlice";
import "./contact.css";

export default function ContactInput() {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();

    const dispatch = useDispatch();

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

            dispatch(addContact(data));
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
