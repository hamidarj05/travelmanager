import { useState, useEffect } from "react";

function useAuth() {

    const [isLogin, setIsLogin] = useState(localStorage.getItem("Login") === "true");

    const [error, setError] = useState('');

    useEffect(() => {
        setIsLogin(localStorage.getItem("Login") === "true");
    }, []);


    const [data, setData] = useState([]);

    const apiUrl = "http://localhost:5000/accounts";

    const fetchAccounts = () => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const login = (email, password) => {
        const accountFound = data.find((acc) => acc.email === email && acc.password === password);
        if (accountFound) {
            setIsLogin(true);
            localStorage.setItem("Login", "true");
        } else {
            setIsLogin(false);
            setError("Les infos Invalid");
            setTimeout(() => setError(""), 2000);
        }

    };

    return { login, isLogin, error, setIsLogin };
}

export default useAuth;
