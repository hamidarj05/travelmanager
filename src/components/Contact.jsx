import { useRef, useState } from "react";

export default function Contact() {
    const message = useRef()
    const nom = useRef()
    const email = useRef()

    const [data, setFormData] = useState({ message: "", nom: "", email: "" })

    const [messageSucces, setMessage] = useState("")
    const apiUrl = "http://localhost:5000/messages"

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            message: message.current.value,
            nom: nom.current.value,
            email: email.current.value
        }
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(() => {
                setMessage("Le message a ete envoyer");
            });
        message.current.value = ""
        nom.current.value = ""
        email.current.value = ""
    }

    return (
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-20" onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contactez-nous</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" >Nom</label>
                <input
                    type="nom"
                    ref={nom}
                    placeholder="Votre nom"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" >Email</label>
                <input
                    type="email"
                    ref={email}
                    placeholder="Votre email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" >Message</label>
                <textarea
                    ref={message}
                    rows="5"
                    placeholder="Votre message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
                Envoyer
            </button>
            <p className="text-green-500">{messageSucces}</p>
        </form>

    )
}