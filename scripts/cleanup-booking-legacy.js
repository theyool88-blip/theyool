#!/usr/bin/env node

/**
 * Cleanup legacy booking files
 * Moves test scripts to archive and deletes production files
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');
const ARCHIVE_DIR = path.join(BASE_DIR, 'archive/booking-legacy');

// Files to delete immediately
const FILES_TO_DELETE = [
  // Core library files
  'lib/supabase/bookings.ts',
  'types/booking.ts',

  // API routes
  'app/api/bookings/route.ts',
  'app/api/bookings/[id]/route.ts',
  'app/api/bookings/available-slots/route.ts',
  'app/api/admin/bookings/route.ts',
  'app/api/admin/bookings/[id]/route.ts',

  // Admin pages
  'app/admin/bookings/page.tsx',
  'app/admin/bookings/AdminBookingsClient.tsx',

  // User pages
  'app/booking/page.tsx',
  'app/booking/confirmation/[id]/page.tsx',
  'app/booking/confirmation/[id]/ConfirmationClient.tsx',
  'app/booking/confirmation/[id]/not-found.tsx',
];

// Test scripts to archive
const FILES_TO_ARCHIVE = [
  'scripts/analyze-booking-system.js',
  'scripts/apply-public-booking-policy.js',
  'scripts/check-booking-db.js',
  'scripts/check-bookings-schema.js',
  'scripts/create-bookings-via-rest.js',
  'scripts/create-test-booking-admin.js',
  'scripts/create-test-booking-for-api.js',
  'scripts/create-test-bookings.js',
  'scripts/execute-bookings-migration.js',
  'scripts/generate-test-bookings.js',
  'scripts/run-bookings-migration.js',
  'scripts/test-booking-api.js',
  'scripts/test-booking-create-simple.js',
  'scripts/test-booking-create.js',
  'scripts/test-booking-datetime-update.js',
  'scripts/test-booking-detail-api.js',
  'scripts/test-booking-e2e.js',
  'scripts/verify-bookings-table.js',
  'scripts/verify-test-bookings.js',
];

// Directories to remove (empty after file deletion)
const DIRS_TO_REMOVE = [
  'app/api/bookings',
  'app/api/admin/bookings',
  'app/admin/bookings',
  'app/booking/confirmation/[id]',
  'app/booking/confirmation',
  'app/booking',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

function archiveFile(relPath) {
  const sourcePath = path.join(BASE_DIR, relPath);
  const archivePath = path.join(ARCHIVE_DIR, relPath);

  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  File not found (skipping): ${relPath}`);
    return false;
  }

  // Ensure archive directory exists
  const archiveDir = path.dirname(archivePath);
  ensureDir(archiveDir);

  // Move file to archive
  fs.renameSync(sourcePath, archivePath);
  console.log(`📦 Archived: ${relPath}`);
  return true;
}

function deleteFile(relPath) {
  const filePath = path.join(BASE_DIR, relPath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found (skipping): ${relPath}`);
    return false;
  }

  fs.unlinkSync(filePath);
  console.log(`🗑️  Deleted: ${relPath}`);
  return true;
}

function removeEmptyDir(relPath) {
  const dirPath = path.join(BASE_DIR, relPath);

  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found (skipping): ${relPath}`);
    return false;
  }

  try {
    fs.rmdirSync(dirPath);
    console.log(`📁 Removed empty directory: ${relPath}`);
    return true;
  } catch (error) {
    console.log(`⚠️  Directory not empty (skipping): ${relPath}`);
    return false;
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  BOOKING LEGACY CLEANUP                                        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');

  if (isDryRun) {
    console.log('📋 DRY RUN MODE - No changes will be made\n');
  } else {
    console.log('⚠️  WARNING: This will delete booking-related files!\n');
    console.log('⏳ Waiting 3 seconds before proceeding...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('');
  }

  // Step 1: Archive test scripts
  console.log('📦 Step 1: Archiving test scripts...\n');

  if (!isDryRun) {
    ensureDir(ARCHIVE_DIR);
  }

  let archivedCount = 0;
  FILES_TO_ARCHIVE.forEach(file => {
    if (isDryRun) {
      console.log(`[DRY RUN] Would archive: ${file}`);
    } else {
      if (archiveFile(file)) archivedCount++;
    }
  });

  console.log(`\n📊 Archived ${archivedCount} files\n`);

  // Step 2: Delete production files
  console.log('🗑️  Step 2: Deleting production files...\n');

  let deletedCount = 0;
  FILES_TO_DELETE.forEach(file => {
    if (isDryRun) {
      console.log(`[DRY RUN] Would delete: ${file}`);
    } else {
      if (deleteFile(file)) deletedCount++;
    }
  });

  console.log(`\n📊 Deleted ${deletedCount} files\n`);

  // Step 3: Remove empty directories
  console.log('📁 Step 3: Removing empty directories...\n');

  let removedDirCount = 0;
  DIRS_TO_REMOVE.forEach(dir => {
    if (isDryRun) {
      console.log(`[DRY RUN] Would remove: ${dir}`);
    } else {
      if (removeEmptyDir(dir)) removedDirCount++;
    }
  });

  console.log(`\n📊 Removed ${removedDirCount} directories\n`);

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (isDryRun) {
    console.log('✅ Dry run complete. Run without --dry-run to execute cleanup.');
    console.log('   Command: node scripts/cleanup-booking-legacy.js');
  } else {
    console.log('✅ Cleanup complete!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Update BookingForm.tsx to use consultations API');
    console.log('   2. Update lib/email/notifications.ts');
    console.log('   3. Update lib/email/templates.ts');
    console.log('   4. Test the application');
    console.log('');
    console.log(`📦 Archived files location: ${ARCHIVE_DIR}`);
  }

  console.log('');
}

main().catch(console.error);
