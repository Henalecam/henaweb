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

function createPixel(geometry: THREE.BoxGeometry, material: THREE.Material, theme: string | undefined, colorIndex?: number): Pixel {
  const size = Math.random() * 1.0 + 0.45;
  
  // Define 3 base colors that match the site's theme
  const baseColors = [
    new THREE.Color().setHSL(0.7, 0.8, 0.6),  // Roxo principal (indigo-600)
    new THREE.Color().setHSL(0.6, 0.8, 0.6),  // Azul (indigo-500)
    new THREE.Color().setHSL(0.7, 0.3, 0.9),  // Branco com tom roxo
  ];
  
  // Use the specified color index or generate a random one
  const color = colorIndex !== undefined 
    ? baseColors[colorIndex % baseColors.length].clone()
    : baseColors[Math.floor(Math.random() * baseColors.length)].clone();
  
  // Add subtle variation to the base color
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  color.setHSL(
    (hsl.h + (Math.random() - 0.5) * 0.05) % 1,  // Reduced variation for more consistent colors
    hsl.s + (Math.random() - 0.5) * 0.1,
    hsl.l + (Math.random() - 0.5) * 0.1
  );
  
  // Create a new material instance for each pixel
  const pixelMaterial = new THREE.MeshPhongMaterial({
    color: color,
    emissive: color.clone().multiplyScalar(0.5),
    emissiveIntensity: 0.5,
    shininess: 100,
  });
  
  const mesh = new THREE.Mesh(geometry, pixelMaterial);
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
  
  // Update color with very subtle animation
  const material = pixel.mesh.material as THREE.MeshPhongMaterial;
  const hsl = { h: 0, s: 0, l: 0 };
  pixel.baseColor.getHSL(hsl);
  const hue = (hsl.h + time * 0.001) % 1; // Reduced from 0.01 to 0.001 for much slower color change
  material.color.setHSL(hue, hsl.s, hsl.l);
  material.emissive.setHSL(hue, hsl.s, hsl.l * 0.5);
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      color: 0xffffff,
      emissive: 0x000000,
      emissiveIntensity: 0.5,
      shininess: 100,
    });

    // Create pixels with random distribution of the three colors
    for (let i = 0; i < pixelCount; i++) {
      const pixel = createPixel(pixelGeometry, pixelMaterial, resolvedTheme, Math.floor(Math.random() * 3));
      scene.add(pixel.mesh);
      pixelsRef.current.push(pixel);
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x * 20, y * 20, 0);
    };

    // Resize handler
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

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
        const time = timeRef.current;
        const radius = 30;
        const speed = 0.5;

        // Base camera movement
        const baseX = Math.sin(time * speed) * radius;
        const baseY = Math.cos(time * speed * 0.5) * radius * 0.5;
        const baseZ = Math.cos(time * speed * 0.3) * radius;

        if (isMobile) {
          // Mobile: Use only automatic movement
          cameraRef.current.position.x = baseX;
          cameraRef.current.position.y = baseY;
          cameraRef.current.position.z = baseZ;
        } else {
          // Desktop: Combine automatic movement with mouse interaction
          const mouseInfluence = 0.3; // How much the mouse affects the camera
          const autoInfluence = 0.7; // How much the automatic movement affects the camera

          cameraRef.current.position.x = 
            (baseX * autoInfluence) + (mouseRef.current.x * mouseInfluence);
          cameraRef.current.position.y = 
            (baseY * autoInfluence) + (mouseRef.current.y * mouseInfluence);
          cameraRef.current.position.z = baseZ;
        }

        // Smooth camera movement
        cameraRef.current.position.lerp(
          new THREE.Vector3(
            cameraRef.current.position.x,
            cameraRef.current.position.y,
            cameraRef.current.position.z
          ),
          0.1
        );

        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mounted, resolvedTheme, isMobile]);

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