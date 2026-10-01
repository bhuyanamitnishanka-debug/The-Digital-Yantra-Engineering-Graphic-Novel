# 🧪 Step-by-Step Production Testing Protocol

Insert this verification checklist into your local workflows to validate your entire architecture before sending your portfolio link to a hiring panel.

```text
[Step 1: Check Diagnostics] ➔ [Step 2: Trace REST API Payload] ➔ [Step 3: Test Local Circuit Breaker] ➔ [Step 4: Check UI Rendering]
```

---

## 🔍 Step 1: Automated Infrastructure Pre-Flight Verification

* **Action:** Launch your local FastAPI engine and query the diagnostic route via your browser or terminal:
  ```bash
  curl -X GET "http://127.0.0.1:8000/health"
  ```
* **Success Metric:** The API must return a `200 OK` status with `services.google_ai_studio_api: "healthy"`. If it registers as unconfigured, confirm that your local environment variables match:
  ```bash
  echo $GEMINI_API_KEY
  ```

---

## 📡 Step 2: REST Schema Handshake Validation

* **Action:** Push a mock camera and PCB specification array to your endpoint using the curl diagnostic script:
  ```bash
  curl -X POST "http://127.0.0.1:8000/generate-story" \
       -H "Content-Type: application/json" \
       -d '{
         "device_name": "Pixel 9 Pro Prototype",
         "form_factor": "Monolithic Chamfered Slab",
         "camera_specs": "Triple-Lens Visor Assembly with Folded Periscope Telephoto",
         "pcb_details": "12-Layer High-Density Interconnect (HDI) Copper Routing Grid"
       }'
  ```
* **Success Metric:** The output string must be verified as plain, unformatted JSON. There must be **zero chat filler prefixes** (e.g., *"Here is your JSON response:"*) and **no backtick markdown block wrappers** (` ```json `).

---

## 🔌 Step 3: Local Network Circuit-Breaker Simulation

* **Action:** Shut down your FastAPI backend process entirely (`Ctrl + C` in the host terminal), then open your Flutter Web app environment. Change `ApiConfig.useMockData = false;` to force a direct connection, and load the screen.
* **Success Metric:** The interface must handle the network exception gracefully without throwing a grey screen or freezing the browser. The `YantraApiClient` must drop back to the pre-cached fallback payload within a fraction of a second.

---

## ⚡ Step 4: Canvas Repaint Performance Check

* **Action:** Open your browser's developer performance tools (`F12` Key → Performance monitor layout). Move the **Exploded Anatomy Split** slider from `0.0` to `1.0` quickly.
* **Success Metric:** The optical ray-tracing trajectories and PCB copper lines must update in sync with your mouse movement. CPU utilization must remain low, and the rendering track must maintain a stable **60 FPS** profile.

---

## 🔐 Maintenance & Security Checklist
1. **Never commit `.env` or credential files** (`git status --ignored` to verify).
2. **Rotate keys quarterly:** Access [Google AI Studio](https://aistudio.google.com/app/apikey) to generate and rotate tokens.
3. **Verify CORS rules:** Ensure production Render backend only accepts whitelisted origin domains.
