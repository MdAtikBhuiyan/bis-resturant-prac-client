import { FaBars, FaBook, FaCalendar, FaEnvelope, FaFacebookMessenger, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    const [cart] = useCart();

    // get admin value from the database
    const [isAdmin] = useAdmin()


    return (
        <div className="flex">

            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-warning">

                <ul className="menu space-y-2">

                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome className="text-lg" />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems'>
                                        <FaUtensilSpoon className="text-lg" />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageItems'>
                                        <FaList className="text-lg" />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bookings'>
                                        <FaBook className="text-lg" />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'>
                                        <FaUsers className="text-lg" />
                                        All Users
                                    </NavLink>
                                </li>

                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome className="text-lg" />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
                                        <FaShoppingCart className="text-lg" />
                                        My Cart [{cart.length}]
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/review'>
                                        <FaFacebookMessenger className="text-lg" />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                <NavLink to='/dashboard/paymentHistory'>
                                        <FaList className="text-lg" />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* share nav links */}
                    <div className="divider"></div>

                    <li>
                        <NavLink to='/'>
                            <FaHome className="text-lg" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <FaBars className="text-lg" />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/contact'>
                            <FaEnvelope className="text-lg" />
                            Contact
                        </NavLink>
                    </li>

                </ul>

            </div>
            {/* dashboard content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;