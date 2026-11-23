/* BOOST-004: consent-based local A/B study rehearsal, no audience tracking. */
(function(){
"use strict";
var root=document.getElementById("s4premium");if(!root||document.getElementById("s4v4-study"))return;
var $=function(id){return document.getElementById(id)};
var section=document.createElement("section");section.className="s4-study";section.id="s4v4-study";
section.innerHTML=[
'<h2>4S-EXP-001 · A/B Study Rehearsal</h2>',
'<p class="s4-study-note">Controlled local simulation: two editable messages, randomized exposure, 4-second display, unaided recall and stated Explore intent. This does NOT establish real audience impressions or conversion uplift.</p>',
'<div class="s4-study-grid"><div class="s4-field"><label for="s4v4-a">Variant A · Problem-first</label><textarea id="s4v4-a" maxlength="200">What happens when your best lead hears nothing?</textarea></div>',
'<div class="s4-field"><label for="s4v4-b">Variant B · Value-first</label><textarea id="s4v4-b" maxlength="200">Give every new inquiry a clear follow-up plan.</textarea></div></div>',
'<div class="s4-privacy" style="margin-top:14px">Voluntary participation only. No names, email addresses or sensitive details. Data remains in this browser until you explicitly export it. No server-side collection or analytics is active.</div>',
'<label><input type="checkbox" id="s4v4-consent"> I understand that this is a local research rehearsal, not proven marketing performance.</label>',
'<div class="s4-quick"><button id="s4v4-start" type="button">Start randomized exposure</button><button id="s4v4-export" type="button">Export anonymous study JSON</button></div>',
'<div id="s4v4-screen" class="s4-study-screen" role="status" aria-live="off"><small>4-SECOND CREATIVE</small><strong id="s4v4-message"></strong></div>',
'<div id="s4v4-response" hidden><label for="s4v4-recall">What idea do you remember? (Optional; no personal data)</label>',
'<input type="text" id="s4v4-recall" maxlength="180" placeholder="One short phrase"><p class="s4-study-note">Would you Explore to learn more? This is a stated intention, not a verified lead.</p>',
'<div class="s4-quick"><button type="button" id="s4v4-yes">Explore further</button><button type="button" id="s4v4-no">Not relevant to me</button></div></div>',
'<p class="s4-study-note" id="s4v4-outcome" role="status">No study records. 0 verified customer outcomes.</p>'
].join("");
var workspace=root.querySelector(".s4-workspace");if(workspace)workspace.insertAdjacentElement("afterend",section);else root.append(section);
var records=[],active=null,locked=false;
function note(x){$("s4v4-outcome").textContent=x+" · 0 verified customer outcomes."}
function choice(intent){if(!active)return;active.recall=$("s4v4-recall").value.trim().slice(0,180);active.explore_intent=intent;active.recorded_at=new Date().toISOString();records.push(active);active=null;locked=false;$("s4v4-response").hidden=true;note(records.length+" completed local research rehearsals")}
$("s4v4-start").addEventListener("click",function(){
 if(locked)return;
 if(!$("s4v4-consent").checked){note("Tick the informed-consent box first");return}
 var a=$("s4v4-a").value.trim(),b=$("s4v4-b").value.trim();
 if(!a||!b||a===b){note("Enter two distinct, nonempty messages");return}
 locked=true;$("s4v4-response").hidden=true;$("s4v4-recall").value="";
 var index;try{var bits=new Uint32Array(1);crypto.getRandomValues(bits);index=bits[0]%2}catch(e){index=Math.random()<.5?0:1}
 active={schema:"4s-local-study-rehearsal-v1",variant:index?"B":"A",message:index?b:a,started_at:new Date().toISOString(),display_duration_requested_ms:4000,attention_verified:false,conversion_verified:false};
 $("s4v4-message").textContent=index?b:a;$("s4v4-screen").classList.add("show");note("Displaying the message locally");
 setTimeout(function(){$("s4v4-screen").classList.remove("show");$("s4v4-message").textContent="";$("s4v4-response").hidden=false;note("Display ended; answer recall and relevance")},4000);
});
$("s4v4-yes").addEventListener("click",function(){choice("explore")});
$("s4v4-no").addEventListener("click",function(){choice("not_relevant")});
$("s4v4-export").addEventListener("click",function(){
 var payload={schema:"4s-exp001-rehearsal-v1",exported_at:new Date().toISOString(),disclaimer:"Local demo events. No verified audience exposure, qualified lead, sale or performance uplift.",real_audience_validation:false,records:records};
 var u=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"})),a=document.createElement("a");
 a.href=u;a.download="4s-exp001-local-rehearsal.json";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1800);note("Local JSON file exported; not an audited experiment")
});
})();