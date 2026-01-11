/**
 * HUE QUEST - Daily Color Mixing Challenge
 * Draft/Commit system with scoring tiers and session progression
 */

// ============================================
// PUZZLE CONFIGURATION
// ============================================
// To add a new puzzle, add an object to this array:
// {
//   name: "Puzzle Name",
//   difficulty: "easy" | "medium" | "hard",
//   target: [R, G, B],      // RGB values 0-255
//   sources: [[R,G,B], ...], // Array of source colors
//   mixLimit: 5              // Max mixes allowed
// }

const PUZZLES = [
    // ========== EASY PUZZLES (33) ==========
    // 4-5 step solutions - easier targets, primaries + white/black
    { name: "Violet", difficulty: "easy", target: [216, 8, 216], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [255, 255, 0]], mixLimit: 6, solutionPath: [2, 1, 2, 2] },
    { name: "Pearl", difficulty: "easy", target: [248, 248, 232], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 0], [255, 255, 0]], mixLimit: 6, solutionPath: [3, 0, 0, 0] },
    { name: "Shadow", difficulty: "easy", target: [52, 52, 52], sources: [[255, 255, 255], [0, 0, 0], [0, 0, 255], [0, 255, 0]], mixLimit: 7, solutionPath: [1, 0, 0, 1, 1] },
    { name: "Mixed", difficulty: "easy", target: [228, 116, 244], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [0, 255, 255]], mixLimit: 7, solutionPath: [1, 3, 0, 0, 2] },
    { name: "Crimson", difficulty: "easy", target: [248, 136, 184], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [255, 0, 255]], mixLimit: 6, solutionPath: [3, 3, 2, 0] },
    { name: "Amber", difficulty: "easy", target: [216, 216, 72], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [0, 255, 255]], mixLimit: 6, solutionPath: [2, 1, 0, 2] },
    { name: "Emerald", difficulty: "easy", target: [12, 228, 4], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 0], [255, 0, 0]], mixLimit: 7, solutionPath: [3, 1, 2, 2, 2] },
    { name: "Mixed 2", difficulty: "easy", target: [220, 132, 220], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [0, 255, 0]], mixLimit: 7, solutionPath: [2, 2, 1, 2, 0] },
    { name: "Forest", difficulty: "easy", target: [8, 120, 8], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 0], [255, 0, 0]], mixLimit: 6, solutionPath: [2, 2, 2, 1] },
    { name: "Slate", difficulty: "easy", target: [124, 124, 76], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [255, 255, 0]], mixLimit: 7, solutionPath: [0, 3, 3, 0, 1] },
    { name: "Teal", difficulty: "easy", target: [24, 248, 216], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 0], [0, 255, 255]], mixLimit: 6, solutionPath: [0, 2, 3, 3] },
    { name: "Sapphire", difficulty: "easy", target: [76, 76, 204], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [0, 0, 255]], mixLimit: 7, solutionPath: [0, 1, 1, 0, 3] },
    { name: "Slate 2", difficulty: "easy", target: [124, 92, 92], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [255, 0, 0]], mixLimit: 7, solutionPath: [0, 0, 3, 0, 1] },
    { name: "Emerald 2", difficulty: "easy", target: [108, 236, 108], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [0, 255, 0]], mixLimit: 7, solutionPath: [0, 1, 0, 0, 3] },
    { name: "Sapphire 2", difficulty: "easy", target: [156, 156, 236], sources: [[255, 255, 255], [0, 0, 0], [0, 0, 255], [255, 255, 0]], mixLimit: 7, solutionPath: [0, 3, 2, 2, 0] },
    { name: "Mixed 3", difficulty: "easy", target: [200, 200, 8], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [0, 255, 255]], mixLimit: 6, solutionPath: [1, 1, 2, 2] },
    { name: "Maroon", difficulty: "easy", target: [52, 20, 20], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [0, 255, 0]], mixLimit: 7, solutionPath: [1, 0, 2, 1, 1] },
    { name: "Sapphire 3", difficulty: "easy", target: [156, 156, 244], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [0, 0, 255]], mixLimit: 7, solutionPath: [2, 0, 3, 3, 0] },
    { name: "Maroon 2", difficulty: "easy", target: [52, 4, 4], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 0], [255, 0, 0]], mixLimit: 7, solutionPath: [1, 3, 3, 1, 1] },
    { name: "Sapphire 4", difficulty: "easy", target: [24, 24, 248], sources: [[255, 255, 255], [0, 0, 0], [0, 0, 255], [0, 255, 0]], mixLimit: 6, solutionPath: [0, 2, 2, 2] },
    { name: "Silver", difficulty: "easy", target: [152, 152, 152], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [0, 255, 255]], mixLimit: 6, solutionPath: [0, 1, 1, 0] },
    { name: "Slate 3", difficulty: "easy", target: [124, 124, 108], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [255, 255, 0]], mixLimit: 7, solutionPath: [0, 3, 0, 0, 1] },
    { name: "Silver 2", difficulty: "easy", target: [168, 184, 168], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [0, 255, 0]], mixLimit: 6, solutionPath: [3, 0, 1, 0] },
    { name: "Mixed 4", difficulty: "easy", target: [184, 184, 104], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [0, 0, 255]], mixLimit: 6, solutionPath: [2, 0, 3, 2] },
    { name: "Amber 2", difficulty: "easy", target: [204, 204, 92], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [0, 0, 255]], mixLimit: 7, solutionPath: [0, 3, 1, 0, 2] },
    { name: "Violet 2", difficulty: "easy", target: [216, 88, 200], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [255, 0, 255]], mixLimit: 6, solutionPath: [2, 1, 0, 3] },
    { name: "Emerald 3", difficulty: "easy", target: [184, 248, 88], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [255, 255, 0]], mixLimit: 6, solutionPath: [0, 3, 2, 3] },
    { name: "Charcoal", difficulty: "easy", target: [84, 92, 84], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 255], [0, 255, 0]], mixLimit: 7, solutionPath: [3, 0, 1, 0, 1] },
    { name: "Shadow 2", difficulty: "easy", target: [24, 56, 56], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [255, 0, 255]], mixLimit: 6, solutionPath: [0, 2, 1, 1] },
    { name: "Cream", difficulty: "easy", target: [120, 248, 248], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [255, 0, 255]], mixLimit: 6, solutionPath: [0, 0, 0, 2] },
    { name: "Blush", difficulty: "easy", target: [236, 188, 188], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [255, 0, 0]], mixLimit: 7, solutionPath: [0, 2, 0, 3, 0] },
    { name: "Forest 2", difficulty: "easy", target: [8, 120, 40], sources: [[255, 255, 255], [0, 0, 0], [0, 255, 255], [0, 255, 0]], mixLimit: 6, solutionPath: [3, 2, 3, 1] },
    { name: "Mixed 5", difficulty: "easy", target: [124, 116, 52], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [255, 255, 0]], mixLimit: 7, solutionPath: [2, 0, 0, 3, 1] },

    // ========== MEDIUM PUZZLES (34) ==========
    // 5-7 step solutions - more complex color mixing
    { name: "Navy", difficulty: "medium", target: [18, 14, 114], sources: [[0, 0, 255], [0, 255, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [1, 1, 2, 0, 0, 3] },
    { name: "Emerald 4", difficulty: "medium", target: [101, 247, 125], sources: [[0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 255, 255]], mixLimit: 9, solutionPath: [0, 3, 2, 1, 3, 3, 0] },
    { name: "Maroon 3", difficulty: "medium", target: [148, 4, 4], sources: [[0, 255, 0], [255, 0, 0], [0, 0, 255], [0, 0, 0]], mixLimit: 7, solutionPath: [3, 1, 3, 3, 1] },
    { name: "Maroon 4", difficulty: "medium", target: [106, 18, 98], sources: [[0, 255, 0], [255, 0, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [3, 1, 0, 2, 2, 3] },
    { name: "Maroon 5", difficulty: "medium", target: [106, 18, 34], sources: [[0, 255, 0], [255, 0, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [3, 1, 0, 2, 1, 3] },
    { name: "Mixed 6", difficulty: "medium", target: [146, 98, 18], sources: [[0, 255, 0], [255, 0, 255], [255, 0, 0], [0, 0, 0]], mixLimit: 8, solutionPath: [3, 3, 1, 0, 0, 2] },
    { name: "Forest 3", difficulty: "medium", target: [27, 51, 1], sources: [[255, 0, 0], [0, 255, 0], [255, 255, 0], [0, 0, 0]], mixLimit: 9, solutionPath: [2, 3, 0, 2, 1, 3, 3] },
    { name: "Crimson 2", difficulty: "medium", target: [222, 2, 134], sources: [[255, 0, 0], [0, 255, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [2, 0, 0, 3, 0, 2] },
    { name: "Mint", difficulty: "medium", target: [190, 230, 218], sources: [[255, 0, 255], [0, 255, 255], [255, 255, 0], [255, 255, 255]], mixLimit: 8, solutionPath: [2, 0, 0, 2, 1, 3] },
    { name: "Crimson 3", difficulty: "medium", target: [247, 115, 133], sources: [[255, 0, 255], [255, 255, 0], [0, 255, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [1, 0, 3, 1, 1, 1, 0] },
    { name: "Sapphire 5", difficulty: "medium", target: [182, 150, 254], sources: [[0, 255, 0], [0, 0, 255], [255, 0, 255], [255, 255, 255]], mixLimit: 8, solutionPath: [3, 1, 3, 2, 1, 3] },
    { name: "Blush 2", difficulty: "medium", target: [238, 218, 194], sources: [[255, 0, 0], [0, 255, 0], [255, 255, 0], [255, 255, 255]], mixLimit: 8, solutionPath: [0, 2, 1, 0, 3, 3] },
    { name: "Sapphire 6", difficulty: "medium", target: [148, 148, 236], sources: [[0, 0, 255], [255, 255, 0], [255, 0, 255], [255, 255, 255]], mixLimit: 7, solutionPath: [0, 1, 0, 0, 3] },
    { name: "Slate 4", difficulty: "medium", target: [124, 124, 132], sources: [[0, 0, 255], [0, 255, 255], [255, 255, 0], [255, 255, 255]], mixLimit: 7, solutionPath: [2, 2, 2, 2, 0] },
    { name: "Mixed 7", difficulty: "medium", target: [18, 114, 130], sources: [[255, 255, 0], [0, 255, 0], [0, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [3, 3, 0, 1, 1, 2] },
    { name: "Violet 3", difficulty: "medium", target: [189, 3, 157], sources: [[255, 0, 255], [255, 0, 0], [0, 255, 0], [0, 0, 0]], mixLimit: 9, solutionPath: [2, 0, 0, 0, 1, 3, 0] },
    { name: "Crimson 4", difficulty: "medium", target: [222, 54, 86], sources: [[255, 0, 0], [0, 255, 0], [255, 0, 255], [255, 255, 255]], mixLimit: 8, solutionPath: [3, 0, 3, 1, 2, 0] },
    { name: "Amber 3", difficulty: "medium", target: [255, 231, 95], sources: [[255, 255, 0], [0, 0, 255], [255, 0, 255], [255, 255, 255]], mixLimit: 9, solutionPath: [3, 3, 2, 2, 0, 3, 0] },
    { name: "Crimson 5", difficulty: "medium", target: [190, 82, 18], sources: [[0, 255, 0], [255, 0, 0], [0, 255, 255], [255, 255, 255]], mixLimit: 8, solutionPath: [1, 1, 3, 1, 0, 1] },
    { name: "Emerald 5", difficulty: "medium", target: [108, 196, 84], sources: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255]], mixLimit: 7, solutionPath: [0, 2, 0, 3, 1] },
    { name: "Mixed 8", difficulty: "medium", target: [180, 52, 132], sources: [[255, 0, 255], [0, 255, 255], [255, 255, 0], [0, 0, 0]], mixLimit: 7, solutionPath: [3, 2, 2, 3, 0] },
    { name: "Violet 4", difficulty: "medium", target: [223, 19, 255], sources: [[0, 0, 255], [255, 0, 255], [255, 255, 0], [255, 255, 255]], mixLimit: 9, solutionPath: [3, 1, 1, 3, 0, 1, 1] },
    { name: "Navy 2", difficulty: "medium", target: [10, 46, 54], sources: [[0, 255, 255], [255, 255, 0], [0, 0, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [0, 1, 2, 0, 3, 3] },
    { name: "Violet 5", difficulty: "medium", target: [218, 62, 218], sources: [[0, 0, 255], [0, 255, 0], [255, 0, 255], [255, 255, 255]], mixLimit: 8, solutionPath: [1, 3, 3, 1, 2, 2] },
    { name: "Silver 3", difficulty: "medium", target: [188, 188, 220], sources: [[0, 0, 255], [255, 255, 0], [255, 0, 255], [255, 255, 255]], mixLimit: 7, solutionPath: [3, 3, 1, 0, 3] },
    { name: "Forest 4", difficulty: "medium", target: [2, 130, 86], sources: [[0, 0, 255], [0, 255, 0], [0, 255, 255], [0, 0, 0]], mixLimit: 8, solutionPath: [0, 3, 0, 3, 0, 1] },
    { name: "Teal 2", difficulty: "medium", target: [28, 196, 212], sources: [[255, 0, 0], [0, 255, 255], [255, 0, 255], [0, 0, 0]], mixLimit: 7, solutionPath: [0, 2, 3, 1, 1] },
    { name: "Mixed 9", difficulty: "medium", target: [109, 25, 117], sources: [[255, 0, 255], [0, 255, 255], [255, 255, 0], [0, 0, 0]], mixLimit: 9, solutionPath: [3, 0, 2, 1, 0, 0, 3] },
    { name: "Crimson 6", difficulty: "medium", target: [191, 77, 13], sources: [[255, 0, 0], [0, 255, 0], [0, 255, 255], [255, 255, 255]], mixLimit: 9, solutionPath: [0, 3, 3, 0, 0, 1, 0] },
    { name: "Crimson 7", difficulty: "medium", target: [238, 50, 110], sources: [[255, 0, 255], [255, 0, 0], [0, 255, 0], [255, 255, 255]], mixLimit: 8, solutionPath: [0, 0, 2, 3, 0, 1] },
    { name: "Forest 5", difficulty: "medium", target: [43, 81, 35], sources: [[255, 0, 0], [0, 255, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [2, 3, 0, 1, 2, 1, 3] },
    { name: "Emerald 6", difficulty: "medium", target: [162, 226, 2], sources: [[0, 255, 0], [255, 0, 255], [255, 255, 0], [0, 0, 0]], mixLimit: 8, solutionPath: [3, 3, 3, 2, 0, 2] },
    { name: "Blush 3", difficulty: "medium", target: [252, 244, 236], sources: [[255, 255, 0], [0, 0, 255], [255, 0, 255], [255, 255, 255]], mixLimit: 7, solutionPath: [2, 0, 3, 3, 3] },
    { name: "Sapphire 7", difficulty: "medium", target: [29, 47, 221], sources: [[0, 255, 0], [0, 0, 255], [255, 0, 255], [255, 255, 255]], mixLimit: 9, solutionPath: [0, 3, 3, 2, 0, 1, 1] },

    // ========== HARD PUZZLES (33) ==========
    // 7-9 step solutions - challenging multi-step blending
    { name: "Sapphire 8", difficulty: "hard", target: [160, 160, 250], sources: [[255, 255, 255], [255, 0, 0], [0, 0, 0], [0, 0, 255]], mixLimit: 9, solutionPath: [2, 3, 2, 3, 3, 0, 3, 0] },
    { name: "Sapphire 9", difficulty: "hard", target: [41, 33, 193], sources: [[255, 0, 0], [255, 255, 0], [0, 0, 0], [0, 0, 255]], mixLimit: 9, solutionPath: [2, 2, 0, 2, 1, 3, 3] },
    { name: "Crimson 8", difficulty: "hard", target: [255, 145, 11], sources: [[255, 255, 0], [255, 0, 0], [255, 0, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [2, 1, 2, 0, 1, 1, 0] },
    { name: "Emerald 7", difficulty: "hard", target: [83, 173, 33], sources: [[255, 0, 0], [0, 255, 255], [0, 255, 0], [255, 255, 0]], mixLimit: 9, solutionPath: [2, 0, 2, 2, 0, 1, 0, 2] },
    { name: "Violet 6", difficulty: "hard", target: [247, 33, 198], sources: [[255, 0, 255], [255, 0, 0], [255, 255, 0], [0, 0, 0]], mixLimit: 9, solutionPath: [2, 1, 0, 0, 3, 1, 2, 0, 0] },
    { name: "Slate 5", difficulty: "hard", target: [126, 104, 110], sources: [[255, 0, 255], [255, 255, 255], [0, 0, 0], [255, 0, 0]], mixLimit: 9, solutionPath: [0, 0, 2, 0, 1, 3, 1, 1, 2] },
    { name: "Crimson 9", difficulty: "hard", target: [248, 162, 94], sources: [[255, 255, 0], [255, 0, 255], [0, 0, 255], [0, 255, 0]], mixLimit: 9, solutionPath: [2, 3, 2, 1, 1, 0, 1, 0] },
    { name: "Mint 2", difficulty: "hard", target: [213, 247, 213], sources: [[0, 0, 0], [255, 0, 255], [255, 255, 255], [0, 255, 0]], mixLimit: 9, solutionPath: [3, 2, 0, 2, 3, 2, 2] },
    { name: "Forest 6", difficulty: "hard", target: [13, 147, 19], sources: [[0, 255, 255], [0, 0, 0], [0, 255, 0], [255, 0, 0]], mixLimit: 9, solutionPath: [0, 3, 3, 0, 1, 1, 2] },
    { name: "Sapphire 10", difficulty: "hard", target: [73, 89, 233], sources: [[0, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 255]], mixLimit: 9, solutionPath: [0, 0, 2, 1, 3, 2, 3] },
    { name: "Teal 3", difficulty: "hard", target: [63, 221, 193], sources: [[255, 255, 255], [255, 0, 0], [255, 255, 0], [0, 255, 255]], mixLimit: 9, solutionPath: [1, 2, 2, 2, 1, 3, 3] },
    { name: "Slate 6", difficulty: "hard", target: [97, 99, 107], sources: [[255, 255, 255], [0, 255, 255], [0, 0, 0], [0, 0, 255]], mixLimit: 9, solutionPath: [1, 2, 3, 2, 0, 0, 2] },
    { name: "Navy 3", difficulty: "hard", target: [33, 1, 201], sources: [[255, 0, 0], [0, 0, 0], [0, 255, 0], [0, 0, 255]], mixLimit: 9, solutionPath: [3, 1, 1, 3, 1, 0, 3, 3] },
    { name: "Mint 3", difficulty: "hard", target: [243, 251, 225], sources: [[255, 255, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [3, 2, 0, 3, 1, 0, 2, 2, 2] },
    { name: "Slate 7", difficulty: "hard", target: [159, 134, 150], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [255, 0, 255]], mixLimit: 9, solutionPath: [2, 0, 0, 2, 3, 1, 1, 0] },
    { name: "Teal 4", difficulty: "hard", target: [43, 243, 255], sources: [[255, 255, 255], [0, 0, 255], [0, 255, 255], [255, 0, 255]], mixLimit: 9, solutionPath: [0, 1, 3, 2, 0, 2, 2] },
    { name: "Navy 4", difficulty: "hard", target: [9, 55, 127], sources: [[0, 255, 255], [0, 0, 255], [255, 0, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [0, 0, 2, 0, 0, 1, 3] },
    { name: "Violet 7", difficulty: "hard", target: [239, 17, 221], sources: [[255, 255, 0], [255, 0, 255], [255, 0, 0], [0, 255, 255]], mixLimit: 9, solutionPath: [2, 1, 2, 1, 1, 3, 2, 1, 1] },
    { name: "Maroon 6", difficulty: "hard", target: [207, 3, 16], sources: [[255, 0, 255], [255, 255, 255], [0, 0, 0], [255, 0, 0]], mixLimit: 9, solutionPath: [0, 1, 0, 0, 2, 2, 3, 3] },
    { name: "Emerald 8", difficulty: "hard", target: [29, 193, 29], sources: [[0, 255, 0], [255, 0, 255], [0, 0, 0], [255, 255, 255]], mixLimit: 9, solutionPath: [2, 1, 1, 1, 2, 0, 0] },
    { name: "Sapphire 11", difficulty: "hard", target: [3, 162, 234], sources: [[255, 255, 255], [0, 0, 0], [0, 0, 255], [0, 255, 255]], mixLimit: 9, solutionPath: [1, 1, 0, 1, 2, 1, 3, 2, 3] },
    { name: "Mixed 10", difficulty: "hard", target: [203, 129, 203], sources: [[255, 255, 255], [255, 0, 255], [0, 255, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [1, 3, 1, 3, 3, 1, 0] },
    { name: "Violet 8", difficulty: "hard", target: [209, 17, 255], sources: [[255, 0, 255], [0, 255, 0], [255, 255, 255], [0, 0, 255]], mixLimit: 9, solutionPath: [3, 3, 3, 2, 3, 0, 0] },
    { name: "Teal 5", difficulty: "hard", target: [43, 235, 215], sources: [[0, 0, 255], [255, 255, 255], [0, 255, 255], [255, 255, 0]], mixLimit: 9, solutionPath: [0, 2, 1, 0, 3, 0, 3, 2, 2] },
    { name: "Teal 6", difficulty: "hard", target: [73, 211, 211], sources: [[0, 0, 0], [255, 255, 255], [255, 0, 0], [0, 255, 255]], mixLimit: 9, solutionPath: [3, 0, 2, 3, 0, 1, 3] },
    { name: "Violet 9", difficulty: "hard", target: [254, 23, 236], sources: [[255, 255, 255], [0, 0, 0], [255, 255, 0], [255, 0, 255]], mixLimit: 9, solutionPath: [1, 1, 2, 0, 3, 2, 3, 3, 3] },
    { name: "Sapphire 12", difficulty: "hard", target: [68, 4, 235], sources: [[0, 0, 0], [255, 255, 255], [255, 0, 255], [0, 0, 255]], mixLimit: 9, solutionPath: [2, 1, 1, 0, 3, 0, 3, 2, 3] },
    { name: "Crimson 10", difficulty: "hard", target: [233, 169, 170], sources: [[255, 255, 255], [255, 0, 255], [0, 0, 0], [255, 0, 0]], mixLimit: 9, solutionPath: [0, 1, 2, 2, 0, 2, 0, 3, 0] },
    { name: "Mixed 11", difficulty: "hard", target: [223, 143, 213], sources: [[255, 255, 0], [0, 0, 0], [255, 0, 255], [255, 255, 255]], mixLimit: 9, solutionPath: [3, 0, 3, 0, 2, 1, 2, 3] },
    { name: "Maroon 7", difficulty: "hard", target: [185, 2, 1], sources: [[255, 255, 255], [0, 0, 0], [255, 0, 0], [0, 255, 0]], mixLimit: 9, solutionPath: [0, 3, 1, 1, 2, 2, 2, 1, 2] },
    { name: "Sapphire 13", difficulty: "hard", target: [127, 139, 245], sources: [[0, 0, 255], [0, 255, 255], [255, 255, 0], [255, 0, 255]], mixLimit: 9, solutionPath: [3, 1, 2, 3, 2, 3, 3, 3, 1] },
    { name: "Mixed 12", difficulty: "hard", target: [163, 125, 180], sources: [[0, 255, 255], [255, 255, 255], [0, 255, 0], [255, 0, 255]], mixLimit: 9, solutionPath: [0, 3, 3, 2, 2, 0, 1, 2, 3] },
    { name: "Violet 10", difficulty: "hard", target: [237, 65, 205], sources: [[255, 0, 0], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 9, solutionPath: [3, 1, 1, 3, 0, 2, 1] }
];

// ============================================
// DAILY PUZZLE SYSTEM
// ============================================
// IMPORTANT: Update this date before launch! Puzzle #1 starts on this date.
// This date should be set to the actual launch date to ensure puzzle #1 is first.
const EPOCH_DATE = new Date('2026-01-08T00:00:00'); // Launch date - UPDATE BEFORE LAUNCH

/**
 * Get the current date in Eastern Time (EST/EDT)
 * This ensures all users see the same daily puzzle regardless of their timezone
 */
function getEasternDate() {
    const now = new Date();
    // Convert to Eastern Time using Intl API
    const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return eastern;
}

/**
 * Calculate days since epoch in Eastern Time
 * This is the core function for daily puzzle rotation
 */
function getDaysSinceEpoch() {
    const eastern = getEasternDate();
    const easternMidnight = new Date(eastern.getFullYear(), eastern.getMonth(), eastern.getDate());
    const epochMidnight = new Date(EPOCH_DATE.getFullYear(), EPOCH_DATE.getMonth(), EPOCH_DATE.getDate());
    return Math.floor((easternMidnight - epochMidnight) / (1000 * 60 * 60 * 24));
}

/**
 * Get the index into the PUZZLES array for today's puzzle
 * Uses crossword-style difficulty rotation:
 * - Monday/Tuesday: Easy puzzles (indices 0-32)
 * - Wednesday/Thursday: Medium puzzles (indices 33-66)
 * - Friday/Saturday/Sunday: Hard puzzles (indices 67-99)
 */
function getDailyPuzzleIndex() {
    const days = getDaysSinceEpoch();
    // Handle negative days (before launch) gracefully
    if (days < 0) return 0;

    const eastern = getEasternDate();
    const dayOfWeek = eastern.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Puzzle pool ranges
    const EASY_START = 0, EASY_COUNT = 33;      // indices 0-32
    const MEDIUM_START = 33, MEDIUM_COUNT = 34; // indices 33-66
    const HARD_START = 67, HARD_COUNT = 33;     // indices 67-99

    // Determine which difficulty pool to use based on day of week
    let poolStart, poolCount;
    if (dayOfWeek === 1 || dayOfWeek === 2) {
        // Monday, Tuesday → Easy
        poolStart = EASY_START;
        poolCount = EASY_COUNT;
    } else if (dayOfWeek === 3 || dayOfWeek === 4) {
        // Wednesday, Thursday → Medium
        poolStart = MEDIUM_START;
        poolCount = MEDIUM_COUNT;
    } else {
        // Friday, Saturday, Sunday → Hard
        poolStart = HARD_START;
        poolCount = HARD_COUNT;
    }

    // Cycle within the difficulty pool using days since epoch
    return poolStart + (days % poolCount);
}

/**
 * Get the puzzle number for display (1-indexed, cycles 1 to PUZZLES.length)
 * This is what users see - Puzzle #1, #2, ... #100, #1, #2, ...
 */
function getDailyPuzzleNumber() {
    const days = getDaysSinceEpoch();
    if (days < 0) return 1; // Before launch, show puzzle #1
    return (days % PUZZLES.length) + 1;
}

/**
 * Get puzzle number for a specific puzzle index (1-indexed)
 */
function getPuzzleNumberForIndex(index) {
    return index + 1;
}

/**
 * Get puzzle index from puzzle number (0-indexed)
 */
function getPuzzleIndexFromNumber(puzzleNumber) {
    return puzzleNumber - 1;
}

/**
 * Calculate milliseconds until midnight Eastern Time
 */
function getNextPuzzleTime() {
    const now = new Date();
    // Get current Eastern time
    const easternNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));

    // Calculate midnight Eastern tomorrow
    const easternMidnight = new Date(easternNow);
    easternMidnight.setDate(easternMidnight.getDate() + 1);
    easternMidnight.setHours(0, 0, 0, 0);

    // Convert back to local time for accurate countdown
    // We need to know when midnight ET is in the user's local time
    const year = easternMidnight.getFullYear();
    const month = easternMidnight.getMonth();
    const day = easternMidnight.getDate();

    // Create the target time (midnight ET) - approximate by adding offset
    const isDST = easternNow.getTimezoneOffset() < now.getTimezoneOffset();
    const etOffset = isDST ? 4 : 5; // EDT = UTC-4, EST = UTC-5
    const targetUTC = Date.UTC(year, month, day, etOffset, 0, 0, 0);

    return Math.max(0, targetUTC - now.getTime());
}

function formatCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get a unique key for today (in Eastern Time) for localStorage
 */
function getTodayKey() {
    const eastern = getEasternDate();
    return `${eastern.getFullYear()}-${eastern.getMonth() + 1}-${eastern.getDate()}`;
}

/**
 * Check if a puzzle number is within the free archive window (last 7 days)
 */
function isPuzzleFree(puzzleNumber) {
    const today = getDailyPuzzleNumber();
    const daysAgo = today - puzzleNumber;
    // Handle wrap-around: if today is #3 and puzzle is #99, that's 4 days ago (not -96)
    const adjustedDaysAgo = daysAgo < 0 ? daysAgo + PUZZLES.length : daysAgo;
    return adjustedDaysAgo >= 0 && adjustedDaysAgo <= 7;
}

/**
 * Check if a puzzle has been released yet
 */
function isPuzzleReleased(puzzleNumber) {
    const days = getDaysSinceEpoch();
    // Puzzle numbers 1 to (days+1) have been released
    return puzzleNumber <= (days % PUZZLES.length) + 1 || days >= PUZZLES.length;
}


// ============================================
// ANALYTICS SYSTEM
// ============================================
const analytics = {
    events: [],

    track(category, action, label = null, value = null) {
        const event = {
            timestamp: new Date().toISOString(),
            category,
            action,
            label,
            value
        };
        this.events.push(event);

        // Log to console for debugging
        console.log(`[Analytics] ${action}:`, { category, label, value });

        // Push to dataLayer for external analytics (GA4, etc.)
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: action,
                event_category: category,
                event_label: label,
                event_value: value
            });
        }
    },

    getEvents() {
        return [...this.events];
    }
};

// Initialize dataLayer if not exists
window.dataLayer = window.dataLayer || [];

// ============================================
// SHARE FUNCTIONALITY
// ============================================
function generateShareText(puzzleNumber, pct, tier, mixCount, mixLimit) {
    // Generate emoji blocks based on accuracy tiers
    let blocks = '';
    if (pct >= 95) blocks = '🟩🟩🟩';
    else if (pct >= 90) blocks = '🟩🟩🟨';
    else if (pct >= 80) blocks = '🟩🟨🟨';
    else if (pct >= 70) blocks = '🟨🟨🟨';
    else if (pct >= 50) blocks = '🟨🟥🟥';
    else blocks = '🟥🟥🟥';

    const efficiency = mixCount < mixLimit ? ' ⚡' : '';

    return `HueQuest #${puzzleNumber} 🎨
${blocks} ${pct}%
${mixCount}/${mixLimit} mixes${efficiency}

Play at: huequest.game`;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (e) {
            document.body.removeChild(textarea);
            return false;
        }
    }
}

async function shareResults() {
    if (!officialResult) return;

    const puzzleNumber = getDailyPuzzleNumber();
    const puzzle = PUZZLES[currentPuzzleIndex];
    const shareText = generateShareText(
        puzzleNumber,
        officialResult.pct,
        officialResult.tier,
        officialResult.mixCount,
        puzzle.mixLimit
    );

    analytics.track('engagement', 'share_click', 'share_button');

    // Try native share API first (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: `HueQuest #${puzzleNumber}`,
                text: shareText
            });
            analytics.track('engagement', 'share_complete', 'native_share');
            return true;
        } catch (err) {
            if (err.name !== 'AbortError') {
                // Fall through to clipboard
            }
        }
    }

    // Fallback to clipboard
    const success = await copyToClipboard(shareText);
    if (success) {
        analytics.track('engagement', 'share_complete', 'clipboard');
    }
    return success;
}

// ============================================
// SCORING THRESHOLDS (easy to tweak)
// ============================================
const TIERS = {
    perfect: { min: 95, name: "Perfect Match", icon: "✨", class: "perfect" },
    professional: { min: 90, name: "Professional Eye", icon: "🎨", class: "professional" },
    good: { min: 80, name: "Good Eye", icon: "👍", class: "good" },
    training: { min: 0, name: "Keep Training", icon: "💪", class: "training" }
};

// Session title thresholds
const SESSION_TITLES = [
    { perfectCount: 5, title: "Color Sniper 🎯" },
    { perfectCount: 3, title: "True Colorist 🎨" },
    { perfectCount: 1, title: "Color Explorer 🔍" },
    { perfectCount: 0, title: "Warm-up Artist 🌅" }
];

// ============================================
// GAME STATE
// ============================================
let currentPuzzleIndex = 0;
let currentColor = [255, 255, 255];
let mixHistory = [];
let colorHistory = [[255, 255, 255]];
let mixCount = 0;
let soundEnabled = true;

// Draft/Commit state
let isCommitted = false;
let isSandboxMode = false;
let officialResult = null;

// ============================================
// COZY TITLE SYSTEM
// Paper craft themed titles for each match bracket
// ============================================
const COZY_TITLES = {
    // <50% - Encouraging beginner titles
    tier0: [
        "Color Explorer", "Paint Dabbler", "Happy Accident",
        "First Brushstrokes", "Mixing Adventurer", "Creative Spirit"
    ],
    // 50-60%
    tier1: [
        "Warm-Up Artist", "Getting Warmer", "On the Right Track",
        "Color Student", "Palette Apprentice", "Budding Painter"
    ],
    // 60-70%
    tier2: [
        "Color Curious", "Hue Hunter", "Shade Seeker",
        "Paint Pal", "Crafty Mixer", "Tint Tinkerer"
    ],
    // 70-75%
    tier3: [
        "Color Crafter", "Pigment Pro", "Skilled Blender",
        "Hue Handler", "Palette Friend", "Shade Shaper"
    ],
    // 75-80%
    tier4: [
        "Cozy Colorist", "Warm Palette", "Happy Hues",
        "Color Comfort", "Snug Shader", "Toasty Tones"
    ],
    // 80-85%
    tier5: [
        "Color Whisperer", "Hue Guru", "Shade Sage",
        "Pigment Poet", "Tint Talent", "Mix Maestro"
    ],
    // 85-90%
    tier6: [
        "Master Mixer", "Color Virtuoso", "Palette Prodigy",
        "Hue Hero", "Shade Specialist", "Blend Boss"
    ],
    // 90-95%
    tier7: [
        "Color Champion", "Chromatic Genius", "Pigment Perfectionist",
        "Hue Wizard", "Palette Master", "Tone Titan"
    ],
    // 95-99%
    tier8: [
        "Legendary Colorist", "Color Sage", "Supreme Blender",
        "Prismatic Pro", "Ultimate Artist", "Hue Sensei"
    ],
    // 100%
    tier9: [
        "Perfect Match! ✨", "Color Perfection!", "Flawless Artist!",
        "True Master!", "Absolute Genius!", "Immaculate Blend!"
    ]
};

function getCozyTitle(matchPercent) {
    let tier;
    if (matchPercent < 50) tier = 'tier0';
    else if (matchPercent < 60) tier = 'tier1';
    else if (matchPercent < 70) tier = 'tier2';
    else if (matchPercent < 75) tier = 'tier3';
    else if (matchPercent < 80) tier = 'tier4';
    else if (matchPercent < 85) tier = 'tier5';
    else if (matchPercent < 90) tier = 'tier6';
    else if (matchPercent < 95) tier = 'tier7';
    else if (matchPercent < 100) tier = 'tier8';
    else tier = 'tier9';

    const titles = COZY_TITLES[tier];
    return titles[Math.floor(Math.random() * titles.length)];
}

// Session stats (persisted to localStorage if available)
let sessionStats = { perfectCount: 0, bestTier: null, puzzlesPlayed: 0 };

// Streak & Personal Bests
let streakData = { count: 0, maxStreak: 0, lastPlayDate: null };
let personalBests = {}; // { puzzleIndex: bestScore }

// Enhanced player stats for stats screen
let playerStats = {
    totalPuzzlesPlayed: 0,
    bestMatch: 0,
    matchSum: 0,  // For calculating average
    bestEfficiency: null, // { puzzleNumber, mixesUsed, mixLimit, score }
    tierCounts: { perfect: 0, professional: 0, good: 0, training: 0 },
    completedPuzzles: {} // { puzzleNumber: { score, tier, mixes, mixLimit, date } }
};

// Daily puzzle state
let dailyCompleted = {}; // { "YYYY-M-D": true }
let hintsRemaining = 1; // 1 free hint per puzzle
let countdownInterval = null;
let tutorialComplete = false;

// ============================================
// DOM ELEMENTS
// ============================================
const $ = id => document.getElementById(id);
const puzzleLabel = $('puzzleLabel');
const difficultyBadge = $('difficultyBadge');
const soundToggle = $('soundToggle');
const resetBtn = $('resetBtn');
const sessionBanner = $('sessionBanner');
const sessionTitle = $('sessionTitle');
const sessionStatsEl = $('sessionStats');
const phaseTag = $('phaseTag');
const targetSwatch = $('targetSwatch');
const differenceRing = $('differenceRing');
const mixSwatch = $('mixSwatch');
const swirlEffect = $('swirlEffect');
const matchValue = $('matchValue');
const historyStrip = $('historyStrip');
const startSquare = $('startSquare');
const mixCounter = $('mixCounter');
const sourceColors = $('sourceColors');
const undoBtn = $('undoBtn');
const commitBtn = $('commitBtn');
const prevBtn = $('prevBtn');
const nextBtn = $('nextBtn');
const randomBtn = $('randomBtn');
const officialResultEl = $('officialResult');
const officialTier = $('officialTier');
const officialScore = $('officialScore');
const officialEfficiency = $('officialEfficiency');
const sandboxNotice = $('sandboxNotice');
const resultsOverlay = $('resultsOverlay');
const resultCelebration = $('resultCelebration');
const resultTierDisplay = $('resultTierDisplay');
const resultPercent = $('resultPercent');
const resultYourMix = $('resultYourMix');
const resultTargetColor = $('resultTargetColor');
const resultEfficiencyDisplay = $('resultEfficiencyDisplay');
const resultEfficiencyText = $('resultEfficiencyText');
const resultHistory = $('resultHistory');
const sandboxBtn = $('sandboxBtn');
const nextPuzzleBtn = $('nextPuzzleBtn');

// NEW: Streak, PB, Hints, Confetti elements
const streakBadge = $('streakBadge');
const streakCount = $('streakCount');
const pbBadge = $('pbBadge');
const hintBtn = $('hintBtn');
const hintCount = $('hintCount');
const hintDisplay = $('hintDisplay');
const hintBadge = $('hintBadge');
const confettiCanvas = $('confettiCanvas');
const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;

// NEW: Daily puzzle, share, and tutorial elements
const countdownBadge = $('countdownBadge');
const shareBtn = $('shareBtn');
const copyBtn = $('copyBtn');
const dailyCompleteBanner = $('dailyCompleteBanner');
const nextPuzzleTime = $('nextPuzzleTime');
const tutorialOverlay = $('tutorialOverlay');
const tutorialNextBtn = $('tutorialNextBtn');
const tutorialSkipBtn = $('tutorialSkipBtn');

let draggedElement = null, draggedColor = null, ghostElement = null;
let audioContext = null;
let confettiParticles = [];

// ============================================
// AUDIO
// ============================================
function initAudio() { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); }

function playSound(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain); gain.connect(audioContext.destination);

        if (type === 'plop') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.15);
            gain.gain.setValueAtTime(0.12, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            osc.start(); osc.stop(audioContext.currentTime + 0.2);
        } else if (type === 'chime') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523, audioContext.currentTime);
            osc.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            osc.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            osc.start(); osc.stop(audioContext.currentTime + 0.5);
        } else if (type === 'commit') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, audioContext.currentTime);
            osc.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
            osc.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            osc.start(); osc.stop(audioContext.currentTime + 0.4);
        }
    } catch (e) { }
}

// ============================================
// COLOR UTILITIES
// ============================================
const rgb = c => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
const blend = (c1, c2, w = 0.5) => [c1[0] * (1 - w) + c2[0] * w, c1[1] * (1 - w) + c2[1] * w, c1[2] * (1 - w) + c2[2] * w];

// ============================================
// CIE LAB COLOR SPACE (Perceptual Matching)
// ============================================
function rgbToLab(rgb) {
    // RGB to XYZ
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
    let y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750);
    let z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) / 1.08883;

    // XYZ to Lab
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}

function deltaE(rgb1, rgb2) {
    // CIEDE2000 - Industry standard perceptual color difference
    const lab1 = rgbToLab(rgb1);
    const lab2 = rgbToLab(rgb2);

    const L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    const L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];

    // Weighting factors (standard values)
    const kL = 1, kC = 1, kH = 1;

    // Calculate C1, C2 (chroma)
    const C1 = Math.sqrt(a1 * a1 + b1 * b1);
    const C2 = Math.sqrt(a2 * a2 + b2 * b2);
    const Cbar = (C1 + C2) / 2;

    // Calculate a' (adjusted a)
    const Cbar7 = Math.pow(Cbar, 7);
    const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + Math.pow(25, 7))));
    const a1p = a1 * (1 + G);
    const a2p = a2 * (1 + G);

    // Calculate C' and h'
    const C1p = Math.sqrt(a1p * a1p + b1 * b1);
    const C2p = Math.sqrt(a2p * a2p + b2 * b2);

    const h1p = Math.atan2(b1, a1p) * 180 / Math.PI;
    const h2p = Math.atan2(b2, a2p) * 180 / Math.PI;
    const h1pAdj = h1p < 0 ? h1p + 360 : h1p;
    const h2pAdj = h2p < 0 ? h2p + 360 : h2p;

    // Calculate deltas
    const dLp = L2 - L1;
    const dCp = C2p - C1p;

    let dhp;
    if (C1p * C2p === 0) {
        dhp = 0;
    } else if (Math.abs(h2pAdj - h1pAdj) <= 180) {
        dhp = h2pAdj - h1pAdj;
    } else if (h2pAdj - h1pAdj > 180) {
        dhp = h2pAdj - h1pAdj - 360;
    } else {
        dhp = h2pAdj - h1pAdj + 360;
    }

    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(dhp * Math.PI / 360);

    // Calculate weighted averages
    const Lbarp = (L1 + L2) / 2;
    const Cbarp = (C1p + C2p) / 2;

    let hbarp;
    if (C1p * C2p === 0) {
        hbarp = h1pAdj + h2pAdj;
    } else if (Math.abs(h1pAdj - h2pAdj) <= 180) {
        hbarp = (h1pAdj + h2pAdj) / 2;
    } else if (h1pAdj + h2pAdj < 360) {
        hbarp = (h1pAdj + h2pAdj + 360) / 2;
    } else {
        hbarp = (h1pAdj + h2pAdj - 360) / 2;
    }

    // Calculate T
    const T = 1 - 0.17 * Math.cos((hbarp - 30) * Math.PI / 180)
        + 0.24 * Math.cos(2 * hbarp * Math.PI / 180)
        + 0.32 * Math.cos((3 * hbarp + 6) * Math.PI / 180)
        - 0.20 * Math.cos((4 * hbarp - 63) * Math.PI / 180);

    // Calculate SL, SC, SH
    const Lbarp50sq = Math.pow(Lbarp - 50, 2);
    const SL = 1 + (0.015 * Lbarp50sq) / Math.sqrt(20 + Lbarp50sq);
    const SC = 1 + 0.045 * Cbarp;
    const SH = 1 + 0.015 * Cbarp * T;

    // Calculate RT (rotation)
    const dtheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
    const Cbarp7 = Math.pow(Cbarp, 7);
    const RC = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + Math.pow(25, 7)));
    const RT = -Math.sin(2 * dtheta * Math.PI / 180) * RC;

    // Final calculation
    const dE = Math.sqrt(
        Math.pow(dLp / (kL * SL), 2) +
        Math.pow(dCp / (kC * SC), 2) +
        Math.pow(dHp / (kH * SH), 2) +
        RT * (dCp / (kC * SC)) * (dHp / (kH * SH))
    );

    return dE;
}

