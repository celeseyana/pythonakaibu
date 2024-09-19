import { OrbitControls } from '@react-three/drei'; 
import { RigidBody } from '@react-three/rapier';
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

            const color = (row + col) % 2 === 0 ? 'cyan' : 'white';

            tiles.push(
                <Tile key={`${row}-${col}`} position={[x, y, 0]} color={color} />
            );
        }
    }

    const p1Start = [
        [-1.5 * tileRadius, -height / 2, 0],
        [-3.0 * tileRadius, 0, 0],
        [-3.0 * tileRadius, height, 0],
        [-1.5 * tileRadius, 1.5 * height, 0],
        [-5, height / 2, 0],
    ];

    p1Start.forEach((pos, index) => {
        tiles.push(
            <Tile key={`bottom-left-${index}`} position={pos} color="lightgreen" />
        );
    });

    const p2Start = [
        [(cols) * 1.5 * tileRadius, (rows - 0.5) * height, 0],
        [(cols + 1) * 1.5 * tileRadius, (rows) * height, 0],
        [(cols + 2) * 1.5 * tileRadius, (rows - 0.5) * height, 0],
        [(cols + 2) * 1.5 * tileRadius, (rows - 1.5) * height, 0],
        [(cols + 1) * 1.5 * tileRadius, (rows - 2) * height, 0],
        [(cols) * 1.5 * tileRadius, (rows - 1.5) * height, 0],
        [(cols) * 1.5 * tileRadius, (rows - 2.5) * height, 0],
    ];

    p2Start.forEach((pos, index) => {
        tiles.push(
            <Tile key={`top-right-${index}`} position={pos} color="lightgreen" />
        );
    });

    return <>{tiles}</>;

}

const SceneMap1 = () => {
    return (
        <>
            {/* <OrbitControls /> */}
            {/* the above makes it rotate but idk whether that sld be a feature or nah */}
            <ambientLight intensity={1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                color={"#9e69da"}
            />

            <RigidBody colliders={false} type='fixed' position-x={-5} position-y={-5}>
                <ConqBoard rows={7} cols={7} />
            </RigidBody>
        </>
    )
}

export default SceneMap1;
