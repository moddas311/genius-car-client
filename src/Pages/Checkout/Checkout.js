import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {

    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = e => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value}${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;
        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        if (phone.length < 10) {
            alert('Phone number should be 10 characters or longer!')
        }
        else {
            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        alert('Order placed successfully!')
                        form.reset();
                    }
                })
                .catch(er => console.error(er));
        }
    }

    return (

        <div>
            <form onSubmit={handlePlaceOrder} className='my-5 px-4'>
                <h3 className='text-3xl'>You are about to order: {title}</h3>
                <h4 className='text-2xl'>Price: {price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-5'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered" required />
                    <input name='email' type="text" placeholder="Your email" className="input input-bordered" defaultValue={user?.email} readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message" required></textarea>
                <div className='text-center'>
                    <input className='btn btn-outline border-none bg-gray-200 my-1' type="submit" value="Place Your Order" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;