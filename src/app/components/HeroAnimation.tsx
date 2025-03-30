'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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

function createPixel(geometry: THREE.BoxGeometry, material: THREE.Material, theme: string | undefined): Pixel {
  const size = Math.random() * 1.0 + 0.45;
  const color = new THREE.Color(theme === 'dark' ? 0x4f46e5 : 0x6366f1);
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(size, size, size);
  
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 50 + 20;
  
  const position = new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * 0.5,
    Math.random() * 60 - 30
  );
  
  mesh.position.copy(position);
  
  return {
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
  };
}

function updatePixel(pixel: Pixel, mouse: THREE.Vector3, time: number, wave: THREE.Vector3) {
  const distanceToMouse = pixel.position.distanceTo(mouse);
  
  if (distanceToMouse < 30) {
    const waveStrength = Math.pow((30 - distanceToMouse) / 30, 2);
    const waveDirection = new THREE.Vector3()
      .subVectors(mouse, pixel.originalPosition)
      .normalize();
    
    const waveForce = waveDirection.multiplyScalar(waveStrength * 0.05);
    pixel.velocity.add(waveForce);
    
    pixel.velocity.x += (Math.random() - 0.5) * 0.01;
    pixel.velocity.y += (Math.random() - 0.5) * 0.01;
    pixel.velocity.z += (Math.random() - 0.5) * 0.01;
  }
  
  const returnForce = new THREE.Vector3()
    .subVectors(pixel.originalPosition, pixel.position)
    .multiplyScalar(0.01);
  pixel.velocity.add(returnForce);
  
  pixel.velocity.multiplyScalar(0.98);
  pixel.position.lerp(pixel.position.clone().add(pixel.velocity), 0.1);
  
  pixel.mesh.position.copy(pixel.position);
  pixel.mesh.rotation.x += pixel.rotationSpeed.x;
  pixel.mesh.rotation.y += pixel.rotationSpeed.y;
  pixel.mesh.rotation.z += pixel.rotationSpeed.z;
  
  const material = pixel.mesh.material as THREE.MeshPhongMaterial;
  const hsl = { h: 0, s: 0, l: 0 };
  const hue = (pixel.baseColor.getHSL(hsl).h + time * 0.05) % 1;
  material.color.setHSL(hue, 0.7, 0.5);
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
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(resolvedTheme === 'dark' ? 0x111827 : 0xffffff);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 30;
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(resolvedTheme === 'dark' ? 0x111827 : 0xffffff, 1);
    containerRef.current?.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(resolvedTheme === 'dark' ? 0xffffff : 0x000000, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(resolvedTheme === 'dark' ? 0xffffff : 0x000000, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(resolvedTheme === 'dark' ? 0xffffff : 0x000000, 1);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Create pixels
    const pixelCount = 500;
    const pixelGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const pixelMaterial = new THREE.MeshPhongMaterial({
      color: resolvedTheme === 'dark' ? 0x4f46e5 : 0x6366f1,
      emissive: resolvedTheme === 'dark' ? 0x4f46e5 : 0x6366f1,
      emissiveIntensity: 0.5,
      shininess: 100,
    });

    for (let i = 0; i < pixelCount; i++) {
      const pixel = createPixel(pixelGeometry, pixelMaterial, resolvedTheme);
      scene.add(pixel.mesh);
      pixelsRef.current.push(pixel);
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x * 20, y * 20, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.01;

      // Update pixels
      pixelsRef.current.forEach((pixel) => {
        updatePixel(pixel, mouseRef.current, timeRef.current, waveRef.current);
      });

      // Update camera
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseRef.current.x - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (mouseRef.current.y - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mounted, resolvedTheme]);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div className="absolute bottom-4 right-4 flex space-x-4 z-10">
        <a href="https://github.com/henalecam" target="_blank" rel="noopener noreferrer" 
           className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300">
          <span className="sr-only">GitHub</span>
          <Image
            src="/social-icons/github.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </a>
        <a href="https://linkedin.com/in/henalecam" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300">
          <span className="sr-only">LinkedIn</span>
          <Image
            src="/social-icons/linkedin.svg"
            alt="LinkedIn"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </a>
        <a href="https://instagram.com/henalecam" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300">
          <span className="sr-only">Instagram</span>
          <Image
            src="/social-icons/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </a>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300">
          <span className="sr-only">WhatsApp</span>
          <Image
            src="/social-icons/whatsapp.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
}