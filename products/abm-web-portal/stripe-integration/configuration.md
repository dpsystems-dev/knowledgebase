---
sidebar_position: 2
title: Configuration Guide
description: How to configure Stripe payments for the ABM Service Web Portal, including API keys, webhooks, and server settings.
---

# Stripe Payment Configuration Guide

This guide explains how to configure Stripe payments for the ABM Service Web Portal. It is intended for support staff and administrators who need to set up or troubleshoot payment functionality.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Configuration Reference](#configuration-reference)
4. [Part 1: Getting the Secret Key](#part-1-getting-the-secret-key)
5. [Part 2: Creating a Webhook Endpoint](#part-2-creating-a-webhook-endpoint)
6. [Part 3: Accessing the Configuration Page](#part-3-accessing-the-configuration-page)
7. [Part 4: Configuring Stripe Settings](#part-4-configuring-stripe-settings)
8. [Part 5: Configuring User Access](#part-5-configuring-user-access)
9. [Optional: Enable Automatic Email Receipts](#optional-enable-automatic-email-receipts)
10. [Live Mode Setup](#live-mode-setup)
11. [Testing Your Configuration](#testing-your-configuration)
12. [Troubleshooting](#troubleshooting)

---

## Overview

Stripe is a payment processing service that allows customers to pay invoices securely online. When properly configured, the ABM Service Portal can:

- Generate secure payment links for customers
- Process credit/debit card payments
- Receive real-time payment status updates via webhooks
- Track payment history and receipts

This guide covers the **Sandbox (test) mode** setup. Sandbox mode allows you to test payments without processing real money.

---

## Prerequisites

Before you begin, ensure you have:

- Access to a Stripe account (https://dashboard.stripe.com)
- Administrator access to the server where ABM Service Portal is installed
- The public URL where the portal is hosted (e.g., `https://abm-portal.yourcompany.com`)

---

## Configuration Reference

Stripe configuration is managed through the **Admin Dashboard** in the ABM Service Portal. Navigate to **App Configuration > STRIPE** tab to access these settings.

### Field Descriptions

| Field | Description | Required |
|-------|-------------|----------|
| STRIPE Enabled | Toggle to enable/disable payment functionality | Yes |
| Secret Key | Your Stripe API secret key (starts with `sk_test_` or `sk_live_`) | Yes |
| Webhook Secret | Your webhook signing secret (starts with `whsec_`) | Yes |
| Base URL | Your portal's public URL (see below) | Yes |
| Log Folder Path | Folder path for payment logs (optional) | No |

### Understanding `baseUrl`

The `baseUrl` is the public web address where your ABM Service Portal is accessible from the internet.

**Why is it needed?** When a customer completes or cancels a payment on Stripe's checkout page, Stripe needs to redirect them back to your portal. The `baseUrl` tells Stripe where to send customers after payment.

**Examples:**
- `https://abm-portal.mycompany.com`
- `https://portal.example.ie`
- `https://web-dp.tenjo.ovh`

**Important:**
- Must start with `https://`
- Do NOT include a trailing slash at the end
- Must be accessible from the internet (not `localhost`)

### Understanding `logFolderPath`

This is an **optional** setting. If you want to keep daily log files of all payment activities for troubleshooting, specify a folder path.

**Examples:**
- Windows: `C:\\logs\\stripe`
- Leave empty (`""`) to disable logging

When enabled, the system creates daily log files like `stripe-2025-01-08.log` containing detailed payment activity records.

---

## Part 1: Getting the Secret Key

The secret key allows your server to communicate with Stripe's API.

### Steps (Sandbox Mode)

**1.** Go to https://dashboard.stripe.com and log in to your Stripe account.

**2.** Confirm you are in **Sandbox mode** by checking for the blue "Sandbox" label in the top-left corner of the dashboard.

![Sandbox mode with API keys](./images/01-secret-key.png)

**3.** On the dashboard, look for the **"API keys"** section on the right side of the page.

**4.** Find the **"Secret key"** row. The key is hidden by default and shows as dots (•••••).

**5.** Hover over the Secret key row and click the **"Click to copy"** button that appears.

**6.** The key is now copied to your clipboard. It should start with `sk_test_`.

**Important:** Keep this key secure. Anyone with this key can process payments on your account.

---

## Part 2: Creating a Webhook Endpoint

Webhooks allow Stripe to notify your portal when payment events occur (e.g., payment completed, payment failed).

### Step 1: Access the Webhooks Section

**1.** In the Stripe Dashboard, click **"Developers"** in the bottom-left corner of the screen.

**2.** A menu will expand. Click **"Webhooks"** from the list.

![Developers menu with Webhooks option](./images/02-developers-menu.png)

### Step 2: Add a New Destination

**1.** On the **Event destinations** page, click the green **"+ Add destination"** button in the top-right area.

![Webhooks tab with Add destination button](./images/03-webhooks-tab.png)

### Step 3: Select Events to Listen For

**1.** Under **"Events from"**, select **"Your account"** (the first option with the diagram icon).

**2.** In the **Events** section, you'll see a search box. Type `checkout` in the search box.

**3.** Check the following 2 required events:
   - `checkout.session.completed`
   - `checkout.session.expired`

   **Optional:** You can also add `payment_intent.payment_failed` for explicit failure notifications, though card declines are typically handled through the checkout session flow.

**4.** Click the **"Continue"** button.

![Event selection screen](./images/04-select-events.png)

### Step 4: Choose Destination Type

**1.** Select **"Webhook endpoint"** (the first option - "Send webhook events to a hosted endpoint").

**2.** Click **"Continue"**.

![Destination type selection](./images/05-destination-type.png)

### Step 5: Enter Your Endpoint URL

**1.** In the **"Endpoint URL"** field, enter your portal's webhook URL.

**Format:** `{your-baseUrl}/api/payments/webhook`

**Example:** If your portal is at `https://web-dp.tenjo.ovh`, enter:
```
https://web-dp.tenjo.ovh/api/payments/webhook
```

**2.** The **"Destination name"** field is auto-generated - you can leave it as-is or change it.

**3.** The **"Description"** field is optional.

**4.** Click **"Create destination"**.

![Endpoint URL configuration](./images/06-endpoint-url.png)

### Step 6: Get the Webhook Secret

After creating the webhook, you'll be taken to the destination details page.

**1.** Find the **"Signing secret"** section on the right side of the page.

**2.** Click the **eye icon** to reveal the secret.

![Reveal signing secret](./images/07-reveal-secret.png)

**3.** Click the **clipboard icon** to copy the secret to your clipboard.

![Copy signing secret](./images/08-copy-secret.png)

**4.** The secret should start with `whsec_`. Save this value - you'll need it for the configuration.

---

## Part 3: Accessing the Configuration Page

Stripe settings are configured through the Admin Dashboard in the ABM Service Portal.

**1.** Log in to the ABM Service Portal as an administrator.

**2.** In the left sidebar, click **App Configuration**.

**3.** Select the **STRIPE** tab at the top of the page.

![Admin Stripe Configuration](./images/09-admin-stripe-config.png)

---

## Part 4: Configuring Stripe Settings

Now that you have both the Secret Key and Webhook Secret, configure Stripe through the Admin Dashboard.

### Basic Configuration

**1.** Toggle **"STRIPE Enabled"** to ON.

**2.** Enter your **Secret Key** (from Part 1) - should start with `sk_test_` for sandbox or `sk_live_` for production.

**3.** Enter your **Webhook Secret** (from Part 2) - should start with `whsec_`.

**4.** Enter your **Base URL** - your portal's public URL (same as used in the webhook endpoint, but without `/api/payments/webhook`).

**5.** Optionally enter a **Log Folder Path** for payment logging (e.g., `C:\logs\stripe`).

**6.** Click **Save**.

### Custom Routines (Optional)

The Custom Routines section allows scheduling automated procedures related to Stripe operations.

| Field | Description |
|-------|-------------|
| Custom Routines Enabled | Toggle to enable/disable automated procedures |
| Process Interval (ms) | How often to run the routines (e.g., 60000 = 1 minute) |
| Batch Size | Number of records to process per run |
| Procedures | List of stored procedures to execute |

**Managing Procedures:**
- Click **+ Add Procedure** to add a new procedure to the list
- Click the **trash icon** next to a procedure to remove it

**Note:** Configuration changes take effect immediately after clicking Save. No server restart is required.

---

## Part 5: Configuring User Access

After enabling Stripe in the App Configuration, you need to grant payment permissions to individual users. This controls who can view and create payments.

### Access Control Flags

| Flag | ABM Users | External Users |
|------|-----------|----------------|
| **View Payments** | Shows **PAYMENTS** tab on customer view | Shows **MY PAYMENTS** tab on customer view |
| **Add Payments** | Enables **Request Payment** button | Enables **MAKE PAYMENT** button |

### Setting Up User Permissions

**1.** In the Admin Dashboard, navigate to **User Management**.

![User Management page](./images/10-user-management.png)

**2.** Click on the user you want to configure.

**3.** Scroll down to the **User Access Control** section and find **Stripe Payments**.

**4.** Enable the desired permissions:
   - Check **View Payments** to allow the user to see payment history
   - Check **Add Payments** to allow the user to initiate payments

![User Access Control with Stripe Payments section](./images/11-user-access-control.png)

**5.** Click **SAVE** to apply the changes.

### Using Global Configuration Defaults

To streamline user setup, you can configure default payment permissions in **Global Configuration**. These defaults are applied when creating new users.

**1.** Navigate to **Global Configuration** in the Admin Dashboard.

**2.** Scroll down to the **User Access Control** section and find **Stripe Payments**.

**3.** Set the default values for **View Payments** and **Add Payments**.

**4.** Click **Save**.

**Applying Defaults to a User:**

When editing a user in User Management, click the **COPY FROM DEFAULTS** button to copy all access control settings (including Stripe Payments) from the Global Configuration to that user.

---

## Optional: Enable Automatic Email Receipts

Stripe can automatically send email receipts to customers after successful payments. This is an optional feature that uses the email address the customer enters during checkout.

### Steps to Enable

**1.** In the Stripe Dashboard, click the **Settings gear icon** in the top-right corner.

![Settings gear icon in Stripe Dashboard](./images/13-settings-gear.png)

**2.** Under **"Account settings"**, click **"Business"**.

![Business option in Settings](./images/14-settings-business.png)

**3.** Click the **"Customer emails"** tab at the top of the page.

**4.** Find the **"Successful payments"** toggle under the **Payments** section and turn it **ON**.

   Alternatively, go directly to: `https://dashboard.stripe.com/settings/emails`

![Customer emails tab with Successful payments toggle enabled](./images/15-customer-emails-toggle.png)

### What Customers Receive

When enabled, customers will automatically receive a Stripe-branded receipt email containing:
- Payment amount and date
- Last 4 digits of the card used
- A link to view the full receipt

**Note:** Receipts are only sent when a payment succeeds. Failed or declined transactions do not trigger receipt emails.

---

## Live Mode Setup

When you're ready to accept real payments, you'll need to configure Live mode. The steps are **identical** to Sandbox mode with these key differences:

### Switching to Live Mode

**1.** In the Stripe Dashboard, click the **"Switch to live account"** button in the top-right corner (orange button).

**2.** You'll now see "Live mode" instead of "Sandbox" in the top-left.

### Important Differences

| Aspect | Sandbox Mode | Live Mode |
|--------|--------------|-----------|
| Key prefix | `sk_test_` | `sk_live_` |
| Webhook prefix | `whsec_` (same) | `whsec_` (same) |
| Secret key reveal | Can reveal multiple times | **Can only reveal ONCE** |
| Payments | Test/simulated | Real money |

### Live Mode Checklist

- [ ] Click "Switch to live account" in Stripe Dashboard
- [ ] Copy the Live secret key (starts with `sk_live_`)
- [ ] Create a **new** webhook endpoint for Live mode
- [ ] Copy the Live webhook signing secret
- [ ] Update the Admin Dashboard (**App Configuration > STRIPE**) with Live mode values
- [ ] Verify settings are saved

**Warning:** In Live mode, the secret key can only be revealed **once**. Copy it immediately and store it securely. If you lose it, you'll need to create a new key.

---

## Testing Your Configuration

### Test in Sandbox Mode First

Before going live, always test your configuration in Sandbox mode.

### Test Card Numbers

Use these card numbers in Sandbox mode (any future expiry date and any 3-digit CVC):

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |

### Verify Webhook is Working

**1.** In Stripe Dashboard, go to **Developers > Webhooks**.

**2.** Click on your webhook endpoint.

**3.** Check the **"Event deliveries"** tab to see if events are being received.

**4.** A successful delivery shows a green checkmark with status `200`.

---

## Troubleshooting

### Common Issues

#### "Payments are not enabled"
- Verify that **STRIPE Enabled** is toggled ON in **App Configuration > STRIPE**
- Ensure the configuration was saved successfully

#### "Webhook signature verification failed"
- Ensure the **Webhook Secret** is correct (starts with `whsec_`)
- Make sure you copied the complete secret without extra spaces
- Verify you're using the secret from the correct webhook endpoint

#### "Payment redirect not working"
- Check that **Base URL** is correct and accessible from the internet
- Ensure the URL uses `https://` (not `http://`)
- Verify there's no trailing slash at the end

#### "Webhook events not being received"
- Check the webhook endpoint URL is correct: `{baseUrl}/api/payments/webhook`
- Ensure your server is accessible from the internet
- Check the Events tab in Stripe for delivery errors

### Checking Logs

If `logFolderPath` is configured:

**1.** Navigate to the log folder (e.g., `C:\logs\stripe`)

**2.** Open the latest log file (e.g., `stripe-2025-01-08.log`)

**3.** Look for error messages or failed operations

### Getting Help

If you continue to experience issues:

1. Check the Stripe Dashboard for error messages
2. Review server logs for detailed error information
3. Contact your system administrator or development team

---

## Quick Reference

### Configuration Location

**Admin Dashboard > App Configuration > STRIPE tab**

### Required Settings (Sandbox Example)

| Setting | Example Value |
|---------|---------------|
| STRIPE Enabled | ON |
| Secret Key | `sk_test_51SmVtFRAJLu09FXE...` |
| Webhook Secret | `whsec_NUUVDBRiBKwgqLKqujQXfiy...` |
| Base URL | `https://web-dp.tenjo.ovh` |
| Log Folder Path | `C:\logs\stripe` (optional) |

### Webhook Endpoint URL Format

```
https://{your-domain}/api/payments/webhook
```

### Required Webhook Events

- `checkout.session.completed`
- `checkout.session.expired`

---

## Related Documentation

- [Developer Access Guide](./developer-access) - Guide for clients to invite developers
- [Production Checklist](./production-checklist) - Production migration checklist
- [User Guide](./user-guide) - End user guide
