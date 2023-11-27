import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const ChefRecommends = () => {

    const [recommendMenu, setRecommendMenu] = useState([])

    useEffect(() => {

        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category.toLowerCase() == 'salad')
                setRecommendMenu(popularItems)
            })

    }, [])

    return (
        <div className="mt-20">
            <SectionTitle subHeading={'Should try'} heading={'CHEF RECOMMENDS'} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                {
                    recommendMenu?.slice(0, 3).map(menu => (
                        <div key={menu._id} className="bg-base-100 shadow-xl">
                            <figure><img src={menu?.image} className="w-full" alt="Shoes" /></figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{menu?.name}</h2>
                                <p>{menu?.recipe}</p>
                                <button className="btn btn-warning w-fit mt-6 capitalize">Add to cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ChefRecommends;