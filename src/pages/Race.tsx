import { useRef, useState, useEffect, memo, useMemo, forwardRef, useCallback } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import Nissan from '../components/game_elements/race/Nissan'

const Race = () => {
    //console.log('render Race')
    const [gameStarted, setGameStarted] = useState(false);
    const [nissans, setNissans] = useState([]);
    const [speed, setSpeed] = useState(0.1);
    const [score, setScore] = useState(0);
    const canvasRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const playerRef = useRef();
    const enemyRefs = useRef([]);

    const addNissan = () => {
        const randomXPosition = 1.7 * (3 * Math.random() | 0) - 1.7;
        const newNissan = { id: Date.now(), position: [randomXPosition, 5, 0] };
        setNissans((prevNissans) => [...prevNissans, newNissan]);
    };

    const startGame = () => {
        setGameStarted(prevValue => !prevValue);
    }

    const defineRef = useCallback((el) => {
        console.log('defineRef', el)
        el && enemyRefs.current.push(el);
        return enemyRefs.current.at(-1);
    }, []);

    const initialPlayerPosition = useMemo(() => [0, -5, 0], []);

    // Функция для очистки материалов
    const cleanMaterial = (material) => {
        material.map?.dispose();
        material.lightMap?.dispose();
        material.bumpMap?.dispose();
        material.normalMap?.dispose();
        material.specularMap?.dispose();
        material.envMap?.dispose();
        material.dispose();
    };

    // Функция для очистки Canvas
    const clearCanvas = useCallback(() => {
        if (sceneRef.current && rendererRef.current) {
            // Очистка сцены
            sceneRef.current.traverse((object) => {
                if (object.isMesh) {
                    object.geometry.dispose();
                    if (object.material) {
                        if (object.material.isMaterial) {
                            cleanMaterial(object.material);
                        } else {
                            // Обработка массива материалов
                            for (const material of object.material) {
                                cleanMaterial(material);
                            }
                        }
                    }
                }
            });

            // Очистка рендерера
            rendererRef.current.dispose();
            rendererRef.current.forceContextLoss();
            rendererRef.current = null;
        }

        // Очистка рефов
        sceneRef.current = null;
        playerRef.current = null;
        enemyRefs.current = [];

        canvasRef.current = null;

        cancelAnimationFrame(reqAnimation.current)
    }, []);

    const reqAnimation = useRef();
    useEffect(() => {
        if (gameStarted) setScore(0);
        const addCarInterval = setInterval(() => {
            if (gameStarted) {
                setSpeed(prev => prev += 0.01);
                console.log(speed)
                addNissan();
            }
        }, 3000);
        return () => {
            clearInterval(addCarInterval);
        }
    }, [gameStarted]);

    useEffect(() => {
        const handleCollision = (player, enemies) => {
            //console.log('HC')
            //console.log(nissans, enemies);
            enemies.filter(en => en).forEach((enemy) => {
                if (enemy.position.y < -10) {
                    //console.log(nissans.length, nissans, enemies.filter(en => en).length, enemies.filter(en => en), enemy)
                    setNissans(prevNissans => prevNissans.filter(n => n.id !== enemy.userData.nissanId));
                    enemyRefs.current = enemyRefs.current.filter(ref => ref.userData.nissanId !== enemy.userData.nissanId);
                    setScore(prev => prev + 1);
                }
                const dx = Math.abs(player.position.x - enemy.position.x);
                const dy = Math.abs(player.position.y - enemy.position.y);
                if (dx < 1 && dy < 3.5) {
                    setSpeed(0.05);
                    clearCanvas();
                    setNissans([]);
                    enemyRefs.current = [];
                    cancelAnimationFrame(reqAnimation.current);
                    setGameStarted(prevValue => !prevValue);
                }
            });
        };

        const animate = () => {
            if (playerRef.current && enemyRefs.current) {
                handleCollision(playerRef.current, enemyRefs.current);
                reqAnimation.current = requestAnimationFrame(animate);
            }
        };
        if (gameStarted) animate();
        return () => cancelAnimationFrame(reqAnimation.current);
    }, [nissans]);

    return (
        <>
            {
                gameStarted ?
                    <div style={{ width: '90vw', height: '90vh', backgroundColor: '#aaaaaa' }}>
                        {/* <button onClick={addNissan} style={{ position: 'absolute', zIndex: 1 }}>
                            Add Nissan
                        </button> */}
                        <Canvas ref={canvasRef} onCreated={({ scene, gl }) => {
                            sceneRef.current = scene;
                            rendererRef.current = gl;
                        }}>
                            {/* <HDRBackground /> */}
                            <OrbitControls />
                            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                            <ambientLight intensity={2} />
                            <pointLight position={[10, 10, 10]} />

                            <Nissan url='/nissan2.glb' position={initialPlayerPosition} isPlayer={true} ref={playerRef} />

                            {nissans.map((nissan, idx) => (
                                <Nissan key={nissan.id} id={nissan.id} url='/nissan2.glb' position={nissan.position} ref={defineRef} speed={speed} />
                            ))}
                        </Canvas>
                    </div>
                    :
                    <div>
                        <div>{score}</div>
                        <button onClick={startGame} style={{ position: 'absolute', zIndex: 1 }}>
                            Start
                        </button>
                    </div>

            }
        </>
    );
}

export default Race;