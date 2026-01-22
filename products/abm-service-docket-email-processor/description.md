---
sidebar_position: 1
title: Overview
description: ABM Service Docket Email Processor - A Windows service that automatically emails and prints job card dockets for completed service actions.
---

# ABM Service Docket Email Processor

A Windows Forms service application that automatically emails and prints job card dockets for completed service actions. It monitors the ABM Service database and processes dockets based on customer contact preferences and global email configurations.

## Overview

The EmailPrintABMService (output: `ASMDocketEmailPrint.exe`) runs as a background service, polling the database at configurable intervals to detect completed service actions that require email notifications. The system supports three independent email processing paths, allowing flexible configuration for different business needs.

### Key Features

- **Automatic Email Processing** - Monitors database for completed actions and sends emails automatically
- **Three Independent Email Paths** - Customer preferences, action-specific, and global monitoring
- **PDF Docket Generation** - Creates professional job card dockets using DevExpress XtraReports
- **Attachment Processing** - Includes PDF and image attachments from service actions
- **Dual Sending Methods** - Supports both SMTP and Outlook interop for email delivery
- **Configurable Polling** - Adjustable poll intervals from 3 seconds to 30 minutes
- **Customer Contact Integration** - Respects customer-defined email preferences and contacts

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | .NET Framework 3.5 (x86) |
| **UI** | DevExpress v12.1 WinForms, XtraBars |
| **Reporting** | DevExpress XtraReports (.repx files) |
| **PDF Processing** | iTextSharp 4.1.6 |
| **Configuration** | Newtonsoft.Json 4.5 |
| **Database** | SQL Server |
| **Email** | SMTP (TLS 1.2) or Outlook Interop |

## Architecture

The application follows a modular architecture with clear separation between database access, report generation, and email delivery.

```mermaid
flowchart TB
    subgraph UI["Windows Forms UI"]
        MAIN[frmDocketsEmail<br/>Main Form]
        CONFIG[frmSMTP<br/>Configuration]
    end

    subgraph Core["Core Processing"]
        SDA[ServiceDocketActions<br/>Main Orchestrator]
        AED[ActionEmailDocket<br/>Database Queries]
        SDAI[ServiceDocketActionsImplementation<br/>Report & Email]
    end

    subgraph External["External Systems"]
        DB[(SQL Server<br/>Database)]
        SMTP[SMTP Server]
        OUTLOOK[Microsoft Outlook]
    end

    MAIN --> SDA
    CONFIG --> SDA
    SDA --> AED
    SDA --> SDAI
    AED --> DB
    SDAI --> SMTP
    SDAI --> OUTLOOK
```

### Processing Flow

```mermaid
sequenceDiagram
    participant Timer as Background Worker
    participant SDA as ServiceDocketActions
    participant DB as Database
    participant Report as Report Generator
    participant Email as Email Sender

    loop Every Poll Interval
        Timer->>SDA: Trigger Processing

        par Path 1: Customer Contacts
            SDA->>DB: Query NotProcessedDockets
            DB-->>SDA: Pending Actions
            SDA->>Report: Generate Docket PDF
            Report-->>SDA: PDF Document
            SDA->>Email: Send to Customer Contacts
            SDA->>DB: Mark as Processed
        and Path 2: Action Emails
            SDA->>DB: Query ASMACTIONASSIGN<br/>(EmailDocketEnabled=1)
            DB-->>SDA: Actions with Email Addresses
            SDA->>Report: Generate Docket PDF
            Report-->>SDA: PDF Document
            SDA->>Email: Send to DocketEmailAddresses
            SDA->>DB: Set DocketEmailSent=1
        and Path 3: Global Emails
            SDA->>DB: Query ASMACTIONASSIGN<br/>(DocketGlobalEmailSent=0)
            DB-->>SDA: Completed Actions
            SDA->>Report: Generate Docket PDF
            Report-->>SDA: PDF Document
            SDA->>Email: Send to GlobalEmailToAddress
            SDA->>DB: Set DocketGlobalEmailSent=1
        end
    end
```

## Running the Application

The application requires command-line arguments to initialize:

```bash
ASMDocketEmailPrint.exe <CompanyId> <DatabaseConnectionString> [<CompanyPath>] [/AUTOSTART]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `CompanyId` | Yes | Database company identifier (integer) |
| `DatabaseConnectionString` | Yes | SQL Server connection string |
| `CompanyPath` | No | Path to company-specific resources |
| `/AUTOSTART` | No | Automatically starts email/print processing on launch |

**Example:**
```bash
ASMDocketEmailPrint.exe 1 "Server=localhost;Database=ABMService;Integrated Security=true;" "C:\ABMData\Company1" /AUTOSTART
```

## Quick Links

- [Email Processing Paths](email-processing-paths/overview) - Detailed documentation of the three email paths
