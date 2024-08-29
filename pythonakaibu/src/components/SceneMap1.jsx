import { Cylinder, OrbitControls } from '@react-three/drei'; 
import { CylinderCollider, RigidBody } from '@react-three/rapier';
import { Torii } from './Torii';

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

            <Torii scale={[16, 16, 16]} position={[0, 0, -22]} rotation-y={1.25 * Math.PI} />

            <RigidBody colliders={false} type='fixed' position-y={-0.5}>
                <CylinderCollider args={[1/2, 5]} />
                <Cylinder scale={[5, 1, 5]} receiveShadow>
                    <meshStandardMaterial color="white" />  
                </Cylinder>
            </RigidBody>
        </>
    )
}

export default SceneMap1;
