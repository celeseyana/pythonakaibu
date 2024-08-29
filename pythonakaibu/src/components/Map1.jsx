import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier"
import { Suspense } from "react";
import SceneMap1 from "./SceneMap1";
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import './Map1.css';
import 'beercss';

export default function Map1() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* the labels for hp, turn count and score for each player  */}
            <span className="game-quit absolute">back button placeholder</span>

            <div className="p1-details absolute">
                <span className="player1-hp bold">name1's HP</span>
                <span className="player1-hp-num">P1HP</span>
                <span className="player1-score bold">name1's Score</span>
                <span className="player1-score-num">P1Score</span>
            </div>

            <div className="p2-details absolute">
                <span className="player2-hp bold">name2's HP</span>
                <span className="player2-hp-num">P2HP</span>
                <span className="player2-score bold">name2's Score</span>
                <span className="player2-score-num">P2Score</span>
            </div>

            <Canvas shadows camera={{ position: [0, -2, 10], fov: 80}}>
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


