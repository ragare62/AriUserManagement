-- AriUMModel.UserGroup
CREATE TABLE `UserGroup` (
    `nme` varchar(255) NULL,                -- _name
    `user_group_id` integer AUTO_INCREMENT NOT NULL, -- _userGroupId
    CONSTRAINT `pk_UserGroup` PRIMARY KEY (`user_group_id`)
) ENGINE = InnoDB
;

-- AriUMModel.User
CREATE TABLE `usr` (
    `email` varchar(255) NULL,              -- _email
    `nme` varchar(255) NULL,                -- _name
    `passwd` varchar(255) NULL,             -- _password
    `user_group_id` integer NULL,           -- _userGroup
    `user_id` integer AUTO_INCREMENT NOT NULL, -- _userId
    CONSTRAINT `pk_usr` PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
;

ALTER TABLE `usr` ADD CONSTRAINT `ref_usr_UserGroup` FOREIGN KEY `ref_usr_UserGroup` (`user_group_id`) REFERENCES `UserGroup` (`user_group_id`)
;

