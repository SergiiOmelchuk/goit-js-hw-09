const t={bodyEl:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e=null;t.startBtn.addEventListener("click",(function(){e=setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.5e90ba93.js.map