// CIEDE2000: 0 = perfect match, ~1 = just noticeable, ~2.3 = clearly different
// We scale: dE < 1 = 100%, dE 30+ = 0%
const matchPct = (c1, c2) => {
    const de = deltaE(c1, c2);
    // Scale: deltaE 0 = 100%, deltaE 30+ = 0%
    let pct = Math.round(Math.max(0, Math.min(100, 100 - (de * 100 / 30))));
    // Round 99% up to 100% to handle floating-point precision in solution paths
    if (pct >= 99) pct = 100;
    return pct;
};

function getTier(pct) {
    if (pct >= TIERS.perfect.min) return TIERS.perfect;
    if (pct >= TIERS.professional.min) return TIERS.professional;
    if (pct >= TIERS.good.min) return TIERS.good;
    return TIERS.training;
}

// ============================================
// PUZZLE SOLVER (BFS to find optimal solution)
// ============================================
/**
 * Solves a puzzle using BFS to find the shortest sequence of mixes
 * that achieves the target color (or best possible match within maxMixes).
 * @param {Object} puzzle - The puzzle object with target and sources
 * @param {number} maxMixes - Maximum number of mixes to try (default: puzzle.mixLimit)
 * @returns {Object} { path: [[r,g,b], ...], sourceIndices: [0,1,2...], bestMatch: 98 }
 */
