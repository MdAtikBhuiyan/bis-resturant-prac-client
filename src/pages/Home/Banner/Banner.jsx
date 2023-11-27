import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'


const bannerInfo = [
    {
        id: 1,
        img: img1,
    },
    {
        id: 2,
        img: img2,
    },
    {
        id: 3,
        img: img3,
    },
    {
        id: 4,
        img: img4,
    },
    {
        id: 5,
        img: img5,
    },
    {
        id: 6,
        img: img6,
    },
]

const Banner = () => {
    return (
        <div>

            <Carousel showStatus={false} showArrows={false} emulateTouch={true} autoPlay>

                {
                    bannerInfo?.map(banner => (

                        <div key={banner.id}>
                            <img src={banner.img} alt="img" />
                        </div>

                    ))
                }

            </Carousel>


        </div>
    );
};

export default Banner;