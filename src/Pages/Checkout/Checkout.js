import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';

// export default function Example() {
//     const [selected, setSelected] = React.useState < Date > ();

//     let footer = <p>Please pick a day.</p>;
//     if (selected) {
//         footer = <p>You picked {format(selected, 'PP')}.</p>;
//     }
//     return (
//         <DayPicker
//             mode="single"
//             selected={selected}
//             onSelect={setSelected}
//             footer={footer}
//         />
//     );
// }
const Checkout = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const { _id, name, price, email, img } = useLoaderData();
    const { user } = useContext(AuthContext);
    const sellerEmail = email;
    // console.log(price)
    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const startDate = form.startDate.value;
        const days = form.days.value;
        const customerName = form.customerName.value;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const address = form.address.value;
        const message = form.message.value;

        const order = {
            vehicle: _id,
            vehicleName: name,
            price,
            startDate,
            days,
            customer: customerName,
            email,
            sellerEmail: sellerEmail,
            phone,
            address,
            message,
            img: img
        }

        // if(phone.length > 10){
        //     alert('Phone number should be 10 characters or longer')
        // }
        // else{

        // }

        fetch('https://enjoy-trip-server-raaakib0.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order placed successfully')
                    form.reset();

                }
            })
            .catch(er => console.error(er));

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <div className="mb-7">

                    {
                        img &&
                        <img className='w-50' src={img} alt="Avatar Tailwind CSS Component" />}

                    <h2 className="text-4xl">You are about to order: {name}</h2>
                    <h4 className="text-3xl">Price: {price}</h4>
                    {/* <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                /> */}
                    {/* <p>you have selected{format(selectedDate, 'PP')}</p> */}

                </div>

                <h3>Select Pick Date</h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3'>
                    <input name="startDate" type="date" placeholder="Start Date" className="input input-ghost w-full  input-bordered" />
                    <input name="days" type="number" placeholder="Days" className="input input-ghost w-full  input-bordered" />
                    <input name="customerName" type="text" placeholder="Your Name" className="input input-ghost w-full  input-bordered" />
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full  input-bordered" required />
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered" readOnly />
                    <input name="address" type="text" placeholder="Your Address" className="input input-ghost w-full  input-bordered" />
                </div>
                <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Message" required></textarea>

                <input className='btn mb-5' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;