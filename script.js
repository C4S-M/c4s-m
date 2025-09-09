

        const terminal = document.getElementById('terminal');
        const user = 'cas@kali';

        // Commando's uitgebreid met een 'output' array.
        const commands = [
            { 
                cmd: 'whois cas', 
                output: [
                    'Name: Cas',
                    'Status: Online',
                    'Location: Classified',
                    'Skills: [ "Security", "Systems", "Coding" ]',
                    'Check LinkedIn For more skills & info'
                ],
                delay: 2000 
            },
            { 
                cmd: 'inject target --payload', 
                output: [
                    'Injecting payload...',
                    'Access granted.',
                    '// Ready for next command.'
                ], 
                delay: 2500 
            },
            {
                cmd: 'display --logo',
                output: [
                    '      ____    _    ____  __  __               ',
                    '     / ___|  / \\  / ___||  \\/  |              ',
                    '     | |    / _ \\ \\___ \\| |\\/| |              ',
                    '     | |___/ ___ \\ ___) | |  | |_             ',
                    '      \\____/_/   \\_\\____/|_|  |_(_)   _   _    ',
                    '     |  _ \\ _ __ ___   __| |_  _  ___| |_(_) ___  _ __  ___',
                    '     | |_) | \'__/ _ \\ / _` | | | |/ __| __| |/ _ \\| \'_ \\/ __|',
                    '     |  __/| | | (_) | (_| | |_| | (__| |_| | (_) | | | \\__ \\',
                    '     |_|   |_|  \\___/ \\__,_|\\__,_|\\___|\\__|_|\\___/|_| |_|___/',
                    ' '
                ],
                delay: 3000
            }
        ];

        let commandIndex = 0;

        function typeLine(lineElement, text, callback) {
            let i = 0;
            const intervalId = setInterval(() => {
                lineElement.textContent = text.substring(0, i);
                if (i === text.length) {
                    clearInterval(intervalId);
                    if (callback) callback();
                }
                i++;
            }, 30); // Snelheid van het typen
        }

        function handleCommand() {
            if (commandIndex >= commands.length) {
                // Als alle commando's zijn geweest, reset en begin opnieuw
                setTimeout(() => {
                    terminal.innerHTML = '';
                    commandIndex = 0;
                    handleCommand();
                }, 2000);
                return;
            }

            const currentLine = commands[commandIndex];
            const fullCommand = `${user}:~$ ${currentLine.cmd}`;
            
            const cmdElement = document.createElement('p');
            cmdElement.className = 'line';
            terminal.appendChild(cmdElement);

            // Typ het commando
            typeLine(cmdElement, fullCommand, () => {
                // Voeg cursor toe na het typen van het commando
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cmdElement.appendChild(cursor);

                // Wacht even, verwijder cursor en toon output
                setTimeout(() => {
                    cmdElement.removeChild(cursor);
                    
                    // Toon de output regel voor regel
                    let outputIndex = 0;
                    function showOutput() {
                        if (outputIndex < currentLine.output.length) {
                            const outputElement = document.createElement('p');
                            outputElement.className = 'line';
                            outputElement.textContent = currentLine.output[outputIndex];
                            terminal.appendChild(outputElement);
                            outputIndex++;
                            // Zorg dat de terminal naar beneden scrollt
                            terminal.scrollTop = terminal.scrollHeight; 
                            showOutput(); // Direct de volgende regel (of met een kleine delay)
                        } else {
                            // Klaar met output, ga naar het volgende commando
                            commandIndex++;
                            setTimeout(handleCommand, 500);
                        }
                    }
                    showOutput();
                    
                }, currentLine.delay);
            });
        }

        // Start de animatie
        handleCommand();
