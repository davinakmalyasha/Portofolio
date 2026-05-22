export const vertexShader = `
  uniform float uTime;
  uniform float uMouseParallaxX;
  uniform float uMouseParallaxY;
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  varying float vTwinkle;
  void main() {
    // L1 norm distance centered in the upper sky (X=0, Y=7.8) to form a Diamond/Rhombus ("belah ketupat")
    float diamondDist = abs(position.x) + abs(position.y - 7.8);
    // Diamond-shaped ripple wave propagating outward
    float spatialWave = sin(uTime * aSpeed - diamondDist * 0.16);
    // Micro-biological high-frequency twitch/heartbeat
    float heartbeat = sin(uTime * aSpeed * 3.5 + aPhase);
    // Sharp organic pulse curve: high power creates sharp viral spikes and slow decay
    vTwinkle = 0.2 + 0.8 * (pow(max(0.0, spatialWave), 3.2) * (0.8 + 0.2 * heartbeat));
    
    // Parallax logic: stars further away shift less
    float depthFactor = (position.z + 30.0) * 0.055;
    vec3 shiftedPos = position;
    shiftedPos.x += uMouseParallaxX * depthFactor;
    shiftedPos.y += uMouseParallaxY * depthFactor;
    
    // Slow, chill vertical waving/drift (individual phase offsets prevent synchronous motion)
    shiftedPos.y += sin(uTime * 0.28 + aPhase) * 0.18;
    
    vec4 mvPosition = modelViewMatrix * vec4(shiftedPos, 1.0);
    gl_PointSize = aSize * vTwinkle * (320.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    // L1 Manhattan distance to form a perfect Diamond/Rhombus ("belah ketupat") particle shape
    float dist = abs(gl_PointCoord.x - 0.5) + abs(gl_PointCoord.y - 0.5);
    if (dist > 0.5) discard;
    
    // Smooth transition for a beautiful glowing diamond/virus crystal
    float alpha = smoothstep(0.5, 0.22, dist) * vTwinkle * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
