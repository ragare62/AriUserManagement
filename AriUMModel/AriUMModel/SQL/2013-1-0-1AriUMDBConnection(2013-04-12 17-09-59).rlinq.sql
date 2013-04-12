-- AriUMModel.Product
CREATE TABLE `Product` (
    `nme` varchar(255) NULL,                -- _name
    `Price` decimal(10,2) NOT NULL,         -- _price
    `ProductId` integer AUTO_INCREMENT NOT NULL, -- _productId
    CONSTRAINT `pk_Product` PRIMARY KEY (`ProductId`)
) ENGINE = InnoDB
;

