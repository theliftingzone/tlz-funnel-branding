
# 🏗️ GoHighLevel (GHL) Sales Pipeline: Technical Analysis

The following stages should be added to your **"The Lifting Zone - Sales Pipeline"** (or a dedicated "Tech Analysis" pipeline) to track leads through this specific funnel.

---

## **1. New Opportunity (Pre-Booking)**
*   **Stage Name:** `New Lead - Technique Quiz`
*   **Trigger:** User completes the Quiz (via `LeadCaptureForm` in `App.jsx`).
*   **Goal:** Capture contact info before they even see the offer.
*   **Automation:** Add to "General Nurture" if they don't buy immediately.

## **2. Purchase / Booking (The Conversion)**
*   **Stage Name:** `Call Booked - Tech Analysis ($99)`
*   **Trigger:** Form submisson/Payment on Calendly (integrated with Stripe).
*   **Value:** `$99.00`
*   **Automation:**
    *   Stop "Abandoned Cart" emails.
    *   Start "Video Upload Request" sequence.
    *   Create Task for Coach: "Review [Name]'s videos."

## **3. Fulfillment (Pre-Call)**
*   **Stage Name:** `Videos Received / Ready for Review`
*   **Trigger:** Coach manually moves card OR automtation from "File Upload" form.
*   **Goal:** Ensure the coach has the material *before* the Zoom call starts.

## **4. The Event (The Call)**
*   **Stage Name:** `Call Completed`
*   **Trigger:** Scheduled appointment time passes (+1 hour).
*   **Goal:** The service has been delivered. Now pivotal for the upsell.

## **5. The Upsell (Post-Call)**
*   **Stage Name:** `Propolsal Sent - Inner Circle`
*   **Trigger:** Coach moves card here after making the offer on the call.
*   **Automation:** Send "Recap Email" with the special '$99 Credit' offer link.

## **6. Outcome (Closed)**
*   **Stage Name:** `Closed Won - Upgraded to Inner Circle`
*   **Trigger:** User purchases the high-ticket coaching.
*   **Value:** `$500/mo` or `$5,100/yr`.
*   **Action:** Add to "VIP Client Onboarding" automation.

*   **Stage Name:** `Closed Lost - Analysis Only`
*   **Trigger:** User does not upgrade within 7 days.
*   **Action:** Add to long-term "Newsletter / Tips" nurture (downsell to 'Solo Protocol' later).
