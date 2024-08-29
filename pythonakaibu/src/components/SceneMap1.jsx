import { Cylinder, OrbitControls } from '@react-three/drei'; 
import { CylinderCollider, RigidBody } from '@react-three/rapier';
// import { Torii } from './Torii';
import Tile from "./Tile";

// mesh should be a board game

function ConqBoard({ rows, cols }) {
    const tiles = [];
    const tileRadius = 1.1;
    const height = Math.sqrt(3) * tileRadius;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++){
            const x = col * 1.5 * tileRadius;
            const y = row * height + (col % 2 === 0 ? 0 : height / 2);

            const color = (row + col) % 2 === 0 ? 'gray' : 'white';

            tiles.push(
                <Tile key={`${row}-${col}`} position={[x, y, 0]} color={color} />
            );
        }
    }
    return <>{tiles}</>;
}



const SceneMap1 = () => {
    return (
        <>
            <OrbitControls />
            <ambientLight intensity={1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                color={"#9e69da"}
            />

            {/* leave this section */}
            {/* <Torii scale={[16, 16, 16]} position={[0, 0, -22]} rotation-y={1.25 * Math.PI} />
            <Torii scale={[10, 10, 10]} position={[-8, 0, -20]} rotation-y={1.4 * Math.PI} />
            <Torii scale={[10, 10, 10]} position={[8, 0, -20]} rotation-y={1 * Math.PI} /> */}

            <RigidBody colliders={false} type='fixed' position-y={-0.5}>
                <ConqBoard rows={8} cols={8} />
            </RigidBody>
        </>
    )
}

export default SceneMap1;
