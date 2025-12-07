
const getChordsWithPositions = (tab) => {
    const regex = /\b([A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add)?\d*(?:\/[A-G](?:#|b)?)?)\b/g;

    const matches = [...tab.matchAll(regex)];

    return matches.map(match => {
        const start = match.index;
        const end = match.index + match[0].length;

        // Calcular la línea contando los saltos de línea antes de la posición
        const lineNumber = (tab.substring(0, start).match(/\n/g) || []).length + 1;

        // Encontrar el inicio del renglón (último salto de línea o inicio del texto)
        const lastNewlineIndex = tab.substring(0, start).lastIndexOf('\n');
        const lineStart = lastNewlineIndex === -1 ? 0 : lastNewlineIndex + 1;

        // Obtener el texto desde el inicio de la línea hasta el inicio del acorde
        const textBeforeChord = tab.substring(lineStart, start);

        // Contar espacios y tabs desde el inicio del renglón
        // Cada tab cuenta como 4 espacios (tabSize)
        const tabSize = 4;
        const spacesCount = (textBeforeChord.match(/ /g) || []).length;
        const tabsCount = (textBeforeChord.match(/\t/g) || []).length;
        const spacesFromLineStart = spacesCount + (tabsCount * tabSize);

        // Encontrar el último carácter no-espacio/no-tab antes del acorde
        // Convertir tabs a espacios equivalentes para calcular espacios desde último carácter
        const textWithTabsAsSpaces = textBeforeChord.replace(/\t/g, ' '.repeat(tabSize));
        const trimmedText = textWithTabsAsSpaces.trimEnd();
        const spacesFromLastChar = textWithTabsAsSpaces.length - trimmedText.length;

        return {
            chord: match[1],
            start: start,        // Posición inicial
            end: end,           // Posición final
            fullMatch: match[0], // Coincidencia completa
            line: lineNumber,    // Número de línea
            spacesBefore: spacesFromLastChar < 4 ? spacesFromLastChar : spacesFromLineStart,  // Espacios desde el inicio del renglón
        };
    });
}
const getChordComponent = (foundChord, chords) => {
    if (!foundChord) return null;
    const chordElement = searchChordElement(chords, foundChord.fullMatch)

    // Create spaces string - use regular spaces with white-space: pre
    const spaces = ' '.repeat(foundChord.spacesBefore);
    const tooltipComponent = () => {
        return (
            <div className={`tooltip !font-mono !text-xs`}>
                <div className="tooltip-content">
                    <img className="w-15" src={chordElement.chord_diag_mini} />
                </div>
                {foundChord.fullMatch}
            </div>
        )
    }
    return (
        <>
            {spaces.length > 0 && (
                <span
                    style={{
                        whiteSpace: 'pre',
                        fontFamily: 'monospace'
                    }}
                >
                    {spaces}
                </span>
            )}
            <span className="chord-component text-blue-500">
                {tooltipComponent()}
            </span>
        </>
    )
}
const searchChordElement = (chords, fullMatch) => {
    const plainObject = Object.values(chords)
    const plainChords = plainObject.reduce((acc, element) => {

        return [...acc, ...(element.uc.chord ?? [])]
    }, [])
    return plainChords.filter(chord => chord.chord_name === fullMatch)[0]
}

const generatePreview = (tab, chords) => {
    const chordsWithPositions = getChordsWithPositions(tab)
    const formattedTab = []
    let auxString = ''
    let isChordLine = false;

    for (let i = 0; i < tab.length; i++) {
        const letter = tab[i]
        if (letter == '\n' && isChordLine) {
            continue;
        }
        // Check if the actual position corresponts to a chord
        if (chordsWithPositions.some(chord => chord.start === i) && letter.trim() !== '') {
            const foundChord = chordsWithPositions.find(chord => chord.start === i)
            if (!isChordLine && auxString.trim() !== '') {
                formattedTab.push(auxString + '\n')
            }
            isChordLine = true;
            auxString = ''
            i += foundChord.fullMatch.length - 1;
            formattedTab.push({
                chord: foundChord,
                component: getChordComponent(foundChord, chords)
            })
        } else {
            isChordLine = false;
            auxString += letter
        }
    }
    formattedTab.push(auxString)
    return formattedTab
}
const mapAllPreviewElements = (preview) => {
    const elementsArray = []
    let actualShit = []
    const groupedChordsByLine = preview.reduce((acc, item) => {
        if (typeof item === 'string') {
            return acc
        }
        if (acc[item.chord.line]) {
            acc[item.chord.line].push(item)
        } else {
            acc[item.chord.line] = [item]
        }
        return acc
    }, {})

    const processActualShit = (actualShit) => {
        elementsArray.push(<div className="flex flex-row" style={{ position: 'relative' }}>
            {...actualShit}
        </div>)
        actualShit = []
    }
    for (let i = 0; i < preview.length; i++) {
        const item = preview[i]
        if (typeof item === 'string') {
            elementsArray.push(item)
        } else {
            actualShit.push(item.component)
            groupedChordsByLine[item.chord.line] = groupedChordsByLine[item.chord.line].filter((element) => element.chord.start !== item.chord.start)

            if (groupedChordsByLine[item.chord.line].length === 0) {
                processActualShit(actualShit)
                actualShit = []
            }
        }
    }
    return elementsArray
}

export { getChordComponent, getChordsWithPositions, generatePreview, mapAllPreviewElements }

