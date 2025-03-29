# Project: Static Website Hosting with S3, CloudFront, and GitHub Actions

## Overview
This project sets up a static website hosted in an AWS S3 bucket, distributed via AWS CloudFront, with SSL certificates managed by AWS Certificate Manager. GitHub Actions is used for CI/CD automation. Future enhancements may include the integration of DynamoDB.

## Architecture Diagram

```
            +----------------------------+
            |        GitHub Actions       |
            +--------------+-------------+
                           |
                           v
            +----------------------------+
            |        AWS S3 Bucket       |
            |  (Static Website Hosting)  |
            +--------------+-------------+
                           |
                           v
            +----------------------------+
            |       AWS CloudFront       |
            | (Content Delivery Network) |
            +--------------+-------------+
                           |
                           v
            +----------------------------+
            | AWS Certificate Manager    |
            | (SSL/TLS Management)       |
            +----------------------------+
                           |
                           v
            +----------------------------+
            |       End Users            |
            +----------------------------+
```

## AWS Services Used
* Amazon S3**: Hosts the static website.
* Amazon CloudFront**: Distributes website content with caching for performance optimization.
* AWS Certificate Manager**: Provides and manages SSL/TLS certificates.
* GitHub Actions**: Automates deployment to the S3 bucket.
* (Future) Amazon DynamoDB**: May be used for dynamic data storage if required.

## Prerequisites
- AWS account with IAM permissions to manage S3, CloudFront, and ACM.
- Domain name registered in AWS Route 53 or another provider.
- GitHub repository for source code and CI/CD automation.

## Setup Instructions

### 1. Configure S3 Bucket
- Create an S3 bucket and enable static website hosting.
- Configure bucket policy to allow public read access (if necessary for hosting).

### 2. Set Up CloudFront
- Create a CloudFront distribution pointing to the S3 bucket.
- Configure a custom domain and link it to AWS Certificate Manager.

### 3. Enable SSL with AWS Certificate Manager
- Request an SSL certificate in AWS Certificate Manager.
- Attach the certificate to the CloudFront distribution.

### 4. Configure GitHub Actions for CI/CD
- Create a GitHub Actions workflow to deploy updates to the S3 bucket.
- Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to S3
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to S3
        run: |
          aws s3 sync ./website s3://your-s3-bucket-name --delete
      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 5. (Optional) Integrate DynamoDB
- If required in the future, integrate AWS SDK to interact with DynamoDB.

## Future Enhancements
- Implement AWS Lambda for backend processing.
- Use AWS API Gateway to handle API requests.
- Implement monitoring and logging with AWS CloudWatch.

## License
This project is licensed under the MIT License.

