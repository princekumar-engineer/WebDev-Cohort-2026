# **MongoDB Data Import and Export**

### **Steps to Import JSON Data into MongoDB**

#### **1. Save JSON Data to a File**

First, save your JSON data into a file. For example, let's name it `products.json`.

#### **2. Access the Command Line**

Open your terminal or command prompt. Do **not** run these commands inside the interactive MongoDB Shell (`mongosh`); they must be executed directly from your operating system's terminal where MongoDB Database Tools are installed.

#### **3. Use the `mongoimport` Command**

The `mongoimport` command-line utility is used to inject extended JSON, CSV, or TSV data into a MongoDB instance.

#### **4. Specify Database and Collection**

Use `--db` (or `-d`) to specify the target database name and `--collection` (or `-c`) to specify the destination collection name.

#### **5. Point to the Source File**

Use `--file` to provide the path to the file that contains the data to be imported.

#### **6. Handle an Array of Objects (Crucial)**

If your JSON file wraps data inside an array (`[ {...}, {...} ]`), you **must** include the `--jsonArray` flag.

---

### **Example Command**

```sh
mongoimport --db shop --collection products --file products.json --jsonArray

```

**Parameter Breakdown:**

* `--db shop`: Specifies the database name as "shop".
* `--collection products`: Specifies the collection name as "products".
* `--file products.json`: Specifies the input file path.
* `--jsonArray`: Informs MongoDB that the file contains an array of multiple objects.

---

### **Handling Format Structure Differences**

* **Line-Delimited JSON (Default):** If your file contains multiple independent JSON objects, each written on a completely new line *without* commas or surrounding array brackets, run the command **without** the `--jsonArray` flag.
* **Standard JSON Array:** If your file looks like a typical JSON API response (wrapped in `[]` and separated by commas), the `--jsonArray` flag is mandatory.

---

### **Important Limitations & Notes**

* **Document Size Limit:** Every individual document in MongoDB cannot exceed **16 MB**.
* **Database Tools Requirement:** `mongoimport` and `mongoexport` are part of the separate *MongoDB Database Tools* package. If your terminal says the command is not found, you need to download it from the official MongoDB site and add it to your system's Environment PATH.

---

### **Steps to Export Data from MongoDB to JSON**

Exporting data from MongoDB back out to a physical file is achieved using the companion tool `mongoexport`.

#### **1. Target the Source Data**

Identify the database (`--db`) and the specific collection (`--collection`) you wish to extract.

#### **2. Specify the Output File Destination**

Use the `--out` (or `-o`) flag followed by your desired filename to save the extracted data onto your machine.

---

### **Example Export Command**

```sh
mongoexport --db shop --collection products --out exported_products.json

```

**Parameter Breakdown:**

* `--db shop`: Specifies the source database name.
* `--collection products`: Specifies the source collection name.
* `--out exported_products.json`: Specifies the target path where the new JSON file will be generated.

---

### **Exporting to Alternative Data Formats**

By default, `mongoexport` writes data in clean, line-delimited JSON format. If your project requires a tabular structure like a spreadsheet, you can alter the output type.

#### **Exporting to CSV Format**

When exporting to CSV, you must explicitly declare the target fields you want to extract using the `--fields` flag.

```sh
mongoexport --db shop --collection products --type=csv --fields=name,price,quantity --out exported_products.csv

```

---

### **Summary Table**

| Command Tool | Primary Purpose | Crucial Parameters | Target Environment |
| --- | --- | --- | --- |
| **`mongoimport`** | Ingests external JSON/CSV/TSV files into collections. | `--file`, `--jsonArray` (if bounded by `[]`) | Operating System Terminal |
| **`mongoexport`** | Extracts collections out into JSON/CSV/TSV files. | `--out`, `--type`, `--fields` (mandatory for CSV) | Operating System Terminal |