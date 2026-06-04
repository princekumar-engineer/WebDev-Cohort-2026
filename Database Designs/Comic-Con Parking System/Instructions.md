# Comic-Con Event Parking System — ER Diagram Instructions

## Overview

A large convention venue hosts Comic-Con India, where thousands of visitors arrive across multiple days for anime screenings, cosplay competitions, gaming showcases, creator meetups, merchandise zones and panel discussions.

During the event, people arrive using bikes, cars, SUVs, cabs and EV vehicles. The venue has a structured parking facility divided into multiple zones and levels. Some parking areas are reserved for cosplayers with props, exhibitors, creators, VIP guests, staff members and EV charging vehicles.

Whenever a vehicle enters the parking facility, the system generates a parking ticket and assigns a suitable parking spot depending on vehicle type and availability. When the vehicle exits, the system records exit time and calculates the parking fee.

The venue management wants a system that can track:

* vehicles entering the parking facility
* vehicle categories
* parking spot allocation
* reserved parking categories
* entry and exit timestamps
* parking sessions
* payment status
* spot availability across zones and levels

This is a multi-zone event parking system where vehicle types, access categories, sessions, tickets and payments must be modeled properly.

---

# What You Have to Do

Your design should be able to answer questions like:

* What vehicles entered the parking facility?
* What type of vehicle entered?
* Which parking spot was assigned?
* Which zone or level does that parking spot belong to?
* Was the parking spot reserved for exhibitors, VIP guests, staff, or EV charging?
* When did the vehicle enter the facility?
* When did the vehicle exit the facility?
* What ticket was issued for the parking session?
* Can one vehicle visit the venue multiple times across different days?
* Can one parking spot be reused across multiple parking sessions?
* How is parking availability tracked?
* How are parking charges calculated?
* How is payment recorded for each parking session?
* Can special access categories (cosplayers with props, exhibitors, VIP guests, staff) be represented?
* Can the system track which vehicles are currently parked inside the venue?

---

# What to Make

Design the ER diagram for this parking system.

Your ERD should include the important structures needed for:

* vehicles
* vehicle categories
* parking spots
* parking spot categories
* parking zones or parking levels
* parking tickets
* parking sessions (entry and exit tracking)
* payment records

---

# Things to Think About

* one vehicle can enter multiple times during the event
* one parking spot can serve many vehicles over time
* parking sessions should store entry and exit timestamps
* tickets and parking sessions may be separate structures
* different vehicle types require different parking spot types
* some parking spots may be reserved
* parking availability must be trackable
* zones or levels may contain multiple parking spots
* payments should be connected to parking sessions
* avoid putting everything into one single entity

You do not need to write SQL queries.
You do not need to build frontend or backend.
This task is only about database design.

---

# Submission Instructions

Submit any one of the following:

* an image export of your ER diagram
* a PDF export of your ER diagram
* an Excalidraw / Eraser / Draw.io / FigJam board link
* a GitHub repository link containing the diagram file or exported image

### Submission Expectations

* one single board is preferred
* the diagram must be readable
* entity names and attribute names should be clearly visible
* PK and FK should be clearly marked
* relationship lines should not look random or confusing
* if you use GitHub, keep the diagram inside the repo properly and include a short README

---

# Evaluation Parameters

## Parking System Understanding (15 marks)

* Did the student understand that this is a multi-zone event parking system, not a simple parking entry-exit tracker?
* Did they capture vehicle types, spot allocation, sessions, tickets and payments separately?

## Entity Quality (20 marks)

* Did they capture vehicle, vehicle category, parking spot, parking zone/level, parking session, ticket and payment structures properly?
* Did they represent reserved categories such as VIP, exhibitors, staff, or EV charging where needed?

## Relationship Modeling (20 marks)

* Are vehicle–session relations designed correctly?
* Are zone–spot relationships structured properly?
* Is spot reuse across multiple parking sessions modeled correctly over time?
* Are many-to-many relations handled properly wherever required?

## Attribute and Table Design (15 marks)

* Are important attributes like entry time, exit time, ticket number, vehicle type, spot category and payment status modeled properly?
* Is information distributed logically instead of being placed inside one large table?

## PK/FK and Junction Tables (15 marks)

* Did the student define primary keys for all major entities?
* Are foreign keys placed correctly to support relationships?
* Did they introduce junction tables wherever necessary?

## Real-World Practicality (10 marks)

* Does the design support multiple visits by the same vehicle across event days?
* Can parking spots be reused across sessions?
* Can reserved parking categories and EV charging spots be represented realistically?
* Can the system track currently parked vehicles?

## Diagram Neatness (5 marks)

* Is the ER diagram clearly structured and readable?
* Are entities, attributes, PKs and relationships easy to review?
