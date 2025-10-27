const getChords = (tab) => {
    const regex = /\b([A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add)?\d*(?:\/[A-G](?:#|b)?)?)\b/g;

    const chords = new Set([...tab.matchAll(regex)].map(match => match[1]));
    return Array.from(chords);
}

const getChordsWithPositions = (tab) => {
    const regex = /\b([A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add)?\d*(?:\/[A-G](?:#|b)?)?)\b/g;

    const matches = [...tab.matchAll(regex)];

    return matches.map(match => {
        const start = match.index;
        const end = match.index + match[0].length;

        // Calcular la línea contando los saltos de línea antes de la posición
        const lineNumber = (tab.substring(0, start).match(/\n/g) || []).length + 1;

        return {
            chord: match[1],
            start: start,        // Posición inicial
            end: end,           // Posición final
            fullMatch: match[0], // Coincidencia completa
            line: lineNumber    // Número de línea
        };
    });
}
const getChordComponent = (chord, chords) => {
    const foundChord = chords.find(c => c.chord_name === chord)
    if (foundChord) {
        return (
            <span className="chord-component text-blue-500">
                {chord}
            </span >
        )
    }
    return null
}

const generatePreview = (tab, chords) => {
    const chordsWithPositions = getChordsWithPositions(tab)
    const formattedTab = []
    let auxString = ''
    for (let i = 0; i < tab.length; i++) {
        const letter = tab[i]
        const actualLine = (tab.substring(0, i).match(/\n/g) || []).length + 1;
        if (chordsWithPositions.some(chord => chord.start === i)) {
            const foundChord = chordsWithPositions.find(chord => chord.start === i)
            formattedTab.push(auxString)
            auxString = ''
            formattedTab.push(getChordComponent(foundChord.fullMatch, chords))
        }
        auxString += letter
    }
    return formattedTab
}

export { getChordComponent, getChordsWithPositions, generatePreview }

