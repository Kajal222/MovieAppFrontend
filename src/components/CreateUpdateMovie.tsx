import { useCallback, useEffect, useState } from "react";
import { Movie } from "@/interfaces/movie.interface";
import DropFile from "@/components/common/DropFile";
import { useLocation, useNavigate } from "react-router-dom";
import { addMovieService, updateMovieService } from "@/services/movie.service";

const CreateUpdateMovie = ({ type }: { type: string, data: any }) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [files, setFiles] = useState<any>([]);
    const [movieData, setMovieData] = useState<Movie>({ title: "", publishedYear: "", poster: "", _id: "" });
    useEffect(() => {
        if (type === "update" && state.data) {
            setMovieData(state.data)
        }
    }, [state])
    const onDrop = useCallback((acceptedFiles: any) => {

        const filteredFiles = acceptedFiles &&
            (acceptedFiles?.filter((f: any) => f.type.includes("image/")))
        if (files) setFiles([...files, ...filteredFiles])
        else if (filteredFiles.length > 0) setFiles([...filteredFiles])
        else setFiles(null)
    }, [files]);

    const submitHandler = async () => {
        if (type === "create") {
            const formData = new FormData();
            formData.append("title", movieData.title);
            formData.append("publishedYear", String(movieData.publishedYear));
            if (files && files[0]) {
                formData.append("poster", files[0]);
            }
            formData.append("email", sessionStorage.getItem('email') ?? '')
            let result = await addMovieService(formData)
            if (result) navigate('/movieList')
        }
        else if (type === "update" && movieData?._id) {
            const formData = new FormData();
            formData.append("title", movieData.title);
            formData.append("publishedYear", String(movieData.publishedYear));
            if (files && files[0]) {
                formData.append("poster", files[0]);
            }
            formData.append("email", sessionStorage.getItem('email') ?? '')
            formData.append("id", String(movieData._id));
            let result = await updateMovieService(formData)
            if (result) navigate('/movieList')
        }
    }
    return (
        <div className="p-0 h-full">
            <div className="flex flex-col md:flex-row h-full w-full">
                <div className=" p-2 pb-0 flex-column overflow-auto w-full">
                    <div className="montserrat-font pt-1 w-full h-full">
                        <div className="text-white font-bold text-3xl pt-15 text-left montserrat-font p-10 pb-15 pl-20">
                            {type === "create" ? 'Create a new movie' : type === "update" ? 'Edit' : ''}
                        </div>
                        <div className="flex flex-wrap h-4/6">
                            <div className="w-1/2 h-100 px-10">
                                <DropFile setFilesCallback={onDrop} files={files} />
                            </div>
                            <div className="w-1/2 h-full text-left">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="appearance-none bg-fieldBg bg-opacity-50 rounded-lg font-medium text-white text-sm w-80 py-2 px-3 mb-3 leading-tight h-11"
                                    value={movieData.title}
                                    onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="publishedYear"
                                    id="publishedYear"
                                    placeholder="Published Year"
                                    className="appearance-none bg-fieldBg bg-opacity-50 rounded-lg font-medium text-white text-sm w-50 py-2 px-3 mb-3 leading-tight h-11"
                                    value={movieData.publishedYear}
                                    onChange={(e) => setMovieData({ ...movieData, publishedYear: e.target.value })}
                                />
                                <div className="mt-10">
                                    <button className="bg-buttonBg text-white font-bold text-sm py-3 px-10 mr-4 border border-white rounded-lg"
                                        onClick={() => navigate('/movieList')}
                                    >Cancel</button>
                                    <button className="bg-successBtnBg text-white font-medium text-sm py-3 px-10 rounded-lg"
                                        onClick={submitHandler}
                                    >{type === "create" ? 'Submit' : type === "update" ? 'Update' : ''}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateUpdateMovie;