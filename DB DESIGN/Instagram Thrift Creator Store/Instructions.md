# Instagram Thrift Creator Store


## Instructions

A small creator has started an Instagram-based store where they sell thrifted fashion items and handmade products. At first, the business is very small and receives orders through Instagram DMs and WhatsApp. Over time, the store starts growing and now the owner wants to manage products better, keep track of available stock, handle customer orders properly, and maintain basic information about delivery and payments.

Some products are thrifted and only have one piece available. Some are handmade and can have multiple units. Some items may have size, color or condition details. The business owner may also want to store customer details, order history, payment status and shipping status.

Your task is to design the ER diagram for the database of this business.

This is not just a “shop” problem. You should think carefully about how thrift and handmade products may differ. For example, a thrift item may be unique, while a handmade item may be created in batches or in multiple pieces. A good design should reflect the business properly.

### What You Have to Do

You have to design a database model that can support this business in a practical way.

Your ER diagram should help answer questions like:

- What products are being sold?
- Are they thrifted items or handmade items?
- How many pieces are available?
- Which customer placed which order?
- What all items were part of one order?
- Was the order paid for?
- Has the order been shipped or delivered?
- Can one customer place multiple orders?
- Can one order contain multiple products?
- How do we store product-specific details like size, category, color, condition, or price?

### What to Make

Design an ER diagram for this platform.

Your diagram must include:

- all important entities
- attributes for each entity
- primary key for every main entity
- foreign keys wherever relationships exist
- proper relationships between entities
- cardinality wherever relevant
- any junction table required for many-to-many relations

Keep these points in mind while designing:

- A customer can place multiple orders.
- One order can contain multiple products.
- Some products may be unique pieces.
- Some products may have reusable inventory.
- You should think about whether product condition should be stored.
- You should think about how payment and shipping details should be represented.
- Avoid putting too much unrelated information in one entity.
- Try to keep your design normalized and clean.
- Use meaningful names for entities and attributes.

You do not need to write SQL queries.

You do not need to build frontend or backend.

This task is only about database design.

### Submission Instructions
Submit any one of the following:

- an image export of your ER diagram
- a PDF export of your ER diagram
- an Excalidraw / Eraser / Draw.io / FigJam board link
- a GitHub repository link containing the diagram file or exported image

Submission expectations:

- one single board is preferred
- the diagram must be readable
- entity names and attribute names should be  clearly visible
- PK and FK should be clearly marked
- relationship lines should not look random or confusing
- if you use GitHub, keep the diagram inside the repo properly and include a short README

### Evaluation Parameters
Business Understanding (15 marks)
- Did the student understand the thrift + handmade business properly?
- Did they model both product selling and order flow meaningfully?

Entity Identification (20 marks)
- Are the main entities present?
- Did they miss any core part like products, customers, orders, order items, payment, shipping, inventory?

Relationships and Cardinality (20 marks)
- Are the relationships correct?
- Is one-to-many and many-to-many handled properly?
- Did they use a junction table where needed?

Attributes Quality (15 marks)
- Are attributes meaningful and realistic?
- Are product details and order details separated properly?

Primary Keys and Foreign Keys (15 marks)
- Are PKs correctly defined?
- Are FKs placed properly to support relationships?

Clarity and Diagram Structure (10 marks)
- Is the ERD neat and understandable?
- Can another reviewer read it without confusion?

Overall Thoughtfulness (5 marks)
- Does the design feel like the student actually thought through the business?