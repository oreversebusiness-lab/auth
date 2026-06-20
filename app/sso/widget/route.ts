import { NextResponse } from "next/server"

const SSO_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

const widgetScript = `(function() {
  var SSO_URL = "` + SSO_URL + `";

  function getScriptAttrs() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf("/sso/widget") > -1) {
        return {
          project: scripts[i].getAttribute("data-project") || "",
          domain: scripts[i].getAttribute("data-domain") || "",
        };
      }
    }
    return { project: "", domain: "" };
  }

  function getRef() {
    return window.location.origin + window.location.pathname;
  }

  function createWidget(authenticated, user) {
    var attrs = getScriptAttrs();
    var existing = document.getElementById("oreverse-sso-widget");
    if (existing) existing.remove();

    var container = document.createElement("div");
    container.id = "oreverse-sso-widget";
    container.style.cssText = "position:fixed;top:16px;right:16px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;";

    if (authenticated && user) {
      var initial = (user.name || user.email || "?").charAt(0).toUpperCase();
      container.innerHTML =
        '<div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e4e4e7;border-radius:12px;padding:8px 14px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">' +
        '<div style="width:32px;height:32px;border-radius:50%;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#4f46e5;">' + initial + '</div>' +
        '<div><div style="font-size:13px;color:#18181b;font-weight:500;">' + (user.name || "User") + '</div>' +
        '<div style="font-size:11px;color:#71717a;">' + (user.email || "") + '</div></div>' +
        '<button onclick="fetch(\\'' + SSO_URL + '/api/auth/sign-out\\',{method:\\'POST\\'}).then(function(){window.location.href=\\'' + getRef() + '\\'})" style="background:transparent;border:1px solid #e4e4e7;border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;color:#71717a;">Sign Out</button>' +
        '</div>';
    } else {
      container.innerHTML =
        '<a href="' + SSO_URL + '/sign-in?ref=' + encodeURIComponent(getRef()) + '" style="display:inline-flex;align-items:center;gap:8px;background:#4f46e5;color:#fff;border:none;border-radius:12px;padding:10px 18px;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;box-shadow:0 4px 12px rgba(79,70,229,0.3);">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>' +
        'Sign in with OreVerse' +
        '</a>';
    }

    document.body.appendChild(container);
  }

  (function checkSession() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", SSO_URL + "/api/auth/session-check", true);
    xhr.withCredentials = true;
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          createWidget(data.authenticated, data.user);
        } catch(e) { createWidget(false, null); }
      } else {
        createWidget(false, null);
      }
    };
    xhr.onerror = function() { createWidget(false, null); };
    xhr.send();
  })();
})();`

export async function GET() {
  return new NextResponse(widgetScript, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
