---
title: Database Review
date: 2023-05-01 11:05:43
category: Database
thumbnail: { thumbnailSrc }
draft: false
---

## Database Constraints

Constraints are rules applied to data to ensure its integrity and consistency. They restrict the type of data that can be inserted into a table.

### Types of Constraints

- **NOT NULL**: Ensures that a column cannot have NULL values.

  ```sql
  CREATE TABLE PRODUCT (
      id INT NOT NULL
  );
  ```

- **UNIQUE**: Ensures all values in a column are unique. Note that NULL values are allowed and can be duplicated.

  ```sql
  CREATE TABLE PRODUCT (
      id INT UNIQUE
  );
  ```

- **PRIMARY KEY**: A combination of NOT NULL and UNIQUE. It uniquely identifies each row in a table.

  ```sql
  CREATE TABLE PRODUCT (
      id INT PRIMARY KEY
  );
  ```

- **FOREIGN KEY**: Ensures referential integrity between two tables. It creates a link between the columns of the referencing table and the referenced table.

  ```sql
  CREATE TABLE PRODUCT (
      id INT PRIMARY KEY,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES USER(id) ON UPDATE CASCADE
  );
  ```

  Actions to perform when the referenced data is updated or deleted:

  1. **ON DELETE**: Specifies what happens when a referenced row is deleted.
  2. **ON UPDATE**: Specifies what happens when a referenced row is updated.

  Options for actions:

  1. **CASCADE**: Delete or update the row from the parent table and automatically delete or update the matching rows in the child table.
  2. **SET NULL**: Set the foreign key column to NULL when the referenced row is deleted or updated.
  3. **NO ACTION**: Do nothing if the referenced row is deleted or updated.
  4. **SET DEFAULT**: Set the foreign key column to its default value when the referenced row is deleted or updated.
  5. **RESTRICT**: Prevent deletion or update of the referenced row if there are matching rows in the child table.

- **DEFAULT**: Provides a default value for a column when none is specified.
  ```sql
  CREATE TABLE USER (
      name VARCHAR(30) DEFAULT 'Anonymous'
  );
  ```

## Normalization in Relational Databases

### Third Normal Form (3NF)

> Remove fields that do not depend on the key. (Eliminate transitive dependencies)

Any non-key attribute should not depend on another non-key attribute. If a set of columns can be placed in their own table, they should be.

**Candidates Table Before Normalization:**

| id  | name | age | address  | university |
| --- | ---- | --- | -------- | ---------- |
| 1   | A    | 23  | Seoul    | SNU        |
| 2   | B    | 25  | Pusan    | SNU        |
| 3   | C    | 24  | New York | NYU        |

If a table contains a field (e.g., university name and address) that depends on another field (e.g., university), it should be moved to a separate table.

**Candidates Table After Normalization:**

| id  | name | age | address  | university_id |
| --- | ---- | --- | -------- | ------------- |
| 1   | A    | 23  | Seoul    | 1             |
| 2   | B    | 25  | Pusan    | 1             |
| 3   | C    | 24  | New York | 2             |

**Universities Table:**

| id  | name | country |
| --- | ---- | ------- |
| 1   | SNU  | Korea   |
| 2   | NYU  | USA     |

### Exceptions to Normalization

While it's theoretically optimal to always adhere to third normal form, in practice, it's not always feasible. For instance, to remove all dependencies in a Customers table, you'd need separate tables for city, zip code, sales representative, customer grade, and other frequently repeated elements. While normalization is beneficial, overly normalizing small tables can lead to performance issues or excessive memory usage due to too many open files.

### References

- [MDN Web Docs: @font-face](https://developer.mozilla.org/ko/docs/Web/CSS/@font-face)
