
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {


    // const [menu, setMenu] = useState([])

    // useEffect(() => {

    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category.toLowerCase() == 'popular')
    //             setMenu(popularItems)
    //         })

    // }, [])

    const [menu, loading] = useMenu();
    const popular = menu.filter(item => item.category.toLowerCase() === 'popular')

    // console.log(popular);

    return (
        <section className="mt-20">

            <SectionTitle subHeading={'popular Items'} heading={'from our menu'} />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    popular?.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            <div className="text-center mt-10">
                <button className="btn btn-warning capitalize">View full menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;