import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
    const [showModal, setShowModal] = useState(false);
    const [showHomePage, setShowHomePage] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            setError('Password should be at least 8 characters long.');
            return;
        }

        // Prepare the login request data
        const loginData = {
            Email: email,
            Password: password,
        };

        try {
            // Send POST request to the backend API
            const response = await axios.post('http://localhost:5001/login', loginData);

            // Handle the response from the backend
            if (response.status === 200) {
                const data = await response.data;
                const { Message } = data;

                // Check if the login was successful
                if (Message === 'Success!!') {
                    // Set the username in the state
                    setUsername(email);
                    setShowHomePage(true);
                    setShowModal(false);
                    setError('');
                } else {
                    // Handle error message from the backend
                    setError('Login failed. Please check your credentials.');
                }
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setError('An error occurred during login. Please try again later.');
        }
    };

    const handleLogout = () => {
        // Perform logout logic here
        setShowHomePage(false);
        // setShowModal(false);
    };

    const isValidEmail = (value) => {
        // Simple email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    };

    useEffect(() => {
        // Fetch the username and active users from the backend after successful login
        if (showHomePage) {
            // Perform an API call to fetch the username and active users
            // Replace the API_URL with the actual endpoint URL of your backend
            axios
                .get('http://localhost:5002/homescreen', {
                    params: {
                        user: username,
                    },
                })
                .then((response) => {
                    const { active_users, logged_in_user } = response.data;

                    if (logged_in_user) {
                        setLoggedInUser(logged_in_user);
                    }

                    if (active_users) {
                        setActiveUsers(active_users);
                      }
                })
                .catch((error) => {
                    console.log('Error fetching username and active users:', error);
                });
        }
    }, [showHomePage]);

    return (
        <>
            <button
                className="inline-flex relative rounded-lg bg-black px-10 py-4 text-white font-bold hover:bg-gray-800 transition duration-500 w-[150px] h-[50px] items-center justify-center"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Login
            </button>
            {showModal ? (
                <>
                    {/* Login Popup */}
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    onClick={() => setShowModal(false)}
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    data-modal-hide="authentication-modal"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                        Login to your Account
                                    </h3>
                                    {error && (
                                        <div className="text-red-500 mb-4 font-bold">{error}</div>
                                    )}
                                    <form className="space-y-6" action="#">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="yourname@example.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                                            onClick={handleLogin}
                                        >
                                            Login to your account
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* Homepage Popup */}
            {showHomePage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-95 z-50">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => setShowHomePage(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="text-white px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                    Welcome, {loggedInUser}
                                </h3>
                                {activeUsers.length > 0 ? (
                                    <>
                                        <h4>Here is the list of logged in users:</h4>
                                        <ul>
                                            {activeUsers.map((user, index) => (
                                                <li key={index}>{user}</li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p>No active users currently.</p>
                                )}
                                <button
                                    type="submit"
                                    className="mt-10 w-full text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                                    onClick={handleLogout}
                                >
                                    Logout of your account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
