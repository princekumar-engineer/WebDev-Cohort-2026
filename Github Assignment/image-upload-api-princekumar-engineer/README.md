# Image Upload API

Build an image upload system from scratch! Learn file uploads, multipart form data, image processing, and filesystem operations.

## What You'll Learn

- **File Uploads** - Handle multipart form data with multer
- **Image Processing** - Generate thumbnails with sharp library
- **Filesystem Operations** - Read, write, and delete files in Node.js
- **Metadata Storage** - Separate binary files from database records
- **Resource Cleanup** - Coordinate database and filesystem deletions
- **File Validation** - Type checking, size limits, and sanitization
- **Security** - Path traversal prevention and file type whitelisting

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB with Docker

```bash
# Start MongoDB container
docker-compose up -d

# Check if MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

The default `.env` values work out of the box.

### 4. Run Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- 01-health
npm test -- 02-connect
npm test -- 03-upload
npm test -- 04-list
npm test -- 05-download
npm test -- 06-delete
```

### 5. Start Development Server

```bash
npm run dev
```

## Project Structure

```
image-upload-api/
├── src/
│   ├── app.js                          # Express app setup (TODO)
│   ├── server.js                       # Server startup (minimal TODO)
│   ├── db/
│   │   └── connect.js                  # MongoDB connection (TODO)
│   ├── models/
│   │   └── image.model.js              # Image schema (TODO)
│   ├── controllers/
│   │   └── image.controller.js         # Upload, list, download, delete (TODO)
│   ├── routes/
│   │   └── image.routes.js             # Route definitions (TODO)
│   ├── middlewares/
│   │   ├── upload.middleware.js        # Multer config (TODO - challenging!)
│   │   ├── validateObjectId.middleware.js # ID validation (TODO)
│   │   ├── error.middleware.js         # Error handler (TODO)
│   │   └── notFound.middleware.js      # 404 handler (TODO)
│   └── utils/
│       └── thumbnail.js                # Thumbnail utilities (TODO - sharp library)
└── tests/
    ├── __helpers__/
    │   └── setupTestDb.js              # Test utilities (COMPLETE)
    └── visible/
        ├── 01-health.spec.js           # Health check tests
        ├── 02-connect.spec.js          # Database tests
        ├── 03-upload.spec.js           # Upload tests
        ├── 04-list.spec.js             # List tests
        ├── 05-download.spec.js         # Download tests
        └── 06-delete.spec.js           # Delete tests
```

## Implementation Guide

### Step 1: Basic Setup (5 points)

**File:** `src/server.js`

