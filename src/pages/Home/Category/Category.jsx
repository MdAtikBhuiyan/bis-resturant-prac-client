// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const categoryInfo = [
    {
        id: 1,
        img: img1,
        title: 'salads'
    },
    {
        id: 2,
        img: img2,
        title: 'Pizzas'
    },
    {
        id: 3,
        img: img3,
        title: 'soups'
    },
    {
        id: 4,
        img: img4,
        title: 'desserts'
    },
    {
        id: 5,
        img: img5,
        title: 'salads'
    },

]

const Category = () => {
    return (
        <div className='mt-20'>

            <SectionTitle subHeading={"from 11:00am to 10:00pm"} heading={"Order Online"} />

            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                // centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{

                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },

                }}
                modules={[Pagination]}

                className="mySwiper mt-14"
            >

                {
                    categoryInfo?.map(category => (
                        <SwiperSlide key={category.id} className=''>
                            <div>
                                <img src={category.img} alt="img" />
                                <h3 className="text-3xl uppercase text-center text-white font-bold -mt-16 mb-16">{category.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div >
    );
};

export default Category;