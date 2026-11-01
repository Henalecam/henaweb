export const CASE_VIEW_KEY = 'hena:case-view';

/** /casos: runs right after the list in the HTML, so a saved "Detalhes" (CaseView) applies before the first paint
 *  instead of the grid flashing first. A plain module (not the client component) so the server page gets the string */
export const caseViewScript = `try{if(localStorage.getItem('${CASE_VIEW_KEY}')==='details')document.querySelector('[data-case-list]').setAttribute('data-view','details')}catch(e){}`;
