/* BOOST-004 Marketing Dashboard: isolated research preview, not production analytics. */
(function(){
"use strict";
var root=document.getElementById("s4premium");if(!root||document.getElementById("s4v4"))return;
var el=function(id){return document.getElementById(id)};
var logo='<svg viewBox="0 0 64 64" role="img" aria-label="4S Signal Studio original monogram" width="47" height="47"><defs><linearGradient id="s4lg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#efb5ff"/><stop offset="1" stop-color="#a352f3"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="15" fill="#291432" stroke="#ae50cc" stroke-width="2"/><path d="M28 12L12 37h18v14M43 16c12-5 19 4 10 11l-11 9c-10 9 8 5 13 9" stroke="url(#s4lg)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
var bar=document.createElement("div");bar.id="s4v4";bar.className="s4-brandbar";bar.innerHTML=logo+'<div>4S SIGNAL STUDIO<small>CREATED BY PROOF &amp; SIGNAL</small></div><small style="margin-left:auto">PREMIUM RESEARCH DEMO · v0.4</small>';root.prepend(bar);
var hero=root.querySelector(".s4-hero");
if(hero){
 var h=hero.querySelector("h1");if(h){h.textContent="Turn four seconds into ";var x=document.createElement("span");x.className="s4-glow";x.textContent="a reason to Explore.";h.appendChild(x)}
 var p=hero.querySelector("p");if(p)p.textContent="Create audience-specific Word Signals and Data Signals. Compare A/B creative framing, check your evidence and build the next step in a sales funnel. No invented results or simulated conversion claims.";
 var flags=hero.querySelector(".s4-flex");if(flags){var f=document.createElement("span");f.className="s4-tag";f.textContent="NO LOGIN · SYNTHETIC DEMO";flags.appendChild(f)}
}
var overview=document.createElement("section");overview.className="s4-overview";
overview.innerHTML=[
'<div class="s4-box"><h2>From the first four seconds to a real decision</h2>',
'<p>One meaningful problem. One clear signal. An evidence trail. A logical next step. These are workflow stages, not measured conversion rates.</p>',
'<div class="s4-funnel" aria-label="Five stages of an illustrative marketing funnel">',
'<div><b>01 · HOOK</b>Four-second creative</div>',
'<div><b>02 · INTEREST</b>Audience relevance</div>',
'<div><b>03 · EVIDENCE</b>Checkable source</div>',
'<div><b>04 · EXPLORE</b>Next useful step</div>',
'<div><b>05 · LEAD</b>Independent validation pending</div></div>',
'<div class="s4-quick">',
'<button type="button" data-boost="word">Create Word Signal</button>',
'<button type="button" data-boost="data">Create Data Signal</button>',
'<button type="button" data-boost="experiments">Plan A/B Study</button>',
'<button type="button" data-boost="vault">Export Research</button></div>',
'<p class="s4-funnel-legend">This preview has no live AI model, market-trend feed or remote lead tracker. All locally played signals remain research examples.</p></div>',
'<div class="s4-box"><h2>Quality over vanity metrics</h2>',
'<p><strong style="font-size:30px;color:#f2b7ff">0 verified</strong><br>Customer outcomes or measured conversions</p>',
'<div class="s4-meter" aria-hidden="true"></div>',
'<p class="s4-caption">Hook heuristics and local playback do not imply performance scores.</p>',
'<div class="s4-privacy">4S-EXP-001 · EVIDENCE HOLD · COMMERCIALIZATION LOCKED</div></div>'
].join("");
var metrics=root.querySelector(".s4-metrics");if(metrics)metrics.insertAdjacentElement("afterend",overview);else if(hero)hero.insertAdjacentElement("afterend",overview);
function classic(data){document.body.classList.add("s4-classic-open");if(el("s4classic"))el("s4classic").textContent="Close original editor";var tab=el(data?"dataTab":"wordsTab");if(tab)tab.click();var target=el("s4ClassicWorkspace");if(target)target.scrollIntoView({behavior:"smooth",block:"start"})}
function nav(name){var item=root.querySelector('[data-s4-tab="'+name+'"]');if(item)item.click();var target=el("s4screen");if(target)target.scrollIntoView({behavior:"smooth",block:"start"})}
overview.querySelectorAll("[data-boost]").forEach(function(b){b.addEventListener("click",function(){var k=b.getAttribute("data-boost");if(k==="word"||k==="data")classic(k==="data");else nav(k)})});
var about=document.createElement("section");about.className="s4-about";about.innerHTML='<strong>About Us · Proof &amp; Signal</strong><p>Proof &amp; Signal develops evidence-led research tools to help people make better decisions. 4S Signal Studio is a creative research preview for expressing one relevant problem or compact data signal in approximately four seconds, followed by proof and a meaningful action.</p><p>Created by Proof &amp; Signal · English client preview · Synthetic examples. Security, Legal/IP, real-device Samsung QA, independent review and Human Approval are separate release gates.</p>';root.appendChild(about);
})();