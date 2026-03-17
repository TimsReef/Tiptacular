# Tiptacular
Cross Platform Mobile Tip Calculator Application

Uses CapacitorJS framework


## Features

### Portrait and Landscape

### Themes

### Receipt Scanner

The real-time receipt scanner pipeline

Camera preview
      ↓
Receipt edge detection
      ↓
Blue receipt outline drawn
      ↓
Numeric text detection
      ↓
Lighting analysis
      ↓
Blur detection
      ↓
Confidence scoring
      ↓
Auto capture
      ↓
Perspective correction
      ↓
Text region OCR
      ↓
Total extraction

#Scanner Telemetry Steps

These steps now log successful completion of pipeline stages.

| Step                   | Meaning                  |
| ---------------------- | ------------------------ |
| `capture_start`        | scanner launched         |
| `overlay_create`       | overlay UI created       |
| `camera_preview_start` | camera preview running   |
| `frame_process`        | frame captured           |
| `quad_found`           | receipt contour detected |
| `quad_detected`        | quad geometry extracted  |
| `stability_confirmed`  | receipt stable           |
| `auto_capture`         | capture triggered        |
| `opencv_error`         | OpenCV failure           |

#Telemetry Metrics Logged

Each log entry may now include numeric metrics:
| Metric         | Purpose               |
| -------------- | --------------------- |
| `frame`        | frame number          |
| `area`         | detected receipt area |
| `stableFrames` | stability counter     |

Receipt Candidate Scoring (New Detection System)

The receipt detector now scores candidates instead of only picking the largest quad.

Scoring Factors
score = areaScore * 0.7 + aspectScore * 0.3
| Metric      | Purpose                         |
| ----------- | ------------------------------- |
| areaScore   | favors larger receipt shapes    |
| aspectScore | favors tall receipt proportions |
