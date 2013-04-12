-- AriUMModel.Customer
CREATE TABLE `Customer` (
    `Address` varchar(255) NULL,            -- _address
    `City` varchar(255) NULL,               -- _city
    `Country` varchar(255) NULL,            -- _country
    `CustomerId` integer AUTO_INCREMENT NOT NULL, -- _customerId
    `nme` varchar(255) NULL,                -- _name
    `Nif` varchar(255) NULL,                -- _nif
    `SerialInvoice` varchar(255) NULL,      -- _serialInvoice
    `stte` varchar(255) NULL,               -- _state
    CONSTRAINT `pk_Customer` PRIMARY KEY (`CustomerId`)
) ENGINE = InnoDB
;

