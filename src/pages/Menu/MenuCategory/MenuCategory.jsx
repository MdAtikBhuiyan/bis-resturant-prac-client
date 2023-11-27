import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, bgImg }) => {
    return (
        <div className="mt-20">

            {
                title && <Cover bgImg={bgImg} title={title} />
            }

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    items?.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            <div className="text-center mt-10">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-warning capitalize">Order your food</button>
                </Link>
            </div>

        </div>
    );
};

export default MenuCategory;