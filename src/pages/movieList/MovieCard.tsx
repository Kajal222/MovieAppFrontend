import { Movie } from "@/interfaces/movie.interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
const imgBaseUrl = 'http://localhost:3000/uploads/';
const defaultPoster = "https://s3-alpha-sig.figma.com/img/71b7/26c9/bdb04893d9269540ca86da074296255e?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Iv-VBOtiyB6kTVForG8BrGWIdx4b~swRqQ7lK03c4A6G10xFpJkSecEDzqLCHuY9-Reit3ubnVLSOrI69LrOP6oNu3~-hbOsWaFM8iS2NCsDyM1hE7ZNFVG~k8VEC8YGxsRnh60YM2eMsz2J4AUCQp512npMaE5bdpRasUBf09MgLBfRBIuQ7~fuDVjsVpNAbTX1RxEFZ5KP6fcrIfQXbPGFrrcTwrM3RMfK7Mtg1fQBBne9tYOxVXsPa~OokcMGee00JEm56BgBcnvOcv46q0fwfkM~S9otowx9ZZKDuzvmdwPHvm-GE3sks2hU9KtrWvH83201IybsxyNbwuTacA__"

const MovieCard = ({ data }: { data: Movie }) => {
    const navigate = useNavigate();
    return (
        <div className="w-1/4 p-3 h-fit max-h-fit">
            <Card className="bg-cardColor border-cardColor rounded-lg">
                <CardHeader className="p-2">
                    <img src={imgBaseUrl + data.poster}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== defaultPoster) {
                                target.src = defaultPoster;
                            }
                        }}
                        alt="add alternative text here"
                        style={{ height: "250px" }} className="rounded-lg" />
                </CardHeader>
                <CardContent className="">
                    <div className="flex justify-between text-white font-bold text-medium pt-15 text-left montserrat-font">
                        {data.title}
                        <span onClick={() => { navigate('/updateMovie', { state: { data: data } }) }}>
                            <Pencil className="h-4 w-4" />
                        </span>
                    </div>
                    <div className="text-white font-normal text-medium pt-15 text-left montserrat-font">
                        {data.publishedYear}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
export default MovieCard;