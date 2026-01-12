import { useRef } from "react"
import { Navigate } from "react-router-dom";



export default function Login({ isLogin, onLogin, error }) {
    const email = useRef("")
    const password = useRef("")


    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email.current.value, password.current.value);
        if (isLogin) {
            return <Navigate to="/" />;
        } else {
            email.current.value = ""
            password.current.value = ""
        }

    };

    return (
        <form
            className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Connexion
            </h2>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    ref={email}
                    type="email"
                    placeholder="Entrez votre email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="password"
                >
                    Mot de passe
                </label>
                <input
                    ref={password}
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
                Se connecter
            </button>
            <p className="text-red-500">{error}</p>
        </form>

    )
}