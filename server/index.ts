/*
 * NOTE: This file represents the Node.js backend logic.
 * In a real deployment, this runs in the container.
 */

import express from 'express';
import cors from 'cors';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Google Cloud Storage Setup
const storage = new Storage();
const BUCKET_CASTING = 'ai-impact-casting-media';
const BUCKET_SPONSOR = 'ai-impact-sponsor-logos';

// Generate Signed URL for Direct Upload
app.post('/api/uploads/sign', async (req, res) => {
  try {
    const { fileName, fileType, bucketType } = req.body;
    // Basic Auth check middleware would go here
    
    const bucketName = bucketType === 'sponsor' ? BUCKET_SPONSOR : BUCKET_CASTING;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`${Date.now()}_${fileName}`);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: fileType,
    });

    res.json({ url, path: file.name });
  } catch (error) {
    console.error('GCS Sign Error:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Admin Auth Route (Stub)
app.post('/api/auth/login', (req, res) => {
    // In real app: Validate hash with bcrypt, query Postgres
    const { password } = req.body;
    
    // Allow env var override, but default to the requested password for ease of setup/demo
    const validPass = process.env.ADMIN_PASS || 'Impact@123';

    if(password === validPass) {
        // Return JWT
        res.json({ token: 'mock-jwt-token' });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    // Corrected path: points to ../dist assuming server/ is a subdir of root
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});