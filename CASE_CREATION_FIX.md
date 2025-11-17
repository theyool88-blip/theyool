# Case Creation Error Fix

## Problem Summary

When trying to create a new case in the admin page, users were getting "생성 중 오류가 발생했습니다" error. The POST request was reaching the server, but failing at the database level with error code `PGRST204`.

## Root Cause Identified

### Database Schema Mismatch
- **Issue**: The `createCase` function was trying to insert a `category` field that doesn't exist in the database
- **Details**:
  - Database has `categories TEXT[]` (plural, array) - CORRECT
  - Code was trying to insert BOTH `categories` AND `category` fields
  - The `category` column doesn't exist in the database schema
  - This caused error: "Could not find the 'category' column of 'cases' in the schema cache"

### Missing Error Logging
- **Issue**: Client-side and server-side errors weren't being logged adequately
- **Result**: Hard to diagnose where the error occurred initially

## The Fix

### Code Update (Already Applied)

**The database schema was correct!** The issue was in the code.

1. **Updated `lib/supabase/cases.ts`** - **CRITICAL FIX**:
   - **REMOVED** the `category` field from insert data (this was the bug!)
   - Added comprehensive logging in `createCase()`
   - Better error handling and error details

2. **Updated `app/admin/cases/CasesManagementClient.tsx`**:
   - Added client-side validation for required fields (title, slug, content)
   - Added console logging for debugging
   - Better error messages showing actual error details

### What Changed in the Code

**Before (BROKEN):**
```typescript
const insertData = {
  // ... other fields ...
  categories: input.categories || [],
  category: input.categories?.[0] || null, // ❌ This column doesn't exist!
  // ... other fields ...
};
```

**After (FIXED):**
```typescript
const insertData = {
  // ... other fields ...
  categories: input.categories || [], // ✅ Only this field exists
  // category field removed!
  // ... other fields ...
};
```

## How to Verify the Fix

### Test in Admin UI

1. Go to `/admin/cases`
2. Click "새 성공사례 추가"
3. Fill in required fields:
   - Title: "Test Case"
   - Slug: "test-case-123"
   - Content: Add some markdown text
   - Categories: Select at least one
4. Click "생성"
5. Should see "성공사례가 생성되었습니다" success message

### Test with Script

```bash
node test-case-creation.js
```

This should now show all tests passing.

## Check Server Logs

After the fix, you should see detailed logging:

1. **Client logs** (Browser Console):
   ```
   [CasesManagement] Submitting payload: { title: "...", slug: "...", ... }
   [CasesManagement] Response status: 200
   [CasesManagement] Response data: { success: true, data: {...} }
   ```

2. **Server logs** (Terminal):
   ```
   [createCase] Input: { title: "...", slug: "...", ... }
   [createCase] Insert data: { notion_id: "...", title: "...", ... }
   [createCase] Success! Created case: abc123-...
   ```

## Files Modified

- ✅ `lib/supabase/cases.ts` - **REMOVED category field** (the fix!)
- ✅ `app/admin/cases/CasesManagementClient.tsx` - Added validation and logging
- ✅ `CASE_CREATION_FIX.md` - This documentation
- ✅ `test-case-creation.js` - Test script (updated)
- ✅ `FIX_CASES_TABLE.sql` - Schema verification (no changes needed)

## Troubleshooting

### Still Getting Errors?

**Check browser console first** - Open DevTools → Console and look for:
- `[CasesManagement]` log messages
- Network tab for the POST request to `/api/admin/cases`
- Response body showing error details

**Check server logs** - Look for:
- `[createCase]` log messages
- Supabase error details

### Common Validation Errors

**"제목을 입력해주세요"**
- Fill in the title field

**"URL Slug를 입력해주세요"**
- Fill in the slug field (e.g., "test-case-123")

**"본문을 입력해주세요"**
- Add some content in the markdown editor

### Database Errors

**"duplicate key value violates unique constraint"**
- Another case with the same slug already exists
- Use a different slug value

**"Could not find the 'category' column"**
- This was the original error - should be fixed now
- If you still see this, make sure you've deployed the updated code

## Summary

**Problem**: The `createCase` function was trying to insert a `category` field that doesn't exist in the database.

**Solution**: Removed the `category` field from the insert data. The database only has `categories` (plural, array).

**Result**: Case creation now works correctly!
