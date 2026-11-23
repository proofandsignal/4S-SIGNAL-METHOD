import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
const root=process.cwd();
const studio=path.join(root,"studio");
const chrome=(process.env.CHROME_BIN||["google-chrome","chromium","chromium-browser"].find(c=>{try{execFileSync("which",[c],{stdio:"ignore"});return true}catch{return false}}));
if(!chrome)throw Error("Chrome/Chromium binary unavailable — real browser QA cannot PASS.");
const source=fs.readFileSync(path.join(studio,"index.html"),"utf8");
const inject=String.raw`<script>
window.addEventListener("load",function(){
 var checks=[],errors=[];
 window.onerror=function(m){errors.push(String(m))};
 function test(name,ok){checks.push((ok?"PASS":"FAIL")+":"+name)}
 try{
  var root=document.getElementById("s4premium");
  test("root",!!root);
  test("logo",!!document.getElementById("s4v4"));
  test("dashboard",!!document.querySelector(".s4-overview"));
  test("about",!!document.querySelector(".s4-about"));
  test("study",!!document.getElementById("s4v4-study"));
  test("module-tabs",document.querySelectorAll("#s4premium [data-s4-tab]").length>=6);
  var evidence=document.querySelector('#s4premium [data-s4-tab="evidence"]');
  if(evidence)evidence.click();
  test("evidence-board",!!document.getElementById("s4applyEvidence"));
  var experiments=document.querySelector('#s4premium [data-s4-tab="experiments"]');
  if(experiments)experiments.click();
  test("experiment-plan",!!document.getElementById("s4savePlan"));
  var data=document.querySelector('[data-boost="data"]');if(data)data.click();
  test("data-editor",document.body.classList.contains("s4-classic-open")&&document.getElementById("dataFields")?.hidden===false);
  var word=document.querySelector('[data-boost="word"]');if(word)word.click();
  test("word-editor",document.getElementById("dataFields")?.hidden===true);
  document.getElementById("s4v4-consent").checked=true;
  document.getElementById("s4v4-start").click();
  test("study-start",document.getElementById("s4v4-screen").classList.contains("show"));
 }catch(e){errors.push("synchronous:"+String(e))}
 setTimeout(function(){
  try{
   test("study-after-four-seconds",document.getElementById("s4v4-response").hidden===false);
   document.getElementById("s4v4-recall").value="Lead follow-up";
   document.getElementById("s4v4-yes").click();
   test("study-recorded",document.getElementById("s4v4-outcome").textContent.includes("1 completed"));
   test("mobile-no-overflow",document.documentElement.scrollWidth<=window.innerWidth+2);
  }catch(e){errors.push("timer:"+String(e))}
  var out=document.createElement("output");out.id="qa-result";out.textContent=(checks.some(x=>x.startsWith("FAIL"))||errors.length?"QA_FAILED":"QA_PASSED")+"|"+checks.join("|")+"|errors="+errors.join(";");
  document.body.appendChild(out);
 },4200);
});
</script>`;
const html=source.replace("</body>",inject+"</body>");
const target=path.join(studio,"qa-run.html");
fs.writeFileSync(target,html);
const url=pathToFileURL(target).href;
for(const size of ["1366,900","390,844"]){
 let output="";
 try{output=execFileSync(chrome,["--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--allow-file-access-from-files","--disable-background-networking","--window-size="+size,"--virtual-time-budget=6000","--dump-dom",url],{encoding:"utf8",timeout:45000,stdio:["ignore","pipe","ignore"],maxBuffer:5e6})}
 catch(e){throw Error("Browser failed for "+size+": "+String(e).slice(0,250))}
 const result=output.match(/<output id="qa-result">([^<]+)<\/output>/)?.[1]||"NO_RESULT";
 console.log(size, result.slice(0,1500));
 if(!result.startsWith("QA_PASSED"))throw Error("Browser QA did not pass: "+size);
}
fs.unlinkSync(target);
console.log("BROWSER SMOKE PASS (desktop + mobile viewport simulation; physical Samsung remains pending)");
