const vscode = require("vscode");
const util = require("./util");

let keyMap;

const formatText = (key) => {
    let resStr = [];
    let keyM = {
        en: "英文",
        zh: "中文",
    };
    let i18nObj = keyMap.get(key);
    if (!i18nObj) {
        return ["暂无数据"];
    }
    Object.keys(keyMap.get(key)).forEach((k) => {
        resStr.push(`${keyM[k]}：${i18nObj[k]}`);
    });
    return resStr;
};

/**
 * 自动提示实现，实现一个查找i18n国际化的过程
 * @param {*} document 
 * @param {*} position 
 */
const provideHover = (document, position) => {
    console.log(position);
    const r = document.getWordRangeAtPosition(
        position,
        /(?<=\$t\(['"])([^\)]*)(?=['"]\))/g
    );
    if (r) {
        console.log(r.c.e, r.e.e);
        console.log(document.getText(r));
    }
    if (!r) {
        return "";
    }

    return new vscode.Hover(formatText(document.getText(r)));
};

module.exports = function (context) {
    keyMap = util.getI18nKeys();
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(['vue', 'js', 'ts'], { provideHover })
    );
};
