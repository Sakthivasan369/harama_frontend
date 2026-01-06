# HARaMA - Educational Assessment Operating System
## Product Requirements Document (Microsoft Azure Architecture)

**Version:** 3.0 - Imagine Cup 2026 Edition  
**Last Updated:** December 23, 2025  
**Document Owner:** Product & Engineering Team  
**Status:** Microsoft-Native Architecture - Startup Ready

---

## Executive Summary

HARaMA is a **modular, AI-powered Educational Assessment Operating System** built entirely on Microsoft Azure, designed to revolutionize how educational institutions manage examinations from creation through evaluation to analytics. Unlike traditional monolithic grading tools, HARaMA operates as a composable platform where each service layer functions independently, enabling institutions to adopt individual modules or the complete ecosystem.

**Core Innovation:** Layer-by-layer architecture where examination management, AI evaluation, teacher moderation, and analytics operate as independent services communicating via event-driven patterns.

**Microsoft Imagine Cup Alignment:**
- **Primary Microsoft AI Services:** Azure Document Intelligence + Azure OpenAI + Azure Cognitive Search
- **Judging Criteria Strengths:** Deep Microsoft integration (40%), scalable architecture, clear market validation path
- **Competition Path:** Scale Track (targeting institutional customers from day one)

**Target Market:** 
- Primary: Universities and colleges (200+ students/exam)
- Secondary: K-12 school districts, competitive exam boards
- Tertiary: EdTech platforms (API customers), corporate training/certification programs

**Expected Impact:**
- 80% reduction in grading time
- 95% accuracy correlation with human graders
- Enterprise-grade audit trails and compliance
- Modular adoption (single services → full platform)

---

## 1. Product Vision & Strategic Positioning

### 1.1 Vision Statement
To become the **Stripe of educational assessment** - providing composable, API-first services that institutions can integrate individually or as a complete platform, powered by Microsoft AI.

### 1.2 Core Differentiators

| Traditional Systems | HARaMA |
|-------------------|---------|
| Monolithic grading tools | Independent, composable services |
| Vendor lock-in | Microsoft-native but modular |
| Black-box AI scoring | Transparent, teacher-moderated AI |
| Single-institution focus | Multi-tenant with tenant isolation |
| Manual processes | Event-driven automation |

### 1.3 Business Model Evolution

**Phase 1 (MVP):** Free tier for individual teachers (Imagine Cup demo)
**Phase 2:** Institution licenses ($299/100 teachers/month)
**Phase 3:** API marketplace (per-call pricing for EdTech partners)
**Phase 4:** Enterprise white-label + on-premise via Azure Arc

### 1.4 Success Metrics (Year 1)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Active Institutions | 50+ | Azure tenant count |
| Answer Sheets Processed | 500,000+ | Blob Storage metrics |
| API Calls (External) | 1M+ | API Management logs |
| Teacher NPS | 60+ | Quarterly surveys |
| System Uptime | 99.5% | Azure Monitor |
| AI Accuracy vs Manual | 92%+ | A/B validation sample |

---

## 2. Microsoft Imagine Cup Compliance

### 2.1 Required Microsoft AI Services (Minimum 2)

**Primary Services:**
1. **Azure Document Intelligence (Form Recognizer)** - OCR, layout analysis, handwriting recognition
2. **Azure OpenAI Service** - Semantic understanding, feedback generation, relevancy scoring
3. **Azure Cognitive Search** - Vector embeddings, semantic search, similarity matching

**Architecture Slide Callouts:**
- Document Intelligence extracts structured text from scanned answer sheets with 90%+ confidence
- Azure OpenAI evaluates logical flow and generates personalized student feedback
- Cognitive Search powers instant similarity detection across 100K+ historical answers

### 2.2 Submission Requirements Checklist

✅ **Pitch Deck (≤15 slides):**
- Problem definition with market validation
- HARaMA solution architecture (Microsoft services highlighted)
- Demo screenshots showing Azure integration points
- Business model and institutional traction
- Team credentials and technical execution capability

✅ **3-Minute Pitch Video:**
- Live presentation simulating judge/investor pitch
- Team visible, camera positioned as judge perspective
- Clear articulation of Microsoft technology advantages

✅ **2-Minute Demo Video:**
- Narrated walkthrough of MVP functionality
- Live screen recording showing:
  - Teacher uploads answer sheet → Azure Blob Storage
  - Document Intelligence OCR extraction
  - Azure OpenAI generates evaluation + feedback
  - Teacher reviews and publishes results
- Functional product, not slides or mockups

✅ **Optional Interactive Prototypes:**
- Figma high-fidelity prototypes for Semifinals technical review
- Direct public links (no passwords)

### 2.3 Competition Timeline Alignment

| Imagine Cup Round | HARaMA Milestone | Deliverable |
|------------------|------------------|-------------|
| MVP Round (Sep 30 - Jan 9) | Core grading pipeline functional | Deck + Videos |
| Semifinals (Feb 10 - Apr 7) | Multi-tenant + analytics live | 5-week program participation + Live pitch |
| World Championship (Apr-May) | Enterprise features + pilot customer | Final pitch + technical review |

---

## 3. Complete System Architecture

### 3.1 High-Level Layered Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Teacher Web  │  │ Student      │  │ Admin        │         │
│  │ Portal       │  │ Portal       │  │ Dashboard    │         │
│  │ (Next.js)    │  │ (Mobile Web) │  │ (React)      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│          Hosted on Azure Static Web Apps                        │
└─────────────────────────────────────────────────────────────────┘
                            ▼ HTTPS/REST
┌─────────────────────────────────────────────────────────────────┐
│                     API GATEWAY LAYER                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         Azure API Management (Gateway)                    │ │
│  │  • Rate limiting  • Auth validation  • Routing           │ │
│  │  • API versioning  • Analytics  • Developer portal       │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ▼ Internal APIs
┌─────────────────────────────────────────────────────────────────┐
│                   ORCHESTRATION LAYER                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Azure Functions (Durable Functions) - Workflow Engine   │ │
│  │  • Exam lifecycle orchestration                          │ │
│  │  • Multi-step grading pipelines                          │ │
│  │  • Retry policies and compensation logic                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Azure Service Bus - Event Backbone                      │ │
│  │  • ExamCreated  • AnswerUploaded  • OCRCompleted         │ │
│  │  • EvaluationDone  • ReviewRequired  • ResultPublished   │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ▼ Events + APIs
┌─────────────────────────────────────────────────────────────────┐
│                   MICROSERVICES LAYER                           │
│ (Each service = Independent Azure App Service / Container)      │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ L1: Identity   │  │ L2: Institution│  │ L3: Exam       │  │
│  │ Management     │  │ Management     │  │ Management     │  │
│  │ Service        │  │ Service        │  │ Service        │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ L4: Answer     │  │ L5: Document   │  │ L6: AI         │  │
│  │ Ingestion      │  │ Intelligence   │  │ Evaluation     │  │
│  │ Service        │  │ Service        │  │ Engine         │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ L7: Teacher    │  │ L8: Student    │  │ L9: Analytics  │  │
│  │ Review         │  │ Results        │  │ & Insights     │  │
│  │ Service        │  │ Service        │  │ Service        │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AI & INTELLIGENCE LAYER                       │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Azure Document │  │ Azure OpenAI   │  │ Azure          │  │
│  │ Intelligence   │  │ Service        │  │ Cognitive      │  │
│  │ • OCR          │  │ • GPT-4        │  │ Search         │  │
│  │ • Layout       │  │ • Embeddings   │  │ • Vector DB    │  │
│  │ • Handwriting  │  │ • Reasoning    │  │ • Semantic     │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│  ┌────────────────┐  ┌────────────────┐                       │
│  │ Azure Cognitive│  │ Azure Machine  │                       │
│  │ Services       │  │ Learning       │                       │
│  │ • Vision       │  │ • Custom Models│                       │
│  │ • Diagram OCR  │  │ • Retraining   │                       │
│  └────────────────┘  └────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Azure SQL      │  │ Azure Cosmos   │  │ Azure Blob     │  │
│  │ Database       │  │ DB             │  │ Storage        │  │
│  │ • Users        │  │ • Reviews      │  │ • Answer sheets│  │
│  │ • Exams        │  │ • Audit logs   │  │ • Reports      │  │
│  │ • Institutions │  │ • Notifications│  │ • Backups      │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
│  ┌────────────────┐  ┌────────────────┐                       │
│  │ Azure Cache    │  │ Azure Cognitive│                       │
│  │ for Redis      │  │ Search Index   │                       │
│  │ • Session      │  │ • Vector store │                       │
│  │ • Rate limits  │  │ • Full-text    │                       │
│  └────────────────┘  └────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ANALYTICS & REPORTING LAYER                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Azure Synapse  │  │ Power BI       │  │ Azure Data     │  │
│  │ Analytics      │  │ Embedded       │  │ Factory        │  │
│  │ • Data warehouse│  │ • Dashboards  │  │ • ETL pipelines│  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Service Independence Principles

**Rule 1: No Direct Database Access Across Services**
- Service A cannot query Service B's database
- Communication only via APIs or events

**Rule 2: Event-Driven Communication**
- Services publish events to Azure Service Bus
- Subscribers react asynchronously
- Failures in one service don't cascade

**Rule 3: Separate Deployment Pipelines**
- Each service has independent CI/CD
- Rollback one service without affecting others
- Blue-green deployments per service

**Rule 4: Data Ownership**
- Each service owns its data schema
- No shared databases
- Data synchronization via events

---

## 4. Layer-by-Layer Service Breakdown

### LAYER 1: Identity & Tenant Management Service

**Purpose:** Secure, multi-tenant authentication and authorization foundation.

**Microsoft Stack:**
- Microsoft Entra ID (Azure AD B2C)
- Azure Key Vault
- Azure SQL Database

**Core Features:**

