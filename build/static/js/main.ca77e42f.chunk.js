(this.webpackJsonppuhelinluettelo1=this.webpackJsonppuhelinluettelo1||[]).push([[0],{43:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var r=n(18),c=n.n(r),o=n(2),u=n(19),a=n(9),s=n(3),i=n(4),l=n.n(i),d="/api/persons",j=function(){return l.a.get(d).then((function(e){return e.data}))},b=function(e){return l.a.post(d,e).then((function(e){return e.data}))},f=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},m=function(e,t){return l.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},h=n(0),O=function(e){var t=e.persons,n=e.substr,r=e.setPersons;if(!t)return"";var c=Object(o.useState)(null),u=Object(s.a)(c,2),a=u[0],i=u[1],l=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})),d=function(e){e.preventDefault();var n=t.find((function(t){return t.id==e.target.value})).name;window.confirm("Delete ".concat(n))&&f(e.target.value).then((function(){r(t.filter((function(t){return t.id!=e.target.value}))),i("".concat(n," deleted from phonebook")),setTimeout((function(){i(null)}),5e3)})).catch((function(e){i("Information of ".concat(n," has already been removed from server")),setTimeout((function(){i(null)}),5e3)}))};return Object(h.jsxs)("div",{children:[Object(h.jsx)(v,{message:a}),l.map((function(e){return Object(h.jsxs)("p",{children:[e.name," ",e.number,Object(h.jsx)("button",{value:e.id,onClick:d,children:"delete"},e.id)]},e.id)}))]})},v=function(e){var t=e.message;return null===t?null:Object(h.jsxs)("p",{className:"notification",children:[" ",t," "]})},p=function(e){var t=e.persons,n=e.newName,r=e.newNumber,c=e.setPersons,i=e.setNewName,l=e.setNewNumber,d=Object(o.useState)(null),j=Object(s.a)(d,2),f=j[0],O=j[1];return Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{type:"submit",onClick:function(e){if(e.preventDefault(),t.some((function(e){return e.name.toLowerCase()===n.toLowerCase()}))){if(window.confirm("".concat(n," is already added to phonebook. Replace the old number with new one?"))){var o=t.find((function(e){return e.name.toLowerCase()==n.toLowerCase()})),s=Object(a.a)(Object(a.a)({},o),{},{number:r});m(s.id,s).then((function(e){return c(t.map((function(t){return t.name.toLowerCase()!=n.toLowerCase()?t:e}))),O("".concat(e.name," number updated")),setTimeout((function(){O(null)}),5e3),Object(h.jsx)(v,{message:f})}))}}else{var d={name:n,number:r,id:function(e){var t,n=e.slice().sort((function(e,t){return e.id-t.id})),r=0,c=Object(u.a)(n);try{for(c.s();!(t=c.n()).done;){var o=t.value;o.id!=r+1||(r=o.id)}}catch(a){c.e(a)}finally{c.f()}return r+1}(t)};b(d).then((function(e){c(t.concat(e)),i(""),l(""),O("Added ".concat(e.name)),setTimeout((function(){O(null)}),4e3)}))}},children:"add"}),Object(h.jsx)(v,{message:f})]})},w=function(){var e=Object(o.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),u=Object(s.a)(c,2),a=u[0],i=u[1],l=Object(o.useState)(""),d=Object(s.a)(l,2),b=d[0],f=d[1],m=Object(o.useState)(""),v=Object(s.a)(m,2),w=v[0],x=v[1];Object(o.useEffect)((function(){j().then((function(e){return r(e)}))}),[]);return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Phonebook"}),Object(h.jsxs)("form",{children:[Object(h.jsxs)("div",{children:[" filter shown with ",Object(h.jsx)("input",{value:w,onChange:function(e){x(e.target.value)}})," "]}),Object(h.jsx)("h2",{children:" Add new "}),Object(h.jsxs)("div",{children:[" name: ",Object(h.jsx)("input",{value:b,onChange:function(e){f(e.target.value)}})," "]}),Object(h.jsxs)("div",{children:[" number: ",Object(h.jsx)("input",{value:a,onChange:function(e){i(e.target.value)}})," "]}),Object(h.jsx)(p,{persons:n,newName:b,newNumber:a,setPersons:r,setNewName:f,setNewNumber:i})]}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(O,{persons:n,substr:w,setPersons:r})]})};n(43);c.a.render(Object(h.jsx)(w,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.ca77e42f.chunk.js.map