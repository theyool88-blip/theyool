# Consultation System Unification - Complete

**Date**: 2025-11-20
**Author**: Claude (Backend & SEO Specialist)
**Status**: ✅ Implementation Complete (Pending SQL Migration)

---

## Executive Summary

Successfully unified the consultation and booking systems into a single, flexible `consultations` table that supports 4 request types:

1. **Callback** (`callback`) - Simple phone callback request
2. **Visit** (`visit`) - In-person consultation at office
3. **Video** (`video`) - Online video consultation
4. **Info** (`info`) - Information request only

---

## Completed Work

### 1. ✅ TypeScript Types
**File**: `/Users/hskim/theyool/types/consultation.ts`

- Comprehensive discriminated union types for all 4 request types
- Type guards for runtime type checking
- Complete enums for status, office locations, lawyers, payment methods
- Display labels and colors for UI
- Utility functions (phone formatting, date/time formatting, status workflow validation)

**Key Features**:
- Strict type safety with discriminated unions
- 9 status states supporting complete workflow
- Payment tracking support (future use)
- Korean language utilities

---

### 2. ✅ Supabase Functions
**File**: `/Users/hskim/theyool/lib/supabase/consultations.ts`

**Functions**:
- `createConsultation(input)` - Create any type of consultation
- `getConsultations(filters?)` - Get all with filtering
- `getConsultationById(id)` - Get single consultation
- `updateConsultation(id, input)` - Update consultation
- `deleteConsultation(id)` - Delete consultation
- `getConsultationStats()` - Get statistics for dashboard
- `checkSlotAvailability(date, time, location?)` - Check scheduling conflicts
- `getUpcomingConsultations()` - Get today/tomorrow consultations

**Features**:
- Comprehensive filtering (type, status, lawyer, date range, location, payment, search)
- Optimized queries with proper indexing
- Error handling with descriptive messages
- Admin-only access control

---

### 3. ✅ API Routes (Public)

#### POST /api/consultations
**File**: `/Users/hskim/theyool/app/api/consultations/route.ts`

- Zod validation with discriminated unions
- Supports all 4 consultation types
- Returns 400 for validation errors with detailed field-level errors
- Returns 201 on success with created consultation data

**Validation**:
- Callback: name, phone (required)
- Visit: + preferred_date, preferred_time, office_location (required)
- Video: + preferred_date, preferred_time (required)
- Info: same as callback

#### GET /api/consultations
- Query parameter filtering
- Returns array of consultations with count

#### GET /api/consultations/[id]
**File**: `/Users/hskim/theyool/app/api/consultations/[id]/route.ts`

- Get single consultation by ID
- Returns 404 if not found

#### PATCH /api/consultations/[id]
- Update consultation
- Zod validation for update fields
- Status workflow validation

#### DELETE /api/consultations/[id]
- Delete consultation
- Returns 404 if not found

---

### 4. ✅ API Routes (Admin)

#### GET /api/admin/consultations
**File**: `/Users/hskim/theyool/app/api/admin/consultations/route.ts`

- Requires authentication (session check)
- Same filtering as public GET but with auth

#### GET /api/admin/consultations/[id]
**File**: `/Users/hskim/theyool/app/api/admin/consultations/[id]/route.ts`

- Get single consultation (admin)
- Requires authentication

#### PATCH /api/admin/consultations/[id]
- Update consultation (admin)
- Requires authentication
- Flexible field updates (no strict validation)
- Supports all update fields including payment

#### DELETE /api/admin/consultations/[id]
- Delete consultation (admin)
- Requires authentication

---

## Database Schema

### consultations_unified Table
**Status**: ✅ Created (Currently named `consultations_unified`, pending rename)

**Key Fields**:
- `request_type` - Discriminator: callback | visit | video | info
- `status` - Workflow state (9 states)
- `name`, `phone`, `email` - Customer info
- `category`, `message` - Consultation details
- `preferred_date`, `preferred_time` - Scheduling (nullable)
- `confirmed_date`, `confirmed_time` - Final scheduling
- `office_location` - Visit only (천안 | 평택)
- `video_link` - Video only
- `preferred_lawyer`, `assigned_lawyer` - Lawyer assignment
- Payment fields (future use)
- Admin fields (notes, timestamps)
- Metadata (source, UTM, lead score)

**Indexes**: 10 optimized indexes for common queries

**Triggers**:
- Auto-update `updated_at`
- Auto-set status timestamps (contacted_at, confirmed_at, etc.)

**RLS Policies**:
- Public: INSERT only
- Authenticated (admin): Full access

---

## Database Migration

