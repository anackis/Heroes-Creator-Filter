
import {useHttp} from '../../hooks/http.hook';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
}

export const applyHeroesFilters = createAsyncThunk(
  'heroes/applyHeroesFilters',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters");
  }
);
// export const applyHeroesFilters = (request) => (dispatch) => {    // Old Version
//   dispatch(filtersFetching());
//       request("http://localhost:3001/filters")
//           .then(data => dispatch(filtersFetched(data)))
//           .catch(() => dispatch(filtersFetchingError()))
// }

const filtersSlice = createSlice ({
  name: 'filters',
  initialState: initialState,
  reducers: {
    // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},  // That code needed for applyHeroesFilters in actions. Now we have this logic here.  
    // filtersFetched: (state, action) => {
    //   state.filters = action.payload;
    //   state.filtersLoadingStatus = 'idle';
    // },
    // filterFetchingError: state => {
    //   state.filtersLoadingStatus = 'error';
    // },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyHeroesFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
      .addCase(applyHeroesFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = 'idle';
      })
      .addCase(applyHeroesFilters.rejected, state => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
}); 

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged
} = actions;