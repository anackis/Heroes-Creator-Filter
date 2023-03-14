
// import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { applyHeroesFilters } from './filtersSlice';
import { activeFilterChanged } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    // const {request} = useHttp();

    /// New version that we create in actions applyHeroesFilters (With help of redux-thunk)
    useEffect(() => {
        dispatch(applyHeroesFilters());
        // eslint-disable-next-line
    }, []);
    /// Old version when we didnt create in actions applyHeroesFilters (With help of redux-thunk)
    // useEffect(() => {
    //     dispatch(filtersFetching());
    //     request("http://localhost:3001/filters")
    //         .then(data => dispatch(filtersFetched(data)))
    //         .catch(() => dispatch(filtersFetchingError()))
    // }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">The filters are not found</h5>
        }

       
        return arr.map(({ name, className, label }) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Five the heroes by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;