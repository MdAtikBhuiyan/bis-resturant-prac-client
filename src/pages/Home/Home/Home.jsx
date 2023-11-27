import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
// import BossSection from "../BossSection/BossSection";
import Category from "../Category/Category";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import Cover from "../../Shared/Cover/Cover";
import bgImg from '../../../assets/home/banner.jpg'

const Home = () => {
    return (
        <div>

            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>


            <Banner />
            <Category />

            {/* <BossSection /> */}
            <div className="mt-20">
                <Cover
                    bgImg={bgImg}
                    title={'bistro boss'}
                />
            </div>

            <PopularMenu />
            <ChefRecommends />
            <Featured />
            <Testimonials />


        </div>
    );
};

export default Home;