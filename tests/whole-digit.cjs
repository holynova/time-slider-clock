const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=fs.readFileSync(__dirname+'/../dist/index.html','utf8');
const original=cp.execFileSync('git',['show','HEAD:dist/index.html'],{encoding:'utf8',cwd:__dirname+'/..'});
const script=html=>html.split('<script>')[1].split('</script>')[0];
assert.equal(script(root),script(original),'Original clock logic must remain unchanged');
const html=fs.readFileSync(__dirname+'/../dist/whole-digit/index.html','utf8'),js=script(html);
new vm.Script(js);
assert(!js.includes('data-column'),'No individually moving columns');
assert(js.includes('t.rows.indexOf(digitRows(numbers[t.d]))'));
const pure=js.slice(0,js.indexOf('function el('));
vm.runInNewContext(pure+`
const ranges=[[0,1,2],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7,8,9]];
const tapes=ranges.map(range=>'0'+shortestTape(range.map(digitRows))+'0');
for(let second=0;second<86400;second++){
 const h=Math.floor(second/3600),m=Math.floor(second/60)%60,s=second%60;
 const values=[Math.floor(h/10),h%10,Math.floor(m/10),m%10,Math.floor(s/10),s%10];
 for(let d=0;d<6;d++){
  const rows=digitRows(values[d]),offset=tapes[d].indexOf(rows);
  assert(offset>=0);assert.equal(tapes[d].slice(offset,offset+5),rows);
  for(let r=0;r<5;r++)for(let c=0;c<3;c++)assert.equal(String((Number(tapes[d][offset+r])>>(2-c))&1),digits[values[d]][r*3+c]);
 }
}
`,{assert});
console.log('PASS: 86,400 whole-digit readings, all three columns share one position; original JS preserved');
