function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    const neighbors = (word) => {
        const res = [];
        for (let i = 0; i < word.length; i++) {
            for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
                const nextWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                if (wordSet.has(nextWord)) res.push(nextWord);
            }
        }
        return res;
    };

    let queue = [[beginWord]];
    const result = [];
    let found = false;
    const visited = new Set();

    while (queue.length && !found) {
        const levelVisited = new Set();
        const nextQueue = [];
        for (const path of queue) {
            const word = path[path.length - 1];
            for (const neighbor of neighbors(word)) {
                if (neighbor === endWord) {
                    result.push([...path, neighbor]);
                    found = true;
                }
                if (!visited.has(neighbor)) {
                    levelVisited.add(neighbor);
                    nextQueue.push([...path, neighbor]);
                }
            }
        }
        visited.add(...levelVisited);
        queue = nextQueue;
    }
    return result;
}

// Test Cases
console.log(findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])); // Expected Output: [["hit","hot","dot","dog","cog"], ["hit","hot","lot","log","cog"]]
console.log(findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log"])); // Expected Output: []
console.log(findLadders("a", "c", ["a", "b", "c"])); // Expected Output: [["a", "c"]]
