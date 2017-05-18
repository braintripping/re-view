var pmMarkdown=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e){t.exports=pm.model},function(t,e,r){"use strict";var n=r(0),o=n.Schema;e.schema=new o({nodes:{doc:{content:"block+"},paragraph:{content:"inline<_>*",group:"block",parseDOM:[{tag:"p"}],toDOM:function(){return["p",0]}},blockquote:{content:"block+",group:"block",parseDOM:[{tag:"blockquote"}],toDOM:function(){return["blockquote",0]}},horizontal_rule:{group:"block",parseDOM:[{tag:"hr"}],toDOM:function(){return["div",["hr"]]}},heading:{attrs:{level:{default:1}},content:"inline<_>*",group:"block",defining:!0,parseDOM:[{tag:"h1",attrs:{level:1}},{tag:"h2",attrs:{level:2}},{tag:"h3",attrs:{level:3}},{tag:"h4",attrs:{level:4}},{tag:"h5",attrs:{level:5}},{tag:"h6",attrs:{level:6}}],toDOM:function(t){return["h"+t.attrs.level,0]}},code_block:{content:"text*",group:"block",code:!0,defining:!0,attrs:{params:{default:""}},parseDOM:[{tag:"pre",preserveWhitespace:!0,getAttrs:function(t){return{params:t.getAttribute("data-params")}}}],toDOM:function(t){return["pre",t.attrs.params?{"data-params":t.attrs.params}:{},["code",0]]}},ordered_list:{content:"list_item+",group:"block",attrs:{order:{default:1},tight:{default:!1}},parseDOM:[{tag:"ol",getAttrs:function(t){return{order:t.hasAttribute("start")?+t.getAttribute("start"):1,tight:t.hasAttribute("data-tight")}}}],toDOM:function(t){return["ol",{start:1==t.attrs.order?null:t.attrs.order,"data-tight":t.attrs.tight?"true":null},0]}},bullet_list:{content:"list_item+",group:"block",attrs:{tight:{default:!1}},parseDOM:[{tag:"ul",getAttrs:function(t){return{tight:t.hasAttribute("data-tight")}}}],toDOM:function(t){return["ul",{"data-tight":t.attrs.tight?"true":null},0]}},list_item:{content:"paragraph block*",defining:!0,parseDOM:[{tag:"li"}],toDOM:function(){return["li",0]}},text:{group:"inline",toDOM:function(t){return t.text}},image:{inline:!0,attrs:{src:{},alt:{default:null},title:{default:null}},group:"inline",draggable:!0,parseDOM:[{tag:"img[src]",getAttrs:function(t){return{src:t.getAttribute("src"),title:t.getAttribute("title"),alt:t.getAttribute("alt")}}}],toDOM:function(t){return["img",t.attrs]}},hard_break:{inline:!0,group:"inline",selectable:!1,parseDOM:[{tag:"br"}],toDOM:function(){return["br"]}}},marks:{em:{parseDOM:[{tag:"i"},{tag:"em"},{style:"font-style",getAttrs:function(t){return"italic"==t&&null}}],toDOM:function(){return["em"]}},strong:{parseDOM:[{tag:"b"},{tag:"strong"},{style:"font-weight",getAttrs:function(t){return/^(bold(er)?|[5-9]\d{2,})$/.test(t)&&null}}],toDOM:function(){return["strong"]}},link:{attrs:{href:{},title:{default:null}},parseDOM:[{tag:"a[href]",getAttrs:function(t){return{href:t.getAttribute("href"),title:t.getAttribute("title")}}}],toDOM:function(t){return["a",t.attrs]}},code:{parseDOM:[{tag:"code"}],toDOM:function(){return["code"]}}}})},function(t,e,r){"use strict";e.schema=r(1).schema;var n;n=r(3),e.defaultMarkdownParser=n.defaultMarkdownParser,e.MarkdownParser=n.MarkdownParser;var o;o=r(4),e.MarkdownSerializer=o.MarkdownSerializer,e.defaultMarkdownSerializer=o.defaultMarkdownSerializer,e.MarkdownSerializerState=o.MarkdownSerializerState},function(t,e,r){"use strict";function n(t,e){if(t.isText&&e.isText&&d.sameSet(t.marks,e.marks))return t.copy(t.text+e.text)}function o(t,e){return t instanceof Function?t(e):t}function i(t){return"code_inline"==t||"code_block"==t||"fence"==t}function a(t){return"\n"==t[t.length-1]?t.slice(0,t.length-1):t}function s(t,e){var r=Object.create(null);for(var n in e)!function(n){var s=e[n];if(s.block){var l=t.nodeType(s.block);i(n)?r[n]=function(t,e){t.openNode(l,o(s.attrs,e)),t.addText(a(e.content)),t.closeNode()}:(r[n+"_open"]=function(t,e){return t.openNode(l,o(s.attrs,e))},r[n+"_close"]=function(t){return t.closeNode()})}else if(s.node){var c=t.nodeType(s.node);r[n]=function(t,e){return t.addNode(c,o(s.attrs,e))}}else{if(!s.mark)throw new RangeError("Unrecognized parsing spec "+JSON.stringify(s));var u=t.marks[s.mark];i(n)?r[n]=function(t,e){t.openMark(u.create(o(s.attrs,e))),t.addText(a(e.content)),t.closeMark(u)}:(r[n+"_open"]=function(t,e){return t.openMark(u.create(o(s.attrs,e)))},r[n+"_close"]=function(t){return t.closeMark(u)})}}(n);return r.text=function(t,e){return t.addText(e.content)},r.inline=function(t,e){return t.parseTokens(e.children)},r.softbreak=function(t){return t.addText("\n")},r}var l=r(6),c=r(1),u=c.schema,h=r(0),d=h.Mark,p=function(t,e){this.schema=t,this.stack=[{type:t.topNodeType,content:[]}],this.marks=d.none,this.tokenHandlers=e};p.prototype.top=function(){return this.stack[this.stack.length-1]},p.prototype.push=function(t){this.stack.length&&this.top().content.push(t)},p.prototype.addText=function(t){if(t){var e,r=this.top().content,o=r[r.length-1],i=this.schema.text(t,this.marks);o&&(e=n(o,i))?r[r.length-1]=e:r.push(i)}},p.prototype.openMark=function(t){this.marks=t.addToSet(this.marks)},p.prototype.closeMark=function(t){this.marks=t.removeFromSet(this.marks)},p.prototype.parseTokens=function(t){for(var e=this,r=0;r<t.length;r++){var n=t[r],o=e.tokenHandlers[n.type];if(!o)throw new Error("Token type `"+n.type+"` not supported by Markdown parser");o(e,n)}},p.prototype.addNode=function(t,e,r){var n=t.createAndFill(e,r,this.marks);return n?(this.push(n),n):null},p.prototype.openNode=function(t,e){this.stack.push({type:t,attrs:e,content:[]})},p.prototype.closeNode=function(){this.marks.length&&(this.marks=d.none);var t=this.stack.pop();return this.addNode(t.type,t.attrs,t.content)};var f=function(t,e,r){this.tokens=r,this.schema=t,this.tokenizer=e,this.tokenHandlers=s(t,r)};f.prototype.parse=function(t){var e,r=new p(this.schema,this.tokenHandlers);r.parseTokens(this.tokenizer.parse(t,{}));do{e=r.closeNode()}while(r.stack.length);return e},e.MarkdownParser=f;var k=new f(u,l("commonmark",{html:!1}),{blockquote:{block:"blockquote"},paragraph:{block:"paragraph"},list_item:{block:"list_item"},bullet_list:{block:"bullet_list"},ordered_list:{block:"ordered_list",attrs:function(t){return{order:+t.attrGet("order")||1}}},heading:{block:"heading",attrs:function(t){return{level:+t.tag.slice(1)}}},code_block:{block:"code_block"},fence:{block:"code_block",attrs:function(t){return{params:t.info||""}}},hr:{node:"horizontal_rule"},image:{node:"image",attrs:function(t){return{src:t.attrGet("src"),title:t.attrGet("title")||null,alt:t.children[0]&&t.children[0].content||null}}},hardbreak:{node:"hard_break"},em:{mark:"em"},strong:{mark:"strong"},link:{mark:"link",attrs:function(t){return{href:t.attrGet("href"),title:t.attrGet("title")||null}}},code_inline:{mark:"code"}});e.defaultMarkdownParser=k},function(t,e,r){"use strict";var n=function(t,e){this.nodes=t,this.marks=e};n.prototype.serialize=function(t,e){var r=new i(this.nodes,this.marks,e);return r.renderContent(t),r.out},e.MarkdownSerializer=n;var o=new n({blockquote:function(t,e){t.wrapBlock("> ",null,e,function(){return t.renderContent(e)})},code_block:function(t,e){e.attrs.params?(t.write("```"+e.attrs.params+"\n"),t.text(e.textContent,!1),t.ensureNewLine(),t.write("```"),t.closeBlock(e)):t.wrapBlock("    ",null,e,function(){return t.text(e.textContent,!1)})},heading:function(t,e){t.write(t.repeat("#",e.attrs.level)+" "),t.renderInline(e),t.closeBlock(e)},horizontal_rule:function(t,e){t.write(e.attrs.markup||"---"),t.closeBlock(e)},bullet_list:function(t,e){t.renderList(e,"  ",function(){return(e.attrs.bullet||"*")+" "})},ordered_list:function(t,e){var r=e.attrs.order||1,n=String(r+e.childCount-1).length,o=t.repeat(" ",n+2);t.renderList(e,o,function(e){var o=String(r+e);return t.repeat(" ",n-o.length)+o+". "})},list_item:function(t,e){t.renderContent(e)},paragraph:function(t,e){t.renderInline(e),t.closeBlock(e)},image:function(t,e){t.write("!["+t.esc(e.attrs.alt||"")+"]("+t.esc(e.attrs.src)+(e.attrs.title?" "+t.quote(e.attrs.title):"")+")")},hard_break:function(t,e,r,n){for(var o=n+1;o<r.childCount;o++)if(r.child(o).type!=e.type)return void t.write("\\\n")},text:function(t,e){t.text(e.text)}},{em:{open:"*",close:"*",mixable:!0},strong:{open:"**",close:"**",mixable:!0},link:{open:"[",close:function(t,e){return"]("+t.esc(e.attrs.href)+(e.attrs.title?" "+t.quote(e.attrs.title):"")+")"}},code:{open:"`",close:"`"}});e.defaultMarkdownSerializer=o;var i=function(t,e,r){this.nodes=t,this.marks=e,this.delim=this.out="",this.closed=!1,this.inTightList=!1,this.options=r||{},void 0===this.options.tightLists&&(this.options.tightLists=!1)};i.prototype.flushClose=function(t){var e=this;if(this.closed){if(this.atBlank()||(this.out+="\n"),null==t&&(t=2),t>1){var r=this.delim,n=/\s+$/.exec(r);n&&(r=r.slice(0,r.length-n[0].length));for(var o=1;o<t;o++)e.out+=r+"\n"}this.closed=!1}},i.prototype.wrapBlock=function(t,e,r,n){var o=this.delim;this.write(e||t),this.delim+=t,n(),this.delim=o,this.closeBlock(r)},i.prototype.atBlank=function(){return/(^|\n)$/.test(this.out)},i.prototype.ensureNewLine=function(){this.atBlank()||(this.out+="\n")},i.prototype.write=function(t){this.flushClose(),this.delim&&this.atBlank()&&(this.out+=this.delim),t&&(this.out+=t)},i.prototype.closeBlock=function(t){this.closed=t},i.prototype.text=function(t,e){for(var r=this,n=t.split("\n"),o=0;o<n.length;o++){var i=r.atBlank()||r.closed;r.write(),r.out+=!1!==e?r.esc(n[o],i):n[o],o!=n.length-1&&(r.out+="\n")}},i.prototype.render=function(t,e,r){if("number"==typeof e)throw new Error("!");this.nodes[t.type.name](this,t,e,r)},i.prototype.renderContent=function(t){var e=this;t.forEach(function(r,n,o){return e.render(r,t,o)})},i.prototype.renderInline=function(t){var e=this,r=[],n=function(n,o,i){var a=n?n.marks:[],s=a.length&&a[a.length-1].type.isCode&&a[a.length-1],l=a.length-(s?1:0);t:for(var c=0;c<l;c++){var u=a[c];if(!e.marks[u.type.name].mixable)break;for(var h=0;h<r.length;h++){var d=r[h];if(!e.marks[d.type.name].mixable)break;if(u.eq(d)){c>h?a=a.slice(0,h).concat(u).concat(a.slice(h,c)).concat(a.slice(c+1,l)):h>c&&(a=a.slice(0,c).concat(a.slice(c+1,h)).concat(u).concat(a.slice(h,l)));continue t}}}for(var p=0;p<Math.min(r.length,l)&&a[p].eq(r[p]);)++p;for(;p<r.length;)e.text(e.markString(r.pop(),!1),!1);for(;r.length<l;){var f=a[r.length];r.push(f),e.text(e.markString(f,!0),!1)}n&&(s&&n.isText?e.text(e.markString(s,!1)+n.text+e.markString(s,!0),!1):e.render(n,t,i))};t.forEach(n),n(null)},i.prototype.renderList=function(t,e,r){var n=this;this.closed&&this.closed.type==t.type?this.flushClose(3):this.inTightList&&this.flushClose(1);var o=void 0!==t.attrs.tight?t.attrs.tight:this.options.tightLists,i=this.inTightList;this.inTightList=o,t.forEach(function(i,a,s){s&&o&&n.flushClose(1),n.wrapBlock(e,r(s),t,function(){return n.render(i,t,s)})}),this.inTightList=i},i.prototype.esc=function(t,e){return t=t.replace(/[`*\\~+\[\]]/g,"\\$&"),e&&(t=t.replace(/^[:#-*]/,"\\$&").replace(/^(\d+)\./,"$1\\.")),t},i.prototype.quote=function(t){var e=-1==t.indexOf('"')?'""':-1==t.indexOf("'")?"''":"()";return e[0]+t+e[1]},i.prototype.repeat=function(t,e){for(var r="",n=0;n<e;n++)r+=t;return r},i.prototype.markString=function(t,e){var r=this.marks[t.type.name],n=e?r.open:r.close;return"string"==typeof n?n:n(this,t)},e.MarkdownSerializerState=i},function(t,e,r){"use strict";var n=r(2);r(0);t.exports={MarkdownParser:n.MarkdownParser,defaultMarkdownParser:n.defaultMarkdownParser,defaultMarkdownSerializer:n.defaultMarkdownSerializer,MarkdownSerializerState:n.MarkdownSerializerState,MarkdownSerializer:n.MarkdownSerializer,schema:n.schema}},function(t,e){t.exports=markdownit}]);