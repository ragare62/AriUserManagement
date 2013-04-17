-- Column was read from database as: `Quantity` decimal(20,10) not null
-- modify column for field _quantity
ALTER TABLE `InvoiceLine` CHANGE COLUMN `Quantity` `Quantity` integer NOT NULL
;

