/* OpenCode 中文文档 · 共享站点脚本 */
(function () {
  "use strict";

  /* ---------- 全站地图 ----------
     t: 中文标题  f: 文件名  顺序即全站顺序（上一页/下一页按此推导） */
  var NAV = [
    { g: "开始", items: [
      { f: "intro", t: "简介与安装" },
      { f: "config", t: "配置" },
      { f: "migrate-v1", t: "从 V1 迁移" },
      { f: "troubleshooting", t: "故障排查" },
    ]},
    { g: "配置", items: [
      { f: "agents", t: "Agents" },
      { f: "models", t: "模型" },
      { f: "skills", t: "Skills" },
      { f: "themes", t: "主题" },
      { f: "commands", t: "自定义命令" },
      { f: "permissions", t: "权限" },
      { f: "websearch", t: "网页搜索" },
      { f: "network", t: "网络" },
      { f: "snapshots", t: "快照" },
      { f: "compaction", t: "上下文压缩" },
      { f: "formatters", t: "格式化器" },
      { f: "references", t: "References" },
      { f: "attachments", t: "附件" },
      { f: "tools", t: "内置工具" },
      { f: "mcp-servers", t: "MCP 服务器" },
      { f: "plugins", t: "插件" },
      { f: "providers", t: "Providers" },
      { f: "policies", t: "策略" },
      { f: "instructions", t: "指令文件" },
      { f: "warming", t: "会话预热" },
    ]},
    { g: "CLI", items: [
      { f: "cli-intro", t: "CLI 简介" },
      { f: "cli-tui", t: "TUI 界面" },
      { f: "cli-config", t: "TUI 设置" },
      { f: "cli-web", t: "Web 界面" },
      { f: "cli-providers", t: "连接模型" },
      { f: "cli-commands", t: "TUI 命令" },
      { f: "cli-acp", t: "ACP" },
      { f: "cli-theme", t: "TUI 主题" },
      { f: "cli-plugins", t: "TUI 插件" },
      { f: "cli-keybinds", t: "快捷键" },
    ]},
    { g: "构建与集成", items: [
      { f: "build-intro", t: "构建总览" },
      { f: "build-plugins", t: "插件总览" },
      { f: "build-plugins-server", t: "服务器插件" },
      { f: "build-plugins-cli", t: "TUI 插件" },
      { f: "build-plugins-gui", t: "GUI 插件" },
      { f: "build-plugins-rpc", t: "RPC" },
      { f: "build-plugins-effect", t: "Effect 插件" },
      { f: "build-plugins-effect-rpc", t: "Effect RPC" },
      { f: "build-plugins-migrate-v1", t: "插件迁移" },
      { f: "build-client", t: "客户端 (JS)" },
      { f: "build-client-effect", t: "Effect 客户端" },
      { f: "build-sdk", t: "SDK" },
      { f: "build-sdk-cloudflare", t: "Cloudflare SDK" },
      { f: "build-sdk-effect", t: "Effect SDK" },
      { f: "api", t: "HTTP API" },
    ]},
    { g: "Console", items: [
      { f: "console", t: "Console 概览" },
      { f: "console-models", t: "模型" },
      { f: "console-providers", t: "提供商" },
      { f: "console-websearch", t: "网页搜索" },
      { f: "console-go", t: "Go 订阅" },
      { f: "console-workspaces", t: "工作区" },
      { f: "console-members", t: "成员" },
      { f: "console-sso", t: "SSO" },
      { f: "console-scim", t: "SCIM" },
      { f: "console-budgets", t: "预算" },
      { f: "console-billing", t: "账单" },
      { f: "console-api", t: "API 概览" },
      { f: "console-api-models", t: "API · 模型" },
      { f: "console-api-inference", t: "API · 推理" },
      { f: "console-api-providers", t: "API · 提供商" },
      { f: "console-harnesses", t: "Harnesses" },
      { f: "h-claude-code", t: "Harness · Claude Code" },
      { f: "h-codex", t: "Harness · Codex" },
      { f: "h-hermes", t: "Harness · Hermes" },
      { f: "h-pi", t: "Harness · Pi" },
      { f: "h-raycast", t: "Harness · Raycast" },
    ]},
  ];

  var here = document.body.dataset.file || "";
  var groupOf = document.body.dataset.group || "";

  /* 展平顺序，用于上一页/下一页 */
  var FLAT = [];
  NAV.forEach(function (g) { g.items.forEach(function (it) { FLAT.push(it); }); });
  var idx = FLAT.findIndex(function (it) { return it.f === here; });

  /* ---------- 面包屑 ---------- */
  var crumbs = document.querySelector(".crumbs");
  if (crumbs && groupOf) {
    var title = idx >= 0 ? FLAT[idx].t : "";
    crumbs.innerHTML = '<a href="index.html">OpenCode 中文文档</a> / ' +
      (groupOf === "开始" ? "" : groupOf + " / ") + "<b>" + title + "</b>";
  }

  /* ---------- 侧边栏 ---------- */
  var sb = document.getElementById("sidebar");
  if (sb) {
    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = "index.html";
    brand.innerHTML = 'OPENCODE <span class="cursor"></span>';
    sb.appendChild(brand);
    var sub = document.createElement("p");
    sub.className = "brand-sub";
    sub.textContent = "中文文档 · 教程版";
    sb.appendChild(sub);

    NAV.forEach(function (g) {
      var d = document.createElement("details");
      d.className = "nav-group";
      var hasHere = g.items.some(function (it) { return it.f === here; });
      var key = "oc-nav-" + g.g;
      var open = hasHere ||
        (localStorage.getItem(key) === "1") ||
        (localStorage.getItem(key) === null && g.g === "开始");
      if (open) d.open = true;
      d.addEventListener("toggle", function () {
        localStorage.setItem(key, d.open ? "1" : "0");
      });
      var s = document.createElement("summary");
      s.textContent = g.g;
      d.appendChild(s);
      var ul = document.createElement("ul");
      g.items.forEach(function (it) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = it.f + ".html";
        a.textContent = it.t;
        if (it.f === here) a.className = "here";
        li.appendChild(a);
        ul.appendChild(li);
      });
      d.appendChild(ul);
      sb.appendChild(d);
    });
  }

  /* ---------- 顶栏：菜单按钮 + 主题切换 ---------- */
  var topbar = document.querySelector(".topbar");
  if (topbar) {
    var menu = document.createElement("button");
    menu.className = "menu-btn";
    menu.setAttribute("aria-label", "打开目录");
    menu.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    topbar.prepend(menu);
    var scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);
    menu.addEventListener("click", function () {
      sb.classList.add("open");
      scrim.classList.add("show");
    });
    scrim.addEventListener("click", function () {
      sb.classList.remove("open");
      scrim.classList.remove("show");
    });

    var btn = document.createElement("button");
    btn.className = "theme-btn";
    btn.setAttribute("aria-label", "切换深浅色");
    btn.innerHTML =
      '<svg class="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3L19 19M19 5l-1.7 1.7M6.7 17.3L5 19"/></svg>' +
      '<svg class="i-moon" viewBox="0 0 24 24"><path d="M20 13.2A8.2 8.2 0 0 1 10.8 4 8.3 8.3 0 1 0 20 13.2z"/></svg>';
    topbar.appendChild(btn);
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("oc-theme", next); } catch (e) {}
    });
  }

  /* ---------- 本页目录（右侧 TOC） ---------- */
  var doc = document.querySelector(".doc");
  var toc = document.getElementById("toc");
  if (doc && toc) {
    var hs = doc.querySelectorAll("h2, h3");
    if (hs.length) {
      var wrap = document.createElement("div");
      wrap.innerHTML = '<div class="toc-title">本页目录</div>';
      var ul = document.createElement("ul");
      hs.forEach(function (h, i) {
        if (!h.id) h.id = "sec-" + (i + 1);
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        if (h.tagName === "H3") {
          var parent = ul.lastElementChild;
          if (!parent) return;
          var sub2 = parent.querySelector("ul");
          if (!sub2) { sub2 = document.createElement("ul"); parent.appendChild(sub2); }
          sub2.appendChild(li);
        } else {
          ul.appendChild(li);
        }
        li.appendChild(a);
      });
      wrap.appendChild(ul);
      toc.appendChild(wrap);
      var links = toc.querySelectorAll("a");
      if ("IntersectionObserver" in window) {
        var vis = new Map();
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { vis.set(e.target.id, e.isIntersecting); });
          var cur = null;
          hs.forEach(function (h) { if (vis.get(h.id)) { if (!cur) cur = h.id; } });
          links.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + cur);
          });
        }, { rootMargin: "0px 0px -70% 0px" });
        hs.forEach(function (h) { io.observe(h); });
      }
    }
  }

  /* ---------- 上一页 / 下一页 ---------- */
  if (idx >= 0 && doc) {
    var pager = document.createElement("nav");
    pager.className = "pager";
    var prev = FLAT[idx - 1], next = FLAT[idx + 1];
    var src = document.body.dataset.src || "";
    pager.innerHTML =
      (prev
        ? '<a class="prev" href="' + prev.f + '.html"><span class="dir">← 上一页</span><b>' + prev.t + "</b></a>"
        : '<span></span>') +
      (next
        ? '<a class="next" href="' + next.f + '.html"><span class="dir">下一页 →</span><b>' + next.t + "</b></a>"
        : "") +
      (src
        ? '<a class="src-link" href="' + src + '" target="_blank" rel="noopener">本文翻译自 opencode.ai 官方文档原文 ↗</a>'
        : "");
    doc.appendChild(pager);
  }
})();