function solvePuzzle(puzzle, maxMixes = null) {
    const target = puzzle.target;
    const sources = puzzle.sources;
    const limit = maxMixes || puzzle.mixLimit || 5;
    const startColor = [128, 128, 128];

    // State: { color: [r,g,b], path: [[r,g,b],...], sourceIndices: [idx,...] }
    let queue = [{ color: startColor, path: [startColor], sourceIndices: [] }];
    let bestSolution = { path: [startColor], sourceIndices: [], bestMatch: matchPct(startColor, target) };

    // Track visited states to avoid loops (round colors to reduce state space)
    const colorKey = c => `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`;
    const visited = new Set([colorKey(startColor)]);

    while (queue.length > 0) {
        const current = queue.shift();

        // Check if we found a perfect match
        const currentMatch = matchPct(current.color, target);
        if (currentMatch > bestSolution.bestMatch) {
            bestSolution = {
                path: current.path,
                sourceIndices: current.sourceIndices,
                bestMatch: currentMatch
            };
        }

        // If perfect match found, return immediately
        if (currentMatch >= 100) {
            return bestSolution;
        }

        // Stop if we've reached the mix limit
        if (current.sourceIndices.length >= limit) {
            continue;
        }

        // Try mixing with each source color
        for (let i = 0; i < sources.length; i++) {
            const newColor = blend(current.color, sources[i], 0.5);
            const key = colorKey(newColor);

            if (!visited.has(key)) {
                visited.add(key);
                queue.push({
                    color: newColor,
                    path: [...current.path, newColor],
                    sourceIndices: [...current.sourceIndices, i]
                });
            }
        }
    }

    return bestSolution;
}

