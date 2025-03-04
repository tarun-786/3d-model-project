import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense, use} from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useLocation,useNavigate } from 'react-router-dom';

import { Html } from "@react-three/drei";
import HomePage from "./Home";
function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={22} />;
}

export default function ModelViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const modelUrl = location.state?.modelUrl || 
    "https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullAir%20Jordan%201%20Low-v-0-v-.glb";
  const controlsRef = useRef();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6">
      <motion.h1
        className="mt-16 text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        3D Model Viewer
      </motion.h1>
      <div>use your cursor to rotate the model</div>
      <div className="gap-12px">
      <button onClick={ ()=>navigate('/')}>
        Home Page
        </button>
      <button onClick={ ()=> navigate('/upload')}>
        Upload Page
      </button>
      </div>
      <div className="w-full h-max max-w-6xl h-[800px] flex justify-center items-center rounded-2xl overflow-hidden shadow-lg bg-gray-800 p-4">
        <Canvas camera={{ position: [0, 2, -5] }} style={{ marginTop: "20px", width: "100%", height: "800px" }}>
          <Suspense
            fallback={
              <Html>
                <div className="text-white">Loading...</div>
              </Html>
            }
            >
            <Model modelUrl={modelUrl} />
            <OrbitControls enablePan enableZoom enableRotate />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
