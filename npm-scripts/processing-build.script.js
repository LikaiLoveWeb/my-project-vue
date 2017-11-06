var path = require('path');
var glob = require('glob');
var _ = require('lodash');
var avalon = require('avalon2');
var fs = require('fs');
var rimraf = require('rimraf');
var buildDir = path.resolve(__dirname, '../widget');
var srcDir = path.resolve(__dirname, '../src');

/**
 * 获得路径
 * @param globPath: str
 * @param pathDir: str 对比路径
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname,  basename));
        pathDir = path.normalize(pathDir);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length)
        }
        entries[pathname] = [entry];
    }
    return entries;
}

/**
 * avalon后端渲染输出
 * @param str
 * @returns {{templates: {}, html}}
 */
function serverRender (str) {
    var nodes = avalon.lexer(str);
    var templates = {};
    collectTemplate(nodes, templates);
    var render = avalon.scan(str);
    var html = avalon.vdom(render.root, 'toHTML', false);
    return {
        templates: templates,
        html: html
    }
}

/**
 * avalon后端渲染组装Template
 * @param vdoms
 * @param obj
 */
function collectTemplate (vdoms, obj) {
    for (var i = 0, el; el = vdoms[i++]; ) {
        var props = el.props;
        if (props) {
            var id = props['ms-controller'] ||
                props[':controller'] ||
                props['ms-important'] ||
                props[':important'];
            if (id) {
                obj[id] = avalon.VElement.prototype.toHTML.call(el, true);
                continue
            }
        }
        if (el.children) {
            collectTemplate(el.children, obj)
        }
    }
}

function findTrueHtml(tempPath) {
    var tempId = '';
    var templates = '';
    var tempHtml = '';
    if (!_.isNull(tempPath)&&''!=tempPath){
        var data = fs.readFileSync(buildDir+'/html/'+tempPath+'.html','utf-8');
        tempHtml = data;
    }

    if (!_.isNull(tempHtml)&&''!=tempHtml){
        var obj = serverRender(tempHtml);
        if (!_.isEmpty(obj.templates)){
            templates = obj.templates;
            var templatesKeys = _.keys(obj.templates);
            if (!_.isEmpty(templatesKeys)&&_.size(templatesKeys)>0){
                tempId = templatesKeys[0];
            }
            tempHtml = _.isNull(tempId)?obj.html:obj.templates[tempId];
        }
    }
    return {
        'tempId':tempId,
        'templates':templates,
        'tempHtml':tempHtml
    };
}

function findCss(tempPath) {
    var tempCss = '';
    if (!_.isNull(tempPath)&&''!=tempPath){
        var data = fs.readFileSync(srcDir+'/js/'+tempPath+'.js','utf-8');
        if ((data.indexOf('require("')>-1&&data.indexOf('Css")')>-1)||(data.indexOf("require('")>-1&&data.indexOf("Css')")>-1)){
            tempCss = '<link href="../../css/'+tempPath+'.css" rel="stylesheet">';
        }
    }
    return tempCss;
}

