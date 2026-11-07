/**
 * Inline script for pages walked in a ring with ← / → (cases, services): tags the incoming cross-document
 * view transition with the direction of travel, `step-next` or `step-prev` (the order wraps around, like the
 * keys), so globals.css slides the swap sideways instead of the generic wipe from the floor. pagereveal fires
 * before the first frame, so the type is set in time; arriving from anywhere else, or from a non-neighbour,
 * keeps the default; browsers without view-transition types simply keep it too.
 */
export function stepTransitionScript(base: 'casos' | 'servicos', order: string[]) {
  return `(()=>{const O=${JSON.stringify(order)},R=/^\\/${base}\\/([\\w-]+)/;addEventListener('pagereveal',(e)=>{const t=e.viewTransition;if(!t||!t.types||!window.navigation)return;const f=navigation.activation&&navigation.activation.from;const s=(u)=>{try{const m=new URL(u).pathname.match(R);return m?O.indexOf(m[1]):-1}catch(_){return -1}};const a=f?s(f.url):-1,b=s(location.href),n=O.length;if(a<0||b<0||a===b)return;if((a+1)%n===b)t.types.add('step-next');else if((b+1)%n===a)t.types.add('step-prev')},{once:true})})();`;
}
