# Comic-Con Parking System — ER Diagram

--- 

## ER Diagram (PNG)


### Eraser.io with dbml
![Eraser ERD](eraser/Eraser_Comic-Con%20Parking%20System-erd.png)

## Overview

This project presents the **Entity Relationship Diagram (ERD)** for a multi-zone event parking system designed for a large Comic-Con venue. The system manages vehicle entry, parking spot allocation, reserved categories, ticket generation, parking sessions, availability tracking, and payment processing.

The design supports real-world event scenarios where thousands of vehicles arrive across multiple days and require structured parking management.

---

## Objectives

The ERD is designed to support:

* Vehicle entry and exit tracking
* Multiple vehicle visits across event days
* Parking spot allocation based on vehicle type
* Multi-zone and multi-level parking
* Reserved parking (VIP, staff, exhibitors, EV charging)
* Parking ticket generation
* Parking session tracking
* Spot availability tracking over time
* Parking fee calculation support
* Payment recording per parking session
* Reuse of parking spots across sessions
* Tracking currently parked vehicles

---

## Entities Included

### Vehicle Related

* **vehicles** — stores vehicle details
* **vehicle_categories** — bike, car, SUV, EV, etc.

### Parking Structure

* **parking_zones** — zone and level information
* **parking_spots** — individual parking spots
* **spot_categories** — VIP, staff, EV reserved categories

### Parking Operations

* **parking_sessions** — entry and exit tracking
* **parking_tickets** — issued parking tickets
* **payments** — payment records per session

### Availability Tracking

* **spot_availability** — tracks spot availability timeline using start and end time

---

## Relationships

* One vehicle can have multiple parking sessions
* One parking spot can be reused across multiple sessions
* One zone contains multiple parking spots
* One spot category applies to many parking spots
* One session generates one ticket
* One session has one payment
* One parking spot has multiple availability records over time

---

## Key Design Decisions

### Parking Sessions

Parking sessions are used to track:

* entry time
* exit time
* assigned parking spot
* session status

This allows tracking currently parked vehicles and session history.

### Spot Availability Tracking

Availability is modeled using a **time-based structure** instead of a boolean flag:

* AVAILABLE
* OCCUPIED
* RESERVED

This enables:

* real-time availability
* historical availability
* zone-level availability tracking
* reusable parking spots

### Reserved Parking Categories

Reserved parking is handled using **spot_categories** such as:

* VIP
* STAFF
* EXHIBITOR
* COSPLAYER
* EV_CHARGING

---

## Features Supported

* Multi-zone parking
* Multi-level parking
* Reserved parking areas
* Vehicle type based allocation
* Spot reuse across sessions
* Ticket generation
* Payment tracking
* Availability tracking
* Currently parked vehicles tracking
* Event multi-day support

---

## Database Design Highlights

* Proper normalization
* Separate entities for sessions, tickets, and payments
* Clear primary keys and foreign keys
* Time-based availability tracking
* Reusable parking spots
* Scalable multi-zone design
* Audit timestamps on all tables

---

## Primary Keys

Each table contains a primary key:

* category_id
* vehicle_id
* zone_id
* spot_category_id
* spot_id
* availability_id
* session_id
* ticket_id
* payment_id

---

## Foreign Key Relationships

* vehicles.category_id → vehicle_categories.category_id
* parking_sessions.vehicle_id → vehicles.vehicle_id
* parking_sessions.spot_id → parking_spots.spot_id
* parking_spots.zone_id → parking_zones.zone_id
* parking_spots.spot_category_id → spot_categories.spot_category_id
* spot_availability.spot_id → parking_spots.spot_id
* parking_tickets.session_id → parking_sessions.session_id
* payments.session_id → parking_sessions.session_id

---

## Timestamps

All tables include:

* createdAt
* updatedAt

These fields help track record creation and updates.

---

## Use Cases Covered

The ERD answers the following:

* What vehicles entered the parking facility?
* Which parking spot was assigned?
* Which zone does the spot belong to?
* Is the spot reserved?
* When did the vehicle enter?
* When did the vehicle exit?
* What ticket was issued?
* Can vehicle visit multiple times?
* Can spots be reused?
* How is availability tracked?
* How are payments recorded?
* Which vehicles are currently parked?

---

## Diagram

The ER diagram visually represents:

* vehicles
* vehicle categories
* parking zones
* parking spots
* spot categories
* parking sessions
* tickets
* payments
* spot availability

---

## Design Type

Normalized Relational Database Design

Multi-Entity ER Model

Time-based Availability Tracking

---

Follow along as I build and learn in public 🚀