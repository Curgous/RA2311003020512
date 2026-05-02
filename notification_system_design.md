<b>Campus Notification Platform API Contract</b>

<b>STAGE 1 <b>
Base URL:
https://api.campusnotify.io/

Headers:
Authorization: Bearer <token>
Content-Type: application/json

Error Response:
{
"error": {
"code": "STRING",
"message": "STRING"
}
}

POST /auth/login
Request:
{
"email": "student@college.edu",
"password": "password"
}
Response:
{
"data": {
"access_token": "string",
"expires_in": 3600
}
}

GET /notifications
Query:
type=placement|event|result
limit=number

Response:
{
"data": [
{
"id": "uuid",
"type": "placement",
"title": "Amazon Drive",
"message": "Register now",
Campus Notification Platform API Contract

Base URL:
https://api.campusnotify.io/

Headers:
Authorization: Bearer <token>
Content-Type: application/json

Error Response:
{
"error": {
"code": "STRING",
"message": "STRING"
}
}

POST /auth/login
Request:
{
"email": "student@college.edu",
"password": "password"
}
Response:
{
"data": {
"access_token": "string",
"expires_in": 3600
}
}

GET /notifications
Query:
type=placement|event|result
limit=number

Response:
{
"data": [
{
"id": "uuid",
"type": "placement",
"title": "Amazon Drive",
"message": "Register now",
"is_read": false,
"created_at": "ISO_DATE"
}
]
}

GET /notifications/unread-count
Response:
{
"data": {
"unread_count": 5
}
}

PATCH /notifications/{id}/read
Response:
{
"data": {
"id": "uuid",
"is_read": true
}
}

GET /placements
Response:
{
"data": [
{
"id": "uuid",
"company": "Amazon",
"role": "SDE",
"deadline": "ISO_DATE"
}
]
}

POST /placements/{id}/register
Response:
{
"data": {
"status": "registered"
}
}

GET /events
Response:
{
"data": [
{
"id": "uuid",
"title": "Hackathon",
"start_at": "ISO_DATE"
}
]
}

POST /events/{id}/register
Response:
{
"data": {
"status": "registered"
}
}

GET /results
Response:
{
"data": [
{
"id": "uuid",
"semester": 5,
"published_at": "ISO_DATE"
}
]
}

GET /results/{id}/me
Response:
{
"data": {
"cgpa": 8.5,
"status": "pass"
}
}

WebSocket:
wss://ws.campusnotify.io/live?token=<token>

Event:
{
"event": "notification.new",
"payload": {
"id": "uuid",
"title": "Result Released",
"type": "result"
}
}
"created_at": "ISO_DATE"
}
]
}

GET /notifications/unread-count
Response:
{
"data": {
"unread_count": 5
}
}

PATCH /notifications/{id}/read
Response:
{
"data": {
"id": "uuid",
"is_read": true
}
}

GET /placements
Response:
{
"data": [
{
"id": "uuid",
"company": "Amazon",
"role": "SDE",
"deadline": "ISO_DATE"
}
]
}

POST /placements/{id}/register
Response:
{
"data": {
"status": "registered"
}
}

GET /events
Response:
{
"data": [
{
"id": "uuid",
"title": "Hackathon",
"start_at": "ISO_DATE"
}
]
}

POST /events/{id}/register
Response:
{
"data": {
"status": "registered"
}
}

GET /results
Response:
{
"data": [
{
"id": "uuid",
"semester": 5,
"published_at": "ISO_DATE"
}
]
}

GET /results/{id}/me
Response:
{
"data": {
"cgpa": 8.5,
"status": "pass"
}
}

WebSocket:
wss://ws.campusnotify.io/live?token=<token>

Event:
{
"event": "notification.new",
"payload": {
"id": "uuid",
"title": "Result Released",
"type": "result"
}
}

# **Stage 2 — Basic System Design**

**DB Choice:** Relational (PostgreSQL/MySQL) safe for small structured data
**Schema:** Users(id), Notifications(id, user_id, type, message, is_read, created_at)
**Scaling Issue:** Joins + growing rows slow queries → add indexing on user_id, created_at
