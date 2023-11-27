import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {

    const { signUp, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data);

        signUp(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                // update user info - add name, photo
                updateUserProfile(data.name, data.photo)
                    .then(() => {

                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to the database");
                                    reset();
                                    Swal.fire({
                                        icon: "success",
                                        title: "User Create Successfull",
                                        // text: "Something went wrong!",
                                    });
                                    navigate('/')

                                }
                            })

                    })
                    .catch(err => {
                        console.log("user profile updated error", err);
                    })
            })

    }

    // console.log(watch("name"))

    return (
        <>

            <Helmet>
                <title>Bistro Boss | Signup</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="md:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create an account</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photo && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                }
                                )} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type == 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type == 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type == 'pattern' && <span className="text-red-600">Password must have 1 uppercase, lowercase, number and special character</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-warning" type="submit" value="Signup" />
                            </div>
                        </form>

                        <div className='text-center mb-4'>
                            <SocialLogin />
                        </div>

                        <p className='text-center pb-4'><small>New here? <Link className='font-bold italic underline' to={'/login'}>Signin</Link></small></p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SignUp;