1. **Multi-Tenant Architecture**
   - Complete data isolation per institution
   - Tenant-specific configuration (branding, policies)
   - Cross-tenant reporting for administrators

2. **Role-Based Access Control (RBAC)**
   - **Super Admin:** Platform management
   - **Institution Admin:** School/college management
   - **Examiner/Teacher:** Exam creation and grading
   - **Student:** Result viewing and feedback access
   - **Auditor:** Read-only compliance access

3. **Authentication Flows**
   - Email + password with MFA
   - Microsoft 365 SSO (institutional accounts)
   - SAML 2.0 / OpenID Connect for enterprise SSO
   - API key authentication for programmatic access

4. **Security Features**
   - Token-based JWT authentication
   - Refresh token rotation
   - Session management with Redis
   - IP whitelisting for admin accounts
   - Audit trail of all authentication events

**Data Model (Azure SQL):**

```sql
-- Tenants (Institutions)
CREATE TABLE Tenants (
    TenantID UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Domain NVARCHAR(100) UNIQUE,
    SubscriptionTier NVARCHAR(50), -- Free, Pro, Enterprise
    Status NVARCHAR(50), -- Active, Suspended, Trial
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    Settings NVARCHAR(MAX) -- JSON configuration
);

-- Users
CREATE TABLE Users (
    UserID UNIQUEIDENTIFIER PRIMARY KEY,
    TenantID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Tenants(TenantID),
    Email NVARCHAR(255) NOT NULL,
    PasswordHash NVARCHAR(MAX),
    Role NVARCHAR(50), -- SuperAdmin, InstitutionAdmin, Teacher, Student
    IsActive BIT DEFAULT 1,
    LastLoginAt DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Role Assignments
CREATE TABLE RoleAssignments (
    AssignmentID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(UserID),
    TenantID UNIQUEIDENTIFIER,
    Role NVARCHAR(50),
    Scope NVARCHAR(MAX), -- JSON: {departmentID, courseID, etc}
    GrantedBy UNIQUEIDENTIFIER,
    GrantedAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
POST   /api/auth/mfa/setup
POST   /api/auth/mfa/verify

POST   /api/tenants (Super Admin only)
GET    /api/tenants/:tenantId
PUT    /api/tenants/:tenantId/settings
GET    /api/tenants/:tenantId/users
POST   /api/tenants/:tenantId/users/invite
```

**Events Published:**
- `UserRegistered`
- `UserLoggedIn`
- `TenantCreated`
- `RoleAssigned`

**Independent Operation:**
- Auth service can restart without affecting ongoing grading
- New tenants onboarded without platform downtime
- Role changes propagate via events, not synchronous calls

---

### LAYER 2: Institution & Academic Management Service

**Purpose:** Manage institutional hierarchy, students, teachers, courses, and academic structure.

**Microsoft Stack:**
- Azure App Service (FastAPI)
- Azure SQL Database
- Azure Service Bus

**Core Features:**

1. **Institution Setup**
   - Multi-level hierarchy: Institution → Department → Course → Section
   - Academic year and semester configuration
   - Campus and building management (for physical exam centers)

2. **Student Management**
   - Bulk enrollment via CSV/Excel import
   - Student profiles with roll numbers, photos, contact info
   - Class and section assignments
   - Academic history tracking

3. **Teacher Management**
   - Subject expertise mapping
   - Course assignments
   - Examiner pool management
   - Teaching load tracking

4. **Course & Subject Management**
   - Course catalog with syllabus
   - Pre-requisites and co-requisites
   - Credit hours and grading schemes
   - Subject-wise examiner assignment

**Data Model (Azure SQL):**

```sql
-- Institutions
CREATE TABLE Institutions (
    InstitutionID UNIQUEIDENTIFIER PRIMARY KEY,
    TenantID UNIQUEIDENTIFIER,
    Name NVARCHAR(255),
    Type NVARCHAR(50), -- University, College, School
    Address NVARCHAR(500),
    ContactEmail NVARCHAR(255),
    LogoUrl NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Departments
CREATE TABLE Departments (
    DepartmentID UNIQUEIDENTIFIER PRIMARY KEY,
    InstitutionID UNIQUEIDENTIFIER,
    Name NVARCHAR(255),
    Code NVARCHAR(50),
    HeadOfDepartment UNIQUEIDENTIFIER, -- UserID
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Courses
CREATE TABLE Courses (
    CourseID UNIQUEIDENTIFIER PRIMARY KEY,
    DepartmentID UNIQUEIDENTIFIER,
    CourseCode NVARCHAR(50) UNIQUE,
    CourseName NVARCHAR(255),
    Credits INT,
    Syllabus NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Students
CREATE TABLE Students (
    StudentID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER, -- Links to Layer 1
    InstitutionID UNIQUEIDENTIFIER,
    RollNumber NVARCHAR(50) UNIQUE,
    EnrollmentYear INT,
    CurrentSemester INT,
    DepartmentID UNIQUEIDENTIFIER,
    PhotoUrl NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Teachers
CREATE TABLE Teachers (
    TeacherID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER,
    InstitutionID UNIQUEIDENTIFIER,
    EmployeeCode NVARCHAR(50),
    DepartmentID UNIQUEIDENTIFIER,
    Specialization NVARCHAR(MAX), -- JSON array
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Course Enrollments
CREATE TABLE CourseEnrollments (
    EnrollmentID UNIQUEIDENTIFIER PRIMARY KEY,
    StudentID UNIQUEIDENTIFIER,
    CourseID UNIQUEIDENTIFIER,
    AcademicYear INT,
    Semester INT,
    EnrolledAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
POST   /api/institutions
GET    /api/institutions/:institutionId
PUT    /api/institutions/:institutionId

POST   /api/institutions/:institutionId/departments
GET    /api/departments/:departmentId

POST   /api/courses
GET    /api/courses/:courseId
PUT    /api/courses/:courseId/syllabus

POST   /api/students/bulk-import
GET    /api/students/:studentId
PUT    /api/students/:studentId
GET    /api/students?courseId=xxx

POST   /api/teachers
GET    /api/teachers/:teacherId
GET    /api/teachers?subjectExpertise=Physics
```

**Events Published:**
- `StudentEnrolled`
- `TeacherAssigned`
- `CourseCreated`
- `SemesterStarted`

**Startup Expansion:**
Can be sold as standalone **Academic ERP Module** for institutions not needing grading.

---

### LAYER 3: Examination & Question Management Service

**Purpose:** Define exams, questions, rubrics, and answer keys independent of evaluation logic.

**Microsoft Stack:**
- Azure App Service
- Azure SQL Database
- Azure Blob Storage (for question papers)
- Azure Service Bus

**Core Features:**

1. **Exam Creation & Configuration**
   - Exam metadata (title, date, duration, total marks)
   - Question paper structure:
     - Sections (Part A, B, C)
     - Question types (MCQ, Short Answer, Descriptive, Diagram)
     - Marks allocation per question
   - Optional questions (e.g., "Answer 3 out of 5")
   - Correction mode presets (Strict/Moderate/Lenient)

2. **Question Bank Management**
   - Reusable question library with version control
   - Taxonomy: Subject → Topic → Difficulty → Question
   - Rich content support (text, images, formulas in LaTeX)
   - Duplicate detection across exams

3. **Answer Key & Rubric Definition**
   - Model answers (text + images)
   - Keyword-based scoring rules
   - Point-wise rubrics:
     ```json
     {
       "concept_explanation": {"weight": 0.4, "keywords": ["Newton", "inertia"]},
       "formula_accuracy": {"weight": 0.3, "required": "F=ma"},
       "example_provided": {"weight": 0.3, "optional": true}
     }
     ```
   - Multiple acceptable answer variants
   - Subject-specific scoring templates (Physics, Chemistry, etc.)

4. **Exam Scheduling & Logistics**
   - Exam calendar with conflict detection
   - Examiner assignment
   - Invigilator scheduling
   - Seating arrangement generation

**Data Model (Azure SQL):**

```sql
-- Exams
CREATE TABLE Exams (
    ExamID UNIQUEIDENTIFIER PRIMARY KEY,
    TenantID UNIQUEIDENTIFIER,
    CourseID UNIQUEIDENTIFIER,
    Title NVARCHAR(255),
    Description NVARCHAR(MAX),
    ExamDate DATETIME2,
    Duration INT, -- minutes
    TotalMarks DECIMAL(5,2),
    PassingMarks DECIMAL(5,2),
    CorrectionMode NVARCHAR(50), -- Strict, Moderate, Lenient
    Status NVARCHAR(50), -- Draft, Published, InProgress, Completed
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Questions
CREATE TABLE Questions (
    QuestionID UNIQUEIDENTIFIER PRIMARY KEY,
    ExamID UNIQUEIDENTIFIER,
    QuestionNumber NVARCHAR(10), -- "1a", "2b", etc.
    QuestionText NVARCHAR(MAX),
    QuestionType NVARCHAR(50), -- Descriptive, ShortAnswer, Diagram
    MaxMarks DECIMAL(5,2),
    IsOptional BIT DEFAULT 0,
    OptionalGroupID UNIQUEIDENTIFIER, -- For "attempt 2 out of 3" groups
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Answer Keys
CREATE TABLE AnswerKeys (
    AnswerKeyID UNIQUEIDENTIFIER PRIMARY KEY,
    QuestionID UNIQUEIDENTIFIER,
    ModelAnswer NVARCHAR(MAX),
    RubricDefinition NVARCHAR(MAX), -- JSON
    Keywords NVARCHAR(MAX), -- JSON array
    AlternativeAnswers NVARCHAR(MAX), -- JSON array
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Question Bank (Reusable)
CREATE TABLE QuestionBank (
    QuestionBankID UNIQUEIDENTIFIER PRIMARY KEY,
    TenantID UNIQUEIDENTIFIER,
    Subject NVARCHAR(100),
    Topic NVARCHAR(100),
    Difficulty NVARCHAR(50), -- Easy, Medium, Hard
    QuestionText NVARCHAR(MAX),
    ModelAnswer NVARCHAR(MAX),
    TimesUsed INT DEFAULT 0,
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
POST   /api/exams
GET    /api/exams/:examId
PUT    /api/exams/:examId
DELETE /api/exams/:examId
POST   /api/exams/:examId/publish

POST   /api/exams/:examId/questions
GET    /api/questions/:questionId
PUT    /api/questions/:questionId

POST   /api/questions/:questionId/answer-key
GET    /api/questions/:questionId/answer-key
PUT    /api/answer-keys/:answerkeyId

GET    /api/question-bank?subject=Physics&topic=Mechanics
POST   /api/question-bank/import-to-exam
```

