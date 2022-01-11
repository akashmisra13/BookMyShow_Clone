import React, { useState, useEffect } from "react";
import axios from "axios";
import EntertainmentCardSlider from "../Components/Entertainment/EntertainmentCard.Component";
import HeroCarousel from "../Components/HeroCarousel/HeroCarousel.component";
import PosterSlider from "../Components/PosterSlider/PosterSlider.Component";

function HomePage() {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [premierMovies, setPremierMovies] = useState([]);
    const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

    useEffect(() => {
        const requestPopularMovies = async () => {
            const getPopularMovies = await axios.get("/movie/popular");
            setRecommendedMovies(getPopularMovies.data.results);
            console.log(getPopularMovies);
        };

        requestPopularMovies();
    }, []);

    useEffect(() => {
        const requestTopRatedMovies = async () => {
            const getTopRatedMovies = await axios.get("/movie/top_rated");
            setPremierMovies(getTopRatedMovies.data.results);
        };

        requestTopRatedMovies();
    }, []);

    useEffect(() => {
        const requestUpcomingMovies = async () => {
            const getUpcomingMovies = await axios.get("/movie/upcoming");
            setOnlineStreamEvents(getUpcomingMovies.data.results);
        };

        requestUpcomingMovies();
    }, []);

    return (
        <>
            <HeroCarousel />
            <div className="container mx-auto px-4 md:px-12 my-8">
                <h1 className="text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3">
                    The Best of Entertainment
                </h1>
                <EntertainmentCardSlider />
            </div>

            <div className="container mx-auto px-4 md:px-12 my-8">
                <PosterSlider title="Recommended Movies" subtitle="List of recommended movies"
                    posters={recommendedMovies}
                    isDark={false} />
            </div>

            <div className="bg-premiere-800 py-12">
                <div className="container mx-auto px-12 md:px-12 my-8 flex flex-col gap-3">
                    <div className="hidden md:flex">
                        <img src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png" alt="Rupay" className="w-full h-full" />
                    </div>
                    <PosterSlider title="Premieres" subtitle="Brand new releases every Friday"
                        posters={premierMovies}
                        isDark={true} />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 my-8">
                <PosterSlider title="Online Streaming Events" subtitle=""
                    posters={onlineStreamEvents}
                    isDark={false} />
            </div>
            {/* <div className="container mx-auto px-4 py-1 md:px-12 my-8">
                <PosterSlider title="Laughter Therapy" subtitle=""
                    posters={outdoorEvents}
                    isDark={false} />
            </div>
            <div className="container mx-auto px-4 py-1 md:px-12 my-8">
                <PosterSlider title="Outdoor Events" subtitle=""
                    posters={laughterEvents}
                    isDark={false} />
            </div>
            <div className="container mx-auto px-4 py-1 md:px-12 my-8">
                <PosterSlider title="Popular Events" subtitle=""
                    posters={popularEvents}
                    isDark={false} />
            </div>
            <div className="container mx-auto px-4 py-1 md:px-12 my-8">
                <PosterSlider title="Top Games & Sport Events" subtitle=""
                    posters={topEvents}
                    isDark={false} />
            </div> */}
            <div>footer</div>
        </>
    )
}
export default HomePage;