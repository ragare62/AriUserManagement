-- add column for field _product
ALTER TABLE `InvoiceLine` ADD COLUMN `ProductId` integer NULL
;

ALTER TABLE `InvoiceLine` ADD CONSTRAINT `ref_InvoiceLine_Product` FOREIGN KEY `ref_InvoiceLine_Product` (`ProductId`) REFERENCES `Product` (`ProductId`)
;

-- Index 'idx_InvoiceLine_ProductId' was not detected in the database. It will be created
ALTER TABLE `InvoiceLine` ADD INDEX `idx_InvoiceLine_ProductId`(`ProductId`)
;

