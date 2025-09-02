import React, { useEffect, useRef } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = React.useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODQ2OGE3Nzc4MTQ4MWU4NzUxZDdhOWQ2YjMwN2VkNSIsIm5iZiI6MTc1NjcyMzgyNy4zMTYsInN1YiI6IjY4YjU3YTczNDIxYjU2MzVlZDIwMGZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W-nuy52325LS4vmrHjDmZN6o0U5Zz2kW2_83kp0Enbs'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);


    }, [category])
    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular On Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={card.id}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards