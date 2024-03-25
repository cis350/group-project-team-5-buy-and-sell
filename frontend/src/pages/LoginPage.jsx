import React from 'react'
import Navbar from '../components/Navbar'

const LoginPage = () => {
    return (
        // Adjust the pt (padding-top) value as needed to match your Navbar's height
        <div className=''>
            <Navbar />
            {/* Background image div */}
            <div className="relative h-[500px] flex justify-center items-center">
                <h1 className='font-inter text-3xl'>Add Login Window Here. Feel free to remove this Div element</h1>
            </div>
        </div>
    )
}

export default LoginPage
