# Database Schema Changes - Quick Reference

## Overview
This document outlines the database schema changes made during the QA audit to support responsive images and focal point functionality.

## Critical Issue
The original schema was missing fields that the application code was trying to read/write, causing potential data loss and NaN errors in focal point calculations.

## Tables Modified

### 1. home_content Table

**New Fields Added:**
```sql
hero_background_image_mobile TEXT                -- Mobile hero background
hero_focal_x NUMERIC(3,2) DEFAULT 0.5           -- Desktop hero focal X (0-1)
hero_focal_y NUMERIC(3,2) DEFAULT 0.5           -- Desktop hero focal Y (0-1)
hero_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5    -- Mobile hero focal X (0-1)
hero_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5    -- Mobile hero focal Y (0-1)
featured_video_thumbnail TEXT DEFAULT ''         -- Custom featured video thumbnail
featured_thumbnail_mobile TEXT                   -- Mobile featured thumbnail
featured_focal_x NUMERIC(3,2) DEFAULT 0.5       -- Featured video desktop focal X
featured_focal_y NUMERIC(3,2) DEFAULT 0.5       -- Featured video desktop focal Y
featured_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5 -- Featured video mobile focal X
featured_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5 -- Featured video mobile focal Y
```

**Purpose:**
- Support different images for mobile vs desktop
- Allow precise focal point control for image cropping
- Prevent NaN errors with default values

### 2. studio_images Table

**New Fields Added:**
```sql
image_url_mobile TEXT                           -- Mobile version of image
focal_x NUMERIC(3,2) DEFAULT 0.5               -- Desktop focal X (0-1)
focal_y NUMERIC(3,2) DEFAULT 0.5               -- Desktop focal Y (0-1)
focal_x_mobile NUMERIC(3,2) DEFAULT 0.5        -- Mobile focal X (0-1)
focal_y_mobile NUMERIC(3,2) DEFAULT 0.5        -- Mobile focal Y (0-1)
```

**Purpose:**
- Responsive marquee images
- Control cropping in different aspect ratios

### 3. shows Table

**New Fields Added:**
```sql
thumbnail_mobile TEXT                           -- Mobile thumbnail
focal_x NUMERIC(3,2) DEFAULT 0.5               -- Desktop focal X (0-1)
focal_y NUMERIC(3,2) DEFAULT 0.5               -- Desktop focal Y (0-1)
focal_x_mobile NUMERIC(3,2) DEFAULT 0.5        -- Mobile focal X (0-1)
focal_y_mobile NUMERIC(3,2) DEFAULT 0.5        -- Mobile focal Y (0-1)
```

**Purpose:**
- Different thumbnails for mobile video cards
- Precise focal point control for video thumbnails

## Focal Point System

### How Focal Points Work
- Values range from 0.0 to 1.0
- (0.5, 0.5) = center of image
- (0, 0) = top-left corner
- (1, 1) = bottom-right corner
- Controls `object-position` CSS property

### Usage Example
```typescript
// In admin panel
hero_focal_x: 0.7  // 70% from left
hero_focal_y: 0.3  // 30% from top

// Translates to CSS
object-position: 70% 30%
```

## Migration Instructions

### For Existing Databases
Run `/supabase-migration.sql` in your Supabase SQL Editor:
```bash
# This will add missing columns and set defaults
# Safe to run multiple times (idempotent)
```

### For New Installations
Use the updated `/supabase-schema.sql`:
```bash
# Contains all fields from the start
# Create fresh database with complete schema
```

## Field Name Convention

### Database (PostgreSQL)
- Uses snake_case: `hero_background_image_mobile`
- Stored as: TEXT or NUMERIC(3,2)

### Frontend (TypeScript)
- Uses camelCase: `heroBackgroundImageMobile`
- Conversion happens in data loading/saving

### Mapping Example
```typescript
// Loading from database
heroFocalX: homeData.hero_focal_x ?? 0.5

// Saving to database
hero_focal_x: heroData.heroFocalX
```

## Default Values

All new fields have safe defaults:
- Images: `NULL` or `''` (empty string)
- Focal points: `0.5` (center)

This prevents:
- NaN errors in calculations
- Missing data breaking UI
- Undefined errors in components

## Admin Panel Integration

The admin panel provides UI for managing all new fields:

1. **ResponsiveImageUploader**
   - Upload desktop image
   - Upload mobile image (optional)
   - Set focal points visually

2. **FocalPointPicker**
   - Click or drag to set focal point
   - Visual crosshair feedback
   - Grid overlay for composition

3. **ImagePreviewToggle**
   - Preview desktop/mobile views
   - See how focal points affect cropping

## Testing

After migration, verify:
1. Admin panel loads without errors
2. Focal point picker is interactive
3. Save button updates database
4. Frontend pages display images correctly
5. Mobile images switch at breakpoints

## Troubleshooting

### Issue: "Column does not exist"
**Solution:** Run migration script

### Issue: Focal points show NaN
**Solution:** Update existing rows with defaults:
```sql
UPDATE home_content SET hero_focal_x = 0.5 WHERE hero_focal_x IS NULL;
```

### Issue: Images not switching on mobile
**Solution:** Ensure `image_url_mobile` is populated or leave NULL to use desktop image

## Data Types

### NUMERIC(3,2)
- Precision: 3 total digits
- Scale: 2 decimal places
- Range: 0.00 to 9.99
- Used for focal points (0.00 to 1.00)

### TEXT
- Variable length string
- Used for image URLs
- Can be NULL for optional fields

## Performance Considerations

These changes have minimal performance impact:
- 19 new columns total across 3 tables
- Numeric fields are efficient
- No additional queries needed
- Indexed on existing `id` fields

## Backup Recommendation

Before running migration:
```sql
-- Export current data
SELECT * FROM home_content;
SELECT * FROM studio_images;
SELECT * FROM shows;
```

Save results as CSV for rollback if needed.

## Support

If you encounter issues:
1. Check Supabase logs for SQL errors
2. Verify migration script ran completely
3. Check browser console for frontend errors
4. Ensure TypeScript types are updated

---

**Last Updated:** November 26, 2025
**Schema Version:** 2.0
**Migration Script:** supabase-migration.sql
