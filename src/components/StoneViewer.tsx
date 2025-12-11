import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';


const StoneModel = () => {
    const { scene } = useGLTF('/stone.glb');

    React.useEffect(() => {
        scene.traverse((child) => {
            if (child.name.toLowerCase().includes('camera') || child.type.toLowerCase().includes('camera')) {
                child.visible = false;
            }
        });
    }, [scene]);

    return <primitive object={scene} />;
};

const StoneViewer: React.FC = () => {
    // Scroll animation for container opacity/scale if desired, 
    // but keeping it simple for now as requested.

    return (
        <div className="relative h-screen w-full bg-vintage-paper flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 4], fov: 50 }}
                    gl={{
                        preserveDrawingBuffer: true,
                        failIfMajorPerformanceCaveat: false
                    }}
                    onCreated={({ gl }) => {
                        // Add context loss/restore handlers
                        gl.domElement.addEventListener('webglcontextlost', (event) => {
                            event.preventDefault();
                            console.warn('WebGL context lost in StoneViewer. Attempting to restore...');
                        });
                        gl.domElement.addEventListener('webglcontextrestored', () => {
                            console.log('WebGL context restored in StoneViewer.');
                        });
                    }}
                >
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.6}>
                            <StoneModel />
                        </Stage>
                        <OrbitControls autoRotate enableZoom={false} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Optional Overlay Text */}
            <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-ink-black/80 mb-4">
                    Stone Artifact
                </h2>
                <p className="text-xl font-serif text-ink-black/60">
                    Interact to explore
                </p>
            </div>

            {/* Loading Indicator could be added here if Suspense fallback was visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="sr-only">Loading 3D Model...</span>
            </div>
        </div>
    );
};

// Preload the model
useGLTF.preload('/stone.glb');

export default StoneViewer;
