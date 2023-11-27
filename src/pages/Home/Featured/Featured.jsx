import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className="hero bg-no-repeat mt-20 text-white bg-fixed" style={{ backgroundImage: `url(${featuredImg})` }}>

            <div className="hero-overlay bg-opacity-60"></div>

            <div className="py-8 md:py-20">
                <SectionTitle subHeading={'check it out'} heading={'featured item'} />

                <div className="md:flex gap-12 space-y-4 justify-center items-center mt-10 px-8 lg:px-36">
                    <div>
                        <img src={featuredImg} alt="" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">March 20, 2023 <br />
                            <span> WHERE CAN I GET SOME?</span></h3>
                        <p className="mt-2 mb-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>

                        <button className="btn btn-warning capitalize">Order now</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;