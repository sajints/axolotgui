import { createContext, useState } from 'react';
const FilterContext = createContext();

const FilterProvider = ({children})=>{
    const [filterData , setFilterData] = useState({});
    const [finalFilterData , setFinalFilterData] = useState({});

    const setData = (id ,value) =>{
        const newState = {
            ...filterData,
            ...finalFilterData,
            [id]:value
        }
        setFilterData(newState)
    }
    return(
        <FilterContext.Provider value={{filterData, setData,setFilterData,finalFilterData , setFinalFilterData}}>
            {children}
        </FilterContext.Provider>
    )
}
;
export {FilterContext , FilterProvider}