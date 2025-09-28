# Hyrd

## Project Concept
Hyrd is a simple website that enables users to upload their resume or create one on the fly. Once the resume has been fed to the website, jobs that best match the user's resume will show up. No sign-up required. Although the initial user flow is about taking a resume and matching jobs, the user will be able to search for jobs manually as well, after job matches show up. 

## Tech Stack
* HTML/CSS: UI/UX
* JavaScript: file uploads, calling the matching APIs, validating forms, and updating the UI (search, filters, and results) without page reloads
* AWS Textract: parsing text in resumes
* AWS Lambda: API calls to job sites
* AWS S3: hosts the static site and provides temporary storage for resumes during the user's session

## Challenges 
* "Best-matched" jobs are defined as job descriptions against which the user's resume would come out with maximum ATS scores. Yet to figure out the mechanism of implementing this core functionality.

## Screenshots
This is a project underway. Screenshots of the latest updates will be displayed here. 

### Landing Page
![image alt](https://github.com/naved201/Hyrd/blob/91608738b327119c2561e3926b9ec173dcf33390/media/Homepage.png)

### Job Listings Page
![image alt](https://github.com/naved201/Hyrd/blob/170675fba00d8c1d2242106d79ced920aa88828c/media/joblisings.png)
