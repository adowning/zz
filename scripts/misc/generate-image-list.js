#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to generate a list.json file for the image gallery
 * This script scans the images directory and creates a JSON array of image paths
 */

// Configuration
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const OUTPUT_FILE = path.join(__dirname, 'public', 'images', 'list.json');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

// Function to scan directory for image files
function findImageFiles(dir, relativePath = '') {
  const imageFiles = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        const subDirImages = findImageFiles(filePath, path.join(relativePath, file));
        imageFiles.push(...subDirImages);
      } else if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          // Add the relative path from the images directory
          imageFiles.push(path.join(relativePath, file).replace(/\\/g, '/'));
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return imageFiles;
}

// Function to generate the list.json file
function generateImageList() {
  console.log('Scanning for image files...');
  console.log(`Looking in: ${IMAGES_DIR}`);
  
  const imageFiles = findImageFiles(IMAGES_DIR);
  
  if (imageFiles.length === 0) {
    console.warn('No image files found!');
    return;
  }
  
  // Sort the files alphabetically
  imageFiles.sort();
  
  // Create the JSON content
  const jsonContent = JSON.stringify(imageFiles, null, 2);
  
  try {
    // Write the JSON file
    fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf8');
    console.log(`✅ Successfully generated ${OUTPUT_FILE}`);
    console.log(`📸 Found ${imageFiles.length} image files`);
    
    // Show some examples
    console.log('\n📋 First 5 images in the list:');
    imageFiles.slice(0, 5).forEach((img, index) => {
      console.log(`  ${index + 1}. ${img}`);
    });
    
  } catch (error) {
    console.error('Error writing JSON file:', error.message);
  }
}

// Function to clean the list.json file
function cleanImageList() {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
      console.log(`🗑️ Removed existing ${OUTPUT_FILE}`);
    }
  } catch (error) {
    console.error('Error cleaning existing file:', error.message);
  }
}

// Main execution
function main() {
  console.log('🚀 Image List Generator');
  console.log('======================');
  
  // Check if images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
    console.log('Please make sure the images directory exists.');
    process.exit(1);
  }
  
  // Clean existing file if it exists
  cleanImageList();
  
  // Generate the new list
  generateImageList();
  
  console.log('\n✨ Done! The image gallery should now work with the generated list.json file.');
}

// Run the script
if (require.main === module) {
  main();
}

// Export functions for use as a module
export {
  findImageFiles,
  generateImageList,
  cleanImageList
};