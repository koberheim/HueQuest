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
    { name: "Sky Blue", difficulty: "easy", target: [140, 200, 230], sources: [[142, 210, 245], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Peach", difficulty: "easy", target: [245, 205, 175], sources: [[253, 210, 178], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Lavender", difficulty: "easy", target: [210, 180, 220], sources: [[237, 197, 251], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mint", difficulty: "easy", target: [150, 225, 160], sources: [[153, 239, 165], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Coral", difficulty: "easy", target: [240, 130, 105], sources: [[247, 130, 103], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Butter", difficulty: "easy", target: [248, 225, 145], sources: [[252, 228, 146], [255, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 7 },
    { name: "Baby Blue", difficulty: "easy", target: [170, 200, 225], sources: [[176, 210, 239], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Salmon", difficulty: "easy", target: [245, 145, 135], sources: [[253, 146, 135], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Lime", difficulty: "easy", target: [135, 210, 105], sources: [[137, 237, 97], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Blush", difficulty: "easy", target: [248, 185, 195], sources: [[252, 187, 197], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 7 },
    { name: "Cream", difficulty: "easy", target: [248, 240, 205], sources: [[252, 244, 207], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 7 },
    { name: "Powder Blue", difficulty: "easy", target: [175, 200, 220], sources: [[191, 224, 251], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Apricot", difficulty: "easy", target: [245, 190, 165], sources: [[253, 194, 167], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Thistle", difficulty: "easy", target: [205, 180, 210], sources: [[231, 197, 237], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Cotton Candy", difficulty: "easy", target: [248, 190, 205], sources: [[252, 192, 207], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 7 },
    { name: "Honeydew", difficulty: "easy", target: [205, 240, 205], sources: [[210, 247, 210], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Champagne", difficulty: "easy", target: [240, 220, 195], sources: [[247, 226, 199], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Seafoam", difficulty: "easy", target: [155, 220, 185], sources: [[164, 251, 204], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Rose", difficulty: "easy", target: [245, 180, 185], sources: [[253, 183, 189], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Periwinkle", difficulty: "easy", target: [180, 180, 235], sources: [[187, 187, 250], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Wheat", difficulty: "easy", target: [240, 220, 180], sources: [[247, 226, 183], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Aqua Light", difficulty: "easy", target: [135, 215, 215], sources: [[137, 244, 244], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mauve Light", difficulty: "easy", target: [215, 170, 200], sources: [[244, 184, 224], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Sage", difficulty: "easy", target: [180, 200, 155], sources: [[197, 224, 164], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Dusty Blue", difficulty: "easy", target: [145, 175, 200], sources: [[151, 191, 224], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Soft Yellow", difficulty: "easy", target: [248, 238, 165], sources: [[252, 242, 166], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 7 },
    { name: "Lilac", difficulty: "easy", target: [200, 175, 215], sources: [[224, 191, 244], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Melon", difficulty: "easy", target: [245, 190, 165], sources: [[253, 194, 167], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Pearl", difficulty: "easy", target: [225, 225, 225], sources: [[239, 239, 239], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Sand", difficulty: "easy", target: [215, 200, 170], sources: [[244, 224, 184], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Cloud", difficulty: "easy", target: [225, 230, 240], sources: [[231, 237, 247], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Wisteria", difficulty: "easy", target: [200, 175, 215], sources: [[224, 191, 244], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Spring Green", difficulty: "easy", target: [145, 225, 145], sources: [[147, 239, 147], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },

    // ========== MEDIUM PUZZLES (34) ==========
    { name: "Teal", difficulty: "medium", target: [65, 160, 160], sources: [[2, 192, 192], [0, 255, 255], [0, 255, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Terracotta", difficulty: "medium", target: [200, 100, 80], sources: [[224, 91, 64], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Olive", difficulty: "medium", target: [140, 150, 75], sources: [[152, 172, 22], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Plum", difficulty: "medium", target: [170, 100, 155], sources: [[212, 72, 182], [255, 0, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Rust", difficulty: "medium", target: [195, 95, 65], sources: [[217, 84, 44], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Moss", difficulty: "medium", target: [130, 160, 95], sources: [[132, 192, 62], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Burgundy", difficulty: "medium", target: [155, 55, 80], sources: [[164, 31, 64], [255, 0, 0], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Steel", difficulty: "medium", target: [100, 130, 155], sources: [[72, 132, 182], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Copper", difficulty: "medium", target: [195, 120, 75], sources: [[217, 117, 57], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Slate", difficulty: "medium", target: [110, 125, 140], sources: [[92, 122, 152], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Brick", difficulty: "medium", target: [195, 80, 80], sources: [[217, 64, 64], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Fern", difficulty: "medium", target: [95, 155, 85], sources: [[62, 182, 42], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Wine", difficulty: "medium", target: [150, 65, 80], sources: [[172, 2, 32], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Honey", difficulty: "medium", target: [230, 175, 80], sources: [[245, 182, 73], [255, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Denim", difficulty: "medium", target: [85, 125, 180], sources: [[42, 122, 232], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Cinnamon", difficulty: "medium", target: [195, 115, 60], sources: [[217, 111, 37], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Jade", difficulty: "medium", target: [85, 175, 125], sources: [[42, 222, 122], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Auburn", difficulty: "medium", target: [175, 75, 65], sources: [[222, 22, 2], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Khaki", difficulty: "medium", target: [185, 170, 135], sources: [[242, 212, 142], [255, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Pumpkin", difficulty: "medium", target: [245, 135, 70], sources: [[253, 135, 66], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Ocean", difficulty: "medium", target: [75, 145, 180], sources: [[22, 162, 232], [0, 255, 255], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Rose Gold", difficulty: "medium", target: [195, 135, 135], sources: [[217, 137, 137], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Bronze", difficulty: "medium", target: [185, 135, 75], sources: [[242, 142, 22], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Emerald", difficulty: "medium", target: [85, 175, 115], sources: [[42, 222, 102], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mulberry", difficulty: "medium", target: [185, 90, 140], sources: [[242, 52, 152], [255, 0, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Charcoal", difficulty: "medium", target: [95, 95, 105], sources: [[62, 62, 82], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mustard", difficulty: "medium", target: [225, 185, 75], sources: [[239, 193, 67], [255, 0, 0], [0, 255, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Violet", difficulty: "medium", target: [150, 85, 175], sources: [[172, 42, 222], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Caramel", difficulty: "medium", target: [225, 165, 85], sources: [[239, 170, 79], [255, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Forest", difficulty: "medium", target: [65, 135, 75], sources: [[2, 142, 22], [0, 255, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Tangerine", difficulty: "medium", target: [245, 145, 75], sources: [[253, 146, 71], [255, 0, 0], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 6 },
    { name: "Lavender Gray", difficulty: "medium", target: [160, 150, 170], sources: [[192, 172, 212], [255, 0, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Pistachio", difficulty: "medium", target: [160, 195, 125], sources: [[171, 217, 124], [255, 0, 0], [0, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mauve", difficulty: "medium", target: [180, 135, 160], sources: [[232, 142, 192], [255, 0, 0], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },

    // ========== HARD PUZZLES (33) ==========
    { name: "Navy", difficulty: "hard", target: [45, 55, 125], sources: [[17, 31, 124], [0, 255, 255], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Crimson", difficulty: "hard", target: [175, 45, 65], sources: [[191, 17, 44], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Indigo", difficulty: "hard", target: [85, 55, 145], sources: [[71, 31, 151], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Maroon", difficulty: "hard", target: [135, 35, 50], sources: [[137, 4, 24], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Sapphire", difficulty: "hard", target: [55, 85, 165], sources: [[31, 71, 177], [0, 255, 255], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Ruby", difficulty: "hard", target: [195, 45, 85], sources: [[217, 17, 71], [255, 0, 0], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Hunter Green", difficulty: "hard", target: [55, 115, 65], sources: [[31, 111, 44], [0, 255, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Midnight", difficulty: "hard", target: [55, 55, 105], sources: [[31, 31, 97], [0, 255, 255], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Oxblood", difficulty: "hard", target: [125, 40, 50], sources: [[124, 11, 24], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Cobalt", difficulty: "hard", target: [55, 85, 170], sources: [[31, 71, 184], [0, 255, 255], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Garnet", difficulty: "hard", target: [145, 60, 65], sources: [[151, 37, 44], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Pine", difficulty: "hard", target: [45, 115, 85], sources: [[17, 111, 71], [0, 255, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Amethyst", difficulty: "hard", target: [145, 95, 175], sources: [[162, 62, 222], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Vermillion", difficulty: "hard", target: [215, 75, 60], sources: [[244, 57, 37], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Mahogany", difficulty: "hard", target: [165, 65, 55], sources: [[177, 44, 31], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Deep Teal", difficulty: "hard", target: [45, 125, 135], sources: [[17, 124, 137], [0, 255, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Scarlet", difficulty: "hard", target: [225, 55, 55], sources: [[239, 45, 45], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Ultramarine", difficulty: "hard", target: [55, 55, 155], sources: [[31, 31, 164], [0, 255, 255], [255, 0, 255], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Sienna", difficulty: "hard", target: [155, 65, 45], sources: [[164, 44, 17], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Prussian", difficulty: "hard", target: [45, 75, 115], sources: [[17, 57, 111], [0, 255, 255], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Carmine", difficulty: "hard", target: [175, 45, 65], sources: [[191, 17, 44], [255, 0, 0], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Viridian", difficulty: "hard", target: [65, 135, 105], sources: [[2, 142, 82], [0, 255, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Byzantium", difficulty: "hard", target: [135, 60, 115], sources: [[137, 37, 111], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Deep Purple", difficulty: "hard", target: [105, 45, 135], sources: [[97, 17, 137], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Sepia", difficulty: "hard", target: [135, 85, 50], sources: [[137, 71, 24], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Dark Cyan", difficulty: "hard", target: [55, 135, 145], sources: [[31, 137, 151], [0, 255, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Deep Rose", difficulty: "hard", target: [185, 65, 105], sources: [[242, 2, 82], [255, 0, 0], [255, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Forest Night", difficulty: "hard", target: [45, 85, 60], sources: [[17, 71, 37], [0, 255, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Dark Azure", difficulty: "hard", target: [55, 95, 155], sources: [[31, 84, 164], [0, 255, 255], [0, 0, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Bordeaux", difficulty: "hard", target: [125, 40, 60], sources: [[124, 11, 37], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Deep Ocean", difficulty: "hard", target: [45, 105, 145], sources: [[17, 97, 151], [0, 255, 255], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Oxblood Rose", difficulty: "hard", target: [145, 55, 75], sources: [[151, 31, 57], [255, 0, 255], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 },
    { name: "Dark Olive", difficulty: "hard", target: [95, 105, 50], sources: [[84, 97, 24], [255, 255, 0], [255, 255, 255], [0, 0, 0]], mixLimit: 5 }
];

// ============================================
// DAILY PUZZLE SYSTEM
// ============================================
const EPOCH_DATE = new Date('2024-01-01T00:00:00'); // Starting point for puzzle numbering

function getDaysSinceEpoch() {
    const now = new Date();
    const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utcEpoch = Date.UTC(EPOCH_DATE.getFullYear(), EPOCH_DATE.getMonth(), EPOCH_DATE.getDate());
    return Math.floor((utcNow - utcEpoch) / (1000 * 60 * 60 * 24));
}

function getDailyPuzzleIndex() {
    const days = getDaysSinceEpoch();
    return days % PUZZLES.length;
}

function getDailyPuzzleNumber() {
    return getDaysSinceEpoch() + 1; // Puzzle #1 starts on epoch date
}

function getNextPuzzleTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow - now;
}

function formatCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getTodayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
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

// Streak & Personal Bests (NEW)
let streakData = { count: 0, lastPlayDate: null };
let personalBests = {}; // { puzzleIndex: bestScore }

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
    return Math.round(Math.max(0, Math.min(100, 100 - (de * 100 / 30))));
};

function getTier(pct) {
    if (pct >= TIERS.perfect.min) return TIERS.perfect;
    if (pct >= TIERS.professional.min) return TIERS.professional;
    if (pct >= TIERS.good.min) return TIERS.good;
    return TIERS.training;
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
// STREAK SYSTEM (NEW)
// ============================================
function loadStreak() {
    try {
        const saved = localStorage.getItem('huequest-streak');
        if (saved) streakData = JSON.parse(saved);
    } catch (e) { }
}

function saveStreak() {
    try { localStorage.setItem('huequest-streak', JSON.stringify(streakData)); } catch (e) { }
}

function updateStreak() {
    const today = new Date().toDateString();
    if (streakData.lastPlayDate === today) {
        // Already played today, no change
    } else {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
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
    if (pb !== null) {
        pbBadge.textContent = `🏆 ${pb}%`;
        pbBadge.classList.toggle('new-pb', newPB);
    } else {
        pbBadge.textContent = '🏆 --';
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
        countdownBadge.textContent = `⏰ ${formatCountdown(ms)}`;
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
    commitBtn.innerHTML = isCommitted ? '<span class="btn-icon">🔒</span> Locked In!' : '<span class="btn-icon">✓</span> Lock It In!';

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

    // Check for chime on good match
    const pct = matchPct(currentColor, puzzle.target);
    if (pct >= 90) setTimeout(() => playSound('chime'), 200);

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

    showResultsModal();
}

function showResultsModal() {
    const puzzle = PUZZLES[currentPuzzleIndex];
    const { pct, tier, mixCount: mc } = officialResult;

    // Use cozy title system instead of tier names
    const cozyTitle = getCozyTitle(pct);
    resultCelebration.textContent = tier.icon;
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
function init() {
    loadSession();
    updateSessionBanner();

    // Load new systems
    loadStreak();
    loadPersonalBests();
    loadDailyCompleted();
    loadTutorialState();
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
                shareBtn.textContent = '✓ Shared!';
                setTimeout(() => { shareBtn.textContent = '📤 Share'; }, 2000);
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
                copyBtn.textContent = '✓ Copied!';
                analytics.track('engagement', 'copy_click');
                setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2000);
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

init();
