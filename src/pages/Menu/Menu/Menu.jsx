import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";


const Menu = () => {

    const [menu] = useMenu()

    const desserts = menu.filter(item => item.category.toLowerCase() === 'dessert');
    const soup = menu.filter(item => item.category.toLowerCase() === 'soup');
    const salad = menu.filter(item => item.category.toLowerCase() === 'salad');
    const pizza = menu.filter(item => item.category.toLowerCase() === 'pizza');
    const offered = menu.filter(item => item.category.toLowerCase() === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover
                bgImg={menuImg}
                title={'our Menu'}
            />

            <div className="mt-20">

                {/* offered menu */}
                <SectionTitle subHeading={"don't miss"} heading={"Today's offer"} />
                <MenuCategory items={offered} />

                {/* dessert item */}
                <MenuCategory
                    items={desserts}
                    title={'dessert'}
                    bgImg={dessertImg}
                />

                {/* pizza item */}
                <MenuCategory
                    items={pizza}
                    title={'pizza'}
                    bgImg={pizzaImg}
                />

                {/* salad item */}
                <MenuCategory
                    items={salad}
                    title={'salad'}
                    bgImg={saladImg}
                />

                {/* soup item */}
                <MenuCategory
                    items={soup}
                    title={'soup'}
                    bgImg={soupImg}
                />
            </div>


        </div>
    );
};

export default Menu;