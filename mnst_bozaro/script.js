const colors = ["blue", "yellow", "red"];
let state = [null, null, null, null, null, null];
let inputPhase = true;

function updateUI() {
    for (let i = 0; i < 6; i++) {
        const circle = document.getElementById(`c${i}`);
        if (state[i] !== null) {
            circle.style.backgroundColor = colors[state[i]];
        } else {
            circle.style.backgroundColor = "gray";
        }
    }
}

function rotateColor(index) {
    state[index] = (state[index] + 1) % 3;
}

function clickCircle(index) {
    if (inputPhase) {
        state[index] = (state[index] === null ? 0 : (state[index] + 1) % 3);
        updateUI();
        return;
    }

    // Modify only neighbors, not the clicked circle itself
    const left = (index + 5) % 6;
    const right = (index + 1) % 6;
    rotateColor(left);
    rotateColor(right);
    updateUI();
}

for (let i = 0; i < 6; i++) {
    document.getElementById(`c${i}`).addEventListener("click", () => clickCircle(i));
}

function allSame(arr) {
    return arr.every(v => v === arr[0]);
}

function showResult(message, isError = false) {
    const area = document.getElementById("result-area");
    area.textContent = message;
    area.style.background = isError ? "#ffeaea" : "#fff";
    area.style.color = isError ? "#c00" : "#222";
}

function solvePuzzle() {
    const queue = [{ state: [...state], steps: [], last: -1 }];
    const visited = new Set();
    visited.add(state.join(""));

    while (queue.length) {
        const { state: curr, steps, last } = queue.shift();
        if (allSame(curr)) {
            showResult("揃える手順: " + (steps.length ? steps.map(i => i + 1).join(", ") : "すでに揃っています！"));
            return;
        }
        for (let i = 0; i < 6; i++) {
            if (i === last) continue; // Skip same button as last
            const next = [...curr];
            const left = (i + 5) % 6;
            const right = (i + 1) % 6;
            next[left] = (next[left] + 1) % 3;
            next[right] = (next[right] + 1) % 3;
            const key = next.join("") + "-" + i;
            if (!visited.has(key)) {
                visited.add(key);
                queue.push({ state: next, steps: [...steps, i], last: i });
            }
        }
    }
    showResult("解決手順が見つかりませんでした。", true);
}

document.getElementById("solveBtn").addEventListener("click", solvePuzzle);

document.getElementById("toggleModeBtn").addEventListener("click", () => {
    if (state.every(v => v !== null)) {
        inputPhase = !inputPhase;
        document.getElementById("solveBtn").style.display = inputPhase ? "none" : "inline-block";
        if (inputPhase) showResult("");
    } else {
        showResult("すべての円に色を設定してください。", true);
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    state = [null, null, null, null, null, null];
    inputPhase = true;
    document.getElementById("solveBtn").style.display = "none";
    updateUI();
    showResult("");
});

updateUI();