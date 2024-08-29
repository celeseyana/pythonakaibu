import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Torii(props) {
  const { nodes, materials } = useGLTF('./src/models/torii/toriimodel.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Node-Mesh'].geometry} material={materials.mat23} />
      <mesh geometry={nodes['Node-Mesh_1'].geometry} material={materials.mat14} />
    </group>
  )
}

useGLTF.preload('./src/models/torii/toriimodel.glb')
