ALTER TABLE `usr` DROP PRIMARY KEY
;

-- add column for field _login
ALTER TABLE `usr` ADD COLUMN `Login` varchar(255) NULL
;

-- add column for field _userId
ALTER TABLE `usr` ADD COLUMN `UserId` integer NULL AUTO_INCREMENT
;

UPDATE `usr` SET `UserId` = 0
;

ALTER TABLE `usr` CHANGE COLUMN `UserId` `UserId` integer NOT NULL AUTO_INCREMENT
;

-- dropping unknown column `user_id`
ALTER TABLE `usr` DROP COLUMN `user_id`
;

ALTER TABLE `usr` ADD PRIMARY KEY (`UserId`)
;

