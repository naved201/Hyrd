# Hyrd

Career intelligence tool for entry-level CS job seekers.

## Stack

| Layer | Technology |
|---|---|
| Landing page | Vanilla HTML, CSS, JavaScript |
| Frontend app | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Python 3.12, FastAPI |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth |
| File storage | AWS S3 |
| AI | Anthropic Claude API |
| Job data | Adzuna API |
| Email | Resend (plain HTML/CSS templates) |
| Frontend hosting | Vercel |
| Backend hosting | AWS ECS + Fargate |
| Container registry | AWS ECR |
| Monitoring | AWS CloudWatch |
| CI/CD | GitHub Actions |

## Local Development

### Prerequisites
- Docker + Docker Compose
- Node.js 20+
- Python 3.12

### Setup

```bash
# Clone
git clone https://github.com/naved201/hyrd.git
cd hyrd

# Backend env
cp backend/.env.example backend/.env
# Fill in your API keys

# Frontend env
cp frontend/.env.local.example frontend/.env.local
# Fill in your Supabase keys

# Start backend + local postgres
docker compose up --build

# In a separate terminal — start frontend
cd frontend
npm install
npm run dev
```

Backend: http://localhost:8000
Frontend: http://localhost:3000
Landing page: http://localhost:3000/index.html (served from /public)

### Tests

```bash
cd backend
pip install -r requirements.txt
pytest tests/ -v
```

## Deployment

**Frontend:** Vercel auto-deploys on push to `main`.

**Backend:** GitHub Actions → ECR → ECS on push to `main`.

Required GitHub secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Project Structure

```
hyrd/
├── frontend/
│   ├── public/          # Vanilla HTML/CSS/JS landing page
│   ├── scratch/         # Vanilla JS proof of concepts
│   └── app/             # Next.js dashboard
├── backend/             # FastAPI app
├── infra/
│   ├── ecs/             # ECS task definition
│   └── s3/              # S3 bucket policy + CORS
└── .github/workflows/   # CI/CD pipelines
```
