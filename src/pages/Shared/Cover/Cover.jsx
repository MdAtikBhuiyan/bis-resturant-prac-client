
import { Parallax } from 'react-parallax';

const Cover = ({ bgImg, title }) => {

    return (

        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={bgImg}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[700px]">
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="lg:w-[80%] mx-auto  bg-black bg-opacity-50 text-white p-8 lg:p-20">
                        <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, recusandae molestiae blanditiis officia quis natus. In architecto et itaque rerum.</p>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;