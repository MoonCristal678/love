const fs = require('fs').promises; // Use the promises version of 'fs'.
const readline = require('readline'); // Import the 'readline' module for user input.

// Function to write content to a file.
async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`File '${filePath}' successfully written.`);
  } catch (err) {
    console.error('Error writing to the file:', err.message);
  }
}

// Function to read and display the content of a file.
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`File content of '${filePath}':`);
    console.log(content);
  } catch (err) {
    console.error('Error reading the file:', err.message);
  }
}

// Function to delete a file.
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File '${filePath}' successfully deleted.`);
  } catch (err) {
    console.error('Error deleting the file:', err.message);
  }
}

// Function to take user input for file operations.
function performFileOperations() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter 1 to create a file, 2 to read a file, 3 to delete a file: ', async (choice) => {
    switch (choice) {
      case '1':
        const fileName = await new Promise((resolve) => {
          rl.question('Enter the file name: ', resolve);
        });
        const content = await new Promise((resolve) => {
          rl.question('Enter content for the file: ', resolve);
        });
        await writeFile(fileName, content); // Create a new file with user-provided content and name.
        break;
      case '2':
        const fileNameToRead = await new Promise((resolve) => {
          rl.question('Enter the file name to read: ', resolve);
        });
        await readFile(fileNameToRead); // Read and display the content of the file.
        break;
      case '3':
        const fileNameToDelete = await new Promise((resolve) => {
          rl.question('Enter the file name to delete: ', resolve);
        });
        await deleteFile(fileNameToDelete); // Delete the specified file.
        break;
      default:
        console.log('Invalid choice.');
    }
    rl.close();
  });
}

// Example usage:
performFileOperations();
