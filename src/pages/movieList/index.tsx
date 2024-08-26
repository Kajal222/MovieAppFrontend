import { useEffect, useState } from "react";
import { Movie } from "@/interfaces/movie.interface";
import MovieCard from "./MovieCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { AddSVG } from "@/components/icons/svg/AddSVG";
import { LogoutSVG } from "@/components/icons/svg/LogoutSVG";
import { useNavigate } from "react-router-dom";
import { logoutService } from "@/services/auth.service";
import { getmovieListService } from "@/services/movie.service";

// const mData = [
//     {
//         _id: 1,
//         title: 'Movie 1',
//         publishedYear: 2021,
//         poster: "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Iv-VBOtiyB6kTVForG8BrGWIdx4b~swRqQ7lK03c4A6G10xFpJkSecEDzqLCHuY9-Reit3ubnVLSOrI69LrOP6oNu3~-hbOsWaFM8iS2NCsDyM1hE7ZNFVG~k8VEC8YGxsRnh60YM2eMsz2J4AUCQp512npMaE5bdpRasUBf09MgLBfRBIuQ7~fuDVjsVpNAbTX1RxEFZ5KP6fcrIfQXbPGFrrcTwrM3RMfK7Mtg1fQBBne9tYOxVXsPa~OokcMGee00JEm56BgBcnvOcv46q0fwfkM~S9otowx9ZZKDuzvmdwPHvm-GE3sks2hU9KtrWvH83201IybsxyNbwuTacA__",
//     },
// ]
const MovieList = () => {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [paginationValues, setPaginationValues] = useState({ page: 1, skip: 0, limit: 4 });
    const navigate = useNavigate();

    const getMovieListHandler = async () => {
        let result = await getmovieListService(sessionStorage.getItem('email') ?? '');
        if (result) {
            setMovieList(result.filter(movie => movie.title.length > 0));
        }
    }
    useEffect(() => {
        getMovieListHandler();
    }, [])

    const logoutHandler = async () => {
        if (sessionStorage.getItem('email')) {
            let result = await logoutService({ email: sessionStorage.getItem('email') ?? '' });
            (result);
            if (result) {
                sessionStorage.removeItem('email')
                sessionStorage.removeItem('authToken')
                navigate('/login')
            }
        }
    }
    return (
        <div className="p-0 h-full">
            <div className="flex flex-col md:flex-row h-full w-full">
                <div className="p-0 pt-10 md:p-14 pb-0 flex-column overflow-auto w-full">
                    {movieList.length > 0 ?
                        <div className="montserrat-font pt-1 w-full">
                            <div className="flex justify-between text-white pt-15 text-left montserrat-font px-5 pb-5">
                                <div className="flex items-center gap-5 font-bold text-3xl">
                                    My movies
                                    <span onClick={() => { navigate('/createMovie') }}>
                                        <AddSVG />
                                    </span>
                                </div>
                                <div className="flex items-center gap-5 font-medium text-sm"
                                    onClick={logoutHandler}>
                                    Logout
                                    <LogoutSVG />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                {movieList
                                    .slice(paginationValues.skip, paginationValues.limit + paginationValues.skip)
                                    .map((movie: Movie, index: number) => (
                                        <MovieCard data={movie} key={index} />
                                    ))}
                            </div>
                            <div className="py-10">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious className="text-white hover:text-white hover:font-bold font-medium montserrat-font hover:bg-pageBackgroundColor cursor-pointer"
                                                disabled={paginationValues.skip - 4 < 0}
                                                onClick={() => {
                                                    if (paginationValues.skip - 4 >= 0)
                                                        setPaginationValues({ page: paginationValues.page - 1, skip: paginationValues.skip - 4, limit: 4 })
                                                }}
                                            />
                                        </PaginationItem>
                                        {movieList
                                            .map((movie: Movie, index: number) => (
                                                ((index) % 4 === 0) && movie && <PaginationItem key={index}>
                                                    <PaginationLink className={`text-white hover:text-white hover:font-bold font-medium montserrat-font ${paginationValues.page === (index / 4) + 1 ? "bg-successBtnBg font-bold" : "bg-cardColor"} hover:bg-cardColor cursor-pointer`}
                                                        onClick={() => {
                                                            setPaginationValues({ page: (index / 4) + 1, skip: index, limit: 4 })
                                                        }}
                                                    >{(index / 4) + 1}</PaginationLink>
                                                </PaginationItem>
                                            ))}
                                        <PaginationItem>
                                            <PaginationNext className="text-white hover:text-white hover:font-bold font-medium montserrat-font hover:bg-pageBackgroundColor cursor-pointer"
                                                disabled={paginationValues.skip + 4 >= movieList.length}
                                                onClick={() => {
                                                    if (paginationValues.skip + 4 < movieList.length)
                                                        setPaginationValues({ page: paginationValues.page + 1, skip: paginationValues.skip + 4, limit: 4 })
                                                }}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                        : <div className="montserrat-font pt-14 w-full m-auto h-full">
                            <div className="text-white font-bold text-3xl pt-15 text-center montserrat-font pb-5">
                                Your movie list is empty
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-successBtnBg text-white font-medium text-sm py-4 px-4 rounded-lg w-50 h-12"
                                    onClick={() => {
                                        navigate("/createMovie")
                                    }}
                                >
                                    Add a new movie
                                </button>
                            </div>
                        </div>}
                </div>

            </div>
        </div>
    );
}

export default MovieList;