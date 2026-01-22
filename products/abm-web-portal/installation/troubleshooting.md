---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 7
description: Common issues and solutions when using the ABM Portal Deployer.
---

# Troubleshooting

Common issues and their solutions.

## Service Won't Start

### Check Configuration

1. Click **Edit Configuration**
2. Verify all required fields are filled in:
   - JWT Secret (use Generate if empty)
   - SQL Server, Database, User, Password
3. Click **Test Connection** to verify SQL settings
4. Save and try starting again

### Check Logs

1. Click **Open Logs Folder**
2. Open the most recent log file
3. Search for error messages

### Use Console Mode

Run the portal in console mode to see real-time error output:

1. Click **Run in Console**
2. A command window opens showing startup messages
3. Look for error messages
4. Close the window when done

![Console Runner](./screenshots/screenshot-console-runner.png)

## Database Connection Issues

**Symptoms:** Portal doesn't load, shows database errors, or Test Connection fails.

### Solutions

1. Verify SQL Server hostname/IP is correct
2. Check that the database exists
3. Confirm username and password are valid
4. Ensure SQL Server allows remote connections
5. Check firewall allows port 1433 (or custom SQL port)
6. Try connecting with SQL Server Management Studio to rule out credential issues

### Connection String Format

If your SQL Server uses a non-standard port:
```
server,1433
```

For named instances:
```
server\instancename
```

## Port Conflicts

**Symptoms:** Service fails to start with port-related errors.

### Solutions

1. **Uninstall Service**
2. Delete `port.txt` from the portal folder
3. **Install Service** and choose a different port

Common available ports: 3001, 3002, 8080, 8081

### Check Port Usage

To see if a port is in use, run in Command Prompt:
```cmd
netstat -ano | findstr :3001
```

## Users Can't Log In

**Symptoms:** All users suddenly can't log in.

### Cause

The JWT secret was regenerated, invalidating all existing sessions.

### Solution

Users need to log in again with their credentials. If the secret was accidentally changed, you can restore from `serverConfig.json.backup`:

1. Stop the service
2. Copy `serverConfig.json.backup` to `serverConfig.json`
3. Start the service

## "Bundle Not Found" on Launch

**Symptoms:** Application immediately shows password dialog and release selection.

### Cause

Portal files are missing or corrupted.

### Solution

Download a release to reinstall the portal files. Configuration will need to be set up again (or restored from backup if available).

## Service Shows "Not Installed" After Reboot

**Symptoms:** Service was working but shows as not installed after server restart.

### Cause

Installation didn't complete properly or service was uninstalled.

### Solution

Click **Install Service** to reinstall. The previously configured port will be reused.

## Application Requires Administrator

**Symptoms:** Application shows error or won't run properly.

### Solution

Right-click the exe and select **Run as administrator**. The application requires admin privileges to manage Windows services.

## Important File Locations

| File | Location |
|------|----------|
| Configuration | `C:\ABMWebPortal-{port}\server\serverConfig.json` |
| Config Backup | `C:\ABMWebPortal-{port}\server\serverConfig.json.backup` |
| Logs | `C:\ABMWebPortal-{port}\logs\` |
| Port Setting | `C:\ABMWebPortal-{port}\port.txt` |
| Version Info | `C:\ABMWebPortal-{port}\version.json` |

## Getting Help

If you encounter issues not covered here:
1. Check the logs folder for detailed error messages
2. Try running in Console mode to see real-time output
3. Contact the development team with log files and error messages