// Cache for computed solutions (computed on demand)
const solutionCache = {};

/**
 * Get cached solution or compute it
 */
function getPuzzleSolution(puzzleIndex) {
    if (!solutionCache[puzzleIndex]) {
        const puzzle = PUZZLES[puzzleIndex];
        // Allow extra mixes beyond limit to find better solution for learning
        solutionCache[puzzleIndex] = solvePuzzle(puzzle, Math.max(puzzle.mixLimit, 6));
    }
    return solutionCache[puzzleIndex];
}

function getSessionTitle() {
    for (const t of SESSION_TITLES) if (sessionStats.perfectCount >= t.perfectCount) return t.title;
    return SESSION_TITLES[SESSION_TITLES.length - 1].title;
}

// ============================================
// SESSION PERSISTENCE
// ============================================
function loadSession() {
    try {
        const saved = localStorage.getItem('huequest-session');
        if (saved) sessionStats = JSON.parse(saved);
    } catch (e) { }
}

function saveSession() {
    try { localStorage.setItem('huequest-session', JSON.stringify(sessionStats)); } catch (e) { }
}

function updateSessionBanner() {
    sessionTitle.textContent = getSessionTitle();
    sessionStatsEl.textContent = `${sessionStats.perfectCount} Perfect Match${sessionStats.perfectCount !== 1 ? 'es' : ''}`;
}

