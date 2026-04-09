# Clinic Appointment and Diagnostics Platform

## Instructions

A modern clinic wants to organize its operations digitally. They want to manage doctors, patients, appointments, consultations, diagnostic tests, reports, and payments. Patients should be able to visit doctors, book appointments, undergo tests if prescribed, and receive reports later.

The clinic may have multiple doctors across different departments or specialties. A patient may visit the clinic multiple times. During a visit, the doctor may prescribe one or more diagnostic tests. The diagnostic reports may be generated later and linked back to the patient and doctor visit.

Your task is to design the ER diagram for this clinic system.

This assignment is not about making a hospital-level giant system. Keep it focused on a clinic that handles appointments, consultations, diagnostics, and reporting in a clean and scalable way.

---

# What You Have to Do

Your design should support questions like:

* Who are the doctors and what are their specialties?
* Which patient booked which appointment?
* What was the appointment status?
* Did the appointment result in a consultation?
* Were any diagnostic tests prescribed?
* What reports were generated?
* Can one patient have many visits?
* Can one doctor attend many patients?
* Can one consultation lead to multiple tests?
* How should payments be connected to visits or appointments?

---

# What to Make

Create an ER diagram for this clinic platform.

Your ERD should include the important parts of the business, such as:

* patients
* doctors
* appointments
* consultations or visits
* tests / diagnostics
* reports
* payment related structure if needed

You should carefully think about:

* difference between an appointment and an actual visit/consultation
* whether one appointment always results in one consultation
* whether tests belong to appointments, consultations, or patients
* how reports should be linked
* whether doctor specialty should be a separate entity or attribute
* whether multiple tests can belong to a single consultation

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

Submission expectations:

* one single board is preferred
* the diagram must be readable
* entity names and attribute names should be clearly visible
* PK and FK should be clearly marked
* relationship lines should not look random or confusing
* if you use GitHub, keep the diagram inside the repo properly and include a short README

---

# Evaluation Parameters

## Understanding of Workflow (15 marks)

Did the student understand the clinic flow from appointment to consultation to diagnostics?

## Entity Identification (20 marks)

Are patient, doctor, appointment, consultation, diagnostic test, and report structures captured properly?

## Relationship Modeling (20 marks)

Are patient-doctor-appointment-test-report relations meaningful and correct?

## PK/FK Quality (15 marks)

Are links between records well designed?

## Attribute Design (15 marks)

Are relevant attributes included without stuffing too much into one entity?

## Business Logic Accuracy (10 marks)

Does the design make sense for a real clinic system?

## Diagram Presentation (5 marks)

Is the ERD clean and easy to review?
