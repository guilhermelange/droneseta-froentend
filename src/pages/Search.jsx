import Products from './Products';
import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

export default function Search() {
    const {searchState: [search,] } = useContext(SessionContext); 

    return (
        <Products name={search}></Products>
    );
}