**Events Published:**
- `ExamCreated`
- `ExamPublished`
- `QuestionAdded`
- `AnswerKeyUpdated`
- `RubricModified`

**Independent Operation:**
- Exam definition changes don't trigger re-evaluation of existing submissions
- Question bank updates don't affect active exams
- Answer key versioning allows historical accuracy audits

---

### LAYER 4: Answer Ingestion & Storage Service

**Purpose:** Handle all answer sheet uploads, preprocessing, and storage without knowing anything about evaluation.

**Microsoft Stack:**
- Azure Functions (file upload handlers)
- Azure Blob Storage (Hot/Cool/Archive tiers)
- Azure Service Bus
- Azure SQL (metadata only)

**Core Features:**

1. **Multi-Format Upload**
   - PDF (multi-page answer booklets)
   - Images (JPEG, PNG) - individual pages or full booklet scans
   - Batch upload (up to 100 sheets at once)
   - Drag-and-drop web interface
   - Mobile app camera capture (future)

2. **Preprocessing Pipeline**
   - Auto-rotation and deskewing
   - Page splitting for multi-page PDFs
   - Image quality enhancement (contrast, brightness)
   - Duplicate detection
   - File compression (target: 1-2MB per page)

3. **Metadata Extraction & Tagging**
   - Student identification:
     - Barcode/QR code scanning (if present)
     - Roll number OCR from header
     - Manual student mapping
   - Exam association
   - Page numbering and sequencing
   - Timestamp and uploader tracking

4. **Storage Strategy**
```
Blob Storage Structure:
├─ Raw Uploads (Hot tier, 7-day retention)
│  └─ {tenantId}/{examId}/{studentId}/raw_{timestamp}.pdf
├─ Processed Sheets (Hot tier, 90-day retention)
│  └─ {tenantId}/{examId}/{studentId}/processed_{pageNum}.jpg
├─ Extracted Answers (Cool tier, 365-day retention)
│  └─ {tenantId}/{examId}/{studentId}/question_{qNum}.jpg
└─ Archive (Archive tier, permanent)
   └─ {tenantId}/{examId}/archive.zip
```

5. **Re-upload & Versioning**
   - Allow students/teachers to re-submit corrected scans
   - Version tracking (v1, v2, v3)
   - Only latest version used for grading
   - Audit trail of all versions

**Data Model (Azure SQL):**

```sql
-- Answer Sheet Submissions
CREATE TABLE AnswerSheetSubmissions (
    SubmissionID UNIQUEIDENTIFIER PRIMARY KEY,
    ExamID UNIQUEIDENTIFIER,
    StudentID UNIQUEIDENTIFIER,
    SubmittedAt DATETIME2 DEFAULT GETDATE(),
    SubmittedBy UNIQUEIDENTIFIER, -- UserID (student or proctor)
    TotalPages INT,
    Status NVARCHAR(50), -- Uploaded, Processing, Ready, Failed
    BlobStoragePath NVARCHAR(500),
    Version INT DEFAULT 1,
    IsLatest BIT DEFAULT 1
);

-- Answer Sheet Pages
CREATE TABLE AnswerSheetPages (
    PageID UNIQUEIDENTIFIER PRIMARY KEY,
    SubmissionID UNIQUEIDENTIFIER,
    PageNumber INT,
    BlobStoragePath NVARCHAR(500),
    ProcessingStatus NVARCHAR(50), -- Pending, Processed, Failed
    ProcessedAt DATETIME2,
    QualityScore DECIMAL(3,2) -- 0-1 scale
);

-- Student-Question Mapping (for cropped answers)
CREATE TABLE ExtractedAnswers (
    ExtractedAnswerID UNIQUEIDENTIFIER PRIMARY KEY,
    SubmissionID UNIQUEIDENTIFIER,
    QuestionID UNIQUEIDENTIFIER,
    BlobStoragePath NVARCHAR(500), -- Cropped image of specific answer
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
POST   /api/submissions/upload (multipart/form-data)
GET    /api/submissions/:submissionId/status
GET    /api/submissions/:submissionId/pages
POST   /api/submissions/:submissionId/reprocess
DELETE /api/submissions/:submissionId

GET    /api/exams/:examId/submissions (list all submissions)
GET    /api/students/:studentId/submissions
```

**Events Published:**
- `AnswerSheetUploaded`
- `PreprocessingCompleted`
- `AnswerSheetReady` (triggers OCR in Layer 5)
- `UploadFailed`

**Performance SLAs:**
- Upload acceptance: <5 seconds for 10MB file
- Preprocessing: <30 seconds for 10-page booklet
- Batch processing: 100 sheets in <10 minutes

**Independent Operation:**
- Ingestion service can process uploads even if OCR service is down
- Failed uploads retry automatically without manual intervention
- Storage tier migrations happen independently of grading workflows

---

### LAYER 5: Document Intelligence Service

**Purpose:** Extract structured text and layout information from scanned answer sheets using Microsoft AI.

**Microsoft Stack:**
- Azure Document Intelligence (Form Recognizer) - **Primary Microsoft AI Service #1**
- Azure Functions (orchestration)
- Azure Cognitive Services - Computer Vision (for diagrams)
- Azure Service Bus
- Azure Cosmos DB (OCR results cache)

**Core Features:**

1. **Handwritten Text Extraction**
   - Multi-language support (English, Spanish, Hindi, Tamil - roadmap)
   - Cursive and print handwriting recognition
   - Per-character confidence scoring
   - Line and paragraph detection
   - Margin notes and corrections handling

2. **Layout Analysis**
   - Question number detection
   - Answer boundary identification
   - Table structure recognition (for data-based questions)
   - Diagram vs text segmentation
   - Multi-column layout parsing

3. **Quality & Confidence Metrics**
   - Per-word confidence scores (0-1 scale)
   - Overall page readability score
   - Low-confidence region highlighting
   - Automatic flagging for human review (<75% confidence)
   - Blur and skew detection

4. **Mathematical & Scientific Content**
   - Formula recognition (basic - using Computer Vision)
   - Chemical structure detection
   - Graph and chart interpretation
   - Symbol extraction (∑, ∫, √, etc.)

5. **Structured Output Format**
```json
{
  "submissionId": "uuid",
  "examId": "uuid",
  "studentId": "uuid",
  "pages": [
    {
      "pageNumber": 1,
      "overallConfidence": 0.92,
      "questions": [
        {
          "questionNumber": "1a",
          "extractedText": "Newton's first law states...",
          "confidence": 0.95,
          "wordCount": 47,
          "boundingBox": {"x": 100, "y": 200, "width": 400, "height": 150},
          "hasFormula": false,
          "hasDiagram": false,
          "requiresManualReview": false
        }
      ]
    }
  ],
  "extractedAt": "2026-01-15T10:30:00Z",
  "processingTime": 8.2
}
```

**Data Model (Azure Cosmos DB):**

```json
// OCR Results Collection (optimized for read-heavy workloads)
{
  "id": "ocr_result_uuid",
  "partitionKey": "examId", // For efficient querying
  "submissionId": "uuid",
  "examId": "uuid",
  "studentId": "uuid",
  "extractionStatus": "Completed", // Pending, InProgress, Completed, Failed
  "overallConfidence": 0.89,
  "extractedData": {
    // Structured JSON from Document Intelligence
  },
  "lowConfidenceRegions": [
    {
      "questionNumber": "3b",
      "confidence": 0.68,
      "reason": "Poor handwriting quality"
    }
  ],
  "processingMetadata": {
    "modelVersion": "2024-11-30-preview",
    "processingTime": 12.5,
    "retryCount": 0
  },
  "createdAt": "2026-01-15T10:30:00Z",
  "ttl": 7776000 // 90 days, then archived
}
```

**API Endpoints:**

```
POST   /api/ocr/extract (triggered by event)
GET    /api/ocr/results/:submissionId
GET    /api/ocr/results/:submissionId/confidence-report
POST   /api/ocr/retry/:submissionId (for failed extractions)
GET    /api/ocr/low-confidence (list all flagged answers)
```

**Processing Pipeline:**

```
AnswerSheetReady Event
        ↓
Azure Function triggered
        ↓
Fetch image from Blob Storage
        ↓
Call Document Intelligence API
        ↓
Parse layout and text
        ↓
Calculate confidence scores
        ↓
Store results in Cosmos DB
        ↓
Publish OCRCompleted Event
        ↓
If confidence < 75%, publish ManualReviewRequired Event
```

**Events Published:**
- `OCRStarted`
- `OCRCompleted`
- `OCRFailed`
- `LowConfidenceDetected`
- `ManualReviewRequired`

**Performance SLAs:**
- Processing time: <15 seconds per 10-page answer sheet
- Accuracy: 90%+ for clear handwriting
- Throughput: 500 concurrent extractions
- Retry logic: 3 attempts with exponential backoff

**Rate Limiting Strategy:**
- Azure Document Intelligence free tier: 20 calls/minute
- Implement queue-based processing to stay under limits
- Priority queue for paid tier customers
- Batch processing for non-urgent extractions

**Independent Operation:**
- OCR service failure doesn't prevent new uploads
- Re-extraction possible without re-uploading files
- Confidence thresholds configurable per institution
- Fallback to manual data entry if OCR consistently fails

