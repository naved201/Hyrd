# Hyrd

## Project Concept
Hyrd is a simple website that enables users to upload their resume or create one on the fly. Once the resume has been fed to the website, jobs that best match the user's resume will show up. No signing up is required either. Although the initial user flow is about taking a resume and matching jobs, the user will be able to search for jobs manually as well after job matches show up. 

## Tech Stack
* HTML/CSS --- UI/UX
* JavaScript --- file uploads, calling the matching APIs, validating forms, and updating the UI (search, filters, and results) without page reloads
* AWS Textract --- parsing text in resumes
* AWS Lambda --- API calls to job sites
* AWS S3 --- hosts the static site and provides temporary storage for resumes during the user's session
