import React, { useEffect } from 'react'
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [apiData, setApiData] = React.useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODQ2OGE3Nzc4MTQ4MWU4NzUxZDdhOWQ2YjMwN2VkNSIsIm5iZiI6MTc1NjcyMzgyNy4zMTYsInN1YiI6IjY4YjU3YTczNDIxYjU2MzVlZDIwMGZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W-nuy52325LS4vmrHjDmZN6o0U5Zz2kW2_83kp0Enbs'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    }, [])



    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={() => { navigate(-2) }} />
            <iframe src={`https://www.youtube.com/embed/${apiData.key}`}
                title='trailer' width='90%' height='90%'
                frameborder="0" allowFullScreen></iframe>

            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player