// ============================================
// STREAK SYSTEM
// ============================================
function loadStreak() {
    try {
        const saved = localStorage.getItem('huequest-streak');
        if (saved) streakData = JSON.parse(saved);
        // Ensure maxStreak exists for backwards compatibility
        if (typeof streakData.maxStreak === 'undefined') {
            streakData.maxStreak = streakData.count;
        }
    } catch (e) { }
}

function saveStreak() {
    try { localStorage.setItem('huequest-streak', JSON.stringify(streakData)); } catch (e) { }
}

function updateStreak() {
    const today = getTodayKey(); // Use Eastern time key
    if (streakData.lastPlayDate === today) {
        // Already played today, no change
    } else {
        const eastern = getEasternDate();
        eastern.setDate(eastern.getDate() - 1);
        const yesterday = `${eastern.getFullYear()}-${eastern.getMonth() + 1}-${eastern.getDate()}`;

        if (streakData.lastPlayDate === yesterday) {
            // Consecutive day!
            streakData.count++;
        } else if (streakData.lastPlayDate !== null) {
            // Streak broken
            streakData.count = 1;
        } else {
            // First ever play
            streakData.count = 1;
        }

        // Update max streak
        if (streakData.count > streakData.maxStreak) {
            streakData.maxStreak = streakData.count;
        }

        streakData.lastPlayDate = today;
        saveStreak();
    }
    updateStreakDisplay();
}

function updateStreakDisplay() {
    if (streakCount) streakCount.textContent = streakData.count;
    if (streakBadge) {
        streakBadge.classList.toggle('inactive', streakData.count === 0);
    }
}

// ============================================
// PLAYER STATS (Enhanced)
// ============================================
function loadPlayerStats() {
    try {
        const saved = localStorage.getItem('huequest-player-stats');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge with defaults for backwards compatibility
            playerStats = { ...playerStats, ...parsed };
        }
    } catch (e) { }
}

function savePlayerStats() {
    try { localStorage.setItem('huequest-player-stats', JSON.stringify(playerStats)); } catch (e) { }
}

function updatePlayerStats(puzzleNumber, score, tier, mixesUsed, mixLimit) {
    playerStats.totalPuzzlesPlayed++;
    playerStats.matchSum += score;

    // Best match
    if (score > playerStats.bestMatch) {
        playerStats.bestMatch = score;
    }

    // Tier counts
    playerStats.tierCounts[tier.class]++;

    // Best efficiency (lowest mixes for highest score)
    const efficiency = score / mixesUsed;
    if (!playerStats.bestEfficiency || efficiency > (playerStats.bestEfficiency.score / playerStats.bestEfficiency.mixesUsed)) {
        playerStats.bestEfficiency = { puzzleNumber, mixesUsed, mixLimit, score };
    }

    // Completed puzzles
    playerStats.completedPuzzles[puzzleNumber] = {
        score,
        tier: tier.class,
        mixes: mixesUsed,
        mixLimit,
        date: getTodayKey()
    };

    savePlayerStats();
}

function getAverageMatch() {
    if (playerStats.totalPuzzlesPlayed === 0) return 0;
    return Math.round(playerStats.matchSum / playerStats.totalPuzzlesPlayed);
}

function getEfficiencyDisplay() {
    if (!playerStats.bestEfficiency) return '--';
    const { mixesUsed, mixLimit, score } = playerStats.bestEfficiency;
    return `${mixesUsed}/${mixLimit} (${score}%)`;
}

// ============================================
// PERSONAL BESTS (NEW)
// ============================================
function loadPersonalBests() {
    try {
        const saved = localStorage.getItem('huequest-pbs');
        if (saved) personalBests = JSON.parse(saved);
    } catch (e) { }
}

function savePersonalBests() {
    try { localStorage.setItem('huequest-pbs', JSON.stringify(personalBests)); } catch (e) { }
}

function getPersonalBest(puzzleIndex) {
    return personalBests[puzzleIndex] || null;
}

function updatePersonalBest(puzzleIndex, score) {
    const current = getPersonalBest(puzzleIndex);
    const isNewPB = current === null || score > current;
    if (isNewPB) {
        personalBests[puzzleIndex] = score;
        savePersonalBests();
    }
    return isNewPB;
}

function updatePBDisplay(puzzleIndex, newPB = false) {
    if (!pbBadge) return;
    const pb = getPersonalBest(puzzleIndex);
    const pbValue = document.getElementById('pbValue');
    if (pb !== null) {
        if (pbValue) pbValue.textContent = `${pb}%`;
        pbBadge.classList.toggle('new-pb', newPB);
    } else {
        if (pbValue) pbValue.textContent = '--';
        pbBadge.classList.remove('new-pb');
    }
}

// ============================================
// DAILY COMPLETION TRACKING
// ============================================
function loadDailyCompleted() {
    try {
        const saved = localStorage.getItem('huequest-daily-completed');
        if (saved) dailyCompleted = JSON.parse(saved);
    } catch (e) { }
}

function saveDailyCompleted() {
    try { localStorage.setItem('huequest-daily-completed', JSON.stringify(dailyCompleted)); } catch (e) { }
}

function isDailyCompleted() {
    return dailyCompleted[getTodayKey()] === true;
}

function markDailyCompleted() {
    dailyCompleted[getTodayKey()] = true;
    saveDailyCompleted();
}

function updateCountdown() {
    const ms = getNextPuzzleTime();
    if (countdownBadge) {
        countdownBadge.innerHTML = `${typeof getIcon === 'function' ? getIcon('clock') : ''} ${formatCountdown(ms)}`;
    }
    if (nextPuzzleTime) {
        nextPuzzleTime.textContent = formatCountdown(ms);
    }
}

function startCountdownTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function showDailyCompleteBanner() {
    if (dailyCompleteBanner) {
        dailyCompleteBanner.classList.add('show');
        startCountdownTimer();
    }
}

function hideDailyCompleteBanner() {
    if (dailyCompleteBanner) {
        dailyCompleteBanner.classList.remove('show');
    }
}

// ============================================
// ONBOARDING TUTORIAL SYSTEM
// ============================================
let currentTutorialStep = 0;
const TUTORIAL_STEPS = [
    {
        title: "Welcome to HueQuest! 🎨",
        text: "Match the target color by mixing source colors. Each day brings a new puzzle!",
        highlight: null
    },
    {
        title: "Drag to Mix",
        text: "Drag any color blob onto your mix swatch to blend colors together.",
        highlight: "sourceColors"
    },
    {
        title: "Limited Mixes ⚡",
        text: "You have a limited number of mixes per puzzle. Use them wisely to get the best match!",
        highlight: "mixCounter"
    },
    {
        title: "Made a Mistake?",
        text: "No worries! Use the Undo button to go back and try a different color.",
        highlight: "undoBtn"
    },
    {
        title: "Beat Your Best 🏆",
        text: "Your personal best is tracked for each puzzle. Can you improve your score?",
        highlight: "pbBadge"
    },
    {
        title: "Commit Your Result",
        text: "When you're happy with your mix, commit it to lock in your score. You can keep experimenting in sandbox mode!",
        highlight: "commitBtn"
    }
];

function loadTutorialState() {
    try {
        tutorialComplete = localStorage.getItem('huequest-tutorial') === 'true';
    } catch (e) { }
}

function saveTutorialComplete() {
    try { localStorage.setItem('huequest-tutorial', 'true'); } catch (e) { }
    tutorialComplete = true;
}

function showTutorial() {
    if (tutorialComplete || !tutorialOverlay) return;
    currentTutorialStep = 0;
    updateTutorialStep();
    tutorialOverlay.classList.add('show');
    analytics.track('onboarding', 'tutorial_start');
}

function updateTutorialStep() {
    const step = TUTORIAL_STEPS[currentTutorialStep];
    const stepEl = tutorialOverlay?.querySelector('.tutorial-content');
    if (stepEl) {
        stepEl.innerHTML = `
            <h3 class="tutorial-title">${step.title}</h3>
            <p class="tutorial-text">${step.text}</p>
        `;
    }

    // Update progress dots
    const dots = tutorialOverlay?.querySelectorAll('.tutorial-dot');
    dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTutorialStep);
    });

    // Update button text
    if (tutorialNextBtn) {
        tutorialNextBtn.textContent = currentTutorialStep === TUTORIAL_STEPS.length - 1 ? "Let's Play!" : "Next";
    }

    // Highlight element if specified
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    if (step.highlight) {
        const highlightEl = document.getElementById(step.highlight);
        if (highlightEl) highlightEl.classList.add('tutorial-highlight');
    }
}

function nextTutorialStep() {
    currentTutorialStep++;
    if (currentTutorialStep >= TUTORIAL_STEPS.length) {
        completeTutorial();
    } else {
        updateTutorialStep();
    }
}

function completeTutorial() {
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('show');
    }
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    saveTutorialComplete();
    analytics.track('onboarding', 'tutorial_complete', null, currentTutorialStep + 1);
}

function skipTutorial() {
    completeTutorial();
    analytics.track('onboarding', 'tutorial_skip', null, currentTutorialStep);
}

