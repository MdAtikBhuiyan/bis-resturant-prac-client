import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin()

    const [cart] = useCart()


    const handleLogout = () => {
        logOut()
            .then(() => {
                // console.log("logout Successfully");
                Swal.fire({
                    icon: "success",
                    title: "Logout Successfully",
                    // text: "Something went wrong!",
                });
            })
            .catch(err => {
                console.log(err);
            })
    }


    const navOptions = <>

        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/menu'>Our Menu</NavLink>
        </li>
        <li>
            <NavLink to='/order/salad'>Order Food</NavLink>
        </li>
        {
            user && isAdmin && <li>
                <NavLink to='/dashboard/adminHome'>Dashboard</NavLink>
            </li>
        }
        {
            user && !isAdmin && <li>
                <NavLink to='/dashboard/userHome'>Dashboard</NavLink>
            </li>
        }
        <li>
            <NavLink to='/contact'>Contact Us</NavLink>
        </li>
        <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
            <Link to='/dashboard/cart'>
                <button className="btn">
                    <FaShoppingCart className="mr-2 text-lg" />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>

        {
            user ?
                <>
                    {/* <span>{user?.displayName}</span> */}
                    <button
                        onClick={handleLogout}
                        className="btn btn-ghost">Logout</button>
                </>
                :
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
        }

    </>

    return (
        <div>
            <div className="navbar fixed z-10 bg-black bg-opacity-40 text-white max-w-screen-xl mx-auto px-6">

                <div className="flex-1">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-3 shadow bg-black bg-opacity-30 space-y-2 rounded-box w-52 font-bold">
                            {
                                navOptions
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl m-0 p-0">Bistro Boss</a>
                </div>

                <div className="flex-none">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-6 px-1 font-bold">
                            {
                                navOptions
                            }
                        </ul>
                    </div>
                    <div className="ml-6 navbar-end">
                        <button className="btn bg-transparent text-white hover:bg-warning hover:text-black hover:border-transparent">Get Started</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;