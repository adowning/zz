const fs = require('fs');
const path = require('path');

// Function to get all image files from a directory
function getImageFiles(dir, relativePath = '') {
  const files = [];
  const items = fs.readdirSync(path.join(dir, relativePath));
  
  for (const item of items) {
    const fullPath = path.join(dir, relativePath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip certain directories that are likely to contain many images
      if (!['.git', 'node_modules'].includes(item)) {
        files.push(...getImageFiles(dir, path.join(relativePath, item)));
      }
    } else if (isImageFile(item)) {
      files.push(path.join(relativePath, item));
    }
  }
  
  return files;
}

// Function to check if a file is an image
function isImageFile(filename) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// Function to find all image references in code files
function findImageReferences(dir) {
  const references = new Set();
  
  // Get all files recursively
  const files = fs.readdirSync(dir, { recursive: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.less'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Find image references in src attributes, CSS url(), and import statements
        // Pattern matches: images/..., @/images/..., /images/..., ./images/..., ../images/...
        const regex = /(?:src=|url\(|import.*from.*[\'"]|background-image:\s*url\()([\'"]?)((?:images|@\/images|\.\/images|\.\.\/images)\/[^\'" )>]+)([\'"]?)/g;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
          // Extract the path without quotes
          let imagePath = match[2];
          // Remove leading @/ if present
          imagePath = imagePath.replace(/^@\//, '');
          references.add(imagePath);
        }
        
        // Also check for @/assets/images references
        const assetRegex = /@\/assets\/images\/([^\'" )>]+)/g;
        while ((match = assetRegex.exec(content)) !== null) {
          references.add(`assets/images/${match[1]}`);
        }
        
        // Check for background-image CSS patterns
        const bgRegex = /background-image\s*:\s*url\(\s*['"]?(images\/[^'")>]+)['"]?\s*\)/g;
        while ((match = bgRegex.exec(content)) !== null) {
          references.add(match[1]);
        }
        
        // Check for inline styles with backgroundImage
        const styleRegex = /backgroundImage\s*:\s*['"]?(images\/[^'")>]+)['"]?/g;
        while ((match = styleRegex.exec(content)) !== null) {
          references.add(match[1]);
        }
        
      } catch (err) {
        console.warn(`Error reading file ${fullPath}:`, err.message);
      }
    }
  }
  
  return references;
}

// Main function
function main() {
  const publicImagesDir = 'public/images';
  const srcDir = 'src';
  
  console.log('Scanning for images in public/images...');
  const allImages = getImageFiles(publicImagesDir);
  console.log(`Found ${allImages.length} images in public/images`);
  
  console.log('\nScanning for image references in src/components...');
  const componentReferences = findImageReferences(path.join(srcDir, 'components'));
  
  console.log('Scanning for image references in src/assets...');
  const assetReferences = findImageReferences(path.join(srcDir, 'assets'));
  
  console.log('Scanning for image references in src/pages...');
  const pageReferences = findImageReferences(path.join(srcDir, 'pages'));
  
  // Combine all references
  const allReferences = new Set([...componentReferences, ...assetReferences, ...pageReferences]);
  
  console.log(`\nTotal unique image references found: ${allReferences.size}`);
  
  // Find unused images
  const unusedImages = allImages.filter(image => !allReferences.has(image));
  
  console.log(`\nUnused images (${unusedImages.length}):`);
  unusedImages.forEach(image => console.log(`  ${image}`));
  
  // Write to JSON file
  const output = {
    totalImages: allImages.length,
    totalReferences: allReferences.size,
    unusedImages: unusedImages,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('unused-images.json', JSON.stringify(output, null, 2));
  console.log('\nResults saved to unused-images.json');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { getImageFiles, findImageReferences, isImageFile };