// ============================================
// COLOR HINTS (Actionable System - Premium Feature)
// ============================================
let highlightedBlobIndex = -1;

// Get a list of color names for friendly hint messages
function getColorName(rgb) {
    const colorNames = [
        { name: 'red', rgb: [255, 0, 0] },
        { name: 'orange', rgb: [255, 165, 0] },
        { name: 'yellow', rgb: [255, 255, 0] },
        { name: 'green', rgb: [0, 255, 0] },
        { name: 'dark green', rgb: [0, 128, 0] },
        { name: 'cyan', rgb: [0, 255, 255] },
        { name: 'teal', rgb: [0, 128, 128] },
        { name: 'blue', rgb: [0, 0, 255] },
        { name: 'purple', rgb: [128, 0, 128] },
        { name: 'magenta', rgb: [255, 0, 255] },
        { name: 'pink', rgb: [255, 192, 203] },
        { name: 'white', rgb: [255, 255, 255] },
        { name: 'black', rgb: [0, 0, 0] },
        { name: 'gray', rgb: [128, 128, 128] },
        { name: 'brown', rgb: [139, 69, 19] },
        { name: 'gold', rgb: [255, 215, 0] },
        { name: 'lime', rgb: [144, 238, 144] },
        { name: 'coral', rgb: [255, 127, 80] },
        { name: 'salmon', rgb: [250, 128, 114] },
        { name: 'navy', rgb: [0, 0, 128] },
        { name: 'indigo', rgb: [75, 0, 130] },
        { name: 'violet', rgb: [238, 130, 238] },
        { name: 'lavender', rgb: [230, 230, 250] },
        { name: 'turquoise', rgb: [64, 224, 208] },
        { name: 'aquamarine', rgb: [127, 255, 212] },
    ];

    let closestName = 'this color';
    let closestDist = Infinity;

    for (const c of colorNames) {
        const dist = Math.sqrt(
            Math.pow(rgb[0] - c.rgb[0], 2) +
            Math.pow(rgb[1] - c.rgb[1], 2) +
            Math.pow(rgb[2] - c.rgb[2], 2)
        );
        if (dist < closestDist) {
            closestDist = dist;
            closestName = c.name;
        }
    }

    return closestName;
}

// Clear any highlighted source blobs
function clearHintHighlight() {
    if (highlightedBlobIndex >= 0) {
        const blobs = sourceColors.querySelectorAll('.source-blob');
        blobs.forEach(blob => blob.classList.remove('hint-recommended'));
        highlightedBlobIndex = -1;
    }
}

// Find the best action: which source to add, or whether to undo
function findBestHintAction(current, target, sources, previousColor) {
    const currentDeltaE = deltaE(current, target);

    // If we're very close, just say so
    if (currentDeltaE < 3) {
        return { action: 'close', text: "You're almost perfect! 🎯", blobIndex: -1 };
    }

    // Evaluate each source color
    let bestSourceIndex = -1;
    let bestSourceDeltaE = currentDeltaE;

    sources.forEach((sourceColor, index) => {
        const blendedColor = blend(current, sourceColor);
        const newDeltaE = deltaE(blendedColor, target);

        if (newDeltaE < bestSourceDeltaE) {
            bestSourceDeltaE = newDeltaE;
            bestSourceIndex = index;
        }
    });

    // Check if undoing would be better (if we have history)
    let undoDeltaE = Infinity;
    if (previousColor) {
        undoDeltaE = deltaE(previousColor, target);
    }

    // Determine best action
    if (previousColor && undoDeltaE < currentDeltaE && undoDeltaE <= bestSourceDeltaE) {
        // Undo is the best option
        return {
            action: 'undo',
            text: "Your last mix moved away from the target — try undoing! ↩️",
            blobIndex: -1
        };
    } else if (bestSourceIndex >= 0 && bestSourceDeltaE < currentDeltaE) {
        // Found a helpful source color
        const colorName = getColorName(sources[bestSourceIndex]);
        return {
            action: 'add',
            text: `Try adding the ${colorName}! 💡`,
            blobIndex: bestSourceIndex
        };
    } else {
        // No good option found - stuck
        if (previousColor) {
            return {
                action: 'undo',
                text: "You may have overshot — try undoing and taking a different path! 🔄",
                blobIndex: -1
            };
        } else {
            // First mix, just suggest the best available
            if (bestSourceIndex >= 0) {
                const colorName = getColorName(sources[bestSourceIndex]);
                return {
                    action: 'add',
                    text: `Start with the ${colorName}! 💡`,
                    blobIndex: bestSourceIndex
                };
            }
            return {
                action: 'stuck',
                text: "Hmm, this is tricky! Try experimenting. 🤔",
                blobIndex: -1
            };
        }
    }
}

function useHint() {
    if (hintsRemaining <= 0 || isCommitted) return;

    const puzzle = PUZZLES[currentPuzzleIndex];

    // Get previous color from history (if any)
    const previousColor = mixHistory.length > 0 ? mixHistory[mixHistory.length - 1] : null;

    // Find the best action
    const hintResult = findBestHintAction(
        currentColor,
        puzzle.target,
        puzzle.sources,
        previousColor
    );

    hintsRemaining--;
    updateHintUI();

    // Clear any previous highlight
    clearHintHighlight();

    // Show the hint text
    if (hintDisplay) {
        hintDisplay.textContent = hintResult.text;
        hintDisplay.className = 'hint-display show ' +
            (hintResult.action === 'undo' ? 'warm' :
                hintResult.action === 'close' ? 'neutral' : 'cool');
    }

    // Highlight the recommended source blob
    if (hintResult.blobIndex >= 0) {
        const blobs = sourceColors.querySelectorAll('.source-blob');
        if (blobs[hintResult.blobIndex]) {
            blobs[hintResult.blobIndex].classList.add('hint-recommended');
            highlightedBlobIndex = hintResult.blobIndex;
        }
    }

    analytics.track('gameplay', 'hint_used', puzzle.name, hintsRemaining);
}

function updateHintUI() {
    if (hintBtn) {
        hintBtn.disabled = hintsRemaining <= 0 || isCommitted;
    }
    if (hintCount) {
        hintCount.textContent = `(${hintsRemaining})`;
    }
}

function resetHints() {
    hintsRemaining = 1;
    clearHintHighlight();
    if (hintDisplay) {
        hintDisplay.className = 'hint-display';
        hintDisplay.textContent = '';
    }
    updateHintUI();
}

// ============================================
// CONFETTI CELEBRATION (NEW)
// ============================================
function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function createConfetti() {
    confettiParticles = [];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#5f27cd', '#00d2d3'];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: -20 - Math.random() * 200,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 3 + Math.random() * 4,
            speedX: -2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotationSpeed: -5 + Math.random() * 10
        });
    }
}

function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) return;

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = false;
    confettiParticles.forEach(p => {
        if (p.y < window.innerHeight + 50) {
            active = true;
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.speedY += 0.1; // gravity

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.rotation * Math.PI / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            confettiCtx.restore();
        }
    });

    if (active) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles = [];
    }
}

function triggerCelebration() {
    // Flash effect
    document.querySelector('.game-container')?.classList.add('celebration-flash');
    setTimeout(() => {
        document.querySelector('.game-container')?.classList.remove('celebration-flash');
    }, 500);

    // Confetti burst
    resizeConfettiCanvas();
    createConfetti();
    animateConfetti();

    // Special celebration sound
    playSound('celebrate');
}

// Add celebrate sound to playSound
const originalPlaySound = playSound;
playSound = function (type) {
    if (type === 'celebrate') {
        if (!soundEnabled) return;
        try {
            initAudio();
            // Play a triumphant arpeggio
            const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
                gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
            });
        } catch (e) { }
    } else {
        originalPlaySound.call(this, type);
    }
};


// ============================================
// UI UPDATES
// ============================================
function updateUI() {
    const puzzle = PUZZLES[currentPuzzleIndex];
    const pct = matchPct(currentColor, puzzle.target);

    // Match display - HIDDEN until committed to add strategic risk
    if (isCommitted || isSandboxMode) {
        matchValue.textContent = pct + '%';
        matchValue.className = 'match-value' + (pct >= 80 ? ' high' : pct >= 50 ? ' medium' : '');
    } else {
        matchValue.textContent = '??%';
        matchValue.className = 'match-value hidden';
    }

    // Difference ring - still provides visual hint without exact %
    differenceRing.className = 'difference-ring' + (pct >= 80 ? ' close' : pct >= 50 ? ' medium' : '');

    // Mix counter
    mixCounter.textContent = `${mixCount} / ${puzzle.mixLimit} mixes`;
    mixCounter.className = 'mix-counter' + (mixCount >= puzzle.mixLimit ? ' at-limit' : '');

    // Buttons
    undoBtn.disabled = mixHistory.length === 0;
    commitBtn.disabled = isCommitted;
    const lockIcon = typeof getIcon === 'function' ? getIcon('lock') : '';
    const checkIcon = typeof getIcon === 'function' ? getIcon('check') : '';
    commitBtn.innerHTML = isCommitted ? `<span class="btn-icon">${lockIcon}</span> Locked In!` : `<span class="btn-icon">${checkIcon}</span> Lock It In!`;

    // Highlight commit button when player has made at least one mix
    const shouldHighlight = !isCommitted && mixCount > 0;
    commitBtn.classList.toggle('highlight', shouldHighlight);

    // Nav
    prevBtn.disabled = currentPuzzleIndex === 0;
    nextBtn.disabled = currentPuzzleIndex === PUZZLES.length - 1;

    // Update color hint
    updateHintUI();

}

function updateHistoryStrip() {
    const existing = historyStrip.querySelectorAll('.history-square:not(.start-square), .history-arrow');
    existing.forEach(el => el.remove());

    colorHistory.slice(1).forEach((c, i) => {
        const arrow = document.createElement('span');
        arrow.className = 'history-arrow'; arrow.textContent = '→';
        historyStrip.appendChild(arrow);
        const sq = document.createElement('div');
        sq.className = 'history-square'; sq.style.backgroundColor = rgb(c);
        historyStrip.appendChild(sq);
    });
}

// ============================================
// PUZZLE LOADING
// ============================================
function loadPuzzle(index) {
    currentPuzzleIndex = index;
    const puzzle = PUZZLES[index];

    // Reset state
    currentColor = [128, 128, 128];
    mixHistory = [];
    colorHistory = [[128, 128, 128]];
    mixCount = 0;
    isCommitted = false;
    isSandboxMode = false;
    officialResult = null;
    resetHints(); // Reset hint state for new puzzle
    cleanupDragState(); // Remove any stale ghost elements

    // UI - Use daily puzzle number if loading today's puzzle
    const dailyIndex = getDailyPuzzleIndex();
    const isDaily = index === dailyIndex;
    const puzzleNum = isDaily ? getDailyPuzzleNumber() : index + 1;
    puzzleLabel.textContent = `Puzzle #${puzzleNum}`;
    difficultyBadge.textContent = puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);
    difficultyBadge.className = 'difficulty-badge ' + puzzle.difficulty;

    targetSwatch.style.backgroundColor = rgb(puzzle.target);
    mixSwatch.style.backgroundColor = rgb(currentColor);
    startSquare.style.backgroundColor = rgb(currentColor);

    officialResultEl.classList.remove('show');
    sandboxNotice.classList.remove('show');
    hideDailyCompleteBanner();

    // Reset solution display (clear previous puzzle's solution)
    const solutionDisplay = document.getElementById('solutionDisplay');
    if (solutionDisplay) solutionDisplay.style.display = 'none';

    // Source blobs
    sourceColors.innerHTML = puzzle.sources.map((c, i) =>
        `<div class="source-blob" data-color="${c.join(',')}" style="background-color:${rgb(c)}"></div>`
    ).join('');
    sourceColors.querySelectorAll('.source-blob').forEach(setupBlob);

    updateHistoryStrip();
    updateUI();

    // Show personal best for this puzzle
    updatePBDisplay(index, false);

    // Reset hint
    if (hintBadge) hintBadge.className = 'hint-badge';

    // Track puzzle start
    analytics.track('gameplay', 'puzzle_start', puzzle.name, puzzleNum);
}

