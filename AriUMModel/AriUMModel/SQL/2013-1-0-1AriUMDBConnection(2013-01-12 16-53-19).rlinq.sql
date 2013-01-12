-- AriUMModel.User
CREATE TABLE `usr` (
    `user_id` integer AUTO_INCREMENT NOT NULL, -- _userId
    `passwd` varchar(255) NULL,             -- _password
    `nme` varchar(255) NULL,                -- _name
    `email` varchar(255) NULL,              -- _email
    CONSTRAINT `pk_usr` PRIMARY KEY (`user_id`)
) ENGINE = InnoDB;

