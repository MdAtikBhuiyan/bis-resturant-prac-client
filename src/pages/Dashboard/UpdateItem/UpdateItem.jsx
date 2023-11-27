import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaEdit, FaUpload, FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`

const UpdateItem = () => {

    const item = useLoaderData();
    const { name, category, recipe, price, _id } = item;
    // console.log(item);

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then set get url at form data
        const imgFile = {
            image: data?.image[0]
        }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        if (res.data.success) {
            // now send the menu item to database with img url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res?.data?.data?.display_url
            }

            const menuResponse = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuResponse.data);
            if (menuResponse.data.modifiedCount > 0) {
                // clear form and show alert
                // reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} updated to the database`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }


    return (
        <div>

            <SectionTitle heading={"Update an item"} subHeading={"refresh info"} />

            <div className="my-12">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            defaultValue={name}
                            type="text" placeholder="Recipe name" className="input input-bordered w-full" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select {...register("category", { required: true })}
                                defaultValue={category}
                                className="select select-bordered select-ghost w-full">
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drink</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                defaultValue={price}
                                type="number" placeholder="Price" className="input input-bordered w-full" />
                        </div>

                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                            {...register("recipe", { required: true })}
                            defaultValue={recipe}
                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div>
                        <input
                            {...register("image", { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">

                        Update Item
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateItem;