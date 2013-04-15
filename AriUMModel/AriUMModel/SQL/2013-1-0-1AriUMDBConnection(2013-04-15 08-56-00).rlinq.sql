-- AriUMModel.Invoice
CREATE TABLE `Invoice` (
    `CustomerId` integer NULL,              -- _customer
    `InvoiceDate` datetime NOT NULL,        -- _invoiceDate
    `InvoiceId` integer AUTO_INCREMENT NOT NULL, -- _invoiceId
    `InvoiceNumber` integer NOT NULL,       -- _invoiceNumber
    `srial` varchar(255) NULL,              -- _serial
    `ttal` decimal(20,10) NOT NULL,         -- _total
    CONSTRAINT `pk_Invoice` PRIMARY KEY (`InvoiceId`)
) ENGINE = InnoDB
;

-- AriUMModel.InvoiceLine
CREATE TABLE `InvoiceLine` (
    `Amount` decimal(20,10) NOT NULL,       -- _amount
    `InvoiceId` integer NULL,               -- _invoice
    `InvoiceLineId` integer AUTO_INCREMENT NOT NULL, -- _invoiceLineId
    `Quantity` decimal(20,10) NOT NULL,     -- _quantity
    CONSTRAINT `pk_InvoiceLine` PRIMARY KEY (`InvoiceLineId`)
) ENGINE = InnoDB
;

ALTER TABLE `Invoice` ADD CONSTRAINT `ref_Invoice_Customer` FOREIGN KEY `ref_Invoice_Customer` (`CustomerId`) REFERENCES `Customer` (`CustomerId`)
;

ALTER TABLE `InvoiceLine` ADD CONSTRAINT `ref_InvoiceLine_Invoice` FOREIGN KEY `ref_InvoiceLine_Invoice` (`InvoiceId`) REFERENCES `Invoice` (`InvoiceId`)
;

-- Index 'idx_Invoice_CustomerId' was not detected in the database. It will be created
ALTER TABLE `Invoice` ADD INDEX `idx_Invoice_CustomerId`(`CustomerId`)
;

-- Index 'idx_InvoiceLine_InvoiceId' was not detected in the database. It will be created
ALTER TABLE `InvoiceLine` ADD INDEX `idx_InvoiceLine_InvoiceId`(`InvoiceId`)
;

