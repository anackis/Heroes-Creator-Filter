

import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/// When we click "All" we have rerender every time but we do not have any changes. To avoide this we use createSelector from reselect tot memorize function
import { createSelector } from 'reselect';     


import { fetchHeroes, heroDeleted  } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    /// When we click "All" we have rerender every time but we do not have any changes. To avoide this we use createSelector from reselect tot memorize function
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {        /// First argument from top first function and second from second one. 
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter);
            }
        }               
    )
    const filteredHeroes = useSelector(filteredHeroesSelector);

    /// Old code where we had problem with "All" filter: If we click "All" many times we would have rerender every time but data wouldnt change. With createSelector from 'reselect'
    /// we memorize function and if data woulnt change we wouldnt rerender element. 

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    //     }
    // })

   
    const heroesLoadingStatus = useSelector(state => state.heroes.filteredHeroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    /// New variant that we  create in actions fetchHeroes (With help of redux-thunk)
    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);
    /// Old variant when we didnt create in actions fetchHeroes (With help of redux-thunk)
    // useEffect(() => {
    //     dispatch(heroesFetching());
    //     request("http://localhost:3001/heroes")
    //         .then(data => dispatch(heroesFetched(data)))
    //         .catch(() => dispatch(heroesFetchingError()))
    // }, []);


    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">loading error</h5>
    }

    const renderHeroesList = (arr) => {
        
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">There are no heroes yet</h5>
        }
        return arr.map(({id, ...props}) => {
            return <HeroesListItem onDelete={() => onDelete(id)} id={id} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;