-- AriUMModel.WebApiTicket
CREATE TABLE `WebApiTicket` (
    `Code` varchar(255) NULL,               -- _code
    `End` datetime NOT NULL,                -- _end
    `Start` datetime NOT NULL,              -- _start
    `user_id` integer NULL,                 -- _user
    `WebApiTicketId` integer AUTO_INCREMENT NOT NULL, -- _webApiTicketId
    CONSTRAINT `pk_WebApiTicket` PRIMARY KEY (`WebApiTicketId`)
) ENGINE = InnoDB
;

ALTER TABLE `WebApiTicket` ADD CONSTRAINT `ref_WebApiTicket_usr` FOREIGN KEY `ref_WebApiTicket_usr` (`user_id`) REFERENCES `usr` (`user_id`)
;

-- Index 'idx_WebApiTicket_user_id' was not detected in the database. It will be created
ALTER TABLE `WebApiTicket` ADD INDEX `idx_WebApiTicket_user_id`(`user_id`)
;

