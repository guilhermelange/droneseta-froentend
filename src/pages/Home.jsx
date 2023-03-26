import Template from '../pages/Template'
import Carousel from '../components/Carousel'
import Products from './Products';

export default function Home() {
    return (
        <Template>
            <Carousel></Carousel>
            <Products></Products>
        </Template>
    );
}