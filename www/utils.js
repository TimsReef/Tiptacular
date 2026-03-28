// -----------------------------
// Utilities
// -----------------------------


function dataToString(obj){
  let outputString = "";

  if (typeof obj === 'object' && obj !== null) { // Check for object type
    if (Object.keys(obj).length > 0) // Check for empty object
      outputString = JSON.stringify(obj, null, 2);
    else
      outputString = undefined;
  } else {
    outputString = String(obj); // Convert other types (like number) to a string
  }

  return outputString;
}