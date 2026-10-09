const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=html=>html.split('<script>')[1].split('</script>')[0];
const hardware=fs.readFileSync('dist/hardware/index.html','utf8'),hs=script(hardware);
const model=vm.runInNewContext(hs.slice(hs.indexOf('const digits='),hs.indexOf('const railTop='))+';({digits,hardwareRows,positionLeft,positionRight,cell})');
// Independent samples from author STL projected in installed orientation.
assert.equal(model.hardwareRows.left,'010111110000010');
assert.equal(model.hardwareRows.right.join(''),'101111110111111101110111011110');
assert.deepEqual(Array.from(model.positionLeft),[5,0,7,9,3,11,5,1,5,11]);
assert.deepEqual(Array.from(model.positionRight),[6,0,11,7,4,9,9,2,1,1]);
function readDigit(n){let result='';for(let r=0;r<5;r++)for(let c=0;c<3;c++){
 const side=c===0?'left':'right',positions=c===0?model.positionLeft:model.positionRight;
 const index=8-positions[n]+r,rows=model.hardwareRows[side];
 let bit=index<0||index>=15?'1':c===0?rows[index]:rows[index][c-1];
 if(c===1&&(r===1||r===3))bit='0';result+=bit;
 }return result;}
for(let n=0;n<10;n++)assert.equal(readDigit(n),model.digits[n],`Author's mask must actually display ${n}`);
for(let s=0;s<86400;s++)for(const n of String(Math.floor(s/3600)).padStart(2,'0')+String(Math.floor(s/60)%60).padStart(2,'0')+String(s%60).padStart(2,'0'))assert.equal(readDigit(Number(n)),model.digits[Number(n)]);
const top=252-8*model.cell-2-28,bottom=252+3*model.cell+15*model.cell+2+28;
for(const positions of [model.positionLeft,model.positionRight])for(const position of positions){const y=252-(8-position)*model.cell;assert(y-2>top);assert(y+15*model.cell+2<bottom);}
assert(!hs.includes('t.plate.style.transform'));assert(hs.includes("'data-fixed-grid':d"));assert(hs.includes('252-cell,252+5*cell'));assert(hs.includes("['right',2"));
const matrix=fs.readFileSync('dist/matrix/index.html','utf8'),ms=script(matrix);
const font=vm.runInNewContext(ms.slice(ms.indexOf('const glyphs='),ms.indexOf('function el('))+';({glyphs,demoCharacters,normalizeText})');
for(const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.,!?-+=/%<>*#() '){assert(Object.hasOwn(font.glyphs,c));assert.match(font.glyphs[c],/^[01]{35}$/);}
assert.equal(new Set(Object.values(font.glyphs)).size,Object.keys(font.glyphs).length,'All supported glyphs must be distinct');
assert.equal(font.normalizeText('hello!'),'HELLO!');assert.equal(font.normalizeText('a +'),'A +   ');
for(const text of ['', 'ABCDEFG','中文','HI🙂','ß'])assert.equal(font.normalizeText(text),null,`Reject unsupported input ${text}`);
assert.equal(font.normalizeText('0:-+!?'),'0:-+!?');
assert(ms.includes('cell.y-(open?14:0)'));assert(ms.includes('r<7'));assert(ms.includes('c<5'));assert(!ms.includes('t.plate.style.transform'));
// No missing demo glyphs, including the final partial page; spaces pad it safely.
for(let offset=0;offset<font.demoCharacters.length;offset+=6)for(const c of font.demoCharacters.slice(offset,offset+6).padEnd(6,' '))assert(Object.hasOwn(font.glyphs,c));
for(const html of [hardware,matrix,fs.readFileSync('dist/index.html','utf8'),fs.readFileSync('dist/whole-digit/index.html','utf8')]){
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 assert.equal([...html.match(/<nav class="versions"[\s\S]*?<\/nav>/)[0].matchAll(/aria-current="page"/g)].length,1);for(const href of ['/','/whole-digit/','/hardware/','/matrix/'])assert(html.includes(`href="${href}"`));assert(html.includes('id="seconds" type="checkbox" role="switch" checked'));
}
console.log('PASS: author STL mask rows and Arduino offsets, 86,400 dual-rail readings, full rail bounds; 53 distinct 5×7 glyphs, input handling, complete demo, four preserved routes');
