const fs = require('fs');
const path = require('path');

// Read package.json
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Increment patch
const newPatch = patch + 1;
const newVersion = `${major}.${minor}.${newPatch}`;
packageJson.version = newVersion;

// Save package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

// iOS update
const iosPath = path.join(__dirname, '../ios/WhattoEat/Info.plist');
let iosData = fs.readFileSync(iosPath, 'utf8');

iosData = iosData.replace(
    /<key>CFBundleShortVersionString<\/key>\s*<string>.*?<\/string>/,
    `<key>CFBundleShortVersionString</key>\n\t<string>${newVersion}</string>`
);

iosData = iosData.replace(
    /<key>CFBundleVersion<\/key>\s*<string>.*?<\/string>/,
    `<key>CFBundleVersion</key>\n\t<string>${newPatch}</string>`
);

fs.writeFileSync(iosPath, iosData);

// Android update
const androidPath = path.join(__dirname, '../android/app/build.gradle');
let androidData = fs.readFileSync(androidPath, 'utf8');

androidData = androidData.replace(
    /versionName\s+"[^"]+"/,
    `versionName "${newVersion}"`
);

const versionCode = major * 10000 + minor * 100 + newPatch;

androidData = androidData.replace(
    /versionCode\s+\d+/,
    `versionCode ${versionCode}`
);

fs.writeFileSync(androidPath, androidData);

console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`);