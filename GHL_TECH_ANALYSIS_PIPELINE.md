---
name: Tech Analysis Call - GHL Funnel
description: Detailed breakdown of the GoHighLevel (GHL) automation pipeline for the "30-Minute Technical Analysis" product.
---

# 🚀 The "Technique Analysis" Fulfillment Pipeline (GHL)

This pipeline is designed to automate the fulfillment process for the **$99 Technical Analysis Call**. The goal is to eliminate manual admin work (collecting videos, sending Zoom links, following up) and position the customer for an upsell.

## **Step 1: The Trigger**
**Trigger:** `Appointment Status` -> `Confirmed`
**Filter:** `Calendar` IS `30-Min Technical Analysis`

> **Note:** Ideally, integrate Stripe directly with the Calendar booking so payment is required *before* confirmation.

---

## **Step 2: Immediate Actions (The "Wow" Experience)**

### **Action 1: Tagging & pipeline Management**
1.  **Add Tag:** `customer-tech-analysis`
2.  **Add Tag:** `active-client` (stops generic lead nurturing sequences).
3.  **Create/Update Opportunity:**
    *   **Pipeline:** `Sales Pipeline` (or dedicated `Product Delivery` pipeline).
    *   **Stage:** `Assessment Booked`.
    *   **Value:** `$99`.
    *   **Source:** `Funnel - Tech Analysis Page`.

### **Action 2: The "Video Request" Email (Immediate)**
*   **Email Subject:** `CONFIRMED: Your Technical Analysis with Sonny Webster`
*   **Body:**
    > "Hey {{contact.first_name}},
    >
    > Your session is locked in for **{{appointment.start_time}}**.
    >
    > **STEP 1: UPLOAD YOUR LIFTS (Crucial)**
    > Before we jump on, I need to see your movement. Please upload your two videos (Snatch + C&J) here at least 12 hours before our call:
    >
    > 👉 **[LINK TO DROPBOX REQUEST / GOOGLE FORM FILE UPLOAD]**
    >
    > *Please film from a 45-degree angle so I can see bar path and knee position.*
    >
    > See you soon,
    > Sonny"

### **Action 3: Internal Notification**
*   **Internal Notification (SMS/Email):** To Sonny/Coach.
    *   "New Tech Analysis booked by {{contact.name}}. Check for video upload 12h prior."

---

## **Step 3: The Reminder Sequence (24h Before)**

**Wait Step:** `Event Time - 24 Hours`

### **Action 4: The Preparation Reminder**
*   **Email Subject:** `24 Hours To Go: Are your videos ready?`
*   **Body:**
    > "Hey {{contact.first_name}},
    >
    > We are 24 hours out. If you haven't uploaded your videos yet, please do it **now** so I can review them before we start.
    >
    > [Upload Link Again]
    >
    > Zoom Link: {{appointment.meeting_location}}
    >
    > Let's fix this lift."

---

## **Step 4: Post-Call Fulfillment & Upsell (The Money Step)**

**Wait Step:** `Event Time + 1 Hour` (After the call ends)

### **Action 5: The "Action Plan" Delivery**
*   **Email Subject:** `Your Analysis Recording + Next Steps`
*   **Body:**
    > "Great session, {{contact.first_name}}.
    >
    > Here is the recording of our call for you to review my cues:
    > **[Link to Zoom Cloud Recording]** (Variable: `{{appointment.meeting_recording_url}}` if integrated, or manual placeholder).
    >
    > **YOUR TRAJECTORY:**
    > We identified the fix. Now you need the reps.
    >
    > **ONE-TIME OFFER:**
    > Since you've already invested $99 in this analysis, I want to credit that full amount toward your first month of **Inner Circle Coaching** if you decide to join this week.
    >
    > That means you get full programming, weekly video review, and direct access to me for just **$401** (normally $500) for your first month.
    >
    > **👉 [Link to Inner Circle Application / Checkout with Coupon Code 'TECH99']**
    >
    > Use code: **TECH99** at checkout.
    >
    > Talk soon,
    > Sonny"

---

## **Step 5: Long-Term Nurture (If No Upsell)**

**Wait Step:** `3 Days`
**Condition:** Does contact have tag `customer-inner-circle`?
*   **YES:** End Workflow.
*   **NO:** Move to **"General Education / Nurture"** Sequence (Weekly newsletter, tips, etc.).
