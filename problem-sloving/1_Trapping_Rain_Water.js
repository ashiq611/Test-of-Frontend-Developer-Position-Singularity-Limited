function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);
            left++;
        } else {
            height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);
            right--;
        }
    }
    return water;
}

// Test Cases
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // Expected Output: 6
console.log(trap([4, 2, 0, 3, 2, 5])); // Expected Output: 9
console.log(trap([1, 2, 3, 4, 5])); // Expected Output: 0
