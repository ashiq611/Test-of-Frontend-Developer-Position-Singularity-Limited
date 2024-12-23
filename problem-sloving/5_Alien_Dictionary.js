function alienOrder(words) {
    const graph = {};
    const inDegree = {};

    for (const word of words) {
        for (const char of word) {
            if (!graph[char]) graph[char] = new Set();
            if (!(char in inDegree)) inDegree[char] = 0;
        }
    }

    for (let i = 0; i < words.length - 1; i++) {
        const [w1, w2] = [words[i], words[i + 1]];
        const len = Math.min(w1.length, w2.length);
        let found = false;

        for (let j = 0; j < len; j++) {
            if (w1[j] !== w2[j]) {
                if (!graph[w1[j]].has(w2[j])) {
                    graph[w1[j]].add(w2[j]);
                    inDegree[w2[j]]++;
                }
                found = true;
                break;
            }
        }

        if (!found && w1.length > w2.length) return ""; // Invalid case
    }

    const queue = Object.keys(inDegree).filter(char => inDegree[char] === 0);
    const result = [];

    while (queue.length) {
        const char = queue.shift();
        result.push(char);
        for (const neighbor of graph[char]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return result.length === Object.keys(graph).length ? result.join('') : "";
}

// Test Cases
console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // Expected Output: "wertf"
console.log(alienOrder(["baa", "abcd", "abca", "cab", "cad"])); // Expected Output: "bdac"
console.log(alienOrder(["z", "x", "z"])); // Expected Output: ""
