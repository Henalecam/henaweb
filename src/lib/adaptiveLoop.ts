/**
 * Render loop with adaptive quality for the decorative 3D scenes.
 *
 * A device that cannot keep up first drops to tier 1 (the scene lowers its pixel ratio and the
 * loop draws every other frame, ~30 fps); if that is still too slow it settles on tier 2, a still
 * frame that is only redrawn on request (scroll, resize). With reduced motion the loop never
 * animates: it starts as a still frame.
 */

export type AdaptiveLoop = {
  /** true while the scene is a still frame (reduced motion or tier 2) */
  readonly still: boolean;
  /** redraw once, on the next animation frame; only needed when still */
  request: () => void;
  stop: () => void;
};

type Opts = {
  /** live is false for still frames: freeze time-based motion and pointer drift */
  draw: (now: number, live: boolean) => void;
  /** whether the canvas is on screen */
  visible: () => boolean;
  /** start (and stay) still */
  reducedMotion: boolean;
  /** time used for the still frame under reduced motion */
  stillTime?: number;
  /** tier 1: lower the pixel ratio; tier 2: prepare the still frame */
  onTier?: (tier: 1 | 2) => void;
};

const WINDOW = 1500; // judge the device on about a second and a half of drawn frames

export function createAdaptiveLoop({ draw, visible, reducedMotion, stillTime, onTier }: Opts): AdaptiveLoop {
  const perf = { tier: reducedMotion ? 2 : 0, frames: 0, slow: 0, total: 0, since: 0, prev: 0, skip: false };
  let raf = 0;
  let pending = 0;
  let frozen = stillTime ?? performance.now();

  const watch = (now: number) => {
    const gap = perf.prev ? now - perf.prev : 0;
    perf.prev = now;
    if (!gap) {
      // first frame, or back from a hidden tab or an off-screen stretch
      perf.since = now;
      perf.frames = perf.slow = perf.total = 0;
      return;
    }
    perf.frames++;
    perf.total += gap;
    if (gap > (perf.tier ? 50 : 34)) perf.slow++;
    const avg = perf.total / perf.frames;
    // two frames are enough when each one takes ages
    const hopeless = perf.frames >= 2 && avg > 400;
    if (!hopeless && (now - perf.since < WINDOW || perf.frames < 3)) return;
    const struggling = perf.slow > perf.frames * 0.5;
    perf.frames = perf.slow = perf.total = 0;
    perf.since = now;
    if (!struggling) return;
    // far too slow for a half step: straight to the still frame
    perf.tier = avg > 120 ? 2 : perf.tier + 1;
    onTier?.(perf.tier as 1 | 2);
  };

  const frame = (now: number) => {
    if (perf.tier >= 2) {
      raf = 0;
      frozen = now;
      draw(now, false); // the last frame stays on screen
      return;
    }
    raf = requestAnimationFrame(frame);
    if (!visible() || document.hidden) {
      perf.prev = 0; // the next drawn frame starts a fresh measurement
      return;
    }
    // tier 1 draws every other frame
    if (perf.tier === 1 && (perf.skip = !perf.skip)) return;
    draw(now, true);
    watch(now);
  };

  if (perf.tier >= 2) {
    pending = requestAnimationFrame(() => {
      pending = 0;
      draw(frozen, false);
    });
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    get still() {
      return perf.tier >= 2;
    },
    request: () => {
      if (perf.tier < 2 || pending || raf) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        draw(frozen, false);
      });
    },
    stop: () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
      raf = pending = 0;
    },
  };
}
