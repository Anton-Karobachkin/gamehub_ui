import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import race from '../assets/race1.jpg';
import tank from '../assets/tank.jpg';
import tetris from '../assets/tetris.jpg';
import { RACE_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

let Home = () => {

    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handlePress = (carouselItem) => {
        //console.log('press', carouselItem);
        console.log(carouselItem.target.id);
        switch (carouselItem.target.id) {
            case 'race':
                navigate(RACE_ROUTE);
                break;
        }
    }

    return (
        <Carousel interval={3000} pause={false} activeIndex={index} onSelect={handleSelect} onClick={handlePress}>
            <Carousel.Item>
                <img
                    id="race"
                    className="d-block w-100"
                    src={race}
                    alt="RACE"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    id="tank"
                    className="d-block w-100"
                    src={tank}
                    alt="TANK"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    id="tetris"
                    className="d-block w-100"
                    src={tetris}
                    alt="TETRIS"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;