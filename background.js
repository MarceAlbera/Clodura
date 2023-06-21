! function s(i, a, c) {
	function o(n, e) {
		if (!a[n]) {
			if (!i[n]) {
				var r = "function" == typeof require && require;
				if (!e && r) return r(n, !0);
				if (l) return l(n, !0);
				throw (r = new Error("Cannot find module '" + n + "'")).code = "MODULE_NOT_FOUND", r
			}
			r = a[n] = {
				exports: {}
			}, i[n][0].call(r.exports, function(e) {
				return o(i[n][1][e] || e)
			}, r, r.exports, s, i, a, c)
		}
		return a[n].exports
	}
	for (var l = "function" == typeof require && require, e = 0; e < c.length; e++) o(c[e]);
	return o
}({
	1: [function(e, n, r) {
		function s(e) {
			var r = {};
			0 === e.frameId && chrome.tabs.get(e.tabId, function(e) {
				var n;
				"complete" === e.status && void 0 !== e.url ? (n = e.id, r[n] && r[n] === e.url || (!e.url.includes("linkedin.com/") || e.url.includes("/showcase/") || e.url.includes("miniProfileUrn") ? e.url.includes("linkedin.com") || chrome.tabs.sendMessage(e.id, {
					command: "website"
				}) : e.url.includes("/mynetwork/") || e.url.includes("/jobs/") && !e.url.includes("linkedin.com/company/") || e.url.includes("/messaging/") || e.url.includes("linkedin.com/in/unavailable/") || e.url.includes("/notifications/") || e.url.includes("/sales/search/people?viewAllFilters=true") || e.url.includes("/sales/search/company?viewAllFilters=true") ? chrome.tabs.sendMessage(e.id, {
					command: "blank"
				}) : chrome.tabs.sendMessage(e.id, {
					command: "scrape_data"
				})), r[n] = e.url) : void 0 !== e.url && (e.url.includes("sales/search/people?") || e.url.includes("/sales/search/people/list/") || e.url.includes("/sales/lists/people/") || e.url.includes("sales/search/people#") || e.url.includes("/sales/search/company?") || e.url.includes("/sales/lists/company/")) && chrome.tabs.sendMessage(e.id, {
					command: "scrape_data"
				})
			})
		}
		chrome.browserAction.onClicked.addListener(function() {
			chrome.tabs.query({
				active: !0,
				currentWindow: !0
			}, function(e) {
				chrome.tabs.sendMessage(e[0].id, {
					command: "maximize"
				})
			})
		}), chrome.webNavigation.onHistoryStateUpdated.addListener(s), chrome.webNavigation.onCompleted.addListener(s), chrome.runtime.onMessage.addListener(function(e, n) {
			var r;
			"reScrape" === e.command && s({
				frameId: 0,
				tabId: e.tabId
			}), "XHREventFired" === e.command && (r = e, chrome.tabs.query({
				active: !0,
				currentWindow: !0
			}, function(e) {
				chrome.tabs.sendMessage(e[0].id, {
					command: r.msg,
					data: r.data
				})
			}))
		})
	}, {}]
}, {}, [1]);
//# sourceMappingURL=background.js.map