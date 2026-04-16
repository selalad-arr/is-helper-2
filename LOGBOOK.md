# LOGBOOK - IS Helper 2

## [2026-04-12] - Overhaul of Data Persistence (Manual Save System)

### 🚩 Problem identified
Users reported data loss in the "Project Creation for Beginners" module. Data entered in steps 1-5 would appear briefly and then disappear or be reset.
- **Cause**: Race conditions caused by real-time Firestore auto-save (on every keystroke) conflicting with `onSnapshot` listeners and component re-renders.

### 🛠️ Changes implemented

#### 1. Core State & Data Sync
- **`AuthContext.tsx`**: Hardened the `isUserDataLoaded` state. Ensured hooks and components wait for full user profile loading before initializing state.
- **`useProjectData.ts`**: 
  - Removed automatic Firestore writes from `wrapSetState`.
  - Added `isDirty` and `isSaving` states to track local unsaved changes.
  - Exposed a manual `save()` function to persist all project metadata (Titles, Core Concept, Research Data) to Firestore in one go.

#### 2. Component Overhaul (Manual Save Integration)
- **`ReportMetadataForm.tsx`** (Step 1 & 16): 
  - Replaced auto-save with a prominent **"บันทึกข้อมูลส่วนนี้ ✨"** button.
  - Added local field state to prevent lag during typing.
- **`ChapterDraftingAssistant.tsx`** (Steps 5, 8, 11, 13, 15):
  - Removed auto-save while typing in AI-guided sections.
  - Added a **"บันทึกเนื้อหาส่วนนี้ ✨"** button at the bottom of the assistant panel.
- **`Topic3DataCollectionFlow.tsx`** (Step 7):
  - Updated to inform users that AI analysis results must be saved manually via the parent page button.
- **`IdeaMixer.tsx`** (Step 2):
  - Removed auto-save while typing in problem, interest, and subject fields.

#### 3. UX Updates
- Added manual save buttons to the following topic pages to ensure all inputs are persistable:
  - **Topic 3**: Project Titles
  - **Topic 4**: AI Problem Analysis
  - **Topic 5**: Core Idea / Introduction
  - **Topic 7**: Research Data Collection
  - **Topic 8**: Literature Review (Chapter 2)

### ✅ Results
The application now uses an **"Explicit Save"** model. This provides:
1. **Stability**: No more race conditions or vanishing text while typing.
2. **Performance**: Zero network lag during data entry.
3. **Control**: Users know exactly when their progress is saved (indicated by the "บันทึกเรียบร้อย ✅" status).

---
*End of log for 2026-04-12*
