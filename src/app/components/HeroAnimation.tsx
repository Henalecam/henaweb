'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Pixel {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mesh: THREE.Mesh;
  baseColor: THREE.Color;
  targetPosition: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  scale: number;
  originalPosition: THREE.Vector3;
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const mouseRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetRotationRef = useRef<THREE.Euler>(new THREE.Euler(0, 0, 0));
  const timeRef = useRef(0);
  const waveRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene with a darker background
    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0x0a0a0a);

    // Initialize camera with better position
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 25;

    // Initialize renderer with better quality
    rendererRef.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create pixel particles
    const pixelCount = 300;
    const colors = [0x4F46E5, 0x2563EB, 0x7C3AED, 0x6D28D9, 0xEC4899];
    
    for (let i = 0; i < pixelCount; i++) {
      const size = Math.random() * 0.15 + 0.05;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      const angle = (i / pixelCount) * Math.PI * 2;
      const radius = Math.random() * 20 + 10;
      
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.random() * 20 - 10
      );
      
      mesh.position.copy(position);
      sceneRef.current.add(mesh);
      
      pixelsRef.current.push({
        position: position.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        mesh: mesh,
        baseColor: color,
        targetPosition: position.clone(),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.01 - 0.005,
          Math.random() * 0.01 - 0.005,
          Math.random() * 0.01 - 0.005
        ),
        scale: size,
        originalPosition: position.clone()
      });
    }

    // Add lights with better positioning and intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);
    sceneRef.current.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4F46E5, 1, 100);
    pointLight.position.set(-10, -10, -5);
    sceneRef.current.add(pointLight);

    // Mouse move handler with wave effect
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Smoother mouse movement with lerp
      mouseRef.current.lerp(new THREE.Vector3(x * 20, y * 20, 0), 0.1);
      waveRef.current.lerp(new THREE.Vector3(x * 0.5, y * 0.5, 0), 0.1);
      targetRotationRef.current.y = x * 0.5;
      targetRotationRef.current.x = -y * 0.5;
    };

    // Animation with enhanced effects
    let animationFrameId: number;
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      timeRef.current += 0.01;

      // Smooth camera rotation
      if (cameraRef.current) {
        cameraRef.current.rotation.x += (targetRotationRef.current.x - cameraRef.current.rotation.x) * 0.05;
        cameraRef.current.rotation.y += (targetRotationRef.current.y - cameraRef.current.rotation.y) * 0.05;
      }

      // Update pixels with wave effect
      pixelsRef.current.forEach((pixel, i) => {
        // Calculate distance to mouse for wave effect
        const distanceToMouse = pixel.position.distanceTo(mouseRef.current);
        
        // Create smoother wave effect
        if (distanceToMouse < 30) {
          const waveStrength = Math.pow((30 - distanceToMouse) / 30, 2); // Quadratic falloff
          const waveDirection = new THREE.Vector3()
            .subVectors(mouseRef.current, pixel.originalPosition)
            .normalize();
          
          // Apply smoother wave force
          const waveForce = waveDirection.multiplyScalar(waveStrength * 0.05);
          pixel.velocity.add(waveForce);
          
          // Add subtle randomness to the wave
          pixel.velocity.x += (Math.random() - 0.5) * 0.01;
          pixel.velocity.y += (Math.random() - 0.5) * 0.01;
          pixel.velocity.z += (Math.random() - 0.5) * 0.01;
        }

        // Return to original position with smoother spring effect
        const returnForce = new THREE.Vector3()
          .subVectors(pixel.originalPosition, pixel.position)
          .multiplyScalar(0.01);
        pixel.velocity.add(returnForce);

        // Apply smoother damping
        pixel.velocity.multiplyScalar(0.98);

        // Update position with lerp for smoother movement
        pixel.position.lerp(pixel.position.clone().add(pixel.velocity), 0.1);

        // Update mesh position and rotation
        pixel.mesh.position.copy(pixel.position);
        pixel.mesh.rotation.x += pixel.rotationSpeed.x;
        pixel.mesh.rotation.y += pixel.rotationSpeed.y;
        pixel.mesh.rotation.z += pixel.rotationSpeed.z;

        // Add smoother color pulsing effect
        const material = pixel.mesh.material as THREE.MeshPhongMaterial;
        const hsl = { h: 0, s: 0, l: 0 };
        const hue = (pixel.baseColor.getHSL(hsl).h + timeRef.current * 0.05) % 1;
        material.color.setHSL(hue, 0.7, 0.5);
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize with improved performance
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
} 