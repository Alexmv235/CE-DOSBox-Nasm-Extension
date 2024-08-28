const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

function activate(context) {
  let buildAndRunDisposable = vscode.commands.registerCommand('extension.buildAndRunAsm', function () {
    buildAndRun('normal');
  });

  let debugAsmDisposable = vscode.commands.registerCommand('extension.debugAsm', function () {
    buildAndRun('debug');
  });

  context.subscriptions.push(buildAndRunDisposable);
  context.subscriptions.push(debugAsmDisposable);
}

function buildAndRun(mode) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No hay ningún archivo abierto en el editor.');
    return;
  }

  const currentFile = editor.document.fileName;
  const currentFileDir = path.dirname(currentFile);
  const fileNameWithoutExtension = path.parse(currentFile).name;
  const outputFileName = `${fileNameWithoutExtension}.exe`;

  // Obtén la extensión utilizando el identificador correcto
  const extension = vscode.extensions.getExtension('alexmv235.paradigmasce-doxbox-asm');
  
  if (!extension) {
    vscode.window.showErrorMessage('No se pudo encontrar la extensión.');
    return;
  }

  const debugFilePath = path.join(extension.extensionPath, 'assets', 'debug.com');

  // Copia el archivo debug.com al directorio actual si está en modo debug
  if (mode === 'debug') {
    const targetDebugPath = path.join(currentFileDir, 'debug.com');
    fs.copyFileSync(debugFilePath, targetDebugPath);
  }

  const nasmCommand = `nasm -f bin -o ${path.join(currentFileDir, outputFileName)} -I ${currentFileDir} ${currentFile}`;

  cp.exec(nasmCommand, (err, stdout, stderr) => {
    if (err) {
      vscode.window.showErrorMessage(`Error durante la compilación: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(`Compilación completada: ${stdout}`);

    let dosboxCommand;
    if (mode === 'debug') {
      dosboxCommand = `dosbox -c "mount c ${currentFileDir}" -c "c:" -c "debug ${outputFileName}"`;
    } else {
      dosboxCommand = `dosbox -c "mount c ${currentFileDir}" -c "c:" -c "${outputFileName}"`;
    }

    cp.exec(dosboxCommand, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(`Error durante la ejecución: ${stderr}`);
        return;
      }
      vscode.window.showInformationMessage(`Programa ejecutado: ${stdout}`);

      // Elimina el archivo debug.com después de la ejecución
      if (mode === 'debug') {
        const targetDebugPath = path.join(currentFileDir, 'debug.com');
        fs.unlinkSync(targetDebugPath);
      }
    });
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
