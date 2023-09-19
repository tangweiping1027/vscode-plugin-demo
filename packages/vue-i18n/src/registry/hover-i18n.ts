import * as vscode from 'vscode'
import { utils } from '@pro/share'
import type { TextDocument, ExtensionContext, Position, Hover, ProviderResult } from 'vscode';

type KeyMapValueType = {
    zh: string;
    en: string;
}

let keyMap: Map<string, KeyMapValueType>;

const formatText = (key: string) => {
    let resStr = [] as string[];
    let keyM: KeyMapValueType = {
        en: "英文",
        zh: "中文",
    };
    let i18nObj = keyMap.get(key);
    if (!i18nObj) {
        return ["暂无数据"];
    }
    (Object.keys(i18nObj) as unknown as (keyof KeyMapValueType)[])?.forEach((k) => {
        resStr.push(`${keyM[k]}：${i18nObj?.[k]}`);
    });
    return resStr;
};

/**
 * 自动提示实现，实现一个查找i18n国际化的过程
 * @param {*} document 
 * @param {*} position 
 */
const provideHover = (document: TextDocument, position: Position): ProviderResult<Hover> => {
    console.log(position);
    const r = document.getWordRangeAtPosition(
        position,
        /(?<=\$t\(['"])([^\)]*)(?=['"]\))/g
    );
    if (!r) {
        return new vscode.Hover([]);
    }

    return new vscode.Hover(formatText(document.getText(r)));
};

export default function (context: ExtensionContext) {
    keyMap = utils.getI18nKeys();
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(['vue', 'js', 'ts'], { provideHover })
    );
};
