# Instagram Thrift Creator Store — ER Diagram

## Overview

This project presents an Entity Relationship (ER) diagram for a small Instagram-based thrift and handmade product store. The business initially manages orders through Instagram DMs and WhatsApp, but as it grows, it requires a structured database to manage products, customers, orders, payments, and shipments.

The goal of this design is to model a practical and scalable database that supports both **unique thrift items** and **multi-quantity handmade products**, while maintaining proper order tracking, inventory management, and customer records.

---

## Business Requirements

The database should support:

* Selling thrift and handmade products
* Unique and multi-quantity inventory
* Customer order management
* Order history tracking
* Payment tracking
* Shipment tracking
* Product attributes (size, color, category, etc.)
* Multiple items per order
* Multiple orders per customer

---

## Key Features of the Design

### Supports Thrift and Handmade Products

* Thrift items → unique inventory
* Handmade items → multiple quantity
* Managed using:

  * `product_type`
  * `inventory_type`
  * `quantity_available`

### Order Management

* One customer can place multiple orders
* One order can contain multiple products
* Many-to-many relationship handled using **orderitems** table

### Payment Tracking

* Separate payment table
* Supports COD, UPI, Card, etc.
* Allows partial or multiple payments

### Shipping Tracking

* Shipment entity stores delivery details
* Includes tracking number and courier
* Shipping status lifecycle supported

### Product Category Normalization

* Categories stored in separate table
* Prevents duplicate category values
* Improves scalability

---

## Entities Included

The ER diagram contains the following entities:

### Customers

Stores customer details and contact information.

### Products

Stores product information including thrift/handmade type, size, color, and stock.

### Categories

Normalized category table for products.

### Orders

Stores customer order information and status lifecycle.

### OrderItems

Junction table handling many-to-many relationship between orders and products.

### Payments

Stores payment details and status.

### Shipments

Stores delivery and shipping tracking information.

---

## Relationships

* One customer can place many orders
* One order contains many order items
* One product can appear in many order items
* One category contains many products
* One order can have multiple payments
* One order has one shipment

---

## Database Design Decisions

### Why OrderItems Table?

To handle:

* One order → multiple products
* One product → multiple orders

This resolves many-to-many relationship.

### Why Categories Table?

To normalize product categories and avoid duplication.

### Why Separate Payments Table?

To support:

* Partial payments
* COD orders
* Refunds
* Multiple payment methods

### Why Inventory Type?

To distinguish:

* UNIQUE (thrift items)
* MULTI (handmade items)

---

## Attributes Covered

### Product Attributes

* name
* category
* size
* color
* product_type
* inventory_type
* price
* quantity_available

### Order Attributes

* order_status
* payment_status
* shipping_status
* total_amount

### Payment Attributes

* payment_method
* payment_status
* payment_date

### Shipment Attributes

* courier_name
* tracking_number
* shipping_status
* shipped_date
* delivered_date

---

## ER Diagram Scope

This project focuses only on:

* Database design
* Entity relationships
* Normalization
* Cardinality
* Primary and foreign keys

This project does NOT include:

* SQL queries
* Backend implementation
* Frontend UI
* API design

---

## Evaluation Criteria Covered

This design satisfies:

* Business Understanding
* Entity Identification
* Relationships and Cardinality
* Attributes Quality
* Primary Keys and Foreign Keys
* Clarity and Diagram Structure
* Overall Thoughtfulness

---

## Files Included

* ER Diagram (Eraser)
* ER Diagram Export (PNG/PDF)
* README.md

---

## Conclusion

This ER diagram provides a scalable and normalized database structure for an Instagram-based thrift and handmade product store. The design properly handles inventory differences, order management, payment tracking, and shipping workflows while maintaining clarity and extensibility.

The schema is suitable for small creators and can scale as the business grows.
