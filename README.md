## Getting Started

First, install dependencies:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create `.env.local` and add:

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

## Architecture Decision

For file uploads, I chose direct-to-S3 uploads using `putObject` with presigned URLs.

**Reasoning:**

`putObject` presigned URLs allow the client to upload files directly to S3, reducing server load and avoiding storing files temporarily on the server.

`createPresignedPost` could also be used, but `putObject` is simpler for my use case and allows progress tracking via `XMLHttpRequest`.

**Direct-to-Storage Security** is handled by generating presigned URLs on the server with a short expiration time. The client never has direct AWS credentials and can only upload to the specific key/path granted by the presigned URL.
