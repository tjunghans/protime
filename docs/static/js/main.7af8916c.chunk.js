(this.webpackJsonpprotime=this.webpackJsonpprotime||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(16)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a.n(l),c=(a(13),a(14),a(1)),u=a(2),s=a(3),m=a(5),i=a(4),h=(a(15),function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).handleNameChange=function(t){e.props.onNameChange(e.props.index,t.target.value)},e.handlePercentChange=function(t){e.props.onPercentChange(e.props.index,t.target.value)},e.handleRemove=function(){e.props.onRemove&&e.props.onRemove(e.props.index)},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.percent,n=e.totalDays,l=e.fullDays,o=e.hours;return r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("input",{type:"text",placeholder:"Enter name",value:t,onChange:this.handleNameChange})),r.a.createElement("td",null,r.a.createElement("input",{type:"number",placeholder:"Enter percent",value:a,onChange:this.handlePercentChange})),r.a.createElement("td",null,r.a.createElement("span",null,n)),r.a.createElement("td",null,r.a.createElement("span",null,l)),r.a.createElement("td",null,r.a.createElement("span",null,Math.round(100*Number(o))/100)),r.a.createElement("td",null,r.a.createElement("button",{type:"button",className:"pure-button button-warning",onClick:this.props.onRemove?this.handleRemove:void 0,disabled:void 0===this.props.onRemove},"Remove")))}}]),a}(r.a.Component)),p={days:"20",hoursPerDay:"8.4",projectTimes:[{name:"",percent:"100"}]},d=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(e){var n;Object(u.a)(this,a),(n=t.call(this,e)).handleDaysChange=function(e){var t;n.setState({days:null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value})},n.handleHoursPerDayChange=function(e){var t;n.setState({hoursPerDay:null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value})},n.handleNameChange=function(e,t){n.setState({projectTimes:n.state.projectTimes.map((function(a,n){return n===e?Object(c.a)(Object(c.a)({},a),{},{name:t}):a}))})},n.handlePercentChange=function(e,t){n.setState({projectTimes:n.state.projectTimes.map((function(a,n){return n===e?Object(c.a)(Object(c.a)({},a),{},{percent:t}):a}))})},n.handleRemove=function(e){n.setState({projectTimes:n.state.projectTimes.filter((function(t,a){return a!==e}))})},n.handleAddProjectClick=function(){var e=n.state.projectTimes.reduce((function(e,t){var a=t.percent;return e-Number(a)}),100);n.setState({projectTimes:n.state.projectTimes.concat({name:"",percent:e.toString()})})};var r=localStorage.getItem("protime");return n.state=r?Object(c.a)(Object(c.a)({},p),JSON.parse(r)):Object(c.a)({},p),n}return Object(s.a)(a,[{key:"componentDidUpdate",value:function(){localStorage.setItem("protime",JSON.stringify(this.state))}},{key:"render",value:function(){var e=this,t=this.state.projectTimes.map((function(t){var a=t.name,n=t.percent,r=Number(e.state.days)*Number(n)/100,l=Math.floor(r);return{name:a,percent:n,totalDays:r,fullDays:l,hours:(r-l)*Number(e.state.hoursPerDay)}}));return r.a.createElement("div",{className:"Protime"},r.a.createElement("form",{className:"pure-form"},r.a.createElement("fieldset",null,r.a.createElement("div",{className:"pure-g config"},r.a.createElement("input",{type:"number",name:"days",placeholder:"Days",onChange:this.handleDaysChange,value:this.state.days}),r.a.createElement("input",{type:"number",name:"hoursPerDay",placeholder:"Hours per day",onChange:this.handleHoursPerDayChange,value:this.state.hoursPerDay}),r.a.createElement("button",{type:"button",className:"pure-button pure-button-primary",onClick:this.handleAddProjectClick},"Add Project")),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Project Name"),r.a.createElement("th",null,"Booking Percentage"),r.a.createElement("th",null,"Total Days"),r.a.createElement("th",null,"Full Days"),r.a.createElement("th",null,"Hours"),r.a.createElement("th",null,"\xa0"))),r.a.createElement("tbody",null,t.map((function(t,a){var n=t.name,l=t.percent,o=t.totalDays,c=t.fullDays,u=t.hours;return r.a.createElement(h,{index:a,key:a,name:n,percent:l,totalDays:o,fullDays:c,hours:u,onNameChange:e.handleNameChange,onPercentChange:e.handlePercentChange,onRemove:e.state.projectTimes.length>1?e.handleRemove:void 0})}))),r.a.createElement("tfoot",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Totals"),r.a.createElement("td",null,t.reduce((function(e,t){var a=t.percent;return e+Number(a)}),0)),r.a.createElement("td",null,t.reduce((function(e,t){var a=t.totalDays;return e+Number(a)}),0)),r.a.createElement("td",null,t.reduce((function(e,t){var a=t.fullDays;return e+Number(a)}),0)),r.a.createElement("td",null,Math.round(100*t.reduce((function(e,t){var a=t.hours;return e+Number(a)}),0))/100)))))))}}]),a}(r.a.Component);var v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},"Protime Calculator"),r.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.7af8916c.chunk.js.map