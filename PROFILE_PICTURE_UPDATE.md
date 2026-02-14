# Profile Picture Update Implementation

## Overview

Successfully implemented automatic deletion of previous profile pictures from Cloudinary when users update their profile picture.

## Changes Made

### 1. Updated `user.service.ts`

**File**: `c:\Projects\paitent-management\PM-server\src\app\modules\user\user.service.ts`

#### Added Imports:

- `deleteFileFromCloudinary` from `../../config/cloudinary.config`
- `logger` from `../../utils/logger`

#### Enhanced `updateUser` Function:

Added logic to delete the old profile picture before saving the new one:

```typescript
// Delete old profile picture from Cloudinary if a new one is being uploaded
if (
  payload.picture &&
  isUserExist.picture &&
  payload.picture !== isUserExist.picture
) {
  try {
    await deleteFileFromCloudinary(isUserExist.picture);
  } catch (error) {
    // Log the error but don't fail the update if deletion fails
    logger.error('Failed to delete old profile picture:', error);
  }
}
```

## How It Works

1. **Check for Picture Update**: When a user updates their profile, the system checks if:
   - A new picture is being uploaded (`payload.picture` exists)
   - The user has an existing picture (`isUserExist.picture` exists)
   - The new picture is different from the old one (`payload.picture !== isUserExist.picture`)

2. **Delete Old Picture**: If all conditions are met, the system:
   - Calls `deleteFileFromCloudinary()` with the old picture URL
   - The function extracts the public ID from the Cloudinary URL
   - Deletes the image from Cloudinary storage

3. **Error Handling**: If deletion fails:
   - The error is logged using the project's logger utility
   - The update process continues (doesn't fail)
   - This ensures user experience isn't disrupted by Cloudinary issues

4. **Save New Picture**: The new profile picture URL is saved to the database

## Benefits

✅ **Automatic Cleanup**: No manual intervention needed to remove old pictures
✅ **Storage Optimization**: Prevents accumulation of unused images in Cloudinary
✅ **Cost Reduction**: Reduces storage costs by removing orphaned files
✅ **Graceful Degradation**: Update succeeds even if deletion fails
✅ **Proper Logging**: Errors are logged for debugging purposes

## API Endpoints Affected

- `PUT /api/users/:id` - Update user profile
- `PATCH /api/users/:id` - Partial update user profile

Both endpoints now automatically handle profile picture cleanup when the `picture` field is updated.

## Testing Recommendations

To test this functionality:

1. **Create a user** with a profile picture
2. **Update the profile picture** with a new image
3. **Verify** that:
   - The new picture is displayed
   - The old picture is deleted from Cloudinary
   - The database contains the new picture URL

## Notes

- The deletion is wrapped in a try-catch block to ensure the update succeeds even if Cloudinary deletion fails
- Only images that are different from the current one trigger deletion (prevents unnecessary API calls)
- The existing `deleteFileFromCloudinary` utility handles both images and PDFs
