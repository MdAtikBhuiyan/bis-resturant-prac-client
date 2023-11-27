
import bgImg from '../../../assets/home/banner.jpg'

const BossSection = () => {
    return (
        <div className="hero min-h-[550px] mt-20 bg-fixed" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="lg:w-[80%] mx-auto  bg-white bg-opacity-50 text-black p-8 lg:p-20">
                    <h1 className="mb-5 text-5xl font-bold">Bistro Boss</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, recusandae molestiae blanditiis officia quis natus. In architecto et itaque rerum.</p>
                    <button className="btn btn-warning">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default BossSection;