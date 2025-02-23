# ClarityHub - AI-Powered Learning Platform

An intelligent learning platform that leverages AI to generate personalized study roadmaps, interactive quizzes, and comprehensive study materials. Built for DUHacks, this platform aims to revolutionize the way students approach their academic journey.

## Team Members

- [Shreyan](<[Shreyan](https://github.com/dey11)>)
- [Arsh](<[Arsh](https://github.com/ArshCypherZ)>)
- Sagarika

## 🌟 Features

### 1. AI-Generated Study Roadmaps

- Personalized learning paths based on your subject and topic
- Customizable difficulty levels and timelines
- Progress tracking for each subtopic
- Adaptive to your prior knowledge level

### 2. Interactive Quizzes

- AI-generated questions to test your understanding
- Real-time feedback and explanations
- Progress tracking and performance analytics
- Personalized question difficulty based on your performance

### 3. Study Materials

- Comprehensive topic explanations
- Curated learning resources
- YouTube video recommendations
- Personalized content based on your learning style

## 🚀 Tech Stack

- **Frontend**: Next.js 15.1.4, React 19.0.0
- **Styling**: TailwindCSS 4.0.8
- **Authentication**: Clerk
- **Database**: Prisma with PostgreSQL
- **AI Integration**: Custom AI API for content generation

## 🛠️ Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm package manager
- PostgreSQL database
- Clerk account for authentication
- Environment variables setup

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd duhacks
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your-postgresql-url"
CLERK_SECRET_KEY="your-clerk-secret-key"
CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
DATA_API="your-ai-api-endpoint"
```

4. Run database migrations

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🎯 Usage

1. **Create a Study Roadmap**

   - Enter your study topic/syllabus
   - Specify subject, course level, and exam
   - Choose difficulty level and timeline
   - Get a personalized learning path

2. **Access Study Materials**

   - Click on any subtopic in your roadmap
   - View comprehensive explanations
   - Access curated resources and videos

3. **Take Quizzes**
   - Generate topic-specific quizzes
   - Answer questions and get instant feedback
   - Track your progress

## 🤝 Contributing

This project was created for DUHacks, but contributions are welcome! Please feel free to submit issues and pull requests.

## 🏆 Hackathon Project

This project was developed for DUHacks with the goal of making education more accessible and personalized through AI technology. Our platform demonstrates the potential of AI in education by providing customized learning experiences for every student.

---

Built with ❤️ for DUHacks
