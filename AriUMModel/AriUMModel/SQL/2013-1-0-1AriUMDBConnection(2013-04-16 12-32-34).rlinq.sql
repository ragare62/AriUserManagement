-- add column for field _price
ALTER TABLE `InvoiceLine` ADD COLUMN `Price` decimal(20,10) NULL
;

UPDATE `InvoiceLine` SET `Price` = 0
;

ALTER TABLE `InvoiceLine` CHANGE COLUMN `Price` `Price` decimal(20,10) NOT NULL
;

