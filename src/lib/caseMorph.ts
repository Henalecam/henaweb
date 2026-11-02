/**
 * Cross-document view transitions into (and back from) a case page: only the screen of the case being opened (or
 * the one being returned from) gets the case window's view-transition-name, so it morphs into the case page's
 * window while everything else leaves with the page. pageswap/pagereveal only fire in browsers with cross-document
 * view transitions. Used by /casos (the archive cards), the home (the cases section) and each service page (the
 * "Exemplos" folder tabs): any element marked
 * data-case-window="<slug>" takes part; when a page has several for the same case (the home's desktop viewer and
 * its phone cards), the one actually on screen is used.
 */
export const caseMorphScript = `(()=>{
const card=(u)=>{try{const m=new URL(u).pathname.match(/^\\/casos\\/([\\w-]+)/);if(!m)return null;return [...document.querySelectorAll('[data-case-window="'+m[1]+'"]')].find((el)=>el.getClientRects().length)||null}catch(e){return null}};
const name=(el,on)=>{if(el)el.style.viewTransitionName=on?'caso-'+el.dataset.caseWindow:''};
addEventListener('pageswap',(e)=>{if(!e.viewTransition)return;const el=card(e.activation&&e.activation.entry&&e.activation.entry.url);name(el,1);e.viewTransition.finished.finally(()=>name(el,0))});
addEventListener('pagereveal',(e)=>{if(!e.viewTransition||!window.navigation)return;const f=navigation.activation&&navigation.activation.from;const el=card(f&&f.url);name(el,1);e.viewTransition.finished.finally(()=>name(el,0))});
})();`;
