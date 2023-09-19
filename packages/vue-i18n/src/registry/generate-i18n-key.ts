import type { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { utils } from '@pro/share'
const { activeTextEditor, showInformationMessage } = vscode.window
type KeyMapValueType = {
    zh: string;
    en: string;
}

let keyMap: Map<string, KeyMapValueType>;

const searchI18nKey = (text: string) => {
    text = '中文'
    activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(activeTextEditor.selection, text)
    })
}

export default function (context: ExtensionContext) {
    keyMap = utils.getI18nKeys();
    const zhMap = new Map<string, string>()
    // keyMap.forEach((value, key) => {

    // })
    context.subscriptions.push(
        vscode.commands.registerCommand('vue-i18n.i18n-key-generate', () => {
            const text = activeTextEditor?.document.getText(activeTextEditor?.selection)
            if (!text) {
                return;
            }
            searchI18nKey(text)
            showInformationMessage(`Hello World from vue-i18n! ${text}`)
        })
    )
}