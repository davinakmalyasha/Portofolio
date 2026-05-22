// Shared mutable scroll progress state — written once per frame by useLenisScroll,
// read by SceneController + ParticleWave. Eliminates 2 DOM reads per animation frame.
export let scrollProgress = 0;

export function setScrollProgress(value: number): void {
  scrollProgress = value;
}
