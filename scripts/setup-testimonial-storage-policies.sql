-- Storage policies for testimonial-photos bucket

-- 1. Allow public read access to all files
CREATE POLICY "Public read access for testimonial photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-photos');

-- 2. Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload testimonial photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);

-- 3. Allow authenticated users to update files
CREATE POLICY "Authenticated users can update testimonial photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);

-- 4. Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete testimonial photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);
