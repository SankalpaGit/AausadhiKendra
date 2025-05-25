# 💊⚕️AausadhiKendra or MediCentre

AausadhiKendra is a web-based solution designed to address the issue of excessive unused medicines. Our mission is to create a bridge between individuals or organizations that have surplus medicines and those who are in need—whether it be underprivileged communities, social organizations, or areas affected by natural disasters. Instead of letting these medicines go to waste, AausadhiKendra helps ensure they are redirected to serve a greater social good.

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) 14+
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [.NET 8](https://dotnet.microsoft.com/en-us/)

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Package managers: `npm` or `yarn`

---

## 🧑‍💻 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/SankalpaGit/aausadhiKendra.git
cd your-repo-name
```
### 2. Setup Backend
```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

### 3. Setup Frontend 
```bash
cd frontend
npm install
npm run dev
```

```markdown
## 📁 Folder Structure



AausadhiKendra/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   ├── Program.cs
│   └── appsettings.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── public/
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.local
│
├── README.md
└── .gitignore

```

## 🚀 Running in Development
### backend server
```bash
cd backend
dotnet run
```
### frontend server
```bash
# Frontend 
cd frontend
npm run dev
```

## Access:

Frontend: http://localhost:3000<br>
API: https://localhost:5001/api