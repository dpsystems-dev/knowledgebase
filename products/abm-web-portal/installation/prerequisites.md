---
sidebar_position: 1
---

# Prerequisites

Before installing ABM Web Portal, ensure your environment meets the following requirements.

## System Requirements

- Operating System: Windows Server 2019 or later
- RAM: Minimum 4GB
- Disk Space: Minimum 1GB available

## Software Requirements

- ABM Service 11.4 or higher must be installed (can be on a different server)

:::note
All other dependencies (Node.js, web server components, etc.) are packaged in the zip file that ABMPortalDeployer.exe downloads from GitHub during installation.
:::

## Network & Access Requirements

- A port must be available for the ABM Portal Windows service
- ABMPortalDeployer.exe requires administrator privileges to run
- SQL connection must use SQL Authentication (Windows Authentication is not supported)
- Server must have network access to the SQL Server where the ABM database resides
