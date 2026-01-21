---
sidebar_position: 1
---

# Architecture

This document describes the technical architecture of the ABM Web Portal.

## High-Level Overview

The ABM Web Portal follows a layered architecture:

- **Presentation Layer**: ASP.NET MVC web application
- **Business Logic Layer**: .NET class libraries
- **Data Access Layer**: Entity Framework Core
- **Database**: SQL Server

## Components

### Web Application

The main user-facing component that handles HTTP requests and renders the UI.

### API Services

RESTful API endpoints for integration with external systems.

### Background Services

Windows services that handle scheduled tasks and background processing.
