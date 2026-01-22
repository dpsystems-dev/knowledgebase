---
sidebar_position: 3
title: Developer Access Guide
description: How to invite a developer to your Stripe account to configure payment integration.
---

# How to Invite a Developer to Your Stripe Account

This guide explains how to give your developer access to configure Stripe payments for your business. Your developer will be able to set up the technical integration without having access to your bank account or financial settings.

---

## What the Developer Can and Cannot Do

### The Developer CAN:
- Set up API keys (needed for the payment system to work)
- Configure webhooks (notifications when payments happen)
- View payment transactions
- Access test/sandbox mode for testing

### The Developer CANNOT:
- Add or change your bank account
- Invite other team members
- Change account ownership
- Access sensitive financial settings

---

## Step-by-Step Instructions

### Step 1: Log into Stripe

**1.** Open your web browser and go to: **https://dashboard.stripe.com**

**2.** Log in with your Stripe account email and password.

**3.** Make sure you are in your **main account** (NOT in a sandbox).
   - Look at the top-left corner of the screen
   - If you see a blue "Sandbox" label, click **"Exit sandbox"** first
   - You should see your business name, not "Sandbox"

---

### Step 2: Open Settings

**1.** Look at the top-left corner of the screen where your business name appears.

**2.** Click on your **business name** to open a dropdown menu.

**3.** Click on **"Settings"** (it has a gear/cog icon next to it).

---

### Step 3: Go to Team and Security

**1.** On the Settings page, find the **"Account settings"** section.

**2.** Click on **"Team and security"**.

---

### Step 4: Add a New Team Member

**1.** Click the **"+ Add member"** button (or **"+ New member"**).

---

### Step 5: Enter Developer's Email

**1.** In the **"Email"** field, type your developer's email address.

**2.** Make sure the email address is spelled correctly.

---

### Step 6: Select the Developer Role

**1.** You will see a list of roles to choose from.

**2.** Select **"Developer"** from the list.

   - This role gives access to technical settings
   - This role does NOT give access to your bank account

---

### Step 7: Send the Invitation

**1.** Click the **"Send invite"** button.

**2.** Your developer will receive an email invitation.

**3.** They need to click the link in the email to accept the invitation.

---

## What Happens Next

1. Your developer receives an email from Stripe
2. They click the link to accept the invitation
3. They log into your Stripe account with their own Stripe login
4. They can now access the API keys and set up webhooks
5. They will update your system configuration with the correct settings

---

## Removing Developer Access (Optional)

If you need to remove the developer's access later:

**1.** Go to **Settings** > **Team and security**

**2.** Find the developer in the team members list

**3.** Click the **three dots menu** (⋮) next to their name

**4.** Select **"Remove"**

---

## Frequently Asked Questions

### Is it safe to give developer access?

Yes. The Developer role is specifically designed for this purpose. Your developer can set up the payment integration but cannot access your bank account, change your business details, or invite other people.

### What if my developer needs to test payments?

The Developer role includes access to Sandbox (test) mode. They can test the payment system without using real money.

### Can I see what my developer does?

Yes. All actions in Stripe are logged. You can see activity in the Stripe Dashboard under the **Logs** section.

### What if I gave the wrong person access by mistake?

You can remove their access immediately by following the "Removing Developer Access" section above.

### Do I need to do anything else?

No. Once you send the invitation, your developer will handle all the technical setup. They may ask you to restart the server or confirm that payments are working, but you won't need to do anything in Stripe.

---

## Need Help?

If you have trouble with these steps:

1. Contact your developer for assistance
2. Contact Stripe Support at https://support.stripe.com

---

*This guide was created to help non-technical users invite developers to their Stripe account.*