---

### LAYER 6: AI Evaluation & Scoring Engine

**Purpose:** Generate AI-suggested marks using multiple scoring strategies with transparent reasoning.

**Microsoft Stack:**
- Azure OpenAI Service (GPT-4, embeddings) - **Primary Microsoft AI Service #2**
- Azure Cognitive Search (vector search) - **Primary Microsoft AI Service #3**
- Azure Machine Learning (custom models)
- Azure Functions (scoring orchestration)
- Azure Service Bus
- Azure SQL Database

**Core Features:**

1. **Multi-Strategy Scoring System**

   **A. Deterministic Rule-Based Scorer**
   - Keyword matching with fuzzy logic
   - Point allocation per keyword presence
   - Formula verification (exact match)
   - Structure checks (introduction, body, conclusion)
   
   **B. Semantic Similarity Scorer**
   - Generate embeddings using Azure OpenAI `text-embedding-3-large`
   - Store model answer embeddings in Azure Cognitive Search
   - Calculate cosine similarity between student answer and model answer
   - Score range: 0.0 (no similarity) to 1.0 (perfect match)
   
   **C. LLM Reasoning Scorer**
   - Use Azure OpenAI GPT-4 for:
     - Logical flow evaluation
     - Concept coverage assessment
     - Critical thinking identification
     - Relevancy to question validation
   - Structured prompt engineering:
   ```
   You are an expert examiner evaluating a student answer.
   
   Question: {question_text}
   Model Answer: {model_answer}
   Student Answer: {student_answer}
   Rubric: {rubric_json}
   
   Evaluate the student answer on:
   1. Conceptual accuracy (0-10)
   2. Completeness (0-10)
   3. Logical coherence (0-10)
   4. Relevancy to question (0-10)
   
   Provide scores in JSON format with brief justifications.
   ```

   **D. Ensemble Aggregator**
   - Weighted combination of all scorers:
     ```python
     final_score = (
         0.3 * deterministic_score +
         0.4 * semantic_similarity_score +
         0.3 * llm_reasoning_score
     )
     ```
   - Weights configurable per subject/institution
   - Confidence score based on scorer agreement

2. **Correction Mode Implementation**

   | Mode | Similarity Threshold | LLM Weight | Keyword Strictness |
   |------|---------------------|------------|-------------------|
   | Strict | ≥ 0.85 | 40% | All required keywords must be present |
   | Moderate | ≥ 0.70 | 30% | 80% keywords required |
   | Lenient | ≥ 0.55 | 20% | 60% keywords required |

3. **Partial Credit Logic**
   - Concept-based partial marks:
     ```json
     {
       "question": "Explain Newton's First Law",
       "totalMarks": 5,
       "partialCredit": {
         "concept_mentioned": 2.0,
         "example_provided": 1.5,
         "formula_included": 1.0,
         "real_world_application": 0.5
       }
     }
     ```
   - Progressive marking (2/5 marks for partial understanding)
   - Subject-specific templates (Physics, Chemistry, Biology, etc.)

4. **Bias Detection & Mitigation**
   - Cross-reference scores across demographic groups
   - Flag outlier evaluations for review
   - Blind evaluation (no student identity during AI scoring)
   - Regular fairness audits via Azure Machine Learning

5. **Explainable AI - Feedback Generation**
   - Auto-generate feedback using Azure OpenAI:
     - What the student did well
     - What was missing or incorrect
     - Specific improvement suggestions
   - Feedback templates by question type
   - Multi-language feedback (future)

**Data Model (Azure SQL):**

```sql
-- AI Evaluations
CREATE TABLE AIEvaluations (
    EvaluationID UNIQUEIDENTIFIER PRIMARY KEY,
    SubmissionID UNIQUEIDENTIFIER,
    QuestionID UNIQUEIDENTIFIER,
    ExtractedAnswerID UNIQUEIDENTIFIER,
    
    -- Individual Scorer Results
    DeterministicScore DECIMAL(5,2),
    SemanticSimilarityScore DECIMAL(5,2),
    LLMReasoningScore DECIMAL(5,2),
    
    -- Final Results
    AISuggestedMarks DECIMAL(5,2),
    MaxMarks DECIMAL(5,2),
    ConfidenceScore DECIMAL(3,2), -- 0-1 scale
    
    -- Metadata
    CorrectionMode NVARCHAR(50),
    EvaluatedAt DATETIME2 DEFAULT GETDATE(),
    ProcessingTime DECIMAL(5,2), -- seconds
    
    -- Flags
    RequiresManualReview BIT DEFAULT 0,
    ReviewReason NVARCHAR(255)
);

-- AI Feedback
CREATE TABLE AIFeedback (
    FeedbackID UNIQUEIDENTIFIER PRIMARY KEY,
    EvaluationID UNIQUEIDENTIFIER,
    FeedbackText NVARCHAR(MAX),
    FeedbackType NVARCHAR(50), -- Positive, Constructive, Critical
    GeneratedBy NVARCHAR(50), -- GPT4, RuleEngine
    GeneratedAt DATETIME2 DEFAULT GETDATE()
);

-- Scoring Weights Configuration
CREATE TABLE ScoringWeights (
    ConfigID UNIQUEIDENTIFIER PRIMARY KEY,
    TenantID UNIQUEIDENTIFIER,
    Subject NVARCHAR(100),
    DeterministicWeight DECIMAL(3,2),
    SemanticWeight DECIMAL(3,2),
    LLMWeight DECIMAL(3,2),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- Embeddings Cache (for performance)
CREATE TABLE AnswerEmbeddings (
    EmbeddingID UNIQUEIDENTIFIER PRIMARY KEY,
    AnswerKeyID UNIQUEIDENTIFIER, -- Model answer
    EmbeddingVector VARBINARY(MAX), -- Serialized vector
    ModelVersion NVARCHAR(50), -- e.g., text-embedding-3-large
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

**Scoring Pipeline (Durable Function Orchestration):**

```python
# Pseudo-code for scoring orchestration
@app.orchestration_trigger()
async def score_answer_orchestrator(context):
    submission_id = context.get_input()
    
    # Step 1: Fetch extracted answer and model answer
    extracted_answer = await context.call_activity('fetch_extracted_answer', submission_id)
    model_answer = await context.call_activity('fetch_model_answer', extracted_answer['question_id'])
    
    # Step 2: Run scorers in parallel
    tasks = [
        context.call_activity('deterministic_scorer', {
            'student_answer': extracted_answer,
            'model_answer': model_answer
        }),
        context.call_activity('semantic_similarity_scorer', {
            'student_answer': extracted_answer,
            'model_answer': model_answer
        }),
        context.call_activity('llm_reasoning_scorer', {
            'student_answer': extracted_answer,
            'model_answer': model_answer,
            'rubric': model_answer['rubric']
        })
    ]
    
    scores = await asyncio.gather(*tasks)
    
    # Step 3: Ensemble aggregation
    final_score = await context.call_activity('aggregate_scores', {
        'scores': scores,
        'weights': get_scoring_weights(extracted_answer['subject'])
    })
    
    # Step 4: Generate feedback
    feedback = await context.call_activity('generate_feedback', {
        'student_answer': extracted_answer,
        'scores': final_score,
        'model_answer': model_answer
    })
    
    # Step 5: Store results
    await context.call_activity('store_evaluation', {
        'submission_id': submission_id,
        'final_score': final_score,
        'feedback': feedback
    })
    
    # Step 6: Publish event
    await context.call_activity('publish_event', {
        'event': 'EvaluationCompleted',
        'data': {'submission_id': submission_id, 'score': final_score}
    })
    
    return final_score
