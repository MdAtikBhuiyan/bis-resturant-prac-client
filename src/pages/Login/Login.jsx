import { useContext, useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {

    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()

    const path = location.state?.from || '/';
    // console.log(path);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = form.captcha.value;

        if (validateCaptcha(captcha) === true) {
            // console.log(email, password, captcha);
            signIn(email, password)
                .then(res => {
                    const user = res.user;
                    // console.log(user);
                    Swal.fire({
                        icon: "success",
                        title: "User Login Successfull",
                        // text: "Something went wrong!",
                    });

                    navigate(path, { replace: true })

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            alert("Your captcha is wrong")
        }


    }

    // captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    return (
        <>

            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="md:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" name="captcha" placeholder="Enter Captcha " className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-warning" type="submit" value="Login" />
                            </div>
                        </form>

                        <div className='text-center mb-4'>
                            <SocialLogin />
                        </div>

                        <p className='text-center pb-4'><small>New here? <Link className='font-bold italic underline' to={'/signup'}>Create an account</Link></small></p>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Login;