import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier"
import { Suspense } from "react";
import SceneMap1 from "./SceneMap1";
import './Map1.css';

export default function Map1() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas shadows camera={{ position: [0, 6, 4], fov: 42 }}>
                <color attach="background" args={["#dbecfb"]} />
                <fog attach="fog" args={["#dbecfb", 30, 40]} />
                <Suspense>
                    <Physics>
                        <SceneMap1 />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    );
}


