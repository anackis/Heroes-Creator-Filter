
// import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice';  /// Now in slice
// import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice';

// export const fetchHeroes = (request) => (dispatch) => {      /// Now in Slice
//     dispatch(heroesFetching());
//         request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))
// }

// export const applyHeroesFilters = (request) => (dispatch) => {       /// Now in Slice
//     dispatch(filtersFetching());
//         request("http://localhost:3001/filters")
//             .then(data => dispatch(filtersFetched(data)))
//             .catch(() => dispatch(filtersFetchingError()))
// }

/// Now in heroSlice
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

/// Now in heroSlice
// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

/// Now in heroSlice
// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

/// Now in heroSlice
// export const heroDeleted  = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }

/// Now in filtersSlice
// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }
// /// Now in filtersSlice
// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }
// /// Now in filtersSlice
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }
// /// Now in filtersSlice
// /// Simple action 
// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }
/// Action with asynk code to test Redux-thunk. Getting function that takes dispatch. 
// export const activeFilterChanged = (filter) => (dispatch) => {               /// We can put setTimeout on button but this method is more centralized
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 500)
// }

/// Now in heroSlice
// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }



