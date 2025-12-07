import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Tooltip({ parentRef, chordUrl, foundChord }) {
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (parentRef?.current) {
            const rect = parentRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }, [parentRef]);

    return createPortal(
        <div
            className="fixed z-[99999] bg-white border border-gray-300 p-2 rounded shadow-lg"
            style={{
                top: coords.top,
                left: coords.left,
            }}
        >
            <img className="w-15" src={chordUrl} alt={foundChord.fullMatch} />
            {foundChord.fullMatch}
        </div>,
        document.body
    );
}

export default Tooltip;