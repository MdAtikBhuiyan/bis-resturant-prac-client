import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setreviews] = useState([])

    useEffect(() => {

        fetch('https://bistro-boss-server-eta-seven.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setreviews(data)
            })

    }, [])

    return (
        <div className="mt-20">

            <SectionTitle subHeading={'what our client say'} heading={'testimonials'} />

            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews?.map(review => (
                            <SwiperSlide key={review._id}>
                                <div className="m-14 md:m-24 text-center flex flex-col items-center">
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={review?.rating}
                                        readOnly
                                    />
                                    <svg className="w-16 mt-12 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="quote-right"><path d="M334.125 256h78.125v62.5c0 34.473-28.027 62.5-62.5 62.5h-7.812a23.382 23.382 0 0 0-23.438 23.438v46.875a23.382 23.382 0 0 0 23.438 23.438h7.812c86.328 0 156.25-69.922 156.25-156.25V84.125c0-25.879-20.996-46.875-46.875-46.875h-125c-25.879 0-46.875 20.996-46.875 46.875v125c0 25.879 20.996 46.875 46.875 46.875zm-281.25 0H131v62.5c0 34.473-28.027 62.5-62.5 62.5h-7.812a23.382 23.382 0 0 0-23.438 23.438v46.875a23.382 23.382 0 0 0 23.438 23.438H68.5c86.328 0 156.25-69.922 156.25-156.25V84.125c0-25.879-20.996-46.875-46.875-46.875h-125C26.996 37.25 6 58.246 6 84.125v125C6 235.004 26.996 256 52.875 256z"></path></svg>
                                    <p className="my-4">{review?.details}</p>
                                    <h3 className="text-2xl text-warning font-bold">{review.name}</h3>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

        </div>
    );
};

export default Testimonials;