const { spawn } = require('child_process');

function runPython(userId) {
    const childPython = spawn('python', ['./photos/filterPhoto/recommendation.py', userId, [14,62,46,85,96]]);

    childPython.stdout.on('data', (data) => {
        console.log(`stdout : ${data}`);
    })
    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })
    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
}

runPython(1);