// ============================================
// DRAG & DROP
// ============================================
function setupBlob(blob) {
    const color = blob.dataset.color.split(',').map(Number);
    blob.addEventListener('mouseenter', () => { if (!draggedElement) showPreview(color); });
    blob.addEventListener('mouseleave', () => { if (!draggedElement) hidePreview(); });
    blob.addEventListener('mousedown', startDrag);
    blob.addEventListener('touchstart', startDrag, { passive: false });
}

function showPreview(c) {
    if (mixCount >= PUZZLES[currentPuzzleIndex].mixLimit && !isSandboxMode) return;
    mixSwatch.style.backgroundColor = rgb(blend(currentColor, c));
}

function hidePreview() { mixSwatch.style.backgroundColor = rgb(currentColor); }

function startDrag(e) {
    e.preventDefault(); initAudio();
    const puzzle = PUZZLES[currentPuzzleIndex];
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) return;

    draggedElement = e.target;
    draggedColor = e.target.dataset.color.split(',').map(Number);
    hidePreview();

    ghostElement = document.createElement('div');
    ghostElement.className = 'drag-ghost';
    ghostElement.style.backgroundColor = rgb(draggedColor);
    document.body.appendChild(ghostElement);

    const pos = getPos(e);
    ghostElement.style.left = pos.x + 'px'; ghostElement.style.top = pos.y + 'px';
    draggedElement.classList.add('dragging');

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag); // Handle interrupted touches
}

function onDrag(e) {
    if (!ghostElement) return;
    e.preventDefault();
    const pos = getPos(e);
    ghostElement.style.left = pos.x + 'px'; ghostElement.style.top = pos.y + 'px';

    const rect = mixSwatch.getBoundingClientRect();
    const over = pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom;
    if (over && draggedColor) showPreview(draggedColor); else hidePreview();
}

function endDrag(e) {
    if (!draggedElement) return;
    const pos = getPos(e);
    const rect = mixSwatch.getBoundingClientRect();
    const over = pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom;

    if (over && draggedColor) applyMix(draggedColor);

    draggedElement.classList.remove('dragging');
    hidePreview();
    if (ghostElement) { ghostElement.remove(); ghostElement = null; }
    draggedElement = null; draggedColor = null;

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
    document.removeEventListener('touchcancel', endDrag);
}

// Cleanup any stale ghosts (safety net)
function cleanupDragState() {
    if (ghostElement) { ghostElement.remove(); ghostElement = null; }
    if (draggedElement) { draggedElement.classList.remove('dragging'); draggedElement = null; }
    draggedColor = null;
    hidePreview();
    document.querySelectorAll('.drag-ghost').forEach(el => el.remove());
}

function getPos(e) {
    if (e.touches?.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches?.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
}

// ============================================
// MIXING
// ============================================
function applyMix(newColor) {
    const puzzle = PUZZLES[currentPuzzleIndex];
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) return;

    // Clear any hint highlight when mixing
    clearHintHighlight();

    mixHistory.push([...currentColor]);
    currentColor = blend(currentColor, newColor);
    mixCount++;
    colorHistory.push([...currentColor]);

    playSound('plop');

    // Animations
    swirlEffect.style.backgroundColor = rgb(newColor);
    swirlEffect.classList.remove('active');
    void swirlEffect.offsetWidth;
    swirlEffect.classList.add('active');

    mixSwatch.style.backgroundColor = rgb(currentColor);
    mixSwatch.classList.add('pulse');
    setTimeout(() => mixSwatch.classList.remove('pulse'), 400);

    updateHistoryStrip();
    updateUI();

    // Sound feedback removed - committing should be a risk without knowing match quality

    // Disable blobs at limit (if not sandbox)
    if (mixCount >= puzzle.mixLimit && !isSandboxMode) {
        sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.add('disabled'));
    }
}

function undoMix() {
    if (mixHistory.length === 0) return;

    // Clear any hint highlight when undoing
    clearHintHighlight();

    currentColor = mixHistory.pop();
    colorHistory.pop();
    mixCount--;

    mixSwatch.style.backgroundColor = rgb(currentColor);
    mixSwatch.classList.add('pulse');
    setTimeout(() => mixSwatch.classList.remove('pulse'), 400);

    // Re-enable blobs
    sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.remove('disabled'));

    updateHistoryStrip();
    updateUI();
}

// ============================================
// COMMIT & RESULTS
// ============================================
function commitResult() {
    if (isCommitted) return;

    const puzzle = PUZZLES[currentPuzzleIndex];
    const pct = matchPct(currentColor, puzzle.target);
    const tier = getTier(pct);

    isCommitted = true;
    officialResult = { pct, tier, mixCount, color: [...currentColor] };

    // Update session stats
    sessionStats.puzzlesPlayed++;
    if (pct >= TIERS.perfect.min) sessionStats.perfectCount++;
    if (!sessionStats.bestTier || pct > sessionStats.bestTier) sessionStats.bestTier = pct;
    saveSession();
    updateSessionBanner();

    // Check and update personal best
    const isNewPB = updatePersonalBest(currentPuzzleIndex, pct);
    officialResult.isNewPB = isNewPB;

    // Update streak on commit (first commit of the day counts)
    updateStreak();

    // Mark daily puzzle as complete if this is today's puzzle
    const dailyIndex = getDailyPuzzleIndex();
    if (currentPuzzleIndex === dailyIndex) {
        markDailyCompleted();
    }

    playSound('commit');

    // Trigger celebration for perfect matches!
    if (pct >= TIERS.perfect.min) {
        setTimeout(() => triggerCelebration(), 300);
    }

    // Track puzzle completion
    analytics.track('gameplay', 'puzzle_complete', tier.name, pct);

    // Update enhanced player stats
    const puzzleNumber = getPuzzleNumberForIndex(currentPuzzleIndex);
    updatePlayerStats(puzzleNumber, pct, tier, mixCount, puzzle.mixLimit);

    showResultsModal();
}

function showResultsModal() {
    const puzzle = PUZZLES[currentPuzzleIndex];
    const { pct, tier, mixCount: mc } = officialResult;

    // Use cozy title system instead of tier names
    const cozyTitle = getCozyTitle(pct);
    // Set celebration icon based on tier
    const iconMap = { perfect: 'sparkle', professional: 'palette', good: 'thumbsUp', training: 'muscle' };
    resultCelebration.innerHTML = typeof getIcon === 'function' ? getIcon(iconMap[tier.class] || 'palette', 'hq-icon tier-icon') : tier.icon;
    resultTierDisplay.textContent = cozyTitle;
    resultTierDisplay.className = 'result-tier-display ' + tier.class;
    resultPercent.textContent = pct + '%';
    resultYourMix.style.backgroundColor = rgb(officialResult.color);
    resultTargetColor.style.backgroundColor = rgb(puzzle.target);

    // Efficiency
    const hasBonus = mc < puzzle.mixLimit;
    resultEfficiencyDisplay.className = 'result-efficiency-display' + (hasBonus ? ' bonus' : '');
    resultEfficiencyText.textContent = hasBonus
        ? `Efficiency bonus! Solved in ${mc}/${puzzle.mixLimit} mixes`
        : `Used ${mc}/${puzzle.mixLimit} mixes`;

    // History
    resultHistory.innerHTML = colorHistory.map((c, i) =>
        `<div class="history-square" style="background-color:${rgb(c)}"></div>` +
        (i < colorHistory.length - 1 ? '<span class="history-arrow">→</span>' : '')
    ).join('');

    // Show NEW PB indicator if applicable
    const newPBIndicator = $('newPBIndicator');
    if (newPBIndicator) {
        newPBIndicator.classList.toggle('show', officialResult.isNewPB === true);
    }

    // Update the PB badge in header
    if (officialResult.isNewPB) {
        updatePBDisplay(currentPuzzleIndex, true);
    }

    resultsOverlay.classList.add('show');
}

function enterSandbox() {
    resultsOverlay.classList.remove('show');
    isSandboxMode = true;

    // Show official result banner
    const { pct, tier, mixCount: mc } = officialResult;
    const puzzle = PUZZLES[currentPuzzleIndex];
    officialTier.textContent = tier.name;
    officialScore.textContent = pct + '%';
    officialEfficiency.textContent = `Used ${mc}/${puzzle.mixLimit} mixes`;
    officialResultEl.classList.add('show');
    sandboxNotice.classList.add('show');

    // Re-enable blobs for sandbox
    sourceColors.querySelectorAll('.source-blob').forEach(b => b.classList.remove('disabled'));

    updateUI();
}

function goNextPuzzle() {
    resultsOverlay.classList.remove('show');
    if (currentPuzzleIndex < PUZZLES.length - 1) {
        loadPuzzle(currentPuzzleIndex + 1);
    } else {
        loadPuzzle(0);
    }
}

// ============================================
// INIT
// ============================================
function initializeIcons() {
    // Only run if icons.js is loaded
    if (typeof getIcon !== 'function') {
        console.warn('icons.js not loaded, using fallback emojis');
        return;
    }

    const iconMappings = [
        // Header icons
        ['pbIcon', 'trophy'],
        ['streakIcon', 'flame'],
        ['soundOnIcon', 'soundOn'],
        ['soundOffIcon', 'soundOff'],
        ['resetIcon', 'refresh'],

        // Action bar icons
        ['undoIcon', 'undo'],
        ['statsIcon', 'chart'],
        ['commitIcon', 'check'],

        // Navigation icons
        ['prevIcon', 'chevronLeft'],
        ['archiveIcon', 'archive'],
        ['randomIcon', 'dice'],
        ['nextIcon', 'chevronRight'],

        // Sandbox & Results
        ['sandboxIcon', 'flask'],
        ['sandboxBtnIcon', 'flask'],
        ['newPBIcon', 'trophy'],
        ['efficiencyIcon', 'bolt'],
        ['shareIcon', 'share'],
        ['copyIcon', 'clipboard'],
        ['solutionIcon', 'lightbulb'],
        ['trySolutionIcon', 'flask'],

        // Banners
        ['completeIcon', 'checkCircle'],
        ['practiceRandomIcon', 'dice'],

        // Tutorial
        ['tutorialTitleIcon', 'palette']
    ];

    iconMappings.forEach(([id, iconName]) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = getIcon(iconName);
        }
    });
}

