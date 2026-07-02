const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = input.split('\n');

var fields = {};
var currentField = null;
var fieldLines = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var match = line.match(/^(Название RU|Название EN|Описание RU|Описание EN|Категория RU|Категория EN|Теги|Текст RU|Текст EN|Время чтения|Дата):\s*/);
  if (match) {
    if (currentField) fields[currentField] = fieldLines.join('\n').trim();
    currentField = match[1];
    fieldLines = [line.replace(match[0], '').trim()];
  } else if (currentField) {
    fieldLines.push(line);
  }
}
if (currentField) fields[currentField] = fieldLines.join('\n').trim();

if (!fields['Название RU']) { console.log('ERROR: Название RU not found'); process.exit(1); }
if (!fields['Текст RU']) { console.log('ERROR: Текст RU not found'); process.exit(1); }

var ruMap = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',А:'A',Б:'B',В:'V',Г:'G',Д:'D',Е:'E',Ё:'Yo',Ж:'Zh',З:'Z',И:'I',Й:'Y',К:'K',Л:'L',М:'M',Н:'N',О:'O',П:'P',Р:'R',С:'S',Т:'T',У:'U',Ф:'F',Х:'Kh',Ц:'Ts',Ч:'Ch',Ш:'Sh',Щ:'Shch',Ъ:'',Ы:'Y',Ь:'',Э:'E',Ю:'Yu',Я:'Ya'};

var slug = (fields['Название RU'] || '').split('').map(function(c) { return ruMap[c] || c; }).join('')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function escTL(s) { return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${'); }
function escDQ(s) { return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
function unwrap(s) { return (s.startsWith('"') && s.endsWith('"')) ? s.slice(1, -1).trim() : s; }

var contentRu = escTL(unwrap(fields['Текст RU'] || ''));
var contentEn = escTL(unwrap(fields['Текст EN'] || 'This article is available in Russian only.'));

var postsPath = path.join(__dirname, 'src', 'data', 'posts.ts');
var postsContent = fs.readFileSync(postsPath, 'utf8');

var idMatches = postsContent.match(/id:\s*(\d+)/g);
var maxId = 0;
if (idMatches) idMatches.forEach(function(m) { var n = parseInt(m.replace('id: ', '')); if (n > maxId) maxId = n; });
var newId = maxId + 1;

var date = fields['Дата'] || new Date().toISOString().split('T')[0];
var readTime = fields['Время чтения'] || Math.max(1, Math.ceil(contentRu.split(/\s+/).length / 200)) + ' мин';

var post = [
  '  {',
  '    id: ' + newId + ',',
  '    slug: "' + slug + '",',
  '    titleRu: "' + escDQ(fields['Название RU']) + '",',
  '    titleEn: "' + escDQ(fields['Название EN'] || '') + '",',
  '    excerptRu: "' + escDQ(fields['Описание RU'] || '') + '",',
  '    excerptEn: "' + escDQ(fields['Описание EN'] || '') + '",',
  '    contentRu: `' + contentRu + '`,',
  '    contentEn: `' + contentEn + '`,',
  '    date: "' + date + '",',
  '    categoryRu: "' + escDQ(fields['Категория RU'] || '') + '",',
  '    categoryEn: "' + escDQ(fields['Категория EN'] || '') + '",',
  '    readTime: "' + escDQ(readTime) + '"',
  '  }',
].join('\n');

var lastBracket = postsContent.lastIndexOf('];');
if (lastBracket === -1) { console.log('ERROR: Cannot find ]; in posts.ts'); process.exit(1); }

var before = postsContent.slice(0, lastBracket).trimEnd();
var separator = before.endsWith(',') ? '\n' : ',\n';
postsContent = before + separator + post + ',\n];';

fs.writeFileSync(postsPath, postsContent, 'utf8');

console.log('+ Post added to posts.ts');
console.log('  Slug: ' + slug);
console.log('  Title RU: ' + fields['Название RU']);
console.log('  Title EN: ' + (fields['Название EN'] || '(not set)'));
console.log('  Category: ' + (fields['Категория RU'] || '(not set)'));
console.log('  Date: ' + date);