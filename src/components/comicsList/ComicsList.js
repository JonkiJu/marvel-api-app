import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, reloading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return reloading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected error');
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [reloading, setReloading] = useState(false);
    const [offset, setOffset] = useState(1000);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setReloading(false) : setReloading(true);
        getAllComics(offset).then(onComicsListLoaded).then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        
        setComicsList([...comicsList, ...newComicsList]);
        setReloading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    const renderComics = function (arr) {
        const comics = arr.map(item => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), reloading)}
            <button 
                disabled={reloading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;