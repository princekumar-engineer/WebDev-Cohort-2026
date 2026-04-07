# Fitness Influencer Coaching Platform — ER Diagram

## Overview

This project models a database for an **online fitness coaching platform** where trainers manage clients, sell coaching plans, schedule consultations, track progress, and handle subscriptions and payments.

This is **not a gym management system**, but an **online coaching ecosystem**.

The ER diagram supports:

* Trainers managing multiple clients
* Clients purchasing coaching plans
* Subscription lifecycle tracking
* Session scheduling (consultations/live workouts)
* Weekly client check-ins
* Progress tracking (weight, measurements)
* Payment tracking
* Consultation-only clients (without plan purchase)

## 🚀 Goals

* Improve database design skills
* Think in real-world scenarios
* Build scalable and clean schema

## 📊 ER Diagram

# Fitness Influencer Coaching Platform ✅

## FULL ER
![Day 2 ER Diagram](1.Full_ER_Fitness%20Influencer%20Coaching%20Platform.png)

## LEFT ER
![Day 2 ER Diagram](2.%20Left_ER_Fitness%20Influencer%20Coaching%20Platform.png)

## RIGHT ER
![Day 2 ER Diagram](3.%20Right_ER_Fitness%20Influencer%20Coaching%20Platform.png)


## 🛠 Tools Used

* Eraser.io
* MongoDB-style schema

---

## Entities

### Trainers

Stores trainer/influencer information.

Attributes:

* trainer_id (PK)
* name
* email
* specialization
* experience
* createdAt
* updatedAt

---

### Clients

Stores client details.

Attributes:

* client_id (PK)
* name
* email
* phone
* age
* gender
* goal
* createdAt
* updatedAt

---

### Trainer_Clients

Maps trainers to clients directly.
Used for **consultation-only clients** who may not purchase a plan.

Attributes:

* trainer_client_id (PK)
* trainer_id (FK)
* client_id (FK)
* assigned_at
* createdAt
* updatedAt

---

### Plans

Coaching programs created by trainers.

Attributes:

* plan_id (PK)
* plan_name
* description
* duration_days
* price
* trainer_id (FK)
* createdAt
* updatedAt

Relationship:

* One trainer can create multiple plans

---

### Subscriptions

Represents a client purchasing a plan.

Attributes:

* subscription_id (PK)
* client_id (FK)
* plan_id (FK)
* start_date
* end_date
* subscription_status
* createdAt
* updatedAt

This table resolves:

* One client → many plans
* One plan → many clients

---

### Sessions

Consultations or live coaching sessions.

Attributes:

* session_id (PK)
* subscription_id (FK)
* client_id (FK)
* trainer_id (FK)
* session_date
* session_type
* notes
* session_status
* createdAt
* updatedAt

Used for:

* consultation calls
* live workout sessions
* diet review calls

---

### Checkins

Weekly client updates submitted to trainer.

Attributes:

* checkin_id (PK)
* subscription_id (FK)
* client_id (FK)
* trainer_id (FK)
* checkin_date
* feedback
* checkin_status
* createdAt
* updatedAt

Used for:

* weekly reporting
* adherence tracking
* trainer feedback

---

### Progress

Stores measurable body progress data.

Attributes:

* progress_id (PK)
* checkin_id (FK)
* weight
* body_fat
* chest
* waist
* notes
* createdAt
* updatedAt

Each check-in can have progress metrics.

---

### Payments

Tracks subscription payments.

Attributes:

* payment_id (PK)
* subscription_id (FK)
* amount
* payment_date
* method
* payment_status
* createdAt
* updatedAt

---

## Relationships

* Trainer → Plans (1:N)
* Client → Subscriptions (1:N)
* Plan → Subscriptions (1:N)
* Subscription → Payments (1:N)
* Trainer → Sessions (1:N)
* Client → Sessions (1:N)
* Subscription → Sessions (1:N)
* Client → Checkins (1:N)
* Subscription → Checkins (1:N)
* Checkins → Progress (1:N)
* Trainer ↔ Client (via trainer_clients)

---

## Design Decisions

### Why Trainer_Clients table?

Some users may join only for consultations without purchasing a plan.
This table allows mapping trainers and clients independently.

### Why Subscription table?

Clients can purchase multiple plans over time.
Subscriptions track:

* start date
* end date
* status
* lifecycle

### Why Progress separate from Checkins?

Checkins store qualitative feedback.
Progress stores measurable metrics like weight and body measurements.

### Why Sessions separate from Checkins?

Sessions are scheduled meetings.
Checkins are weekly progress submissions.

---

## Supported Use Cases

This schema supports:

* Trainers managing multiple clients
* Clients buying multiple plans
* Multiple clients enrolled in same plan
* Session scheduling
* Weekly check-ins
* Progress tracking
* Trainer feedback
* Subscription lifecycle
* Payment tracking

---

## Submission Notes

* Primary keys and foreign keys are defined
* Relationships are normalized
* Enums used for status fields
* Design kept practical and scalable
* Diagram structured for readability

---

Follow along as I build and learn in public 🚀
