import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {

    const { name, image, price, recipe, _id, } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const axiosSecure = useAxiosSecure()

    // transtack query
    const [, refetch] = useCart()

    const handleAddToCart = () => {

        if (user && user?.email) {
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refrech cart to update the cart items count
                        refetch()

                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not login",
                text: "Please Login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send user to the database
                    navigate('/login', { state: { from: location.pathname } })
                }
            });
        }
    }

    return (
        <div className="bg-base-100 shadow-xl relative">
            <figure><img src={image} className="w-full" alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white absolute right-4 top-4 p-2">${price}</p>
            <div className="card-body p-6 items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <button
                    onClick={handleAddToCart}
                    className="btn btn-warning w-fit mt-6 capitalize">Add to cart</button>
            </div>
        </div>
    );
};

export default FoodCard;