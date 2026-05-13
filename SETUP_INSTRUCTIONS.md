## What You Need Before Starting

Before you begin, make sure you have:
 **Node.js** and **npm** installed (for the frontend)
**Python 3.7** or newer installed (for the backend)


### Step 1: Install Frontend Packages

```bash
cd frontend_technical_assessment/frontend
npm install
```

If you get an error about `zustand`, run this:
```bash
npm install zustand
```

### Step 2: Install Backend Packages

```bash
cd frontend_technical_assessment/backend
pip install fastapi uvicorn python-multipart
```

### Step 3: Start the Backend Server 

```bash
cd frontend_technical_assessment/backend
uvicorn main:app --reload
```

You should see something like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

**Leave this running in your terminal—don't close it!**

### Step 4: Start the Frontend (In the Other Terminal)

In your second terminal, run:

```bash
cd frontend_technical_assessment/frontend
npm start
```

Your browser should automatically open and show the **Visual Pipeline Designer** at `http://localhost:3000`.

## Testing It Out

1. **See the app:** You should see "Visual Pipeline Designer" in your browser
2. **Build a pipeline:**
   - Drag an "Input" node onto the canvas
   - Drag a "Text Processor" node next to it
   - Drag an "Output" node to the right
   - Connect them: Input → Text → Output
3. **Run it:** Click the "Execute Pipeline" button
4. **See the results:**
   - A popup shows the analysis:
     - How many nodes you have
     - How many connections you have
     - Whether your pipeline is valid (no loops)


### Problem: "ModuleNotFoundError: No module named 'fastapi'"
A Python package is missing.

**Fix:**
```bash
pip install fastapi uvicorn python-multipart
```

**For Frontend (try a different port):**
```bash
npm start -- --port 3001
```

**For Backend (try a different port):**
```bash
uvicorn main:app --reload --port 8001
```

Then go to `http://localhost:3001` in your browser (or whichever port you picked).

## Important Files

### Frontend Files
- **submit.js** — Sends your pipeline to the backend for analysis
- **resultsModal.js** — Shows the results in a popup window

### Backend Files
- **main.py** — Has the `/analyze` endpoint that checks your pipeline