Read environment variables:
- `PORT` from `process.env.PORT` (default: 3000)
- `MONGO_URI` from `process.env.MONGO_URI` (default: mongodb://localhost:27017/image_upload_api)

**File:** `src/app.js`

Create Express app:
1. Add `express.json()` middleware
2. Create uploads directories (uploads/ and uploads/thumbnails/)
3. Add `GET /health` route returning `{ ok: true }`
4. Mount routes and error handlers

**Test:** `npm test -- 01-health`

---

### Step 2: Database Connection (10 points)

**File:** `src/db/connect.js`

Implement `connectDB(uri)`:
1. Validate URI is provided
2. Connect using `mongoose.connect(uri)`
3. Return connection

**Test:** `npm test -- 02-connect`

---

### Step 3: Image Upload (25 points) - Most Complex!

**File:** `src/utils/thumbnail.js`

Implement image processing utilities:

`generateThumbnail(filename)`:
1. Construct input path: `uploads/{filename}`
2. Create thumbnail name: `thumb-{filename}.jpg` (always JPEG)
3. Construct output path: `uploads/thumbnails/{thumbnailName}`
4. Use sharp to resize: 200x200 max, fit: 'inside', withoutEnlargement: true
5. Convert to JPEG with quality 80
6. Save to output path with `.toFile()`
7. Return thumbnail filename

`getImageDimensions(filepath)`:
1. Use `sharp(filepath).metadata()` to read image metadata
2. Extract and return `{ width, height }` from metadata

**File:** `src/models/image.model.js`

Define Image schema:
- originalName (String, required, trim, max 255)
- filename (String, required, unique)
- mimetype (String, required, enum: ['image/jpeg', 'image/png', 'image/gif'])
- size (Number, required, min 1, max 5MB)
- width, height (Number, required, min 1)
- thumbnailFilename (String, required)
- description (String, optional, max 500)
- tags (Array of Strings, max 10)
- uploadDate (Date, default: Date.now)
- timestamps enabled

**File:** `src/middlewares/upload.middleware.js`

Configure multer:
1. Set up diskStorage with unique filenames: `{timestamp}-{random}.{ext}`
2. Add fileFilter to allow only jpeg, png, gif
3. Set 5MB file size limit
4. Export upload middleware

**File:** `src/controllers/image.controller.js`

Implement `uploadImage`:
1. Check if file uploaded (req.file)
2. Get image dimensions using `getImageDimensions()`
3. Generate thumbnail using `generateThumbnail()`
4. Parse tags from req.body (comma-separated)
5. Save metadata to database
6. Return 201 with metadata

**File:** `src/routes/image.routes.js`

Add POST `/` route with `upload.single('image')` middleware

**Test:** `npm test -- 03-upload`

---

### Step 4: List Images (20 points)

**File:** `src/controllers/image.controller.js`

Implement `listImages`:
1. Extract query parameters:
   - page (default 1)
   - limit (default 10, max 50)
   - search (text search in originalName and description)
   - mimetype (filter by type)
   - sortBy (default: uploadDate)
   - sortOrder (asc/desc, default: desc)

2. Build MongoDB query with filters

3. Calculate pagination:
   - skip = (page - 1) * limit
   - total = count matching documents
   - pages = Math.ceil(total / limit)
   - totalSize = sum of all image sizes

4. Fetch images with sorting and pagination

5. Return `{ data: [...], meta: { total, page, limit, pages, totalSize } }`

**File:** `src/routes/image.routes.js`

Add GET `/` route

**Test:** `npm test -- 04-list`

---

### Step 5: Download Images (20 points)

**File:** `src/controllers/image.controller.js`

Implement three functions:

**getImage**: Return metadata by ID (404 if not found)

**downloadImage**:
1. Find image by ID
2. Check file exists on disk
3. Set headers (Content-Type, Content-Disposition)
4. Send file with `res.sendFile()`

**downloadThumbnail**:
1. Find image by ID
2. Check thumbnail exists
3. Set Content-Type to `image/jpeg`
4. Send thumbnail

**File:** `src/routes/image.routes.js`

Add routes:
- GET `/:id` → getImage
- GET `/:id/download` → downloadImage
- GET `/:id/thumbnail` → downloadThumbnail

All ID routes need `validateObjectId` middleware

**Test:** `npm test -- 05-download`

---

### Step 6: Delete Images (20 points)

**File:** `src/controllers/image.controller.js`

Implement `deleteImage`:
1. Find image by ID (404 if not found)
2. Delete original file (use try-catch, ignore if missing)
3. Delete thumbnail (use try-catch, ignore if missing)
4. Delete database record
5. Return 204 (no content)

**File:** `src/routes/image.routes.js`

Add DELETE `/:id` route

**Important:** Gracefully handle missing files - delete metadata even if files are gone

**Test:** `npm test -- 06-delete`

---

## API Endpoints

### POST /api/images - Upload Image

**Request:**
- Content-Type: `multipart/form-data`
- Field: `image` (file)
- Optional: `description` (string), `tags` (comma-separated)

**Response (201):**
```json
{
  "_id": "...",
  "originalName": "vacation.jpg",
  "filename": "1704067200000-abc123.jpg",
  "mimetype": "image/jpeg",
  "size": 245680,
  "width": 1920,
  "height": 1080,
  "thumbnailFilename": "thumb-1704067200000-abc123.jpg",
  "description": "Beach photo",
  "tags": ["vacation", "beach"],
  "uploadDate": "2024-01-01T00:00:00.000Z"
}
```

---

### GET /api/images - List Images

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10, max: 50)
- `search` (string) - Search in originalName and description
- `mimetype` (string) - Filter by mimetype
- `sortBy` (string) - Sort field (default: uploadDate)
- `sortOrder` (string) - asc or desc (default: desc)

**Response (200):**
```json
{
  "data": [
    {
      "_id": "...",
      "originalName": "photo.jpg",
      "mimetype": "image/jpeg",
      "size": 123456,
      "width": 1920,
      "height": 1080,
      "uploadDate": "..."
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "pages": 5,
    "totalSize": 12345678
  }
}
```

---

### GET /api/images/:id - Get Metadata

Returns image metadata (same format as upload response).

---

### GET /api/images/:id/download - Download Original

Downloads the full-resolution original image with proper Content-Type and Content-Disposition headers.

---

### GET /api/images/:id/thumbnail - Download Thumbnail

Downloads the 200x200 thumbnail (always JPEG format).

---

### DELETE /api/images/:id - Delete Image

Deletes image metadata and files. Returns 204 (no content).

---

## Required Error Format

**All errors must use this format:**

```json
{
  "error": {
    "message": "Descriptive error message"
  }
}
```

This is validated in every test!

---

## Storage Structure

```
uploads/
├── 1704067200000-abc123.jpg       # Original image
├── 1704067200001-def456.png
└── thumbnails/
    ├── thumb-1704067200000-abc123.jpg  # Thumbnail (always JPEG)
    ├── thumb-1704067200001-def456.jpg
    └── ...
```

**Filename Convention:**
- Original: `{timestamp}-{random}.{ext}`
- Thumbnail: `thumb-{original-name}.jpg`

---

## Testing Strategy

All tests use an in-memory MongoDB database for isolation. Tests are transparent - you can see exactly what's expected.

**Run tests progressively:**

```bash
npm test -- 01-health      # 5 points
npm test -- 02-connect     # 10 points
npm test -- 03-upload      # 25 points
npm test -- 04-list        # 20 points
npm test -- 05-download    # 20 points
npm test -- 06-delete      # 20 points
```

**Total: 100 points**

---

## Common Pitfalls

### 1. Not Creating Uploads Directory

