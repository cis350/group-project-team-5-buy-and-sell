import AWS from 'aws-sdk';

export default function onFileUpload(e) {
    const file = e.target.files[0];

    // Check if a file was selected
    if (!file) {
        alert('No file selected.');
        return;
    }

    // Validator function to check for image file extensions
    const isValidImageFile = (fileName) => {
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return validExtensions.includes(fileExtension);
    };

    // Reject non-image files based on their extension
    if (!isValidImageFile(file.name)) {
        alert('Invalid file type. Please select an image file.');
        return;
    }

    const ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY;
    const SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    const REGION = 'us-east-2';
    const S3_BUCKET = 'pennmarket';

    // AWS ACCESS KEY를 세팅합니다.
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', () => {
      })
      .send((err) => {
        if (err) {
          alert(err);
        } else {
          // Construct the file URL after successful upload
          const uploadedFileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;

          alert('File uploaded successfully', uploadedFileUrl);

          // Example: Update the component state or DOM
          // this.setState({ imageUrl: uploadedFileUrl });
          // or
          // document.getElementById('yourImageElementId').src = uploadedFileUrl;
        }
      });
  }