### ⚠️ PENDING: SQL Migration
**File**: `/Users/hskim/theyool/supabase/migrations/20251120_cleanup_unified_consultations.sql`

**Required Steps**:
1. Go to Supabase Dashboard → SQL Editor
2. Paste contents of migration file
3. Execute SQL
4. Verify with: `node scripts/check-unified-consultations-status.js`

**What the migration does**:
1. Renames `consultations` → `consultations_old_backup`
2. Renames `bookings` → `bookings_old_backup`
3. Renames `consultations_unified` → `consultations`
4. Updates all index names (removes `_uni` suffix)
5. Renames triggers
6. Updates RLS policy names
7. Grants appropriate permissions

**Rollback**: Backup tables preserved for 1-2 weeks

---

## Files to Clean Up (After Migration Success)

### Backend Files
```
lib/supabase/bookings.ts           (11 KB) - DELETE
types/booking.ts                    (7 KB)  - DELETE
app/api/bookings/                   (dir)   - DELETE
app/api/admin/bookings/             (dir)   - DELETE
```

### Frontend Files (If Exist)
```
app/booking/                        (dir)   - CHECK & UPDATE
app/admin/bookings/                 (dir)   - CHECK & UPDATE
components/features/BookingForm.tsx - CHECK & UPDATE
```

### Scripts to Archive
```
scripts/*booking*.js                - ARCHIVE to /scripts/archive/
```

---

## Next Steps

### Phase 1: Execute Migration (CRITICAL)
1. ✅ Review migration SQL
2. ⬜ Execute migration in Supabase Dashboard
3. ⬜ Verify with status check script
4. ⬜ Test API endpoints

### Phase 2: Clean Up Old Files
1. ⬜ Delete `lib/supabase/bookings.ts`
2. ⬜ Delete `types/booking.ts`
3. ⬜ Delete `app/api/bookings/` directory
4. ⬜ Delete `app/api/admin/bookings/` directory
5. ⬜ Archive booking scripts

### Phase 3: Update Admin UI (If Needed)
1. ⬜ Check `/app/admin/consultations` page
2. ⬜ Update to handle 4 request types
3. ⬜ Add request_type filter UI
4. ⬜ Update table columns to show type
5. ⬜ Add type-specific detail views

### Phase 4: Update Forms
1. ⬜ Update existing CallbackForm to use new API
2. ⬜ Create VisitConsultationForm
3. ⬜ Create VideoConsultationForm
4. ⬜ Create InfoRequestForm
5. ⬜ Update ConsultationButton to show type selector

### Phase 5: SMS/Email Integration
1. ⬜ Implement SMS sending on status changes
2. ⬜ Add email confirmations
3. ⬜ Calculate and update lead scores
4. ⬜ Add reminder notifications (1 day before)

### Phase 6: Drop Old Tables (After 1-2 Weeks)
1. ⬜ Verify unified system works well
2. ⬜ Execute: `DROP TABLE consultations_old_backup CASCADE;`
3. ⬜ Execute: `DROP TABLE bookings_old_backup CASCADE;`

---

## API Usage Examples

### Create Callback Consultation
```bash
curl -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "request_type": "callback",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "email": "hong@example.com",
    "category": "위자료",
    "message": "상담 신청합니다",
    "source": "website"
  }'
```

### Create Visit Consultation
```bash
curl -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "request_type": "visit",
    "name": "김철수",
    "phone": "010-9876-5432",
    "preferred_date": "2025-11-25",
    "preferred_time": "14:00",
    "office_location": "천안",
    "preferred_lawyer": "육심원",
    "category": "재산분할",
    "message": "방문 상담 희망합니다"
  }'
```

### Get Consultations with Filters
```bash
curl -X GET "http://localhost:3000/api/consultations?request_type=visit&status=pending&date_from=2025-11-20"
```

### Update Consultation (Admin)
```bash
curl -X PATCH http://localhost:3000/api/admin/consultations/abc123 \
  -H "Content-Type: application/json" \
  -H "Cookie: session=..." \
  -d '{
    "status": "confirmed",
    "assigned_lawyer": "육심원",
    "confirmed_date": "2025-11-25",
    "confirmed_time": "14:30",
    "admin_notes": "상담 확정 완료"
  }'
```

---

## Benefits of Unified System

### For Development
- Single codebase for all consultation types
- Consistent API patterns
- Easier to maintain and extend
- Type-safe discriminated unions
- Comprehensive filtering

### For Admin
- Single dashboard for all consultations
- Unified search across all types
- Consistent status workflow
- Better reporting and analytics
- Flexible lawyer assignment

