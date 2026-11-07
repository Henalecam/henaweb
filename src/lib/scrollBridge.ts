/**
 * The smooth scroller (SmoothScroll, on every page) and GSAP's ScrollTrigger (only the home's scenes load it) meet
 * here, so the scroller doesn't have to import GSAP to talk to it: lib/gsap provides ScrollTrigger when that module
 * loads, and the scroller hooks in if and when it appears. Pages without ScrollTrigger never pay for it.
 */
type ScrollTriggerLike = {
  update: () => void;
  addEventListener: (type: 'refresh', cb: () => void) => void;
  removeEventListener: (type: 'refresh', cb: () => void) => void;
};

let provided: ScrollTriggerLike | null = null;
const waiting = new Set<(st: ScrollTriggerLike) => void>();

export function provideScrollTrigger(st: ScrollTriggerLike) {
  provided = st;
  waiting.forEach((cb) => cb(st));
  waiting.clear();
}

/** Runs `cb` with ScrollTrigger now if it is loaded, or as soon as it is. Returns a cancel for the wait. */
export function withScrollTrigger(cb: (st: ScrollTriggerLike) => void) {
  if (provided) {
    cb(provided);
    return () => {};
  }
  waiting.add(cb);
  return () => waiting.delete(cb);
}
