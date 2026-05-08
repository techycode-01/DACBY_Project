# HackerNews Scraper (MERN Full-Stack)

A full-stack web application that scrapes the top stories from Hacker News, stores them in MongoDB, and allows users to browse, paginate, and bookmark them.

## 🚀 Features

- **Automated Web Scraper**: Scrapes the top 10 stories from Hacker News automatically on server start and on-demand via API.
- **JWT Authentication**: Secure user registration and login using HTTP-only cookies.
- **Dynamic Story List**: Displays stories with points, author, and relative posted time (e.g., "2 hours ago").
- **Pagination (Bonus)**: Efficiently loads stories with page limits to improve performance.
- **Bookmark System**: Authenticated users can toggle bookmarks for any story and view them on a protected page.
- **Toast Notifications**: Smooth and non-intrusive feedback for user actions.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Lucide React, React Hot Toast.
- **Backend**: Node.js, Express, Cheerio (Scraping), Mongoose (MongoDB ODM).
- **Database**: MongoDB Atlas.

---

## 📁 Folder Structure

```text
DACBY_Project/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth and validation middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── server.js       # Entry point
│   └── .env            # Backend secrets
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Auth state management
    │   ├── pages/      # View screens (Home, Login, etc.)
    │   ├── services/   # Axios API instance
    │   └── main.jsx    # Entry point
    └── .env            # Frontend environment variables
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas database URI.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DACBY_Project
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=4500
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:5173
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```env
   VITE_API_URL=http://localhost:4500
   ```

---

## 🚀 Running the Project

### Start the Backend Server
```bash
cd backend
npm run dev # or node server.js
```
The server will start on `http://localhost:4500` and automatically run the scraper once.

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Health Check
- `GET /` - Check if API is working

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories?page=1&limit=10` - Fetch paginated stories
- `GET /api/stories/:id` - Fetch single story
- `POST /api/stories/:id/bookmark` - Toggle bookmark (Auth required)
- `GET /api/stories/bookmarks` - Fetch user bookmarks (Auth required)

### Scraper
- `POST /api/scrape` - Trigger manual scrape

---

## 📮 Postman Collection

You can copy the JSON below and import it into Postman to test the APIs.

```json
{
	"info": {
		"_postman_id": "dacby-mern-hacker-news",
		"name": "HackerNews Scraper",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Health Check",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{baseUrl}}/",
					"host": [
						"{{baseUrl}}"
					],
					"path": [
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Auth",
			"item": [
				{
					"name": "Register",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"password\": \"password123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/api/auth/register",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "Login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"john@example.com\",\n    \"password\": \"password123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{baseUrl}}/api/auth/login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"auth",
								"login"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Stories",
			"item": [
				{
					"name": "Get All Stories",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/api/stories?page=1&limit=10",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"stories"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Get Bookmarks",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/api/stories/bookmarks",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"stories",
								"bookmarks"
							]
						}
					},
					"response": []
				},
				{
					"name": "Toggle Bookmark",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/api/stories/:id/bookmark",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"stories",
								":id",
								"bookmark"
							],
							"variable": [
								{
									"key": "id",
									"value": "story_id_here"
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Scraper",
			"item": [
				{
					"name": "Trigger Scrape",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{baseUrl}}/api/scrape",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"api",
								"scrape"
							]
						}
					},
					"response": []
				}
			]
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "http://localhost:4500",
			"type": "string"
		}
	]
}
```
