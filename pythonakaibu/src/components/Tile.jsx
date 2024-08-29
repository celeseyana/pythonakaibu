import { useMemo } from "react";
import * as THREE from 'three'; 

export default function Tile({ position, color }) {
    const boardTile = useMemo(() => {
        const shape = new THREE.Shape();
        const radius = 1;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }
        shape.closePath();
        return shape;
    }, []);

    const boldTiles = useMemo(() => ({
        depth: 0.2, 
        bevelEnabled: false,
    }
    ), []);

    const tileGeom = useMemo(() => new THREE.ExtrudeGeometry(boardTile, boldTiles));

    return (
        <mesh position={position} geometry={tileGeom}>
            <meshStandardMaterial color={color} />
        </mesh>
    )
} 