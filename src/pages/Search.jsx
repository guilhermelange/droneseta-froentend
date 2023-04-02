import Template from './Template'
import Products from './Products';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

export default function Search() {
    const {searchState: [search,] } = useContext(SearchContext); 

    return (
        <Template>
            <Products name={search}></Products>
        </Template>
    );
}