```

**Azure Cognitive Search Integration:**

```json
// Index Schema for Vector Search
{
  "name": "answer-embeddings-index",
  "fields": [
    {"name": "id", "type": "Edm.String", "key": true},
    {"name": "answerKeyId", "type": "Edm.String", "filterable": true},
    {"name": "questionId", "type": "Edm.String", "filterable": true},
    {"name": "modelAnswerText", "type": "Edm.String", "searchable": true},
    {"name": "embedding", "type": "Collection(Edm.Single)", 
     "dimensions": 3072, "vectorSearchProfile": "my-vector-config"},
    {"name": "subject", "type": "Edm.String", "filterable": true},
    {"name": "createdAt", "type": "Edm.DateTimeOffset"}
  ],
  "vectorSearch": {
    "profiles": [
      {
        "name": "my-vector-config",
        "algorithm": "hnsw"
      }
    ]
  }
}
```

**API Endpoints:**

```
POST   /api/evaluation/score/:submissionId
GET    /api/evaluation/results/:submissionId
GET    /api/evaluation/results/:submissionId/detailed
GET    /api/evaluation/confidence-report/:examId
POST   /api/evaluation/recalculate/:evaluationId (with different weights)
GET    /api/evaluation/feedback/:evaluationId
```

**Events Published:**
- `EvaluationStarted`
- `EvaluationCompleted`
- `HighConfidenceScore` (>90%)
- `LowConfidenceScore` (<70% - triggers manual review)
- `EvaluationFailed`

**Performance & Cost Optimization:**

1. **Caching Strategy:**
   - Cache model answer embeddings (avoid re-computing)
   - Cache common student answer patterns
   - Use Azure Cache for Redis for hot data

2. **Rate Limiting:**
   - Azure OpenAI: 60 requests/minute (free tier)
   - Implement priority queue: Paid customers > Free tier
   - Batch processing for non-urgent evaluations

3. **Cost Control:**
   - LLM scoring only for answers >50 words
   - Semantic similarity for short answers
   - Deterministic scoring for keyword-heavy subjects (Biology)

4. **Fallback Strategy:**
   - If Azure OpenAI unavailable → use semantic similarity only
   - If Cognitive Search down → use local FAISS index
   - Graceful degradation without blocking grading

**Independent Operation:**
- Scoring engine can be retrained without affecting OCR
- New scoring models deployed independently via Azure ML
- Weight adjustments don't require service restart
- Historical re-scoring possible without re-extraction

---

### LAYER 7: Teacher Review & Moderation Service

**Purpose:** Human-in-the-loop oversight, mark adjustment, and final approval.

**Microsoft Stack:**
- Azure App Service (FastAPI + Next.js frontend)
- Azure Cosmos DB (review history, immutable audit logs)
- Azure SignalR Service (real-time collaboration)
- Azure SQL Database (final marks)
- Azure Service Bus

**Core Features:**

1. **Review Dashboard**
   - **Queue Management:**
     - Priority queues:
       1. Low confidence answers (AI confidence <70%)
       2. Disputed evaluations
       3. Standard review queue
     - Filters: By subject, by evaluator, by confidence range
     - Batch review mode (review 10 answers at once)
   
   - **Side-by-Side Comparison View:**
     ```
     ┌─────────────────────┬─────────────────────┬─────────────────────┐
     │   Model Answer      │   Student Answer    │   AI Evaluation     │
     ├─────────────────────┼─────────────────────┼─────────────────────┤
     │ Newton's first law  │ Objects at rest     │ ✓ Similarity: 0.82  │
     │ states that an      │ stay at rest unless │ ✓ Keywords: 4/6     │
     │ object at rest...   │ force acts on them  │ ⚠ Missing: inertia  │
     │                     │                     │ Suggested: 7/10     │
     └─────────────────────┴─────────────────────┴─────────────────────┘
     ```
   
   - **Visual Indicators:**
     - 🟢 Green: High confidence (≥85%)
     - 🟡 Yellow: Medium confidence (70-84%)
     - 🔴 Red: Low confidence (<70%) - requires mandatory review
     - 🔵 Blue: Already reviewed by another examiner

2. **Mark Adjustment Interface**
   - **Override Mechanism:**
     - Click to edit AI-suggested marks
     - Reason code required for changes >20%:
       - "Concept understood but explanation unclear"
       - "Student used alternative valid approach"
       - "AI missed context-specific terminology"
       - "Grading too strict/lenient"
     - Free-text justification field
   
   - **Partial Credit Tools:**
     - Rubric checklist:
       ```
       [ ] Concept explanation (2 marks)
       [x] Formula included (1 mark)
       [x] Example provided (1.5 marks)
       [ ] Real-world application (0.5 marks)
       Total: 2.5 / 5 marks
       ```
     - Quick marks buttons (+0.5, +1, -0.5, -1)
   
   - **Comment & Feedback Editor:**
     - Rich text editor for teacher feedback
     - AI-generated feedback pre-populated (editable)
     - Template library:
       - "Good effort, but you missed..."
       - "Excellent explanation of..."
       - "Consider including..."
     - Voice-to-text feedback (future)

3. **Examiner Calibration**
   - **Blind Review Mode:**
     - 10% of answers reviewed by 2+ examiners independently
     - Compare marks and flag discrepancies >15%
     - Resolve conflicts via senior examiner
   
   - **Consistency Metrics:**
     - Track each teacher's average adjustment from AI
     - Flag outlier evaluators (too strict/too lenient)
     - Generate calibration reports:
       ```
       Teacher A: Avg adjustment +2.3 marks (lenient)
       Teacher B: Avg adjustment -1.8 marks (strict)
       Teacher C: Avg adjustment +0.2 marks (consistent)
       ```

4. **Collaborative Review**
   - **Real-Time Collaboration (Azure SignalR):**
     - Multiple examiners can discuss answers in chat
     - @mention senior examiners for difficult cases
     - Shared annotations on scanned images
   
   - **Dispute Resolution Workflow:**
     - Teacher marks answer → Student appeals → Second examiner reviews
     - Escalation path: Teacher → Department Head → External Examiner
     - All versions tracked with timestamps

5. **Immutable Audit Trail**
   - **Track Every Change:**
     ```json
     {
       "auditLogId": "uuid",
       "evaluationId": "uuid",
       "action": "MarksModified",
       "oldValue": 7.0,
       "newValue": 8.5,
       "modifiedBy": "teacher_user_id",
       "reason": "Student used alternative valid approach",
       "justification": "Student derived the formula from first principles...",
       "timestamp": "2026-01-15T14:30:00Z",
       "ipAddress": "192.168.1.100",
       "deviceInfo": "Chrome 120 on Windows"
     }
     ```
   
   - **Compliance Features:**
     - Audit logs immutable (append-only)
     - Tamper-proof cryptographic signatures
     - Export for institutional audits
     - FERPA/GDPR compliant retention policies

6. **Bulk Actions**
   - Accept all high-confidence evaluations (>90%)
   - Reject all and send for re-evaluation
   - Apply uniform adjustment (e.g., +1 mark to all Question 5 answers)
   - Export review batch to Excel for offline analysis

**Data Model (Azure Cosmos DB):**

```json
// Review Sessions Collection
{
  "id": "review_session_uuid",
  "partitionKey": "examId",
  "examId": "uuid",
  "reviewerId": "teacher_user_id",
  "startedAt": "2026-01-15T10:00:00Z",
  "endedAt": "2026-01-15T12:30:00Z",
  "totalReviewed": 45,
  "avgAdjustment": +1.2,
  "sessionMetrics": {
    "highConfidenceAccepted": 30,
    "lowConfidenceReviewed": 15,
    "marksModified": 12,
    "commentsAdded": 8
  }
}

// Audit Logs Collection (Immutable)
{
  "id": "audit_log_uuid",
  "partitionKey": "evaluationId",
  "evaluationId": "uuid",
  "actionType": "MarksModified",
  "before": {
    "aiSuggestedMarks": 7.0,
    "status": "PendingReview"
  },
  "after": {
    "finalMarks": 8.5,
    "status": "Reviewed"
  },
  "actor": {
    "userId": "teacher_user_id",
    "role": "Teacher",
    "name": "Dr. John Smith"
  },
  "metadata": {
    "reason": "AlternativeApproach",
    "justification": "Student used vector method instead of calculus...",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  },
  "timestamp": "2026-01-15T14:30:00Z",
  "_etag": "immutable"
}
```

**Data Model (Azure SQL):**

```sql
-- Final Marks (After Teacher Review)
CREATE TABLE FinalMarks (
    FinalMarkID UNIQUEIDENTIFIER PRIMARY KEY,
    EvaluationID UNIQUEIDENTIFIER FOREIGN KEY REFERENCES AIEvaluations(EvaluationID),
    SubmissionID UNIQUEIDENTIFIER,
    QuestionID UNIQUEIDENTIFIER,
    
    AISuggestedMarks DECIMAL(5,2),
    FinalMarks DECIMAL(5,2),
    MarksAdjustment DECIMAL(5,2) COMPUTED AS (FinalMarks - AISuggestedMarks),
    
    ReviewedBy UNIQUEIDENTIFIER, -- Teacher UserID
    ReviewedAt DATETIME2 DEFAULT GETDATE(),
    ReviewStatus NVARCHAR(50), -- Approved, Modified, Rejected
    
    TeacherFeedback NVARCHAR(MAX),
    IsPublished BIT DEFAULT 0,
    PublishedAt DATETIME2
);

-- Review Queue
CREATE TABLE ReviewQueue (
    QueueID UNIQUEIDENTIFIER PRIMARY KEY,
    EvaluationID UNIQUEIDENTIFIER,
    Priority INT, -- 1=High (low confidence), 2=Medium, 3=Low
    AssignedTo UNIQUEIDENTIFIER, -- Teacher UserID
    Status NVARCHAR(50), -- Pending, InProgress, Completed
    AddedAt DATETIME2 DEFAULT GETDATE(),
    CompletedAt DATETIME2
);

