(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" class="navbar-brand">DynaReddit</a></div><ul class="nav navbar-nav"><li><a href="/">Home</a></li><li><a href="/reddits">Reddit Flow</a></li></ul></div></nav><div class="container"><main role="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes\reddit.jade compiled template
    templatizer["includes"]["reddit"] = function tmpl_includes_reddit() {
        return '<li class="reddit"><div class="panel panel-primary"><div class="panel-heading"><span role="subreddit"></span></div><div class="panel-body"><p><span><span role="title"></span></span></p><p><a role="url" target="_blank"><img role="thumbnail" width="40" height="40"/></a></p><p><span>Author:&nbsp<span role="author"></span></span></p><p><span>Subreddit:&nbsp<span role="subreddit"></span></span></p><div class="panel-footer"><div class="link"><a role="url" target="_blank">Link</a></div></div></div></div></li>';
    };

    // pages\home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><div class="container"><div class="row"><div role="reddits"><span class="info"><a href="http://blog.pusher.com/pusher-realtime-reddit-api" target="_blank">More info about the Pusher Realtime Reddit API</a></span></div></div></div></section>';
    };

    // pages\reddits.jade compiled template
    templatizer["pages"]["reddits"] = function tmpl_pages_reddits() {
        return '<section class="page reddits"><div class="container"><div class="row"><div class="col-xs-4"></div><div class="col-xs-4"><div class="input-group span7 center"><span>Search</span><input type="text" role="searchbox" class="form-control"/></div></div><div class="col-xs-4"></div></div></div><div class="container"><div class="row"><div class="col-xs-6 col-sm-3"><ul role="reddits" class="list-group list-unstyled"></ul></div><div class="col-xs-6 col-sm-3"><ul role="reddits2" class="list-group list-unstyled"></ul></div><div class="clearfix visible-xs"></div><div class="col-xs-6 col-sm-3"><ul role="reddits3" class="list-group list-unstyled"></ul></div><div class="col-xs-6 col-sm-3"><ul role="reddits4" class="list-group list-unstyled"></ul></div></div></div></section>';
    };

    return templatizer;
}));