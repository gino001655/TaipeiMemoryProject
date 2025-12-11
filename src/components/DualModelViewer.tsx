import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// 旋轉中心點設定 - 在這裡調整兩個模型的旋轉中心點
// ============================================
const SCENE_CENTER: [number, number, number] = [0, 0, 1]; // Scene (2) 模型的旋轉中心點 [x, y, z]
const STONE_CENTER: [number, number, number] = [0, 0, 1]; // Stone 模型的旋轉中心點 [x, y, z]
const SPHERE_RADIUS = 0; // 紅球大小

// 縮放範圍設定 - 調整模型可以放大/縮小的幅度
// minDistance: 最小距離（數值越小，可以放大越多，建議 0.5-1.0）
// maxDistance: 最大距離（數值越大，可以縮小越多，建議 20-50）
const MIN_DISTANCE = 0.5; // 允許相機最靠近的距離（放大極限）
const MAX_DISTANCE = 30; // 允許相機最遠的距離（縮小極限）
// ============================================

// Scene (2) 模型組件
const SceneModel = () => {
    const { scene } = useGLTF('/scene (2).glb');
    const groupRef = React.useRef<THREE.Group>(null);
    
    React.useEffect(() => {
        if (!groupRef.current) return;
        
        const clonedScene = scene.clone();
        
        // 計算模型的邊界框以調整縮放和置中
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // 將模型縮放到合適的大小（目標最大尺寸約為 3 單位）
        if (maxDim > 0) {
            const targetSize = 3;
            const scale = targetSize / maxDim;
            clonedScene.scale.setScalar(scale);
        }
        
        // 將模型置中（移動到原點）
        clonedScene.position.sub(center);
        
        // 隱藏相機並增強材質亮度
        clonedScene.traverse((child) => {
            if (child.name.toLowerCase().includes('camera') || child.type.toLowerCase().includes('camera')) {
                child.visible = false;
            }
            // 增強材質亮度，讓模型本身更亮
            if (child instanceof THREE.Mesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => {
                        if (mat) {
                            mat.emissive = new THREE.Color(0x333333); // 讓材質本身發光
                            mat.emissiveIntensity = 0.4;
                        }
                    });
                } else {
                    (child.material as any).emissive = new THREE.Color(0x333333);
                    (child.material as any).emissiveIntensity = 0.4;
                }
            }
        });
        
        groupRef.current.add(clonedScene);
        
        return () => {
            if (groupRef.current) {
                groupRef.current.remove(clonedScene);
                clonedScene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.geometry.dispose();
                    }
                });
            }
        };
    }, [scene]);

    return <group ref={groupRef} />;
};

// Stone 模型組件
const StoneModel = () => {
    const { scene } = useGLTF('/stone.glb');
    const groupRef = React.useRef<THREE.Group>(null);
    
    React.useEffect(() => {
        if (!groupRef.current) return;
        
        const clonedScene = scene.clone();
        
        // 計算模型的邊界框以調整縮放和置中
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // 將模型縮放到合適的大小（目標最大尺寸約為 3 單位）
        if (maxDim > 0) {
            const targetSize = 3;
            const scale = targetSize / maxDim;
            clonedScene.scale.setScalar(scale);
        }
        
        // 將模型置中（移動到原點）
        clonedScene.position.sub(center);
        
        // 隱藏相機並增強材質亮度
        clonedScene.traverse((child) => {
            if (child.name.toLowerCase().includes('camera') || child.type.toLowerCase().includes('camera')) {
                child.visible = false;
            }
            // 增強材質亮度，讓模型本身更亮
            if (child instanceof THREE.Mesh && child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((mat: any) => {
                        if (mat) {
                            mat.emissive = new THREE.Color(0x333333); // 讓材質本身發光
                            mat.emissiveIntensity = 0.4;
                        }
                    });
                } else {
                    (child.material as any).emissive = new THREE.Color(0x333333);
                    (child.material as any).emissiveIntensity = 0.4;
                }
            }
        });
        
        groupRef.current.add(clonedScene);
        
        return () => {
            if (groupRef.current) {
                groupRef.current.remove(clonedScene);
                clonedScene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.geometry.dispose();
                    }
                });
            }
        };
    }, [scene]);

    return <group ref={groupRef} />;
};

// 旋轉中心點紅球組件
const CenterSphere: React.FC<{ 
    position: [number, number, number] // 旋轉中心點位置 [x, y, z]
    radius: number // 紅球半徑
}> = ({ 
    position,
    radius
}) => {
    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
    );
};

// 自定義 OrbitControls 組件，支援右鍵平移並限制視角
const CustomOrbitControls: React.FC<{ 
    autoRotate?: boolean
    target: [number, number, number] // 旋轉中心點（與紅球位置一致）
}> = ({ 
    autoRotate = true,
    target
}) => {
    const controlsRef = useRef<any>(null);

    useEffect(() => {
        if (controlsRef.current) {
            // 設置滑鼠按鈕：左鍵旋轉，右鍵平移
            controlsRef.current.mouseButtons = {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.PAN
            };
            // 設置觸控：單指旋轉，雙指縮放和平移
            controlsRef.current.touches = {
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN
            };
        }
    }, []);

    return (
        <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            enableZoom={true}
            enablePan={true}
            minDistance={MIN_DISTANCE}
            maxDistance={MAX_DISTANCE}
            enableDamping={true}
            dampingFactor={0.05}
            target={target}
            // 限制視角：只能平視或俯瞰，不能從太底下看
            minPolarAngle={0} // 最小極角（0度 = 從上方看）
            maxPolarAngle={Math.PI / 2} // 最大極角（90度 = 平視），不能超過90度（不能從底下看）
        />
    );
};