-- Examiner Calibration
CREATE TABLE ExaminerCalibration (
    CalibrationID UNIQUEIDENTIFIER PRIMARY KEY,
    ExamID UNIQUEIDENTIFIER,
    TeacherID UNIQUEIDENTIFIER,
    TotalReviewed INT,
    AvgAdjustment DECIMAL(5,2),
    StrictnesScore DECIMAL(3,2), -- -1 (too strict) to +1 (too lenient)
    ConsistencyScore DECIMAL(3,2), -- 0 (inconsistent) to 1 (highly consistent)
    CalculatedAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
GET    /api/review/queue?priority=high&subject=Physics
POST   /api/review/claim/:evaluationId (assign to current teacher)
PUT    /api/review/marks/:evaluationId
POST   /api/review/feedback/:evaluationId
POST   /api/review/approve/:evaluationId
POST   /api/review/reject/:evaluationId
GET    /api/review/calibration/:teacherId

GET    /api/review/audit/:evaluationId (immutable audit trail)
GET    /api/review/session/:sessionId/metrics

POST   /api/review/bulk-approve (high confidence)
POST   /api/review/bulk-adjust (uniform adjustment)
```

**Real-Time Collaboration (SignalR):**

```javascript
// Frontend: Subscribe to review updates
const connection = new signalR.HubConnectionBuilder()
  .withUrl("/reviewHub")
  .build();

connection.on("ExaminerJoined", (examinerName) => {
  showNotification(`${examinerName} is now reviewing`);
});

connection.on("AnswerClaimedByOther", (evaluationId) => {
  disableAnswer(evaluationId);
  showWarning("This answer is being reviewed by another examiner");
});

connection.on("MarksUpdated", (evaluationId, newMarks) => {
  refreshAnswer(evaluationId);
});
```

**Events Published:**
- `ReviewStarted`
- `MarksModified`
- `ReviewCompleted`
- `DisputeRaised`
- `CalibrationReportGenerated`

**Independent Operation:**
- Review service can be updated without affecting scoring
- Audit logs persist independently in Cosmos DB
- Real-time features gracefully degrade if SignalR unavailable
- Offline review mode with background sync (future)

---

### LAYER 8: Student Results & Feedback Service

**Purpose:** Deliver personalized results, feedback, and learning recommendations to students.

**Microsoft Stack:**
- Azure Static Web Apps (student portal frontend)
- Azure App Service (API)
- Azure SQL Database
- Azure OpenAI (personalized feedback)
- Azure Communication Services (email/SMS notifications)
- Azure Service Bus

**Core Features:**

1. **Result Publication Workflow**
   - **Staged Release:**
     - Draft → Internal Review → Published
     - Scheduled publication (e.g., Jan 15 at 10:00 AM)
     - Bulk publish all students or selective release
   
   - **Notification System:**
     - Email notifications (Azure Communication Services)
     - SMS alerts (opt-in, for important exams)
     - In-app notifications
     - Push notifications (mobile app - future)

2. **Student Result Dashboard**
   - **Overview Card:**
     ```
     ┌─────────────────────────────────────┐
     │  Midterm Examination - Physics      │
     │                                     │
     │  Your Score: 87 / 100               │
     │  Grade: A                           │
     │  Rank: 12 / 150 students            │
     │  Class Average: 74                  │
     │  Percentile: 92nd                   │
     └─────────────────────────────────────┘
     ```
   
   - **Question-Wise Breakdown:**
     | Question | Your Marks | Max Marks | Feedback |
     |----------|-----------|-----------|----------|
     | 1a | 5 / 5 | ✅ Excellent | |
     | 1b | 3.5 / 5 | ⚠️ Good effort | Missing key formula |
     | 2a | 7 / 10 | ❌ Needs work | Concept unclear |
   
   - **Visual Analytics:**
     - Radar chart: Performance across topics
     - Line chart: Progress over semester
     - Comparison with class average (optional visibility)

3. **AI-Powered Personalized Feedback**
   - **Strengths Identification:**
     ```
     You demonstrated excellent understanding of:
     • Newton's Laws of Motion
     • Free body diagrams
     • Force calculation methods
     ```
   
   - **Areas for Improvement:**
     ```
     Consider reviewing:
     • Conservation of momentum (Q2a, Q3b)
     • Problem-solving for collision scenarios
     
     Recommended resources:
     - Khan Academy: Momentum and Collisions
     - Practice problems: Pages 45-50 in textbook
     ```
   
   - **Concept Gap Analysis:**
     - Compare student answer keywords vs model answer
     - Identify missing concepts
     - Generate targeted study recommendations

4. **Re-Evaluation Request System**
   - **Student Appeal Workflow:**
     - Student reviews marks → Submits appeal with justification
     - Teacher notified → Second examiner assigned
     - Decision made within 48 hours
     - Student notified of outcome
   
   - **Appeal Data Model:**
     ```sql
     CREATE TABLE ReEvaluationRequests (
         RequestID UNIQUEIDENTIFIER PRIMARY KEY,
         SubmissionID UNIQUEIDENTIFIER,
         QuestionID UNIQUEIDENTIFIER,
         StudentID UNIQUEIDENTIFIER,
         OriginalMarks DECIMAL(5,2),
         RequestReason NVARCHAR(MAX),
         SupportingEvidence NVARCHAR(MAX), -- Text explanation
         Status NVARCHAR(50), -- Pending, UnderReview, Approved, Rejected
         ReviewedBy UNIQUEIDENTIFIER,
         ReviewOutcome NVARCHAR(50),
         NewMarks DECIMAL(5,2),
         CreatedAt DATETIME2 DEFAULT GETDATE(),
         ResolvedAt DATETIME2
     );
     ```

5. **Downloadable Reports**
   - **PDF Marksheet:**
     - Institutional letterhead
     - Student details + photo
     - Question-wise marks
     - Teacher signature (digital)
     - QR code for verification
   
   - **Detailed Performance Report:**
     - Topic-wise analysis
     - Strengths and weaknesses
     - Improvement recommendations
     - Historical performance trends
   
   - **Certificate Generation:**
     - For top performers (configurable thresholds)
     - Automated generation using templates
     - Digital signatures via Azure Key Vault

6. **Learning Recommendations Engine**
   - **Adaptive Learning Paths:**
     - Based on incorrect answers, suggest:
       - Video tutorials (YouTube, Khan Academy)
       - Practice problem sets
       - Peer study group recommendations
     - Powered by Azure OpenAI:
       ```
       Prompt: "Student scored 3/10 on momentum conservation. Generate 3 learning resources."
       Output: 
       1. Khan Academy video on elastic/inelastic collisions
       2. Practice: 15 worked problems on momentum
       3. Concept review: Conservation laws fundamentals
       ```

**Data Model (Azure SQL):**

```sql
-- Published Results
CREATE TABLE PublishedResults (
    ResultID UNIQUEIDENTIFIER PRIMARY KEY,
    SubmissionID UNIQUEIDENTIFIER,
    StudentID UNIQUEIDENTIFIER,
    ExamID UNIQUEIDENTIFIER,
    TotalMarks DECIMAL(5,2),
    MaxMarks DECIMAL(5,2),
    Percentage DECIMAL(5,2),
    Grade NVARCHAR(5), -- A+, A, B+, etc.
    Rank INT,
    IsPublished BIT DEFAULT 0,
    PublishedAt DATETIME2,
    PublishedBy UNIQUEIDENTIFIER
);

-- Student Feedback
CREATE TABLE StudentFeedback (
    FeedbackID UNIQUEIDENTIFIER PRIMARY KEY,
    ResultID UNIQUEIDENTIFIER,
    QuestionID UNIQUEIDENTIFIER,
    FeedbackText NVARCHAR(MAX),
    FeedbackCategory NVARCHAR(50), -- Strength, Improvement, Recommendation
    GeneratedBy NVARCHAR(50), -- AI, Teacher
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- Learning Recommendations
CREATE TABLE LearningRecommendations (
    RecommendationID UNIQUEIDENTIFIER PRIMARY KEY,
    StudentID UNIQUEIDENTIFIER,
    ExamID UNIQUEIDENTIFIER,
    Topic NVARCHAR(255),
    ResourceType NVARCHAR(50), -- Video, Article, Practice
    ResourceURL NVARCHAR(500),
    Priority INT, -- 1=High, 2=Medium, 3=Low
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
```

**API Endpoints:**

```
GET    /api/results/student/:studentId
GET    /api/results/exam/:examId/student/:studentId
GET    /api/results/:resultId/detailed
GET    /api/results/:resultId/feedback
GET    /api/results/:resultId/report (PDF download)

POST   /api/results/:resultId/appeal
GET    /api/results/appeals/:studentId
PUT    /api/results/appeals/:requestId/resolve

GET    /api/recommendations/:studentId
POST   /api/recommendations/:recommendationId/complete
```

**Events Published:**
- `ResultPublished`
- `NotificationSent`
- `AppealSubmitted`
- `AppealResolved`
- `ReportGenerated`

**Independent Operation:**
- Student portal works even if scoring/review services are down (shows cached results)
- Notifications queued and sent asynchronously
- Report generation doesn't block result viewing
- Appeal system operates independently of main grading pipeline

---

### LAYER 9: Analytics, Audit & Insights Service

**Purpose:** Transform exam data into institutional intelligence for continuous improvement.

**Microsoft Stack:**
- Azure Synapse Analytics (data warehouse)
- Power BI Embedded (dashboards)
- Azure Data Factory (ETL pipelines)
- Azure Machine Learning (predictive models)
- Azure Stream Analytics (real-time metrics)
- Azure SQL Database

**Core Features:**

1. **Institutional Dashboards (Multi-Level)**

   **A. Executive Dashboard (University/Board Level)**
   ```
   ┌─────────────────────────────────────────────────┐
   │  Academic Performance Overview - Fall 2025      │
   ├─────────────────────────────────────────────────┤
   │  Total Exams: 450                               │
   │  Total Students: 12,500                         │
   │  Total Answer Sheets Processed: 187,000         │
   │  Avg Processing Time: 23 min/exam               │
   │  Manual Review Rate: 12%                        │
   │                                                 │
   │  [Line Chart: Pass rates by department]        │
   │  [Heat Map: Topic difficulty across courses]   │
   │  [Pie Chart: Grade distribution]               │
   └─────────────────────────────────────────────────┘
   ```
   
   **B. Department Head Dashboard**
   - Course-wise performance trends
   - Teacher evaluation consistency
   - Student cohort analysis
   - Resource allocation recommendations

   **C. Teacher Dashboard**
   - My exams performance summary
   - Question difficulty insights
   - Grading time analytics
   - Student improvement tracking

2. **Advanced Analytics Features**

   **A. Question Difficulty Analysis**
   ```sql
   -- Calculate question difficulty index
   SELECT 
       q.QuestionID,
       q.QuestionNumber,
       AVG(fm.FinalMarks / q.MaxMarks) AS AvgScoreRatio,
       CASE 
           WHEN AVG(fm.FinalMarks / q.MaxMarks) > 0.8 THEN 'Easy'
           WHEN AVG(fm.FinalMarks / q.MaxMarks) > 0.5 THEN 'Medium'
           ELSE 'Hard'
       END AS DifficultyLevel,
       COUNT(*) AS TotalAttempts
   FROM Questions q
   JOIN FinalMarks fm ON q.QuestionID = fm.QuestionID
   GROUP BY q.QuestionID, q.QuestionNumber, q.MaxMarks
   ```
   
   Output:
   | Question | Avg Score | Difficulty | Students |
   |----------|-----------|------------|----------|
   | 1a | 92% | Easy | 150 |
   | 2b | 45% | Hard | 150 |
   | 3a | 68% | Medium | 148 |

   **B. Curriculum Effectiveness Heatmap**
   ```
   Topic Coverage vs Student Performance
   
             Module 1  Module 2  Module 3  Module 4
   Class A     🟢 85%    🟡 72%    🟢 88%    🔴 54%
   Class B     🟢 82%    🟢 79%    🟡 71%    🔴 48%
   Class C     🟡 75%    🟢 81%    🟢 83%    🟡 65%
   
   🟢 Strong (>75%)  🟡 Moderate (60-75%)  🔴 Needs Focus (<60%)
   ```

   **C. Examiner Calibration Report**
   ```
   Teacher         Avg Adjustment  Strictness  Consistency  Reviews
   Dr. Smith           +0.3         Balanced      High         245
   Prof. Johnson       +2.1         Lenient       Medium       198
   Dr. Williams        -1.8         Strict        High         312
   Ms. Davis           +0.1         Balanced      Very High    276
   ```
   
   **Actionable Insights:**
   - Flag Prof. Johnson for calibration training (too lenient)
   - Recognize Dr. Williams and Ms. Davis for consistency
   - Standardize grading rubrics across examiners

   **D. Student Progression Tracking**
   - Longitudinal analysis: Track individual student performance across semesters
   - Early warning system: Flag students with declining trends
   - Intervention triggers:
     ```
     Student ID: 2025-CS-101
     Alert: Performance dropped 25% in last 2 exams
     Recommended Action: Academic counseling
     ```

   **E. Time-to-Grade Analytics**
   ```
   Grading Pipeline Performance Metrics:
   
   Stage                  Avg Time    Target    Status
   OCR Extraction         12 sec      <15 sec   ✅
   AI Evaluation          8 sec       <10 sec   ✅
   Teacher Review         4.2 min     <5 min    ✅
   Total per Answer       4.6 min     <6 min    ✅
   
   Bottleneck: Teacher review for low-confidence answers (12 min avg)
   Recommendation: Improve AI confidence to reduce manual review rate
   ```

3. **Predictive Analytics (Azure ML)**

   **A. At-Risk Student Identification**
   - Train ML model on historical data:
     - Input features: Exam scores, attendance, question-wise performance, topic mastery
     - Output: Probability of failing next exam
   - Early intervention alerts to advisors
   
   **B. Exam Outcome Forecasting**
   - Predict class average before exam based on:
     - Historical performance
     - Question difficulty
     - Topic coverage
     - Student preparation levels
   
   **C. Grading Workload Optimization**
   - Predict manual review rate based on:
     - Exam type
     - Question difficulty
     - Student cohort
   - Allocate examiner resources proactively

4. **Compliance & Audit Reports**

   **A. Institutional Audit Trails**
   - All mark changes with justifications
   - Examiner activity logs
   - System access logs
   - Data retention compliance reports
   
   **B. Government/Board Reporting**
   - Export formats: CSV, Excel, PDF
   - Templates for:
     - National Examination Boards
     - Accreditation agencies
     - University Grants Commission
   - Automated report generation and submission

   **C. Fairness & Bias Audits**
   - Analyze score distributions by:
     - Gender, ethnicity (anonymized aggregates)
     - Socioeconomic background (if data available)
     - Language proficiency
   - Flag statistically significant disparities
   - Generate diversity & inclusion reports

5. **Real-Time Operational Dashboards**
   - **Live Exam Monitoring:**
     ```
     Current Active Exams: 12
     
     Exam: Physics Midterm (Live)
     Submissions: 145 / 150 (96%)
     OCR In Progress: 8
     AI Evaluation Queue: 23
     Awaiting Review: 45
     Published Results: 69
     
     System Health: ✅ All services operational
     ```
   
   - **System Performance Metrics:**
     - API response times
     - Service availability
     - Azure resource utilization
     - Cost tracking

6. **Data Warehouse Schema (Azure Synapse)**

```sql
-- Fact Table: Exam Results
CREATE TABLE FactExamResults (
    ResultFactID BIGINT PRIMARY KEY,
    ExamID UNIQUEIDENTIFIER,
    StudentID UNIQUEIDENTIFIER,
    QuestionID UNIQUEIDENTIFIER,
    TeacherID UNIQUEIDENTIFIER,
    DateKey INT, -- Date dimension
    
    -- Measures
    MaxMarks DECIMAL(5,2),
    AISuggestedMarks DECIMAL(5,2),
    FinalMarks DECIMAL(5,2),
    MarksAdjustment DECIMAL(5,2),
    ConfidenceScore DECIMAL(3,2),
    
    -- Processing Metrics
    OCRTime DECIMAL(5,2),
    EvaluationTime DECIMAL(5,2),
    ReviewTime DECIMAL(5,2),
    
    -- Flags
    RequiredManualReview BIT,
    WasAppealed BIT,
    WasModified BIT
);

-- Dimension: Students
CREATE TABLE DimStudent (
    StudentKey INT PRIMARY KEY,
    StudentID UNIQUEIDENTIFIER,
    RollNumber NVARCHAR(50),
    Name NVARCHAR(255),
    DepartmentID UNIQUEIDENTIFIER,
    EnrollmentYear INT,
    -- Slowly Changing Dimension Type 2
    EffectiveDate DATE,
    ExpiryDate DATE,
    IsCurrent BIT
);

-- Dimension: Exams
CREATE TABLE DimExam (
    ExamKey INT PRIMARY KEY,
    ExamID UNIQUEIDENTIFIER,
    ExamTitle NVARCHAR(255),
    Subject NVARCHAR(100),
    DepartmentID UNIQUEIDENTIFIER,
    ExamType NVARCHAR(50), -- Midterm, Final, Quiz
    TotalMarks DECIMAL(5,2),
    ExamDate DATE
);

-- Dimension: Questions
CREATE TABLE DimQuestion (
    QuestionKey INT PRIMARY KEY,
    QuestionID UNIQUEIDENTIFIER,
    QuestionNumber NVARCHAR(10),
    QuestionType NVARCHAR(50),
    Topic NVARCHAR(100),
    DifficultyLevel NVARCHAR(50),
    MaxMarks DECIMAL(5,2)
);

-- Dimension: Date
CREATE TABLE DimDate (
    DateKey INT PRIMARY KEY,
    FullDate DATE,
    Year INT,
    Quarter INT,
    Month INT,
    MonthName NVARCHAR(20),
    Week INT,
    DayOfWeek INT,
    DayName NVARCHAR(20),
    AcademicYear INT,
    Semester INT
);
```

7. **ETL Pipelines (Azure Data Factory)**

```python
# Pseudo-code for nightly ETL
@app.pipeline('nightly_analytics_etl')
def run_etl():
    # Extract: Pull data from operational databases
    exam_results = extract_from_sql('FinalMarks')
    student_data = extract_from_sql('Students')
    exam_metadata = extract_from_sql('Exams')
    
    # Transform: Cleanse and aggregate
    results_cleaned = cleanse_data(exam_results)
    aggregated_metrics = calculate_aggregations(results_cleaned)
    dimension_updates = process_scd_type2(student_data)
    
    # Load: Insert into Synapse
    load_to_synapse('FactExamResults', aggregated_metrics)
    load_to_synapse('DimStudent', dimension_updates)
    
    # Refresh Power BI datasets
    refresh_powerbi_dataset('InstitutionalDashboard')
    
    # Send summary email to admins
    send_notification('ETL completed successfully')
```

8. **Power BI Embedded Dashboards**

```javascript
// Frontend integration
import { PowerBIEmbed } from 'powerbi-client-react';

<PowerBIEmbed
  embedConfig={{
    type: 'report',
    id: '<report-id>',
    embedUrl: 'https://app.powerbi.com/reportEmbed',
    accessToken: '<azure-ad-token>',
    tokenType: models.TokenType.Aad,
    settings: {
      panes: {
        filters: { expanded: false, visible: true }
      },
      background: models.BackgroundType.Transparent,
    }
  }}
  cssClassName="power-bi-report"
/>
```

**API Endpoints:**

```
GET    /api/analytics/dashboard/executive
GET    /api/analytics/dashboard/department/:departmentId
GET    /api/analytics/dashboard/teacher/:teacherId

GET    /api/analytics/exams/:examId/difficulty-analysis
GET    /api/analytics/exams/:examId/time-metrics
GET    /api/analytics/teachers/:teacherId/calibration

GET    /api/analytics/students/:studentId/progression
GET    /api/analytics/students/at-risk

POST   /api/analytics/reports/generate (custom report builder)
GET    /api/analytics/reports/:reportId/download

GET    /api/analytics/real-time/system-health
GET    /api/analytics/real-time/active-exams
```

**Events Published:**
- `ReportGenerated`
- `AlertTriggered` (at-risk student, system anomaly)
- `DashboardRefreshed`
- `AuditReportCompleted`

**Independent Operation:**
- Analytics failures don't affect grading operations
- Dashboards cache data for offline viewing
- ETL delays don't impact real-time exam processing
- Predictive models can be retrained independently

---

## 5. Cross-Cutting Concerns

### 5.1 Security Architecture

**A. Network Security**
- Azure Front Door: WAF, DDoS protection
- Azure Private Link: Secure service-to-service communication
- NSG rules: Restrict inbound/outbound traffic
- Azure Firewall: Centralized network policy enforcement

**B. Identity & Access**
- Microsoft Entra ID (Azure AD B2C): SSO, MFA, Conditional Access
- Managed Identities: Service-to-service authentication
- Azure Key Vault: Secrets, keys, certificates management
- RBAC: Fine-grained permissions at resource level

**C. Data Protection**
- Encryption at rest: Azure Storage/SQL/Cosmos DB default encryption
- Encryption in transit: TLS 1.3 for all communications
- Azure Information Protection: Classify and label sensitive data
- Customer-managed keys (CMK): For enterprise customers

**D. Compliance**
- Azure Policy: Enforce organizational standards
- Microsoft Purview: Data governance and compliance
- Audit logs: Azure Monitor + Log Analytics
- Certifications: SOC 2, ISO 27001, FERPA, GDPR

### 5.2 Monitoring & Observability

**A. Application Monitoring**
- Azure Application Insights: Distributed tracing, performance metrics
- Custom telemetry: Business KPIs (grading speed, accuracy)
- Real-time alerts: Slack/Teams notifications

**B. Infrastructure Monitoring**
- Azure Monitor: Resource health, metrics, logs
- Log Analytics: Centralized log aggregation
- Alerts: Threshold-based and anomaly detection

**C. Cost Management**
- Azure Cost Management: Budget alerts, cost analysis
- Resource tagging: Track costs by department/exam
- Reserved instances: Optimize long-term costs

### 5.3 Disaster Recovery

**A. Backup Strategy**
- Azure SQL: Automated backups (point-in-time restore to 35 days)
- Cosmos DB: Continuous backup mode
- Blob Storage: Geo-redundant storage (GRS)
- Configuration backups: Azure DevOps repos

**B. High Availability**
- Multi-region deployment: Active-active or active-passive
- Azure Traffic Manager: DNS-based load balancing
- Availability Zones: 99.99% SLA

**C. Recovery Procedures**
- RTO (Recovery Time Objective): <4 hours
- RPO (Recovery Point Objective): <15 minutes
- Disaster recovery drills: Quarterly testing

### 5.4 Performance Optimization

**A. Caching Strategy**
- Azure Cache for Redis: Session data, hot data
- CDN: Static assets (images, JS, CSS)
- Cosmos DB caching: Frequently accessed documents

**B. Database Optimization**
- Indexing: Optimize query performance
- Partitioning: Distribute data for scalability
- Connection pooling: Reduce connection overhead

**C. Asynchronous Processing**
- Azure Service Bus: Decouple services
- Durable Functions: Long-running workflows
- Priority queues: Paid customers get faster processing

---

## 6. MVP Feature Scope (Imagine Cup Demo)

### Must-Have (Critical Path)
✅ **Layer 1:** Basic authentication (email + Microsoft OAuth)
✅ **Layer 2:** Single institution setup, student/teacher management
✅ **Layer 3:** Exam creation, simple answer key upload
✅ **Layer 4:** PDF/image upload, basic preprocessing
✅ **Layer 5:** Azure Document Intelligence OCR
✅ **Layer 6:** AI evaluation with all 3 scorers (deterministic + semantic + LLM)
✅ **Layer 7:** Teacher review interface with side-by-side comparison
✅ **Layer 8:** Basic student result view
✅ **Layer 9:** Simple class analytics dashboard

### Nice-to-Have (Post-MVP)
🔲 Multi-tenant with full isolation
🔲 Question bank library
🔲 Advanced rubric builder
🔲 Real-time collaboration (SignalR)
🔲 Re-evaluation appeals
🔲 Predictive analytics
🔲 Mobile apps
🔲 Power BI embedded dashboards

### Demo Flow (2-Minute Video)
1. **[0:00-0:15]** Teacher logs in, creates exam "Physics Midterm"
2. **[0:15-0:30]** Uploads question paper + answer key
3. **[0:30-0:50]** Uploads 3 scanned answer sheets (show batch progress bar)
4. **[0:50-1:05]** Show Azure Document Intelligence extracting text (live)
5. **[1:05-1:20]** Show AI evaluation with confidence scores
6. **[1:20-1:40]** Teacher reviews one low-confidence answer, modifies marks
7. **[1:40-1:55]** Publishes results, student receives notification
8. **[1:55-2:00]** Show class analytics (score distribution chart)

**Highlight Microsoft Services:**
- Show "Powered by Azure Document Intelligence" logo during OCR
- Display "Azure OpenAI" badge when AI evaluates answer
- Mention "Azure Cognitive Search" when showing similarity scores

---

## 7. Technical Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4) - **Imagine Cup MVP**
- [ ] Azure tenant + resource group setup
- [ ] Entra ID B2C authentication
- [ ] Basic frontend (Next.js on Azure Static Web Apps)
- [ ] FastAPI backend (Azure App Service)
- [ ] Azure SQL + Cosmos DB schemas
- [ ] Layer 4: File upload to Blob Storage
- [ ] Layer 5: Document Intelligence integration
- [ ] Layer 6: Basic AI scoring (semantic similarity only)
- [ ] Layer 7: Simple review UI
- [ ] **Deliverable:** Working demo video

### Phase 2: AI Enhancement (Weeks 5-8) - **Post-Imagine Cup**
- [ ] Azure OpenAI integration (GPT-4 + embeddings)
- [ ] Azure Cognitive Search vector index
- [ ] Ensemble scoring engine
- [ ] Feedback generation
- [ ] Confidence-based review queues
- [ ] **Deliverable:** Production-ready grading pipeline

### Phase 3: Scale & Multi-Tenancy (Weeks 9-12)
- [ ] Multi-tenant architecture
- [ ] Institution management APIs
- [ ] Role-based access control
- [ ] Bulk student import
- [ ] Question bank library
- [ ] **Deliverable:** Ready for pilot schools

### Phase 4: Analytics & Enterprise (Weeks 13-16)
- [ ] Azure Synapse data warehouse
- [ ] Power BI dashboards
- [ ] Predictive models (Azure ML)
- [ ] Advanced audit trails
- [ ] Compliance reporting
- [ ] **Deliverable:** Enterprise-grade platform

### Phase 5: Expansion Features (Weeks 17-24)
- [ ] Mobile apps (React Native)
- [ ] Proctoring integration
- [ ] LMS connectors (Moodle, Canvas)
- [ ] API marketplace
- [ ] White-label options
- [ ] **Deliverable:** Full product suite

---

## 8. Startup Expansion Opportunities

### Vertical Expansion (Within Education)
1. **K-12 Schools:** Simplified interface, parent portals
2. **Competitive Exams:** JEE, NEET, SAT prep companies
3. **Corporate Training:** Certification exams, skill assessments
4. **Professional Bodies:** CPA, CFA, medical board exams
5. **Government:** Civil services exams, licensing tests

### Horizontal Expansion (Adjacent Markets)
1. **Homework Evaluation:** Daily assignments, not just exams
2. **Essay Scoring:** College applications, writing assessments
3. **Code Evaluation:** Programming assignments (integrate GitHub Copilot)
4. **Language Proficiency:** IELTS, TOEFL scoring
5. **Art & Design:** Portfolio evaluations with CV models

### Product Extensions
1. **HARaMA Proctoring:** AI-based exam monitoring
2. **HARaMA LMS:** Full learning management system
3. **HARaMA Marketplace:** Third-party rubrics, question banks
4. **HARaMA API:** White-label grading-as-a-service
5. **HARaMA Mobile:** Offline grading app for teachers

### Monetization Models
| Tier | Target | Price | Features |
|------|--------|-------|----------|
| **Free** | Individual teachers | $0 | 50 sheets/month, basic reports |
| **Pro** | Teachers | $29/month | 500 sheets/month, AI feedback |
| **Institution** | Schools | $299/month | Unlimited, analytics, SSO |
| **Enterprise** | Boards/Govt | Custom | White-label, SLA, on-premise |
| **API** | EdTech platforms | $0.10/sheet | Pay-as-you-go, developer portal |

### Geographic Expansion
1. **Phase 1:** India, US, UK (English-first markets)
2. **Phase 2:** Spanish-speaking countries (Latin America, Spain)
3. **Phase 3:** Middle East, Southeast Asia (Arabic, Bahasa)
4. **Phase 4:** Africa, Eastern Europe (localized languages)

---

## 9. Success Metrics & KPIs

### Product Metrics
| Metric | MVP Target | Year 1 Target |
|--------|-----------|---------------|
| Active Institutions | 5 | 50 |
| Active Teachers | 50 | 1,000 |
| Answer Sheets Processed | 5,000 | 500,000 |
| API Calls (External) | 0 | 1M |
| Average Processing Time | <10 min | <5 min |
| AI Accuracy vs Manual | 88% | 92% |

### Business Metrics
| Metric | MVP Target | Year 1 Target |
|--------|-----------|---------------|
| Monthly Recurring Revenue | $0 | $50K |
| Customer Acquisition Cost | N/A | <$200 |
| Customer Lifetime Value | N/A | $5,000 |
| Churn Rate | N/A | <10% |
| Net Promoter Score | 40 | 60 |

### Technical Metrics
| Metric | MVP Target | Year 1 Target |
|--------|-----------|---------------|
| API Uptime | 99.0% | 99.5% |
| P95 Response Time | <1s | <500ms |
| Error Rate | <2% | <0.5% |
| Security Incidents | 0 | 0 |

---

## 10. Risk Management

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Azure Document Intelligence accuracy <85% | High | Medium | Fallback to manual OCR + teacher review |
| Azure OpenAI rate limits during peak | High | Medium | Priority queue + reserved capacity |
| Data privacy breach | Critical | Low | Zero-trust architecture + compliance audits |
| Teacher resistance to AI grading | High | Medium | Position as "AI-assisted" not "automated" |
| Competitor with better accuracy | Medium | Medium | Continuous model improvement + teacher trust |
| Microsoft pricing changes | Medium | Low | Multi-cloud readiness (abstraction layers) |

---

## 11. Conclusion

HARaMA represents a paradigm shift in educational assessment - moving from monolithic grading tools to a composable, AI-powered assessment operating system. Built entirely on Microsoft Azure with deep integration of Document Intelligence, Azure OpenAI, and Cognitive Search, it exemplifies modern cloud-native architecture while addressing a $10B+ global market.

**Key Differentiators:**
✅ **Modular Architecture:** Each layer operates independently
✅ **Microsoft-Native:** Deep Azure AI integration (Imagine Cup requirement)
✅ **Human-in-the-Loop:** Teachers always have final say
✅ **Enterprise-Grade:** Multi-tenant, compliant, auditable
✅ **Startup-Ready:** Clear monetization + expansion path

**Next Steps:**
1. Build MVP (Weeks 1-4)
2. Record Imagine Cup demo video
3. Submit application by January 9, 2026
4. Prepare for Semifinals (5-week program)
5. Scale to production

---

**Document Version:** 3.0  
**Last Updated:** December 24, 2025  
**Status:** Ready for Imagine Cup Submission