**Problem:** Multer fails if `uploads/` doesn't exist

**Solution:** Create directories in `app.js`:
```javascript
const uploadsDir = path.join(__dirname, '../uploads');
const thumbnailsDir = path.join(uploadsDir, 'thumbnails');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}
```

---

### 2. Wrong Multer Field Name

**Problem:** Frontend sends `file`, backend expects `image`

**Solution:** Use `upload.single('image')` in routes (field name is 'image')

---

### 3. Not Installing sharp

**Problem:** Import fails, tests crash

**Solution:** Run `npm install` (sharp is in package.json)

---

### 4. Storing Absolute Path

**Problem:** Storing full path like `/Users/john/project/uploads/file.jpg`

**Solution:** Store only filename, reconstruct path when needed:
```javascript
// Store
filename: '1704067200000-abc123.jpg'

// Reconstruct
const filepath = path.join(__dirname, '../../uploads', image.filename);
```

---

### 5. Not Handling Multer Errors

**Problem:** File size/type errors crash server

**Solution:** Error middleware handles multer errors:
```javascript
if (err.code === 'LIMIT_FILE_SIZE') {
  return res.status(400).json({
    error: { message: 'File size exceeds 5MB limit' }
  });
}
```

---

### 6. Forgetting to Resize Thumbnail

**Problem:** Thumbnail same size as original

**Solution:** Already implemented in `utils/thumbnail.js`:
```javascript
await sharp(inputPath)
  .resize(200, 200, { fit: 'inside' })
  .jpeg({ quality: 80 })
  .toFile(outputPath);
```

---

### 7. Only Deleting Database Record

**Problem:** Files remain on disk forever

**Solution:** Delete files THEN database:
```javascript
// Delete original
await fs.promises.unlink(filepath);
// Delete thumbnail
await fs.promises.unlink(thumbnailPath);
// Delete metadata
await Image.findByIdAndDelete(id);
```

---

### 8. Error When File Already Deleted

**Problem:** Crash when file doesn't exist

**Solution:** Use try-catch, ignore ENOENT:
```javascript
try {
  await fs.promises.unlink(filepath);
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}
```

---

### 9. Not Extracting Dimensions

**Problem:** Width/height not saved

**Solution:** Use helper function:
```javascript
const { width, height } = await getImageDimensions(filepath);
```

---

### 10. Wrong Error Format

**Problem:** `{ message: "..." }` instead of `{ error: { message: "..." } }`

**Solution:** Consistent format everywhere:
```javascript
res.status(400).json({ error: { message: 'Error text' } });
```

---

## Security Best Practices

### 1. File Type Validation

**Never trust client:** Validate mimetype in multer fileFilter
```javascript
const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
if (!allowedMimes.includes(file.mimetype)) {
  cb(new Error('Invalid file type...'), false);
}
```

---

### 2. File Size Limits

**Prevent DoS:** Limit to 5MB
```javascript
limits: {
  fileSize: 5 * 1024 * 1024  // 5MB
}
```

---

### 3. Filename Sanitization

**Prevent path traversal:** Generate new filename, ignore original
```javascript
// BAD: Using original filename
filename: file.originalname  // Could be "../../etc/passwd"

// GOOD: Generate unique name
filename: `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`
```

---

### 4. Storage Location

**Security:** Store outside public directory
- Files in `uploads/` (not served directly)
- Download through API only
- No direct URL access

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
# Database
MONGO_URI=mongodb://localhost:27017/image_upload_api

# Server
PORT=3000
NODE_ENV=development
```

---

## Docker Commands

```bash
# Start MongoDB
docker-compose up -d

# Stop MongoDB
docker-compose down

# View logs
docker-compose logs -f mongodb

# Remove all data
docker-compose down -v
```

---

## Troubleshooting

### Tests failing with "MongoError: connect ECONNREFUSED"
- Start MongoDB: `docker-compose up -d`
- Check MongoDB is running: `docker-compose ps`

### "Cannot find module 'sharp'"
- Install dependencies: `npm install`
- sharp requires native compilation (automatic during install)

### "ENOENT: no such file or directory, open 'uploads/...'"
- Create uploads directory (app.js should do this)
- Check file paths are constructed correctly

### Thumbnail not generated
- Check sharp is installed
- Verify thumbnail directory exists
- Check for errors in upload controller

### File upload fails with "File too large"
- Check file size is under 5MB
- Error should be caught by error middleware

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start MongoDB
docker-compose up -d

# Run tests (watch for failures)
npm test

# Start development server (auto-restart on changes)
npm run dev

# Test upload with curl
curl -X POST http://localhost:3000/api/images \
  -F "image=@test.jpg" \
  -F "description=Test image"

# List images
curl http://localhost:3000/api/images

# Download image
curl http://localhost:3000/api/images/{id}/download -o downloaded.jpg
```

---

## Submission

1. Complete all TODO comments in source files
2. Run `npm test` - ensure all tests pass
3. Commit your code to GitHub
4. GitHub Classroom will automatically run tests and calculate your grade

---

## Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Node.js fs/promises](https://nodejs.org/api/fs.html#promises-api)

---

## License

MIT
