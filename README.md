# Paradigmas: DOSBox EXE Direct Run

Autor: [alexmv235](https://github.com/Alexmv235)
## Descripción

Paradigmas: DOSBox EXE Direct Run es una extensión para Visual Studio Code que permite ensamblar y ejecutar archivos .asm en DOSBox directamente desde el directorio local. Esta extensión facilita el desarrollo y la depuración de programas ensambladores, ejecutándolos de manera rápida y eficiente en un entorno emulado de DOS.
Comandos
1. extension.buildAndRunAsm

Descripción: Ensambla el código ASM que tienes abierto, exporta un archivo ejecutable .exe en la misma carpeta donde se encuentra el código ASM, y ejecuta el programa en el emulador DOSBox.

    Comando VSCode: ParadigmasCE Build and Run ASM

2. extension.debugAsm

Descripción: Ensambla el código ASM que tienes abierto, exporta un archivo ejecutable .exe en la misma carpeta donde se encuentra el código ASM y ejecuta el programa en el emulador DOSBox en modo Debug. (El archivo debug.com debe estar en la misma carpeta que el código ASM).

    Comando VSCode: ParadigmasCE Debug ASM

## Requisitos

    DOSBox: Debes tener instalado DOSBox.
    NASM: Debes tener instalado NASM.
    Configuración de PATH: Agrega las rutas de DOSBox y NASM a las variables de entorno del sistema (PATH).

## Instalación

    Instala DOSBox y NASM.
    Asegúrate de agregar DOSBox y NASM al PATH de tu sistema.
    Instala la extensión desde el Marketplace de Visual Studio Code o descárgala e instálala manualmente desde el archivo .vsix.

## Uso

    Abre cualquier archivo .asm en Visual Studio Code.
    Utiliza los comandos de la extensión a través de la paleta de comandos (Ctrl+Shift+P):
        ParadigmasCE Build and Run ASM para ensamblar y ejecutar.
        ParadigmasCE Debug ASM para ensamblar y depurar.


## Contribuciones

Si deseas contribuir a esta extensión, por favor abre un issue o envía un pull request en el [repositorio del proyecto](https://github.com/Alexmv235/CE-DOSBox-Nasm-Extension).
## Licencia

Esta extensión está licenciada bajo la Licencia MIT.

Imagen de extensión obtenida de:
Coding icons created by Freepik - Flaticon[https://www.flaticon.com/free-icons/coding]