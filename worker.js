const BASE='/time-slider-clock';
const destination='https://100-clocks.xiaosang.cc/';
export default {
  async fetch(request){
    const url=new URL(request.url);
    if(url.pathname!==BASE&&!url.pathname.startsWith(BASE+'/'))return new Response('Not found',{status:404});
    const path=url.pathname.slice(BASE.length).replace(/^\/+|\/+$/g,'');
    if(path==='hardware/ATTRIBUTION.txt')return Response.redirect(destination+'views/ATTRIBUTION.txt',308);
    const mode=path.split('/')[0];
    const clock={'':'slider-column','index.html':'slider-column','whole-digit':'slider-whole','hardware':'slider-dual','matrix':'alphabet'}[mode];
    if(!clock)return new Response('Not found',{status:404});
    const target=new URL(destination);target.search=url.search;target.searchParams.set('clock',clock);
    return Response.redirect(target,308);
  }
};
