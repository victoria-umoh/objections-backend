# Discovery Script API Endpoints

Base URL: `http://localhost:5000/api` (local) or your deployed backend URL

## Public Endpoints

### Get Active Discovery Script
```
GET /api/discovery-scripts/active
```
Returns the currently active discovery script for display in the frontend.

**Response:**
```json
{
  "_id": "...",
  "name": "Main Discovery Script",
  "description": "Final Expense Discovery & Handoff",
  "isActive": true,
  "phases": [
    {
      "title": "The Intro & Health Check",
      "order": 1,
      "content": "...",
      "questions": [],
      "notes": ["..."]
    }
  ]
}
```

### Get All Discovery Scripts
```
GET /api/discovery-scripts
```
Returns all discovery scripts (for admin management).

## Admin Endpoints (CRUD)

### Create New Discovery Script
```
POST /api/admin/discovery-scripts
Content-Type: application/json

{
  "name": "New Script",
  "description": "Description",
  "phases": [...]
}
```

### Update Discovery Script
```
PUT /api/admin/discovery-scripts/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "phases": [...]
}
```

### Delete Discovery Script
```
DELETE /api/admin/discovery-scripts/:id
```

### Set Active Script
```
PUT /api/admin/discovery-scripts/:id/activate
```
Deactivates all other scripts and activates this one.

## Frontend Integration

### DiscoveryScript Component (Display)
```javascript
useEffect(() => {
  fetch(`${API_URL}/api/discovery-scripts/active`)
    .then(res => res.json())
    .then(data => setDiscoveryScript(data))
    .catch(err => console.error(err));
}, []);
```

### DiscoveryManager Component (Admin CRUD)
```javascript
// Get all scripts
fetch(`${API_URL}/api/discovery-scripts`)

// Create new
fetch(`${API_URL}/api/admin/discovery-scripts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newScript)
})

// Update
fetch(`${API_URL}/api/admin/discovery-scripts/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedScript)
})

// Delete
fetch(`${API_URL}/api/admin/discovery-scripts/${id}`, {
  method: 'DELETE'
})

// Activate
fetch(`${API_URL}/api/admin/discovery-scripts/${id}/activate`, {
  method: 'PUT'
})
```
