import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                // console.log(res.user);
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            icon: "success",
                            title: "Login Successfully",
                            // text: "Something went wrong!",
                        });
                        navigate('/')
                    })
            })
    }

    return (
        <div>

            <div>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-error text-white">
                    <FaGoogle />
                    Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;