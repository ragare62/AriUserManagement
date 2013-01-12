-- AriUMModel.UserGroup
CREATE TABLE `UserGroup` (
    `nme` varchar(255) NULL,                -- _name
    `user_group_id` integer AUTO_INCREMENT NOT NULL, -- _userGroupId
    CONSTRAINT `pk_UserGroup` PRIMARY KEY (`user_group_id`)
) ENGINE = InnoDB
;

