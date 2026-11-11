// Assignment 3: Interactive Blacksmith

// PLAN for interactive controls:
// 1. Select the input field and the three buttons.
// 2. When "Add heat" is clicked:
//    - Read the input value.
//    - Validate: must be a positive whole number.
//    - If invalid, show error message on page.
//    - If valid, clear error, call heatForge(amount), clear input.
// 3. When "Make sword" is clicked, call makeSword().
// 4. When "Reset forge" is clicked, call resetForge() and clear input/message.

// 1. Select the forge, heat, sword count, status, image, and message elements.
const forge = document.getElementById('forge');
const forgeImage = document.getElementById('forge-image');
const forgeStatus = document.getElementById('forge-status');
const heatValue = document.getElementById('heat-value');
const swordCount = document.getElementById('sword-count');
const actionMessage = document.getElementById('action-message');

// 2. Create the two state variables: heat and swords made.
let heat = 20;
let swordsMade = 0;

// 3. Write getForgeStatus(heatValue). Return the correct status string.
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return 'Too cold';
  } else if (heatValue < 70) {
    return 'Ready to forge';
  } else {
    return 'Roaring fire';
  }
}

// 4. Write updateForge(). Update text and apply one status class.
function updateForge() {
  // Update text content
  heatValue.textContent = heat;
  swordCount.textContent = swordsMade;

  // Get current status
  const status = getForgeStatus(heat);
  forgeStatus.textContent = status;

  // Remove previous status classes so only one remains
  forge.classList.remove('is-cold', 'is-ready', 'is-roaring');

  // Apply matching class, image, and alt text based on status
  if (status === 'Too cold') {
    forge.classList.add('is-cold');
    forgeImage.src = 'assets/forge-cold.svg';
    forgeImage.alt = 'A stone forge with dark coals and no flames';
  } else if (status === 'Ready to forge') {
    forge.classList.add('is-ready');
    forgeImage.src = 'assets/forge-ready.svg';
    forgeImage.alt = 'A stone forge with a small orange fire';
  } else if (status === 'Roaring fire') {
    forge.classList.add('is-roaring');
    forgeImage.src = 'assets/forge-roaring.svg';
    forgeImage.alt = 'A stone forge with tall bright flames and sparks';
  }
}

// 5. Write resetForge(). Restore the state, message, and display.
function resetForge() {
  heat = 20;
  swordsMade = 0;
  
  // Clear the message area (Assignment 3 requirement)
  actionMessage.textContent = '';
  
  // Clear the input field if it exists
  const inputField = document.getElementById('heat-input');
  if (inputField) {
    inputField.value = '';
  }
  
  updateForge();
}

// 6. Write heatForge(amount). Add heat, cap it, and update the page.
function heatForge(amount) {
  heat += amount;
  if (heat > 100) {
    heat = 100;
  }
  actionMessage.textContent = `Heating complete. The forge is at ${heat} heat.`;
  updateForge();
}

// 7. Write makeSword(). Handle both success and insufficient heat.
function makeSword() {
  if (heat >= 30) {
    heat -= 30;
    swordsMade++;
    actionMessage.textContent = `Success! Sword made. The forge is at ${heat} heat.`;
  } else {
    actionMessage.textContent = 'Not enough heat to make a sword. Add more heat.';
  }
  updateForge();
}

// ==========================================
// ASSIGNMENT 3: EVENT LISTENERS & VALIDATION
// ==========================================

// Select the new interactive elements
const heatInput = document.getElementById('heat-input');
const addHeatBtn = document.getElementById('add-heat-btn');
const makeSwordBtn = document.getElementById('make-sword-btn');
const resetForgeBtn = document.getElementById('reset-forge-btn');

// 1. Add Heat Button Logic
addHeatBtn.addEventListener('click', function() {
  const inputValue = heatInput.value;
  const amount = Number(inputValue);

  // Validation: Reject empty, not a number, <= 0, or decimals
  if (inputValue === '' || isNaN(amount) || amount <= 0 || !Number.isInteger(amount)) {
    actionMessage.textContent = 'Error: Please enter a positive whole number (e.g., 10).';
    return; // Stop execution so heat doesn't change
  }

  // Valid input: call existing function and clear input
  heatForge(amount);
  heatInput.value = '';
});

// 2. Make Sword Button Logic
makeSwordBtn.addEventListener('click', function() {
  makeSword(); 
});

// 3. Reset Forge Button Logic
resetForgeBtn.addEventListener('click', function() {
  resetForge();
  // Reset requirement says feedback area should be empty
  actionMessage.textContent = ''; 
});

// 8. Call resetForge() once to start the game and initialize the page.
resetForge();