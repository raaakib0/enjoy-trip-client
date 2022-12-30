import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const UpdateVehicle = () => {
    const { _id, name, price, email, description, img } = useLoaderData();
    // console.log(name)
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const { user } = useContext(AuthContext);

    // const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey)
    const navigate = useNavigate();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://enjoy-trip-server-raaakib0.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })

    const handleUpdateVehicle = data => {
        // const image = data.image[0];
        const formData = new FormData();
        // formData.append('image', image);
        // const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        // fetch(url, {
        // fetch( {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(imgData => {
        // if(imgData.success){
        // console.log(imgData.data.url);
        const vehicle = {
            name: data.name,
            // email: data.email,
            // categorie: data.categorie,
            description: data.description,
            price: data.price,
            // img: imgData.data.url
        }

        fetch(`https://enjoy-trip-server-raaakib0.vercel.app/updateVehicle/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(vehicle)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${data.name} is added successfully`);
                navigate('/dashboard/managevehicle')
            })
        //         }
        // }
        // )
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7 '>
            <figure><img src={img} alt="vehicle" /></figure>
            <h2 className="text-4xl flex justify-center mt-5">Update Vehicle</h2>
            <form onSubmit={handleSubmit(handleUpdateVehicle)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" defaultValue={name} />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                {/* <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" defaultValue={email}/>
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div> */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Price / Day</span></label>
                    <input type="number" {...register("price", {
                        required: "price is Required"
                    })} className="input input-bordered w-full max-w-xs" defaultValue={price} />
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                </div>
                {/* <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Category</span></label>
                    <select 
                        {...register('categorie')}
                        className="select input-bordered w-full max-w-xs" >
                        {
                            categories.map(categorie => <option 
                                key={categorie._id}
                                value={categorie.name} 
                            >{categorie.name}</option >)
                        }
                    </select>
                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    {/* <textarea className="textarea textarea-bordered h-24" placeholder="Description"></textarea> */}
                    <textarea type="text" {...register("description", {
                        required: "description is Required"
                    })} className="input input-bordered w-full max-w-xs h-24" defaultValue={description} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                {/* <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div> */}
                <input className='btn btn-accent w-full mt-4' value="Update Vehicle" type="submit" />
            </form>
        </div>
    );
};


export default UpdateVehicle;