// 雙模型展示組件
const DualModelViewer: React.FC = () => {
    return (
        <div className="relative w-full space-y-8">
            {/* Scene (2) 模型 - 獨立區塊 */}
            <div className="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden rounded-lg shadow-2xl border-2 border-vermilion/20">
                {/* 幾乎純黑色背景 */}
                <div className="absolute inset-0 bg-black" />

                {/* Scene (2) 模型 */}
                <div className="absolute inset-0 overflow-hidden">
                    <Canvas
                        shadows
                        camera={{ position: [0, 0, 6], fov: 50 }}
                        gl={{
                            preserveDrawingBuffer: true,
                            failIfMajorPerformanceCaveat: false,
                            alpha: false,
                            antialias: true
                        }}
                        style={{ background: '#000000' }}
                        onCreated={({ gl }) => {
                            gl.domElement.addEventListener('webglcontextlost', (event) => {
                                event.preventDefault();
                                console.warn('WebGL context lost in DualModelViewer (Scene). Attempting to restore...');
                            });
                            gl.domElement.addEventListener('webglcontextrestored', () => {
                                console.log('WebGL context restored in DualModelViewer (Scene).');
                            });
                        }}
                    >
                        <Suspense fallback={null}>
                            {/* 整體世界光 - 使用強烈的環境光和環境貼圖 */}
                            <ambientLight intensity={5.0} /> {/* 大幅增強環境光，這是整體的世界光 */}
                            <hemisphereLight 
                                intensity={3.0} 
                                color={0xffffff} 
                                groundColor={0x444444} 
                            /> {/* 半球光模擬天空光 */}
                            {/* 使用環境貼圖提供自然光照 */}
                            <Environment preset="sunset" />
                            {/* 柔和的定向光作為補充，不是主要光源 */}
                            <directionalLight position={[5, 10, 5]} intensity={1.0} />
                            <directionalLight position={[-5, 10, -5]} intensity={0.8} />
                            <SceneModel />
                            {/* 旋轉中心點紅球 - 旋轉中心點在檔案頂部的 SCENE_CENTER 常量中設定 */}
                            <CenterSphere position={SCENE_CENTER} radius={SPHERE_RADIUS} />
                            {/* OrbitControls 的 target 參數要與紅球 position 一致 */}
                            <CustomOrbitControls autoRotate={true} target={SCENE_CENTER} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>

            {/* Stone 模型 - 獨立區塊 */}
            <div className="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden rounded-lg shadow-2xl border-2 border-vermilion/20">
                {/* 幾乎純黑色背景 */}
                <div className="absolute inset-0 bg-black" />

                {/* Stone 模型 */}
                <div className="absolute inset-0 overflow-hidden">
                    <Canvas
                        shadows
                        camera={{ position: [0, 0, 6], fov: 50 }}
                        gl={{
                            preserveDrawingBuffer: true,
                            failIfMajorPerformanceCaveat: false,
                            alpha: false,
                            antialias: true
                        }}
                        style={{ background: '#000000' }}
                        onCreated={({ gl }) => {
                            gl.domElement.addEventListener('webglcontextlost', (event) => {
                                event.preventDefault();
                                console.warn('WebGL context lost in DualModelViewer (Stone). Attempting to restore...');
                            });
                            gl.domElement.addEventListener('webglcontextrestored', () => {
                                console.log('WebGL context restored in DualModelViewer (Stone).');
                            });
                        }}
                    >
                        <Suspense fallback={null}>
                            {/* 整體世界光 - 使用強烈的環境光和環境貼圖 */}
                            <ambientLight intensity={5.0} /> {/* 大幅增強環境光，這是整體的世界光 */}
                            <hemisphereLight 
                                intensity={3.0} 
                                color={0xffffff} 
                                groundColor={0x444444} 
                            /> {/* 半球光模擬天空光 */}
                            {/* 使用環境貼圖提供自然光照 */}
                            <Environment preset="sunset" />
                            {/* 柔和的定向光作為補充，不是主要光源 */}
                            <directionalLight position={[5, 10, 5]} intensity={1.0} />
                            <directionalLight position={[-5, 10, -5]} intensity={0.8} />
                            <StoneModel />
                            {/* 旋轉中心點紅球 - 旋轉中心點在檔案頂部的 STONE_CENTER 常量中設定 */}
                            <CenterSphere position={STONE_CENTER} radius={SPHERE_RADIUS} />
                            {/* OrbitControls 的 target 參數要與紅球 position 一致 */}
                            <CustomOrbitControls autoRotate={true} target={STONE_CENTER} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

// 預載入模型
useGLTF.preload('/scene (2).glb');
useGLTF.preload('/stone.glb');

export default DualModelViewer;

