import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import race from '../assets/race1.jpg';
import tank from '../assets/tank.jpg';
import tetris from '../assets/tetris.jpg';

let Home = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handlePress = (carouselItem) => {
        console.log('press', carouselItem)
    }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} onClick={handlePress}>
            <Carousel.Item onSelect={handlePress}>
                <img
                    className="d-block w-100"
                    src={race}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item onClick={handlePress}>
                <img
                    className="d-block w-100"
                    src={tank}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item onClick={handlePress}>
                <img
                    className="d-block w-100"
                    src={tetris}
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;