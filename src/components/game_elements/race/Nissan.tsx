import { useRef, useState, useEffect, memo, useMemo, forwardRef, useCallback } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';

const Nissan = forwardRef(({ url, position, isPlayer, speed, id }, ref) => {
    console.log('render Nissan', isPlayer, 'speed', speed)

    const reqAnimation = useRef();
    const { scene } = useGLTF(url);
    const nissanRef = ref;
    const nissan = scene.clone();
    nissan.rotation.x += Math.PI / 2;
    nissan.rotation.y += Math.PI;

    useEffect(() => {
        const handleKeyDown = (evt) => {
            evt.key === 'a' && (nissan.position.x -= 1.7);
            evt.key === 'd' && (nissan.position.x += 1.7);
        }
        if (isPlayer) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            console.log(speed)
            const animate = () => {
                //console.log(nissan)
                nissan.position.y -= speed;
                setTimeout(() => {
                    reqAnimation.current = requestAnimationFrame(animate);
                }, 10);

            };
            animate();
        }

        return () => {
            cancelAnimationFrame(reqAnimation.current);
            console.log('UN RENDER')
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // useFrame(() => {
    //     if (!isPlayer) {
    //         nissan.position.y -= 0.05;
    //     }
    // });
    nissan.userData = { nissanId: id };
    return <primitive object={nissan} position={position} ref={nissanRef} />
});

export default memo(Nissan);