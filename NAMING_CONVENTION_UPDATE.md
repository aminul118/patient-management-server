# File Naming Convention Update

## Overview

Updated the Cloudinary file upload configuration to respect the user's request:

1.  **Exclude Extension**: The file extension (e.g., `.jpg`, `.jpeg`) is no longer part of the `public_id` (filename) stored in Cloudinary. Cloudinary manages the extension automatically.
2.  **Clean Filename**: The filename is constructed from the original name (without extension), lowercased, spaces replaced by dashes, and special characters removed.
3.  **Unique Suffix**: A timestamp and random number are prepended to ensure uniqueness.

## File Changed

`src/app/config/multer.config.ts`

## Logic

```typescript
// 1. Remove extension
const nameWithoutExtension = file.originalname
  .split('.')
  .slice(0, -1)
  .join('.');

// 2. Sanitize
const fileName = nameWithoutExtension
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

// 3. Unique identifier
const uniqueFileName =
  Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + fileName;
```

Depending on the file uploaded:

- **Input**: `My Profile Pic.jpg`
- **Old Output**: `...-my-profile-pic-jpg.jpg`
- **New Output**: `...-my-profile-pic.jpg` (in URL) / `...-my-profile-pic` (as Public ID)
