const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');

function activate(context) {
  // Comando para compilar y ejecutar el archivo en modo normal
  let buildAndRunDisposable = vscode.commands.registerCommand('extension.buildAndRunAsm', function () {
    buildAndRun('normal');
  });

  // Nuevo comando para compilar y ejecutar el archivo en modo debug
  let debugAsmDisposable = vscode.commands.registerCommand('extension.debugAsm', function () {
    buildAndRun('debug');
  });

  context.subscriptions.push(buildAndRunDisposable);
  context.subscriptions.push(debugAsmDisposable);
}

function buildAndRun(mode) {
  // Obtiene el archivo actualmente abierto en el editor
  const currentFile = vscode.window.activeTextEditor.document.fileName;

  // Obtiene el directorio que contiene el archivo actual
  const currentFileDir = path.dirname(currentFile);

  // Obtiene solo el nombre del archivo sin la extensión
  const fileNameWithoutExtension = path.parse(currentFile).name;
  const outputFileName = `${fileNameWithoutExtension}.exe`;

  // Comando para compilar el archivo ASM usando NASM
  const nasmCommand = `nasm -f bin -o ${path.join(currentFileDir, outputFileName)} -I ${currentFileDir} ${currentFile}`;
  
  cp.exec(nasmCommand, (err, stdout, stderr) => {
    if (err) {
      vscode.window.showErrorMessage(`Error during build: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(`Build completed: ${stdout}`);

    // Comando para montar el directorio y ejecutar en DOSBox
    let dosboxCommand;
    if (mode === 'debug') {
      // Modo debug
      dosboxCommand = `dosbox -c "mount c ${currentFileDir}" -c "c:" -c "debug ${outputFileName}"`;
    } else {
      // Modo normal
      dosboxCommand = `dosbox -c "mount c ${currentFileDir}" -c "c:" -c "${outputFileName}"`;
    }

    cp.exec(dosboxCommand, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(`Error during execution: ${stderr}`);
        return;
      }
      vscode.window.showInformationMessage(`Program executed: ${stdout}`);
    });
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