### For Future Features
- Easy to add new consultation types
- Payment tracking built-in
- Lead scoring system ready
- SMS/Email notification infrastructure
- Advanced analytics support

---

## Testing Checklist

### API Tests
- [ ] POST callback consultation
- [ ] POST visit consultation
- [ ] POST video consultation
- [ ] POST info consultation
- [ ] POST with invalid data (should return 400)
- [ ] GET all consultations
- [ ] GET with filters
- [ ] GET by ID
- [ ] PATCH consultation (status change)
- [ ] DELETE consultation
- [ ] Admin routes with authentication
- [ ] Admin routes without authentication (should return 401)

### Database Tests
- [ ] Verify indexes exist
- [ ] Verify triggers work (updated_at, status timestamps)
- [ ] Verify RLS policies (public can INSERT, admin can SELECT/UPDATE/DELETE)
- [ ] Check constraints (visit must have location, etc.)
- [ ] Test concurrent bookings (slot availability)

### Integration Tests
- [ ] End-to-end consultation flow
- [ ] Status workflow transitions
- [ ] Lawyer assignment
- [ ] Scheduling conflicts
- [ ] Payment tracking (future)

---

## Documentation

### Files Created
1. `/Users/hskim/theyool/types/consultation.ts` - TypeScript types
2. `/Users/hskim/theyool/lib/supabase/consultations.ts` - Database functions
3. `/Users/hskim/theyool/app/api/consultations/route.ts` - Public API
4. `/Users/hskim/theyool/app/api/consultations/[id]/route.ts` - Public detail API
5. `/Users/hskim/theyool/app/api/admin/consultations/route.ts` - Admin API (updated)
6. `/Users/hskim/theyool/app/api/admin/consultations/[id]/route.ts` - Admin detail API (updated)
7. `/Users/hskim/theyool/supabase/migrations/20251120_cleanup_unified_consultations.sql` - Migration
8. `/Users/hskim/theyool/scripts/check-unified-consultations-status.js` - Verification script

### Files Updated
- `app/api/admin/consultations/route.ts` - Updated to use new types
- `app/api/admin/consultations/[id]/route.ts` - Updated to use new types

### Files to Delete (After Migration)
- `lib/supabase/bookings.ts`
- `types/booking.ts`
- `app/api/bookings/` (entire directory)
- `app/api/admin/bookings/` (entire directory)

---

## Support & Maintenance

### Common Issues

**Issue**: "Table consultations not found"
- **Solution**: Run SQL migration to rename `consultations_unified` → `consultations`

**Issue**: "Validation error: office_location is required"
- **Solution**: Visit consultations require `office_location` field ('천안' or '평택')

**Issue**: "Unauthorized"
- **Solution**: Admin routes require authentication. Check session cookie.

**Issue**: "Slot not available"
- **Solution**: Check for scheduling conflicts with `checkSlotAvailability()`

### Performance Optimization

**Indexes**: All common query patterns are indexed
- `status` (partial: excludes completed/cancelled)
- `request_type`
- `created_at` (DESC)
- `(status, request_type)` composite
- `(status, preferred_date)` for scheduling
- `(assigned_lawyer, status)` for lawyer dashboard

**Query Optimization**:
- Use filters to reduce result set
- Pagination recommended for large datasets (future)
- Consider caching for statistics queries

---

## Success Criteria

✅ **Achieved**:
- [x] Unified TypeScript types
- [x] Unified Supabase functions
- [x] Unified public API with Zod validation
- [x] Unified admin API with authentication
- [x] Database schema designed and created
- [x] Migration SQL prepared
- [x] Verification scripts created
- [x] Documentation complete

⬜ **Pending**:
- [ ] SQL migration executed
- [ ] Old tables backed up
- [ ] API endpoints tested
- [ ] Admin UI updated
- [ ] Forms updated
- [ ] SMS/Email integration
- [ ] Old files deleted
- [ ] Production deployment

---

## Conclusion

The consultation system unification is architecturally complete and ready for deployment. The implementation follows best practices:

- **Type Safety**: Discriminated unions ensure compile-time correctness
- **Validation**: Zod schemas provide runtime validation
- **Security**: RLS policies protect data, admin routes require authentication
- **Performance**: Optimized indexes and efficient queries
- **Maintainability**: Single codebase, consistent patterns
- **Extensibility**: Easy to add new types and features

**Next Critical Step**: Execute SQL migration in Supabase Dashboard.

---

**Generated**: 2025-11-20
**Author**: Claude (Backend & SEO Specialist)
**Project**: 법무법인 더율 웹사이트
