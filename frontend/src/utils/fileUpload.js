async function getPresignedUrl(filename) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/aws/generate-presigned-url?filename=${encodeURIComponent(filename)}`);
    const data = await response.json();
    return data.url; // The presigned URL
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    return null;
  }
}

export default async function onFileUpload(e) {
  const file = e.target.files[0];

  // Check if a file was selected
  if (!file) {
    return null;
  }

  // Define accepted MIME types
  const acceptedImageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml',
  ];

  // Check if the file's MIME type is accepted
  if (!acceptedImageMimeTypes.includes(file.type)) {
    return null;
  }

  const presignedUrl = await getPresignedUrl(file.name);
  if (!presignedUrl) {
    return null;
  }

  try {
    // Use the Fetch API to upload the file to S3
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: file, // The file to upload
      headers: {
        'Content-Type': file.type, // Set the Content-Type to the file's MIME type
      },
    });

    if (uploadResponse.ok) {
      // The file is now uploaded. If needed, you can construct the S3 file URL:
      const s3FileUrl = presignedUrl.split('?')[0]; // Remove query parameters
      return s3FileUrl;
    }
    return null;
  } catch (error) {
    console.error('Error uploading file:', error);
  }

  return null;
}
