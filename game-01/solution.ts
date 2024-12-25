type ArratNotEmpty = [number, ...number[]];
type Result = [number, number] | null;
function findNumbersThatSumTo(m: ArratNotEmpty, n: number): Result {
    const seen = new Set<number>();
    for (const num of m) {
        const complement = n - num;
        if (seen.has(complement)) {
            return [complement, num];
        }
        seen.add(num);
    }
    return null;
}

console.log(findNumbersThatSumTo([2, 7, 11, 15], 9));
console.log(findNumbersThatSumTo([3, 2, 4], 6));
console.log(findNumbersThatSumTo([2], 6));
console.log(findNumbersThatSumTo([3, 3], 0));