function ParseHtmlContent(headerPath,footerPath,currentPath) {
    headerPath = _.isUndefined(headerPath)?'':headerPath;
    footerPath = _.isUndefined(footerPath)?'':footerPath;
    currentPath = _.isUndefined(currentPath)?'':currentPath;
    var headerObj = findTrueHtml(headerPath),
        headerHtml = headerObj.tempHtml,
        headerJs = (''==headerPath||_.isNull(headerHtml))?'':'<script type="text/javascript" src="../../js/'+headerPath+'.js"></script>',
        headerCss = (''==headerPath||_.isNull(headerHtml))?'':findCss(headerPath),
        footerObj = findTrueHtml(footerPath),
        footerHtml = footerObj.tempHtml,
        footerJs = (''==footerPath||_.isNull(footerHtml))?'':'<script type="text/javascript" src="../../js/'+footerPath+'.js"></script>',
        footerCss = (''==footerPath||_.isNull(footerHtml))?'':findCss(footerPath),
        currentObj = findTrueHtml(currentPath),
        currentHtml = currentObj.tempHtml,
        currentJs = (''==currentPath||_.isNull(currentHtml))?'':'<script type="text/javascript" src="../../js/'+currentPath+'.js"></script>',
        currentCss = (''==currentPath||_.isNull(currentHtml))?'':findCss(currentPath),
        templates = _.assign(headerObj.templates,footerObj.templates,currentObj.templates);

    var initVoid = '';
    if (!_.isEmpty(headerObj.templates)){
        var templatesKeys = _.keys(headerObj.templates);
        if (!_.isEmpty(templatesKeys)&&_.size(templatesKeys)>0){
            var tempVmId = templatesKeys[0];
            initVoid += 'avalon.vmodels["root"].loadInit("'+tempVmId+'");';
        }
    }
    if (!_.isEmpty(footerObj.templates)){
        var templatesKeys = _.keys(footerObj.templates);
        if (!_.isEmpty(templatesKeys)&&_.size(templatesKeys)>0){
            var tempVmId = templatesKeys[0];
            initVoid += 'avalon.vmodels["root"].loadInit("'+tempVmId+'");';
        }
    }
    if (!_.isEmpty(currentObj.templates)){
        var templatesKeys = _.keys(currentObj.templates);
        if (!_.isEmpty(templatesKeys)&&_.size(templatesKeys)>0){
            var tempVmId = templatesKeys[0];
            initVoid += 'avalon.vmodels["root"].loadInit("'+tempVmId+'");';
        }
    }

    var sbHtml = '<!doctype html>' +
        '<html lang="zh-cn">' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title></title>' +
        '<meta name="description" content=""/>' +
        '<meta name="keywords" content=""/>' +
        '<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>' +
        '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' +
        '<meta name="renderer" content="webkit">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>' +
        '<meta http-equiv="Expires" content="0">' +
        '<meta http-equiv="Cache-Control" content="no-cache">' +
        '<meta http-equiv="Cache-Control" content="no-store">' +
        '<meta name="format-detection" content="telephone=no,email=no,date=no,address=no">'+
        '<meta http-equiv="Pragma" content="no-cache"><meta name="robots" content="noindex,nofollow">' +
        '<meta name="fragment" content="!">' +
        '<link href="../../css/common/common_classic.css" rel="stylesheet">' +
        '<script type="text/javascript" src="../../js/webpackAssets.js"></script>' +
        '<script type="text/javascript" src="../../js/api.js"></script>' +
        '<script type="text/javascript" src="../../js/common.js"></script>' +
        '<script type="text/javascript" src="../../js/index.js"></script>' +
        headerCss+footerCss+currentCss+headerJs+footerJs+currentJs+
        '<script> avalon.serverTemplates= ' + JSON.stringify(templates) + '</script>' +
        '<script>'+initVoid+'</script>' +
        '</head><body ms-controller="root">' +
        '<div >'+headerHtml+'</div>' +
        '<div >'+currentHtml+'</div>' +
        '<div >'+footerHtml+'</div>' +
        '</body>' +
        '</html>';
    return sbHtml;
}

function AvalonServerRender (CurrentPath) {
    // 获取当前主页面的头尾页面路径
    var data = fs.readFileSync(srcDir+'/js/'+CurrentPath+'.js','utf-8');
    var outerPage = '';
    if (data.indexOf('tools.changeOuterPage')>-1){
        outerPage = data.substring(data.indexOf('tools.changeOuterPage'));
        outerPage = outerPage.substring(0,outerPage.indexOf(')'));
        outerPage = outerPage.replace('tools.changeOuterPage','').replace('(','').replace(/\s+/g, '').replace(/\'/g, '');
    }
    outerPage = outerPage.split(',');
    var HeaderPath = outerPage[0],FooterPath = outerPage[1];
    // 替换html内容文本.// html内容文本
    var htmlContent = ParseHtmlContent(HeaderPath,FooterPath,CurrentPath);
    fs.writeFileSync(buildDir+'/html/'+CurrentPath+'.html', htmlContent);
}

function updateIndexPage (pagePath) {
    var jsContent = '<script type="text/javascript" src="js/webpackAssets.js"></script><script type="text/javascript" src="js/common.js"></script><script type="text/javascript" src="js/index.js"></script><script type="text/javascript" src="js/api.js"></script>';
    var htmlContent = fs.readFileSync(buildDir+'/'+pagePath+'.html','utf-8');
    if (null!=htmlContent){
        htmlContent = htmlContent.replace('</body>',jsContent+'</body>');
    }
    fs.writeFileSync(buildDir+'/'+pagePath+'.html', htmlContent);
}
//更新首页内容
updateIndexPage('index');

//获取多模块入口html文件
var file_html = getEntry(buildDir+'/html/**/*.html', buildDir+'/html/');
//获取路由路径
var pages = Object.keys(file_html);
//把html 模板拼装为页面
pages.forEach(function(pathname) {
    pathname = pathname.replace('\\','/')
    if (pathname.indexOf('common/')<0){
        AvalonServerRender(pathname);
    }
});

//清理无用的dis/html/common文件夹
rimraf(buildDir+'/html/common', fs, function cb() {
  console.log('build目录中的common文件夹已清空');
});
