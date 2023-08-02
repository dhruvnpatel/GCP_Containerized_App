import React from 'react';
import Login from '../login_form/login';
import Registration from '../registration_form/registration';
import Header from '../header/header';
import Footer from '../footer/footer';

function Landing_Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow items-center justify-center bg-black">
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-40">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                        <Login />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                        <Registration />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Landing_Page;