function init() {
    // Initialize SVG icons first
    initializeIcons();

    loadSession();
    updateSessionBanner();

    // Load new systems
    loadStreak();
    loadPersonalBests();
    loadDailyCompleted();
    loadTutorialState();
    loadPlayerStats();
    updateStreakDisplay();

    // Setup confetti canvas resize
    window.addEventListener('resize', resizeConfettiCanvas);
    resizeConfettiCanvas();

    // Sound toggle
    const savedSound = localStorage.getItem('huequest-sound');
    if (savedSound !== null) soundEnabled = savedSound === 'true';
    soundToggle.classList.toggle('muted', !soundEnabled);

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted', !soundEnabled);
        localStorage.setItem('huequest-sound', soundEnabled);
    });

    // Buttons
    resetBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex));
    undoBtn.addEventListener('click', undoMix);
    commitBtn.addEventListener('click', commitResult);
    prevBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex - 1));
    nextBtn.addEventListener('click', () => loadPuzzle(currentPuzzleIndex + 1));
    randomBtn.addEventListener('click', () => {
        let idx = Math.floor(Math.random() * PUZZLES.length);
        while (idx === currentPuzzleIndex && PUZZLES.length > 1) idx = Math.floor(Math.random() * PUZZLES.length);
        loadPuzzle(idx);
    });
    sandboxBtn.addEventListener('click', enterSandbox);
    nextPuzzleBtn.addEventListener('click', goNextPuzzle);

    // Show Solution button
    const showSolutionBtn = $('showSolutionBtn');
    const solutionDisplay = $('solutionDisplay');
    const solutionSteps = $('solutionSteps');
    const solutionMatch = $('solutionMatch');
    const trySolutionBtn = $('trySolutionBtn');

    if (showSolutionBtn) {
        showSolutionBtn.addEventListener('click', () => {
            if (solutionDisplay.style.display !== 'none') {
                solutionDisplay.style.display = 'none';
                showSolutionBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('lightbulb') : ''} Show Solution`;
                return;
            }

            // Compute solution
            const solution = getPuzzleSolution(currentPuzzleIndex);
            const puzzle = PUZZLES[currentPuzzleIndex];

            // Update match text
            solutionMatch.textContent = `${solution.bestMatch}% in ${solution.sourceIndices.length} mixes`;

            // Build visual path
            solutionSteps.innerHTML = '';

            // Get color names for sources
            const sourceColors = puzzle.sources.map(s => getColorName(s));

            // Add start color
            const startStep = document.createElement('div');
            startStep.className = 'solution-step';
            startStep.innerHTML = `
                <div class="solution-swatch" style="background-color: ${rgb(solution.path[0])}"></div>
                <span class="solution-label">Start</span>
            `;
            solutionSteps.appendChild(startStep);

            // Add each mix step
            for (let i = 0; i < solution.sourceIndices.length; i++) {
                // Arrow
                const arrow = document.createElement('span');
                arrow.className = 'solution-arrow';
                arrow.textContent = '→';
                solutionSteps.appendChild(arrow);

                // Source color being added
                const sourceIdx = solution.sourceIndices[i];
                const sourceStep = document.createElement('div');
                sourceStep.className = 'solution-step';
                sourceStep.innerHTML = `
                    <div class="solution-swatch" style="background-color: ${rgb(puzzle.sources[sourceIdx])}; border-style: dashed;"></div>
                    <span class="solution-source-name">+ ${sourceColors[sourceIdx]}</span>
                `;
                solutionSteps.appendChild(sourceStep);

                // Arrow
                const arrow2 = document.createElement('span');
                arrow2.className = 'solution-arrow';
                arrow2.textContent = '=';
                solutionSteps.appendChild(arrow2);

                // Result color
                const resultStep = document.createElement('div');
                resultStep.className = 'solution-step';
                resultStep.innerHTML = `
                    <div class="solution-swatch" style="background-color: ${rgb(solution.path[i + 1])}"></div>
                    <span class="solution-label">${i === solution.sourceIndices.length - 1 ? 'Final' : `Mix ${i + 1}`}</span>
                `;
                solutionSteps.appendChild(resultStep);
            }

            solutionDisplay.style.display = 'block';
            showSolutionBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('eyeOff') : ''} Hide Solution`;
        });
    }

    // Try solution in sandbox
    if (trySolutionBtn) {
        trySolutionBtn.addEventListener('click', () => {
            enterSandbox();
            // Solution is displayed, user can follow along
        });
    }

    // Practice random button (for returning users)
    const practiceRandomBtn = $('practiceRandomBtn');
    if (practiceRandomBtn) {
        practiceRandomBtn.addEventListener('click', () => {
            let idx = Math.floor(Math.random() * PUZZLES.length);
            const dailyIndex = getDailyPuzzleIndex();
            while (idx === dailyIndex && PUZZLES.length > 1) {
                idx = Math.floor(Math.random() * PUZZLES.length);
            }
            hideDailyCompleteBanner();
            loadPuzzle(idx);
        });
    }

    // Share buttons
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const success = await shareResults();
            if (success) {
                shareBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('check') : '✓'} Shared!`;
                setTimeout(() => { shareBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('share') : ''} Share`; }, 2000);
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            if (!officialResult) return;
            const puzzle = PUZZLES[currentPuzzleIndex];
            const shareText = generateShareText(
                getDailyPuzzleNumber(),
                officialResult.pct,
                officialResult.tier,
                officialResult.mixCount,
                puzzle.mixLimit
            );
            const success = await copyToClipboard(shareText);
            if (success) {
                copyBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('check') : '✓'} Copied!`;
                analytics.track('engagement', 'copy_click');
                setTimeout(() => { copyBtn.innerHTML = `${typeof getIcon === 'function' ? getIcon('clipboard') : ''} Copy`; }, 2000);
            }
        });
    }

    // Hint button
    if (hintBtn) {
        hintBtn.addEventListener('click', useHint);
    }

    // Tutorial buttons
    if (tutorialNextBtn) {
        tutorialNextBtn.addEventListener('click', nextTutorialStep);
    }
    if (tutorialSkipBtn) {
        tutorialSkipBtn.addEventListener('click', skipTutorial);
    }

    // Stats button
    const statsBtn = $('statsBtn');
    const closeStatsBtn = $('closeStatsBtn');
    const statsOverlay = $('statsOverlay');
    if (statsBtn) {
        statsBtn.addEventListener('click', showStats);
    }
    if (closeStatsBtn) {
        closeStatsBtn.addEventListener('click', hideStats);
    }
    if (statsOverlay) {
        statsOverlay.addEventListener('click', (e) => {
            if (e.target === statsOverlay) hideStats();
        });
    }

    // Archive button
    const archiveBtn = $('archiveBtn');
    const closeArchiveBtn = $('closeArchiveBtn');
    const archiveOverlay = $('archiveOverlay');
    if (archiveBtn) {
        archiveBtn.addEventListener('click', showArchive);
    }
    if (closeArchiveBtn) {
        closeArchiveBtn.addEventListener('click', hideArchive);
    }
    if (archiveOverlay) {
        archiveOverlay.addEventListener('click', (e) => {
            if (e.target === archiveOverlay) hideArchive();
        });
    }

    // Load today's daily puzzle
    const dailyIndex = getDailyPuzzleIndex();
    loadPuzzle(dailyIndex);

    // Check if daily already completed
    if (isDailyCompleted()) {
        showDailyCompleteBanner();
    }

    // Show tutorial for first-time players (after a short delay)
    if (!tutorialComplete) {
        setTimeout(showTutorial, 500);
    }
}

// ============================================
// STATS SCREEN
// ============================================
function showStats() {
    const statsOverlay = $('statsOverlay');
    if (!statsOverlay) return;

    // Populate stats
    const statPlayed = $('statPlayed');
    const statStreak = $('statStreak');
    const statMaxStreak = $('statMaxStreak');
    const statBestMatch = $('statBestMatch');
    const statAvgMatch = $('statAvgMatch');
    const statEfficiency = $('statEfficiency');
    const tierPerfect = $('tierPerfect');
    const tierProfessional = $('tierProfessional');
    const tierGood = $('tierGood');
    const tierTraining = $('tierTraining');

    if (statPlayed) statPlayed.textContent = playerStats.totalPuzzlesPlayed;
    if (statStreak) statStreak.textContent = streakData.count;
    if (statMaxStreak) statMaxStreak.textContent = streakData.maxStreak || 0;
    if (statBestMatch) statBestMatch.textContent = playerStats.bestMatch > 0 ? `${playerStats.bestMatch}%` : '--%';
    if (statAvgMatch) statAvgMatch.textContent = playerStats.totalPuzzlesPlayed > 0 ? `${getAverageMatch()}%` : '--%';
    if (statEfficiency) statEfficiency.textContent = getEfficiencyDisplay();

    // Tier distribution
    if (tierPerfect) tierPerfect.textContent = playerStats.tierCounts.perfect;
    if (tierProfessional) tierProfessional.textContent = playerStats.tierCounts.professional;
    if (tierGood) tierGood.textContent = playerStats.tierCounts.good;
    if (tierTraining) tierTraining.textContent = playerStats.tierCounts.training;

    // Update bar widths based on counts
    const total = playerStats.totalPuzzlesPlayed || 1;
    const tierBars = document.querySelectorAll('.tier-bar');
    tierBars.forEach(bar => {
        const tier = bar.dataset.tier;
        const count = playerStats.tierCounts[tier] || 0;
        const percentage = (count / total) * 100;
        bar.style.setProperty('--bar-width', `${Math.max(5, percentage)}%`);
    });

    statsOverlay.classList.add('show');
    analytics.track('engagement', 'stats_view');
}

function hideStats() {
    const statsOverlay = $('statsOverlay');
    if (statsOverlay) statsOverlay.classList.remove('show');
}

// ============================================
// ARCHIVE SCREEN
// ============================================
function showArchive() {
    const archiveOverlay = $('archiveOverlay');
    const archiveGrid = $('archiveGrid');
    if (!archiveOverlay || !archiveGrid) return;

    // Generate archive grid
    const currentPuzzleNum = getDailyPuzzleNumber();
    let html = '';

    // Show puzzles from 1 to current
    const puzzlesToShow = Math.min(currentPuzzleNum, PUZZLES.length);
    for (let num = puzzlesToShow; num >= 1; num--) {
        const isCompleted = playerStats.completedPuzzles[num];
        const isFree = isPuzzleFree(num);
        const isToday = num === currentPuzzleNum;
        const puzzleIndex = getPuzzleIndexFromNumber(num);
        const puzzle = PUZZLES[puzzleIndex];

        let statusClass = '';
        let statusIcon = '';
        let clickable = false;

        if (isToday) {
            statusClass = 'today';
            statusIcon = '★';
            clickable = true;
        } else if (isCompleted) {
            statusClass = 'completed';
            statusIcon = `${isCompleted.score}%`;
            clickable = true;
        } else if (isFree) {
            statusClass = 'available';
            statusIcon = '○';
            clickable = true;
        } else {
            statusClass = 'locked';
            statusIcon = '🔒';
            clickable = false;
        }

        html += `
            <div class="archive-item ${statusClass} ${puzzle.difficulty}" 
                 data-puzzle="${num}" 
                 ${clickable ? 'data-clickable="true"' : ''}>
                <span class="archive-num">#${num}</span>
                <span class="archive-status">${statusIcon}</span>
                <span class="archive-name">${puzzle.name}</span>
            </div>
        `;
    }

    archiveGrid.innerHTML = html;

    // Add click handlers
    archiveGrid.querySelectorAll('.archive-item[data-clickable="true"]').forEach(item => {
        item.addEventListener('click', () => {
            const puzzleNum = parseInt(item.dataset.puzzle);
            const puzzleIndex = getPuzzleIndexFromNumber(puzzleNum);
            hideArchive();
            hideDailyCompleteBanner();
            loadPuzzle(puzzleIndex);
        });
    });

    archiveOverlay.classList.add('show');
    analytics.track('engagement', 'archive_view');
}

function hideArchive() {
    const archiveOverlay = $('archiveOverlay');
    if (archiveOverlay) archiveOverlay.classList.remove('show');
}

init();
