

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from "../../components/heroesList/heroesSlice";

const HeroesAddForm = () => {
    
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();


    const onSubmitHandler  = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(res => console.log(res, 'Sending is successful'))
        .then(dispatch(heroCreated(newHero)))
        .catch(err => console.log(err));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }


    const renderFilters = (filters, status) => {
        // console.log(filters)
        if (status === "loading") {
            return <option>Loading elements</option>
        } else if (status === "error") {
            return <option>loading error</option>
        }
        
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }
    

    return (
        <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">The name of the new hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    placeholder="What I can?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose an element of the hero</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    name="element">
                    <option >I own the element ...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;